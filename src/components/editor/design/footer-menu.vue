<template>
  <div id="footer-menu">
    <el-tabs type="border-card"
             class="m-h-full m-w-full">
      <el-tab-pane label="页面组列表"
                   key="groups"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="页面列表"
                   key="pages"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="图层列表"
                   key="layers"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="文字列表"
                   key="videos"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="切图列表"
                   key="imgs"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="视频列表"
                   key="videos"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="事件列表"
                   key="events"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="文件列表"
                   key="files"
                   class="h-full w-full">
        <footer-file-list></footer-file-list>
      </el-tab-pane>
      <el-tab-pane label="任务列表"
                   key="tasks"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="上传列表"
                   key="uploads"
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
}
</script>