<template>
  <div class="m-3">
    <base-table :option="activeModule"
                type="list"
                v-show="activeModule"></base-table>
  </div>
</template>
<script>
import BaseTable from '@/components/body/base-table.vue'
import { mapState } from 'vuex'
export default {
  components: { BaseTable },
  setup () {

  },
  computed: mapState({
    activeModuleId: (state) => state.option.activeModuleId,
    module: (state) => state.option.module,
    activeModule () {
      return this.module[this.activeModuleId] ?? {}
    }
  }),
}
</script>