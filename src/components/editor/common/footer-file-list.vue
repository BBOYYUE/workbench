<template>
  <div class="w-24 h-16 text-center flex flex-col justify-between"
       v-for="file in fileList"
       :key="file">
    <div class="text-center">
      <component :is="fileIcon(file)"
                 class="w-10 h-10"></component>
    </div>
    <div class="overflow-clip">{{ file.source_name }}</div>
  </div>
</template>
<script>
import UnKnownFile from "../../../components/icon/unKnownFile.vue"
import PngFile from "../../../components/icon/png.vue";
import JpgFile from "../../../components/icon/jpg.vue"

export default {
  setup () {
  },
  components: { UnKnownFile, PngFile, JpgFile },
  computed: {
    list () {
      return this.$store.state.editor.list
    },
    fileList () {
      return this.list ? this.list.file_list : []
    }
  },
  methods: {
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
    }
  },
}
</script>