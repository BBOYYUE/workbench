<template>
  <div id="footer-menu">
    <el-tabs type="border-card"
             class="m-h-full m-w-full">
      <el-tab-pane label="页面组列表"
                   key="groups"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="页面列表"
                   key="pages"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="图层列表"
                   key="layers"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="文字列表"
                   key="videos"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="切图列表"
                   key="imgs"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="视频列表"
                   key="videos"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="事件列表"
                   key="events"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="文件列表"
                   key="files"
                   class="h-full w-full">
        <div class="w-24 h-20 text-center flex flex-col justify-between">
        </div>
      </el-tab-pane>
      <el-tab-pane label="任务列表"
                   key="tasks"
                   class="h-full w-full">
      </el-tab-pane>
      <el-tab-pane label="上传列表"
                   key="uploads"
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