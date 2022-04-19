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

    </template>
    <template v-slot:navigation>

    </template>
    <template v-slot:body>

    </template>
  </base-layout>
</template>
<script>
import BaseHeader from '@/components/header/base-header.vue';
import { mapState } from "vuex";
import BaseLayout from "../components/layout/base-layout.vue"
import * as MutationType from "../MutationType"
export default {
  name: "homeComponent",
  components: { BaseLayout, BaseHeader },
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
    console.log(entities);
  },
  computed: mapState({
    module: (state) => state.option.module,
    page: (state) => state.option.page,
    option: (state) => state.option.option,
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
          name: this.page[item].name
        })
      }
      return list
    }
  }),
  methods: {
    menuItemClick (menuItem) {
      console.log(menuItem)
    },
    toggleLeftMenuCollapse () {
      this.leftMenuCollapse = !this.leftMenuCollapse
    }
  },
  watch: {
    mainMenu (val) {
      console.log(val);
    }
  }
}
</script>