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
      <div>
        <!---标准组件, 列表页到详情页再到关联模块页面的三级页面--->
        <div v-if="isSelfCorrelation">
          <self-correlation-list :modelId="activeModuleId"></self-correlation-list>
        </div>
        <div v-else>
          <base-list v-if="activeType==1"
                     :modelId="activeModuleId" />
          <base-detail v-else
                       :modelId="activeModuleId" />
        </div>
        <!--- 递归组件, 无限递归的列表页 --->

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
import SelfCorrelationList from "../module/self-correlation-list.vue";
import * as MutationType from "../MutationType"
export default {
  name: "homeComponent",
  components: { BaseLayout, BaseHeader, BaseLeftMenu, BaseList, BaseDetail, SelfCorrelationList },
  data () {
    return {
      leftMenuCollapse: false
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
    console.log(entities.option);
    let assetEnities = this.$store.getters['asset/entities'];
  },
  computed: mapState({
    module: (state) => state.option.module,
    page: (state) => state.option.page,
    option: (state) => state.option.option,
    activePageId: (state) => state.option.activePageId,
    activeModuleId: (state) => state.option.activeModuleId,
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
      for (let item in this.page[this.activePageId].modules) {
        let moduleId = this.page[this.activePageId].modules[item]
        list.push({
          id: this.module[moduleId].id,
          name: this.module[moduleId].name,
          uuid: this.module[moduleId].uuid,
          icon: this.module[moduleId].icon,
        })
      }
      return list
    }
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
      this.$store.commit('option/' + [MutationType.SET_MORE], {
        type: "activeModuleId",
        value: menuItem.id,
      })
      this.$store.commit('option/' + [MutationType.SET_MORE], { type: "activeType", value: 1 });
    },
    toggleLeftMenuCollapse () {
      this.leftMenuCollapse = !this.leftMenuCollapse
    }
  }
}
</script>