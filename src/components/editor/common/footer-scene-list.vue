<template>
  <div class="w-24 h-16 text-center flex flex-col justify-between"
       v-for="scene in sceneList"
       :key="scene">
    <div class="text-center">
      <el-image class="border rounded-sm w-20 h-10"
                :src="getThumbPath(scene.thumb)"
                fit="cover"></el-image>
    </div>
    <div class="overflow-clip">{{ scene.name }}
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    list () {
      return this.$store.state.editor.list
    },
    sceneList () {
      return this.list ? this.list.scene_list : []
    }
  },
  methods: {
    getThumbPath (filePath) {
      return "http://192.168.10.10:9000/alpha-api/" + filePath;
    },
  },
  watch: {
    sceneList (val) {
      console.log(val);
    }
  }
}
</script>