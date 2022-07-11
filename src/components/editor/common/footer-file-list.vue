<template>
  <div class="m-2">
    <el-table :data="fileList" style="width: 100%">
      <el-table-column type="index" label="序号" width="180" />
      <el-table-column width="180" label="图标">
        <template #default="scope">
          <component :is="fileIcon(scope.row)" class="w-10 h-10"></component>
        </template>
      </el-table-column>
      <el-table-column width="90" label="预览">
        <template #default="scope">
          <el-image
            z-index="999"
            :src="getThumbPath(scope.row.file_path)"
            v-show="
              scope.row.extension == 'jpg' || scope.row.extension == 'png'
            "
          >
            <template #viewer>
              <el-image-viewer
                :url-List="[getThumbPath(scope.row.file_path)]"
                :z-index="999"
              ></el-image-viewer>
            </template>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="source_name" label="文件名称" width="180" />
      <el-table-column prop="extension" label="文件类型" />
      <el-table-column prop="filesize" label="文件大小" />
      <!-- <el-table-column prop="filesize" label="文件大小" /> -->
    </el-table>
    <!-- <div class="flex flex-row">
    <div
      class="w-24 h-16 text-center flex flex-col justify-between m-2"
      v-for="file in fileList"
      :key="file"
    >
      <div class="text-center">
        <component :is="fileIcon(file)" class="w-10 h-10"></component>
      </div>
      <div class="overflow-clip">{{ file.source_name }}</div>
    </div>
  </div> -->
  </div>
</template>
<script>
import UnKnownFile from "../../../components/icon/unKnownFile.vue";
import PngFile from "../../../components/icon/png.vue";
import JpgFile from "../../../components/icon/jpg.vue";
import * as MutationType from "@/MutationType";

export default {
  props: {
    uuid: String,
  },
  mounted() {
    this.getFileList();
  },
  setup() {},
  components: { UnKnownFile, PngFile, JpgFile },
  computed: {
    list() {
      return this.$store.state.editor.list;
    },
    fileList() {
      return this.list ? this.list.file_list : [];
    },
  },
  methods: {
    getThumbPath(filePath) {
      return "http://192.168.10.10:9000/alpha-api/" + filePath;
    },
    getFileList() {
      this.$store.dispatch("editor/" + [MutationType.GET_LIST], {
        uuid: this.uuid,
      });
    },
    fileIcon(file) {
      switch (file.extension) {
        case "jpg":
        case "jpeg":
          return "JpgFile";
        case "png":
          return "PngFile";
        default:
          return "UnKnownFile";
      }
    },
  },
};
</script>