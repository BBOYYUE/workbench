<template>
  <div class="my-3 mx-5 text-white">
    <el-scrollbar height="600px">
      <el-form label-position="top">
        <el-form-item label="分组名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="全景图">
          <el-image style="width: 210px; height: 105px"
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                    fit="fill" />
        </el-form-item>
        <el-form-item label="场景角度">
          <el-select>
            <el-option>默认角度</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="热点分组">
          <el-select>
            <el-option>交通配套</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="热点">
          <el-select>
            <el-option>项目地</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文字">

        </el-form-item>
        <el-form-item label="图片">

        </el-form-item>
      </el-form>
      <div class="border border-solid rounded-sm border-gray-700 text-center cursor-pointer h-10 flex flex-col justify-center"><span>快速保存</span></div>
    </el-scrollbar>
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