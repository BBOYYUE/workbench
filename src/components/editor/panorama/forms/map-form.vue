<template>
  <div class="my-3 mx-5 text-white">
    <el-scrollbar height="600px">
      <el-form label-position="top">
        <el-form-item label="小地图名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="小地图">
          <el-image style="width: 216px; height: 279px"
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                    fit="fill" />
        </el-form-item>
        <el-form-item label="小地图点位">
          <div class="w-full shadow-inner border border-solid rounded-sm border-gray-800 bg-gray-800 px-4 py-2">
            <el-scrollbar height="160px">
              <draggable :list="list">
                <div class="flex flex-col divide-y  divide-white divide-solid">
                  <div v-for="item in list"
                       :key="item"
                       class="py-2">
                    <el-form label-position="left"
                             :inline="true">
                      <el-form-item label="x">
                        <el-input></el-input>
                      </el-form-item>
                      <el-form-item label="y">
                        <el-input></el-input>
                      </el-form-item>
                      <el-form-item label="初始角度">
                        <el-input></el-input>
                      </el-form-item>
                      <el-button type="danger">
                        <el-icon>
                          <Delete />
                        </el-icon>
                        &nbsp;删除
                      </el-button>
                    </el-form>
                  </div>
                </div>
              </draggable>
            </el-scrollbar>
            <div>
              <div class="border border-solid rounded-sm border-gray-700 text-center cursor-pointer">添加地图点位</div>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div class="border border-solid rounded-sm border-gray-700 text-center cursor-pointer h-10 flex flex-col justify-center"><span>快速保存</span></div>
    </el-scrollbar>
  </div>
</template>
<script>
import { Delete } from '@element-plus/icons-vue'
import { VueDraggableNext } from 'vue-draggable-next'
export default {
  setup () {

  },
  data () {
    return {
      form: {},
      list: [0]
    }
  },
  components: {
    Delete,
    draggable: VueDraggableNext,
  },
}
</script>