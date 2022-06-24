<template>
  <div id="footer-menu">
    <el-tabs type="border-card"
             class="m-h-full m-w-full">
      <el-tab-pane label="场景分组列表"
                   key="sceneGroups"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="场景列表"
                   key="scene"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="小地图列表"
                   key="maps"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="热点分组列表"
                   key="hotspotGroups"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="热点列表"
                   key="hotspots"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="标牌列表"
                   key="flags"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="文字列表"
                   key="texts"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="图片列表"
                   key="imgs"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="场景角度列表"
                   key="imgs"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="后期效果列表"
                   key="imgs"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="事件列表"
                   key="imgs"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="文件列表"
                   key="files"
                   class="h-full w-full">
        <div class="w-24 h-20 text-center flex flex-col justify-between">
          <div class="text-center">
            <un-known-file class="w-12 h-12"></un-known-file>
          </div>
          <div class="overflow-clip">区域鸟瞰.jpg</div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="任务列表"
                   key="files"
                   class="h-full w-full">

      </el-tab-pane>
      <el-tab-pane label="上传列表"
                   key="upload"
                   class="h-full w-full">
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  components: {

  },
  setup () {

  },
  data () {
    return {
      layout: [
        { "x": 0, "y": 0, "w": 1, "h": 1, "i": "0" },
        { "x": 1, "y": 0, "w": 1, "h": 1, "i": "1" },
        { "x": 2, "y": 0, "w": 1, "h": 1, "i": "2" },
      ],
    }
  }
}
</script>