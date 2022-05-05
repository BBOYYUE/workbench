<template>
  <el-menu class="left-menu h-full"
           :collapse="isCollapse">
    <el-menu-item v-for="item in menu"
                  :key="item.id"
                  :index="item.uuid"
                  @click="this.$emit('menuItemClick', item)">
      <el-icon>
        <component :is="item.icon"></component>
      </el-icon>
      <template #title>{{item.name}}</template>
    </el-menu-item>
  </el-menu>
</template>
<script>
import { ElMenu, ElMenuItem, ElIcon } from 'element-plus'
import { Document } from '@element-plus/icons-vue'
export default {
  props: {
    menu: Array,
    leftMenuCollapse: Boolean
  },
  components: { ElMenu, ElMenuItem, ElIcon, Document },
  setup () {

  },
  data () {
    return {
      isCollapse: false,
    }
  },
  methods: {},
  watch: {
    leftMenuCollapse (val) {
      this.isCollapse = val
    },
  },
}
</script>
<style scoped>
.left-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>