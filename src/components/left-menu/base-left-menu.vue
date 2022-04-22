<template>
  <el-menu class="left-menu h-full"
           :collapse="isCollapse">
    <el-menu-item v-for="item in menu"
                  :key="item.id"
                  :index="item.uuid">
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
    menu (val) {
      console.log(val);
    },
    leftMenuCollapse (val) {
      this.isCollapse = val
    },
    isCollapse (val) {
      console.log(val);
    }
  },
}
</script>
<style scoped>
.left-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>