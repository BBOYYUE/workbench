<template>
  <div class="flex flex-row w-full h-8 bg-gray-700">
    <div class="h-full flex flex-col justify-center mx-1">
      <div class="p-1 rounded-md text-gray-300"
           style="font-size: 0.5rem"
           @click="this.$emit('change','view')">
        可视化编辑
      </div>
    </div>
    <div class="h-full flex flex-col justify-center mx-1">
      <div class="p-1 rounded-md text-gray-300"
           style="font-size: 0.5rem"
           @click="this.$emit('change','text')">
        文本编辑
      </div>
    </div>
  </div>
</template>