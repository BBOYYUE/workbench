<template>
  <div class="h-full w-full  overflow-hidden"
       id="left">
    <el-menu>
      <el-sub-menu index="infomation">
        <template #title><span>基本信息</span></template>
      </el-sub-menu>
      <el-sub-menu index="box">
        <template #title><span>容器盒子</span></template>
      </el-sub-menu>
      <el-sub-menu index="scene">
        <template #title><span>场景设置</span></template>
      </el-sub-menu>
    </el-menu>
  </div>
</template>