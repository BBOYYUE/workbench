<template>
  <div class="my-3 mx-5">
    <el-form label-position="top">
      <el-form-item label="作品名称"
                    class="text-white">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="作品简介"
                    class="text-white">
        <el-input v-model="info"></el-input>
      </el-form-item>
    </el-form>
    <div class="border border-solid rounded-sm border-gray-700 text-center cursor-pointer h-10 flex flex-col justify-center text-white"><span>快速保存</span></div>
  </div>
</template>
<script>
export default {
  setup () {

  },
  data () {
    return {
      name: "",
      info: ""
    }
  }
}
</script>