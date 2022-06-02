<template>
  <base-layout>
    <template v-slot:header>
      <base-header :title="title"
                   :version="version"
                   :menu="mainMenu"
                   :leftMenuCollapse="leftMenuCollapse"
                   @menuItemClick="menuItemClick"
                   @toggleLeftMenuCollapse="toggleLeftMenuCollapse"></base-header>
    </template>
    <template v-slot:left-menu>
      <base-left-menu :menu="leftMenu"
                      :leftMenuCollapse="leftMenuCollapse"
                      @menuItemClick="leftMenuItemClick"></base-left-menu>
    </template>
    <template v-slot:navigation>
    </template>
    <template v-slot:body>
      <div v-loading="fetching">
        <!---标准组件, 列表页到详情页再到关联模块页面的三级页面--->

        <!--
          这里只有当 acitveType === 1的时候才展示列表组件.其他时候展示详情组件.
          这里的 activeModuleId 区分的是当前展示的是那个模块的数据, 具体的来说就是 util 下的模块.
        -->
        <base-list v-show="activeType==1"
                   :modelId="activeModuleId" />
        <base-detail v-show="activeType==2"
                     :modelId="activeModuleId" />

      </div>
    </template>
  </base-layout>
</template>
<script>
import BaseHeader from '@/components/header/base-header.vue';
import BaseLeftMenu from "@/components/left-menu/base-left-menu.vue";
import { mapState } from "vuex";
import BaseLayout from "../components/layout/base-layout.vue";
import BaseList from "../module/base-list.vue";
import BaseDetail from "../module/base-detail.vue";
import * as MutationType from "../MutationType"

export default {
  name: "homeComponent",
  components: { BaseLayout, BaseHeader, BaseLeftMenu, BaseList, BaseDetail },
  data () {
    return {
      leftMenuCollapse: false,
    }
  },
  setup () {

  },
  mounted () {
    let entities = this.$store.getters['option/entities'];
    this.$store.commit('option/' + [MutationType.SET_MORE], {
      type: "module",
      value: entities.module,
    })
    this.$store.commit('option/' + [MutationType.SET_MORE], {
      type: "page",
      value: entities.page,
    })
    this.$store.commit('option/' + [MutationType.SET_MORE], {
      type: "option",
      value: entities.option,
    })
    this.$store.dispatch('dictionary/getDictionary')

  },
  computed: mapState({
    isAuth: (state) => state.isAuth,
    module: (state) => state.option.module,
    page: (state) => state.option.page,
    option: (state) => state.option.option,
    activePageId: (state) => state.option.activePageId,
    activeModuleId: (state) => state.option.activeModuleId,
    fetching: (state) => state.fetching,
    permisions: (state) => state.auth.user.permissions ? state.auth.user.permissions : [],
    activeModule () {
      return this.module && this.activeModuleId ? this.module[this.activeModuleId] : {};
    },
    isSelfCorrelation () {
      return this.activeModule ? this.activeModule.isSelfCorrelation : false;
    },
    activeType: (state) => state.option.activeType,
    title () {
      return this.option[1] ? this.option[1].title : ''
    },
    version () {
      return this.option[1] ? this.option[1].version : ''
    },
    mainMenu () {
      let list = [];
      for (let item in this.page) {
        list.push({
          id: this.page[item].id,
          name: this.page[item].name,
          uuid: this.page[item].uuid,
        })
      }
      return list
    },
    leftMenu () {
      let list = [];
      if (!this.page[this.activePageId]) return;
      let permisions = []
      this.permisions.forEach(element => {
        permisions.push(element.name)
      });
      permisions = new Set(permisions)
      for (let item in this.page[this.activePageId].modules) {
        let moduleId = this.page[this.activePageId].modules[item]
        if (this.module[moduleId].rule && this.module[moduleId].rule.canShow) {
          let rule = this.module[moduleId].rule.canShow.filter((item) => {
            return permisions.has(item)
          })
          if (rule.length > 0) {
            list.push({
              id: this.module[moduleId].id,
              name: this.module[moduleId].name,
              uuid: this.module[moduleId].uuid,
              icon: this.module[moduleId].icon,
            })
          }
        } else {
          list.push({
            id: this.module[moduleId].id,
            name: this.module[moduleId].name,
            uuid: this.module[moduleId].uuid,
            icon: this.module[moduleId].icon,
          })
        }
      }
      return list
    },
  }),
  methods: {

    menuItemClick (menuItem) {
      this.$store.commit('option/' + [MutationType.SET_MORE], {
        type: "activePageId",
        value: menuItem.id,
      })
      this.$store.commit('option/' + [MutationType.SET_MORE], { type: "activeType", value: 1 });
    },
    leftMenuItemClick (menuItem) {

      // .clearData();
      this.$store.commit('option/' + [MutationType.SET_MORE], {
        type: "activeModuleId",
        value: menuItem.id,
      })
      this.$store.commit('option/' + [MutationType.SET_MORE], { type: "activeType", value: 1 });
    },
    toggleLeftMenuCollapse () {
      this.leftMenuCollapse = !this.leftMenuCollapse
    }
  },
  watch: {
    isAuth (val) {
      if (!val) {
        let user = localStorage.getItem('user')
        if (user && user != "undefined" && Object.keys(user).length > 0) {
          console.log(user)
          let auth = JSON.parse(user);
          this.$store.commit('auth/' + MutationType.SET_ACCESS_TOKEN, auth.access_token)
          this.$store.dispatch('auth/' + MutationType.AUTHENTICATION_UPDATE)
          this.$store.commit('setFetching', false);
        } else {
          this.$message.error('登陆失效!')
          this.$router.push('login')
        }
      } else {
        this.$message.success('已登录!')
      }
    },
    stale (val) {
      if (val) {
        console.log("数据请求中")
        // .success('正在刷新数据!')
      } else {
        console.log("数据请求完成")
      }
    },
    fetching (val) {
      if (val) {
        console.log("数据请求中")
      } else {
        console.log("数据请求完成")
        // this.$message.success('数据请求成功!')
      }
    }
  }
}
</script>