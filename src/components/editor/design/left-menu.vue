<template>
  <div class="h-full w-full  overflow-hidden"
       id="left-menu"
       @select="(item)=>{
        this.$emit('change', item)
      }">
    <el-menu>
      <el-sub-menu index="infomation">
        <template #title><span>基本信息</span></template>
        <el-menu-item index="infomation-1">作品信息</el-menu-item>
        <el-menu-item index="infomation-3">页面组</el-menu-item>
        <el-menu-item index="infomation-4">页面</el-menu-item>
        <el-menu-item index="infomation-5">图层</el-menu-item>
        <el-menu-item index="infomation-6">事件列表</el-menu-item>

      </el-sub-menu>
      <el-sub-menu index="box">
        <template #title><span>页面容器</span></template>
        <el-menu-item index="box-1">文字</el-menu-item>
        <el-menu-item index="box-2">切图</el-menu-item>
        <el-menu-item index="box-3">视频</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>