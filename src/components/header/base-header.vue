<template>
  <div class="w-full text-left h-16 flex flex-row justify-between">
    <div class="h-16 w-80">
      <div class="text-3xl italic inline-block align-middle text-md text-white pl-6">
        <el-icon class="inline-block align-top relative right-2 cursor-pointer"
                 @click="this.$emit('toggleLeftMenuCollapse')">
          <fold v-if="leftMenuCollapse" />
          <expand v-else />
        </el-icon>
        {{ title }}
        <span class="text-sm not-italic"> {{ version }}</span>
      </div>
      <div class="inline-block align-middle h-full w-0"></div>
    </div>
    <div class="h-16">
      <div class="inline-block">
        <div v-for="item in menu"
             class="inline-block text-md text-white p-6"
             :key="item"
             @click="this.$emit('menuItemClick', item)">
          {{item.name}}
        </div>
      </div>
      <div class="inline-block align-middle h-full w-0"></div>
    </div>
    <div class="h-16 w-80">
      <div class="flex flex-row justify-end">
        <!-- <div class="flex flex-col justify-center">
        <div class="mr-3 py-1 px-2 border border-solid border-gray-600 rounded-md shadow-inner text-gray-400"
             @click="this.$router.push('/')">
          回到主页
        </div>
      </div> -->

        <div class="flex flex-col justify-center">
          <div class="h-8 w-8 m-3">
            <setting class="w-full h-full text-white" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Setting, Expand, Fold } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
export default {
  components: { Setting, Expand, ElIcon, Fold },
  emits: ['toggleLeftMenuCollapse', 'menuItemClick'],
  props: {
    title: String,
    version: String,
    leftMenuCollapse: Boolean,
    menu: Array
  },
  setup () { },
}
</script>
