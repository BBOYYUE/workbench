<template>
  <div id="footer-menu">
    <el-tabs type="border-card"
             class="m-h-full m-w-full">
      <el-tab-pane label="场景分组列表"
                   key="sceneGroups"
                   class="h-full w-full">
        <el-tabs tab-position="left">
          <el-tab-pane label="所有场景"
                       key="allSceneGroup"></el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="场景列表"
                   key="scene"
                   class="h-full w-full flex flex-row">
        <footer-scene-list></footer-scene-list>
      </el-tab-pane>
      <el-tab-pane label="小地图列表"
                   key="maps"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="热点分组列表"
                   key="hotspotGroups"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="热点列表"
                   key="hotspots"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="标牌列表"
                   key="flags"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="文字列表"
                   key="texts"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="图片列表"
                   key="imgs"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="场景角度列表"
                   key="imgs"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="后期效果列表"
                   key="imgs"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="事件列表"
                   key="imgs"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="文件列表"
                   key="files"
                   class="h-full w-full flex flex-row">
        <footer-file-list></footer-file-list>
      </el-tab-pane>
      <el-tab-pane label="任务列表"
                   key="files"
                   class="h-full w-full">
        <footer-task-list :uuid="uuid"></footer-task-list>
      </el-tab-pane>
      <el-tab-pane label="上传列表"
                   key="upload"
                   class="h-full w-full">
        <footer-upload-file :uuid="uuid"></footer-upload-file>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import FooterUploadFile from "../../../components/editor/common/footer-upload-file.vue";
import FooterFileList from "../../../components/editor/common/footer-file-list.vue"
import FooterSceneList from '../common/footer-scene-list.vue';
import FooterTaskList from "../common/footer-task-list.vue";

export default {
  components: {
    FooterUploadFile, FooterFileList, FooterSceneList, FooterTaskList
  },
  setup () {

  },
  props: { uuid: String },
  computed: {
    access_token () {
      return this.$store.state.auth.access_token;
    },
  },
  data () {
    return {
    }
  },
}
</script>