<template>
  <base-layout>
    <template v-slot:header>
      <div class="h-full flex flex-col justify-center">
        <div class="h-16 w-80">
          <div
            class="
              text-3xl
              italic
              inline-block
              align-middle
              text-md text-white
              pl-6
            "
          >
            <el-icon
              class="inline-block align-top relative right-2 cursor-pointer"
              @click="this.$router.go(-1)"
            >
              <Back />
            </el-icon>
            文件管理
            <span class="text-sm not-italic"> 2.0.0</span>
          </div>
          <div class="inline-block align-middle h-full w-0"></div>
        </div>
      </div>
    </template>
    <template v-slot:left-menu>
      <el-menu>
        <el-menu-item :index="'1'" @click="this.activeMenuItem = 'fileList'">
          <el-icon><List /></el-icon>
          <template #title>文件列表</template>
        </el-menu-item>
        <el-menu-item :index="'2'" @click="this.activeMenuItem = 'fileUpload'">
          <el-icon><Upload /></el-icon>
          <template #title>文件上传</template>
        </el-menu-item>
      </el-menu>
    </template>
    <template v-slot:body>
      <footer-file-list
        :uuid="uuid"
        v-show="activeMenuItem == 'fileList'"
      ></footer-file-list>
      <footer-upload-file
        :uuid="uuid"
        v-show="activeMenuItem == 'fileUpload'"
      ></footer-upload-file>
    </template>
  </base-layout>
</template>
<script>
import BaseLayout from "@/components/layout/base-layout.vue";
import FooterFileList from "@/components/editor/common/footer-file-list.vue";
import FooterUploadFile from "@/components/editor/common/footer-upload-file.vue";
export default {
  props: { uuid: String },
  components: { BaseLayout, FooterFileList, FooterUploadFile },
  setup() {},
  data() {
    return { activeMenuItem: "fileList" };
  },
};
</script>