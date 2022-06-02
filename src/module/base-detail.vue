<template>
  <div class="m-3 flex flex-col space-y-3">
    <!--
      这里的 activeModule 是 util 下的module配置项
      base-panel 是一个仪表板组件. 
      base-table 用来展示关联项
    -->
    <base-panel :option="activeModule"
                v-show="activeModule"
                ref="baseList"></base-panel>
    <base-table v-for="item in hasMany"
                ref="hasMany"
                type="hasMany"
                :key="item"
                :option="this.getHasManyOption(item)">
    </base-table>
    <base-table v-for="item in belongsToMany"
                ref="belongsToMany"
                type="belongsToMany"
                :key="item"
                :option="this.getBelongsToManyOption(item)">
    </base-table>
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
  activated () {
    // this.$refs.baseList.clearData()
    // this.$refs.baseDetail.clearData()
  },
  computed: mapState({
    option: (state) => state.option,
    activeModuleId: (state) => state.option.activeModuleId,
    module: (state) => state.option.module,
    activeModule () {
      return this.activeModuleId && this.module && this.module[this.activeModuleId] ? this.module[this.activeModuleId] : {}
    },
    hasMany () {
      let hasMany = this.activeModule && this.activeModule.hasMany ? this.activeModule.hasMany : [];
      return hasMany
    },
    belongsToMany () {
      let belongsToMany = this.activeModule && this.activeModule.belongsToMany ? this.activeModule.belongsToMany : [];
      return belongsToMany
    }
  }),
  methods: {
    getHasManyOption (item) {
      let { module } = item
      return this.module[module]
    },
    getBelongsToManyOption (item) {
      let { module } = item
      return this.module[module]
    }
  },
  watch: {
    activeModuleId () {
      this.$refs.baseList.clearData()
      for (let index in this.$refs.hasMany) {
        this.$refs.hasMany[index].clearData()
      }
      for (let index in this.$refs.belongsToMany) {
        this.$refs.belongsToMany[index].clearData()
      }
    }
  }
}
</script>