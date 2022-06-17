<template>
  <base-editor>
    <template v-slot:header>
      <div class="h-full flex flex-col justify-center">
        <div class="text-white text-lg ml-4">
          平面编辑器
          <span class="text-base">1.0.0</span>
        </div>
      </div>
    </template>
    <template v-slot:left></template>
    <template v-slot:content>
      <div class="w-full h-full flex flex-col"
           id="content">
        <div class="w-full h-full"
             style="overflow: hidden">
          <div id="prview"
               style="width: 100%; height: 100%; max-width: 100%; max-height:100%; overflow: hidden"></div>
        </div>
      </div>
    </template>
    <template v-slot:right-menu>
      <div class="w-full h-8 bg-gray-700 flex flex-row justify-between">
        <div class="flex flex-row">
          <div class="h-full flex flex-col justify-center mx-1">
            <div class="p-1 rounded-md text-gray-300"
                 style="font-size: 0.5rem"
                 @click="changeEditorType('visualization')">
              可视化编辑
            </div>
          </div>
          <div class="h-full flex flex-col justify-center mx-1">
            <div class="p-1 rounded-md text-gray-300"
                 style="font-size: 0.5rem"
                 @click="changeEditorType('text')">
              文本编辑
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:right>
      <div class="w-full h-full">
        <div v-show="editorType == 'visualization'"
             class="w-full h-full"></div>
        <div v-show="editorType == 'text'"
             class="w-full h-full">
          <vue-codemirror v-model="optionString"
                          @change="textChange"
                          :extensions="editorExtensions"></vue-codemirror>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="h-full w-full"
           id="footer">
        <el-tabs type="border-card"
                 class="h-full w-full">
          <el-tab-pane label="场景列表"
                       key="asset"
                       class="h-full w-full">
            <el-tabs :closable="true"
                     tabPosition="left"
                     @tab-remove="tabRemove"
                     class="h-full">
              <el-tab-pane label="默认分组"
                           key="defaultGroup"
                           class="h-full">
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="物体列表"
                       key="boxs"
                       class="h-full w-full">
            <el-tabs tabPosition="left"
                     @tab-remove="tabRemove"
                     class="h-full">
              <el-tab-pane label="当前场景物体"
                           key="now-boxs"
                           class="h-full">
              </el-tab-pane>
              <el-tab-pane label="所有物体"
                           key="all-boxs"
                           class="h-full">
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="贴图列表"
                       key="mtls"
                       class="h-full w-full">
            <el-tabs tabPosition="left"
                     @tab-remove="tabRemove"
                     class="h-full">
              <el-tab-pane label="当前场景贴图"
                           key="now-boxs"
                           class="h-full">
              </el-tab-pane>
              <el-tab-pane label="所有贴图"
                           key="all-boxs"
                           class="h-full">
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="文件列表"
                       key="files"
                       class="h-full w-full">
            <div class="w-24 h-20 text-center flex flex-col justify-between">
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务列表"
                       key="files"
                       class="h-full w-full">

          </el-tab-pane>
          <el-tab-pane label="上传列表"
                       key="upload"
                       class="h-full w-full">
            <el-scrollbar class="w-full h-full"
                          always>
              <el-upload class="w-full h-full"
                         :data="{uuid}"
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
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
  </base-editor>
</template>
<script>
import BaseEditor from "@/module/base-editor.vue";
export default {
  components: { BaseEditor },
  setup () {

  },
  computed: {
    access_token () {
      return this.$store.state.auth.access_token
    }
  },
}
</script>