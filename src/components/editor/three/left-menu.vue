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
        <el-menu-item index="infomation-2">场景分组</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="box">
        <template #title><span>物体盒子</span></template>
        <el-menu-item index="infomation-2">添加场景</el-menu-item>
        <el-menu-item index="box-1">外部物体</el-menu-item>
        <el-menu-item index="box-2">简单三维几何体</el-menu-item>
        <el-menu-item index="box-3">简单二维几何体</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="mtl">
        <template #title><span>材质列表</span></template>
        <el-menu-item index="mtl-1">基础材质</el-menu-item>
        <el-menu-item index="mtl-2">外部材质</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="scene">
        <template #title><span>场景设置</span></template>
        <el-menu-item index="scene-1">光源</el-menu-item>
        <el-menu-item index="scene-2">相机</el-menu-item>
        <el-menu-item index="scene-3">控制器</el-menu-item>
        <el-menu-item index="scene-4">天空球</el-menu-item>
        <el-menu-item index="scene-5">地面</el-menu-item>
      </el-sub-menu>
      <el-sub-menu>
        <template #title><span>事件列表</span></template>
        <el-menu-item index="event-1">事件响应</el-menu-item>
        <el-menu-item index="event-2">事件发出</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>