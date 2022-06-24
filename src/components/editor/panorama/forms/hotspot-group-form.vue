<template>
  <div class="my-3 mx-5">
    <el-form label-position="top">
      <el-form-item label="分组名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="分组样式">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="是否展示">

      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  setup () {

  },
  data () {
    return {
      form: {
        name: ""
      }
    }
  }
}
</script>