<template>
  <div class="h-full w-full  overflow-hidden"
       id="left">
    <el-menu>
      <el-sub-menu index="infomation">
        <template #title><span>基本信息</span></template>
        <el-menu-item index="infomation-1">作品信息</el-menu-item>
        <el-menu-item index="infomation-2">添加场景</el-menu-item>
        <el-menu-item index="infomation-3">添加小地图</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="box">
        <template #title><span>容器盒子</span></template>
        <el-menu-item index="box-1">添加热点</el-menu-item>
        <el-menu-item index="box-2">添加标牌</el-menu-item>
        <el-menu-item index="box-3">添加文字</el-menu-item>
        <el-menu-item index="box-4">添加图片</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="scene">
        <template #title><span>场景设置</span></template>
        <el-menu-item index="scene-1">设置场景角度</el-menu-item>
        <el-menu-item index="scene-2">场景后期效果</el-menu-item>
        <!-- <el-menu-item index="scene-2">添加相机</el-menu-item>
        <el-menu-item index="scene-3">添加控制器</el-menu-item> -->
      </el-sub-menu>
    </el-menu>
  </div>
</template>