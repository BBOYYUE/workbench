<template>
  <el-scrollbar height="150px"
                always>
    <el-upload :data="{uuid}"
               :headers="{
                          Authorization: 'Bearer ' + access_token
                         }"
               action="
                         http://192.168.10.10/api/v2/filesystems"
               multiple
               drag>
      <el-icon class="el-icon--upload">
        <upload-filled />
      </el-icon>
      <div class="el-upload__text">
        拖到这里或者 <em>点击上传</em>
      </div>
    </el-upload>
  </el-scrollbar>
</template>
<script>
export default {
  props: { uuid: String },
  computed: {
    access_token () {
      return this.$store.state.auth.access_token;
    },
  }
}
</script>