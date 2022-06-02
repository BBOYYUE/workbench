<template>
  <base-editor>
    <template v-slot:header>
    </template>
    <template v-slot:left>
    </template>
    <template v-slot:content></template>
    <template v-slot:right>
    </template>
    <template v-slot:footer>
      <div class="h-full"
           id="footer">
        <el-tabs type="border-card"
                 class="h-full">
          <el-tab-pane label="User">User</el-tab-pane>
          <el-tab-pane label="Config">Config</el-tab-pane>
          <el-tab-pane label="Role">Role</el-tab-pane>
          <el-tab-pane label="Task">Task</el-tab-pane>
        </el-tabs>
      </div>
    </template>
  </base-editor>
</template>
<script>
/**
 * 编辑器操作逻辑...
 * 上传文件 -> 文件分组 -> 分析文件 -> 生成配置json -> 修改配置项 -> 更新配置文件
 * 
 * 1. 文件上传页面, 展示文件列表, 单张全景图为一个资源, 需要一个分组功能, 
 * 2. 编辑页面, 可视化编辑器 和 json 编辑器
 */
import baseEditor from '@/module/base-editor.vue';
// import PanoramaEditor from '@/components/editor/panorama/panoramaEditor.vue';
// import ThreeEditor from '@/components/editor/three/threeEditor.vue';
// import DesignEditor from '@/components/editor/design/designEditor.vue';

const PANORAMA = String(1);
const DESIGN = String(2);
const THREE = String(3);
const SEQUENCE = String(4);

const ASSET_TYPE = {
  PANORAMA: {
    1: "work",
    2: "asset",
    3: "dir",
  },
  DESIGN: {
    1: "work",
    2: "asset",
    3: "dir",
  },
  THREE: {
    1: "work",
    2: "asset",
    3: "dir",
  },
  SEQUENCE: {

  }
}

export default {
  components: { baseEditor },
  props: {
    workType: String,
    assetType: String,
    uuid: String
  },
  name: "work-edit",
  mounted () {
    // console.log(this.workType, this.assetType, this.uuid, this.$route.query)
  },
  setup () {

  },
  computed: {
    editorType () {
      console.log(this.workType, THREE)
      switch (this.workType) {
        case PANORAMA:
          return 'PanoramaEditor';
        case DESIGN:
          return "DesignEditor";
        case THREE:
          return "ThreeEditor";
        default:
          return 'PanoramaEditor';
      }
    },
  },
}
</script>
<style lang="sass" >
#footer
  .el-tabs
    --tw-bg-opacity: 1
    background-color: rgba(55, 65, 81, var(--tw-border-opacity))
    --tw-border-opacity: 1
    border-color: rgba(55, 65, 81, var(--tw-border-opacity))
    .el-tabs__header .is-top
      height: 2rem
      font-size: .5rem
      .el-tabs__item, .el-tabs__item:hover
        line-height: 2rem
        --tw-bg-opacity: 1
        background-color: rgba(55, 65, 81, var(--tw-bg-opacity))
      .el-tabs__item:hover
        --tw-bg-opacity: 1
        border-color: rgba(55, 65, 81, var(--tw-border-opacity))
        color: #ffffff
        border-bottom-color: #ffffff
      .is-active
        border-color: rgba(55, 65, 81, var(--tw-border-opacity))
        color: #ffffff
        border-bottom-color: #ffffff
      .el-tabs__nav-scroll
        --tw-bg-opacity: 1
        background-color: rgba(55, 65, 81, var(--tw-bg-opacity))
  .el-tab-pane
    font-size: .25rem
    color: var(--el-text-color-secondary)
</style>