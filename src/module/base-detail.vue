<template>
  <div class="m-3 flex flex-col space-y-3">
    <base-panel :option="activeModule"
                v-show="activeModule"></base-panel>
    <base-table v-for="item in hasMany"
                type="detail"
                :key="item"
                :option="this.getHasManyOption(item)"></base-table>
  </div>
</template>
<script>
import BasePanel from "../components/body/base-panel.vue";
import BaseTable from "../components/body/base-table.vue";
import { mapState } from 'vuex'
export default {
  components: { BasePanel, BaseTable },
  setup () {

  },
  computed: mapState({
    option: (state) => state.option,
    activeModuleId: (state) => state.option.activeModuleId,
    module: (state) => state.option.module,
    activeModule () {
      return this.activeModuleId && this.module && this.module[this.activeModuleId] ? this.module[this.activeModuleId] : {}
    },
    hasMany () {
      return this.activeModule && this.activeModule.hasMany ? this.activeModule.hasMany : [];
    },
  }),
  methods: {
    getHasManyOption (item) {
      let { module } = item
      return this.module[module]
    }
  }
}
</script>