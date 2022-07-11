<template>
  <div>
    <el-scrollbar always>
      <div class="p-3">
        <el-upload
          class="w-full"
          :data="{ uuid }"
          multiple
          drag
          :headers="{
            Authorization: 'Bearer ' + access_token,
          }"
          action="http://192.168.10.10/api/v2/filesystems"
        >
          <el-icon class="el-icon--upload">
            <upload-filled />
          </el-icon>
          <div class="el-upload__text block">
            拖到这里或者 <em>点击上传</em>
          </div>
        </el-upload>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  props: { uuid: String },
  computed: {
    access_token() {
      return this.$store.state.auth.access_token;
    },
  },
};
</script>
<style lang="sass" scoped>
.el-upload
  &-dragger
    width: 100%
</style>