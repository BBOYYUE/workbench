<template>
  <el-dialog custom-class="text-left"
             v-model="fileSelectShow"
             title="选择文件"
             :before-close="handleClose"
             width="730px">
    <el-checkbox-group v-model="form.fileList"
                       v-if="type=='select'">
      <div class="flex flex-row w-full h-full flex-wrap overflow-y-auto"
           style="height: 400px">
        <div class="p-2 mx-1 my-2 shadow-inner"
             v-for="item in fileList"
             :key="item"
             style="height: 140px">
          <el-image class="border rounded-md"
                    style="width: 200px; height: 100px"
                    :src="getThumbPath(item.file_path)"
                    fit="cover"
                    v-if="['jpg','jpeg','png'].includes(item.extension)">
          </el-image>
          <component v-else
                     :is="fileIcon(item)"></component>
          <div class="flex flex-row">
            <el-checkbox>{{ item.source_name }}</el-checkbox>
          </div>
        </div>
      </div>
    </el-checkbox-group>
    <el-radio-group v-else
                    v-model="form.file_uuid">
      <div class="p-2 mx-1 my-2 shadow-inner"
           v-for="item in fileList"
           :key="item"
           style="height: 140px">
        <el-image class="border rounded-md"
                  style="width: 200px; height: 100px"
                  :src="getThumbPath(item.file_path)"
                  fit="cover"
                  v-if="['jpg','jpeg','png'].includes(item.extension)">
        </el-image>
        <component v-else
                   :is="fileIcon(item)"></component>
        <div class="flex flex-row">
          <el-radio :label="item.uuid">{{ item.source_name }}</el-radio>
        </div>
      </div>
    </el-radio-group>
    <template #footer>
      <el-button type="primary"
                 @click="handleClose">确认</el-button>
    </template>
  </el-dialog>
</template>
<script>
import UnKnownFile from "../../../components/icon/unKnownFile.vue"
import PngFile from "../../../components/icon/png.vue";
import JpgFile from "../../../components/icon/jpg.vue"
export default {
  props: { type: String },
  setup () {

  },
  components: { UnKnownFile, PngFile, JpgFile },
  computed: {
    fileList () {
      console.log(this.$store.state.editor.list.file_list)
      return this.$store.state.editor.list.file_list
    },
  },
  methods: {
    handleClose () {
      this.fileSelectShow = false
      let data
      if (this.type == 'select') {
        data = {
          fileList: this.form.fileList
        }
      } else if (this.type == 'radio') {
        data = {
          file_uuid: this.form.file_uuid
        }
      }
      this.$emit('save', data)
    },
    getThumbPath (filePath) {
      return "http://192.168.10.10:9000/alpha-api/" + filePath;
    },
    fileIcon (file) {
      switch (file.extension) {
        case 'jpg':
        case "jpeg":
          return 'JpgFile';
        case 'png':
          return 'PngFile'
        default:
          return 'UnKnownFile'
      }
    },
  },
  data () {
    return {
      fileSelectShow: false,
      form: {
        fileList: [],
        file_uuid: ""
      }
    }
  }
}
</script>