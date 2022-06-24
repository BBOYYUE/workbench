<template>
  <div id="footer-menu">
    <el-tabs type="border-card"
             class="m-h-full m-w-full">
      <el-tab-pane label="场景列表"
                   key="asset"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="物体列表"
                   key="boxs"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="光源列表"
                   key="lights"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="相机列表"
                   key="lights"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="控制器列表"
                   key="lights"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="天空球列表"
                   key="lights"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="地面列表"
                   key="mtls"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="材质列表"
                   key="mtls"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="文件列表"
                   key="files"
                   class="h-full w-full">
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