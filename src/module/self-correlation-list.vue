<template>
  <div class="m-3 flex flex-col space-y-3">
    <!--- panel --->
    <base-panel />
    <!--- table list --->
    <self-correlation-table :option="activeModule"
                            v-show="activeModule"></self-correlation-table>
    <!--- hasMany--->
    <base-table v-for="item in hasMany"
                type="detail"
                :key="item"
                :option="this.getHasManyOption(item)"></base-table>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import BasePanel from "../components/body/base-panel.vue"
import selfCorrelationTable from "../components/body/self-correlation-table.vue"
import BaseTable from "../components/body/base-table.vue"
export default {
  components: { selfCorrelationTable, BasePanel, BaseTable },
  setup () {

  },
  computed: mapState({
    activeModuleId: (state) => state.option.activeModuleId,
    module: (state) => state.option.module,
    activeModule () {
      return this.module[this.activeModuleId] ?? {}
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