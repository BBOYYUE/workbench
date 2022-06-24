<template>
  <div class="my-3 mx-5 text-white">
    <el-scrollbar height="600px">
      <el-form label-position="top">
        <el-form-item label="分组名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="分组样式">
          <el-input v-model="form.style"></el-input>
        </el-form-item>
        <el-form-item label="小地图">
          <el-image style="width: 216px; height: 279px"
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                    fit="fill" />
        </el-form-item>
        <el-form-item label="场景列表">
          <div class="flex flex-col space-y-2 w-full shadow-inner border border-solid rounded-sm border-gray-800 bg-gray-800 px-4 py-2">
            <el-scrollbar height="160px">
              <draggable :list="list">
                <div class="flex flex-row justify-between w-full"
                     v-for="item  in list"
                     :key="item">
                  <div>
                    <span class="text-xs cursor-move">场景 {{item}}</span>
                  </div>
                  <div class="flex flex-col justify-center">
                    <div class="text-xs">
                      <el-button type="danger"
                                 size="small"
                                 circle>
                        <el-icon>
                          <Delete />
                        </el-icon>
                      </el-button>
                    </div>
                  </div>
                </div>
              </draggable>
            </el-scrollbar>
            <div>
              <div class="border border-solid rounded-sm border-gray-700 text-center cursor-pointer">添加场景</div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="是否展示">
          <el-switch v-model="form.isShow" />
        </el-form-item>
      </el-form>
      <div class="border border-solid rounded-sm border-gray-700 text-center cursor-pointer h-10 flex flex-col justify-center"><span>快速保存</span></div>
    </el-scrollbar>
  </div>
</template>
<script>
import { Delete } from '@element-plus/icons-vue'
// import VueGridLayout from 'vue3-grid-layout';
import { VueDraggableNext } from 'vue-draggable-next'
export default {
  components: {
    Delete,
    draggable: VueDraggableNext,
  },
  setup () {

  },
  data () {
    return {
      form: {
        name: "",
        style: "",
        isShow: ""
      },
      list: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10
      ]

    }
  }
}
</script>