<template>
  <div class="h-full w-full  overflow-hidden"
       id="left-menu">
    <el-menu @select="(item)=>{
        this.$emit('change', item)
      }">
      <el-sub-menu index="infomation">
        <template #title><span>基本信息</span></template>
        <el-menu-item index="infomation-1">作品信息</el-menu-item>
        <el-menu-item index="infomation-2">场景分组</el-menu-item>
        <el-menu-item index="infomation-3">场景</el-menu-item>
        <el-menu-item index="infomation-4">小地图</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="scene">
        <template #title><span>场景设置</span></template>
        <el-menu-item index="scene-1">场景角度</el-menu-item>
        <el-menu-item index="scene-2">后期效果</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="box">
        <template #title><span>容器盒子</span></template>
        <el-menu-item index="box-1">热点分组</el-menu-item>
        <el-menu-item index="box-2">热点</el-menu-item>
        <el-menu-item index="box-3">文字</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="event">
        <template #title><span>事件列表</span></template>
        <el-menu-item index="event-1">事件响应</el-menu-item>
        <el-menu-item index="event-2">事件发出</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script>
export default {
  setup () {

  },
}
</script>