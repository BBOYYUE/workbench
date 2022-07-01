<template>
  <div id="footer-menu">
    <el-tabs type="border-card"
             class="m-h-full m-w-full">
      <el-tab-pane label="场景分组"
                   key="sceneGroups"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="场景列表"
                   key="scenes"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="物体列表"
                   key="boxs"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="光源列表"
                   key="lights"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="相机列表"
                   key="lights"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="控制器列表"
                   key="lights"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="天空球列表"
                   key="lights"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="地面列表"
                   key="mtls"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="材质列表"
                   key="mtls"
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
export default {
  components: {
    FooterUploadFile, FooterFileList
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
  watch: {
  }
}
</script>