<template>
  <base-editor>
    <template v-slot:header>
      <div class="h-full flex flex-col justify-center">
        <div class="flex flex-row justify-between">
          <div class="text-white text-lg ml-4">
            全景编辑器
            <span class="text-base">3.0.0</span>
          </div>
          <div class="mr-4 flex flex-col justify-center">
            <el-dropdown>
              <el-icon style="color: white">
                <MoreFilled />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    @click="this.$router.push('/taskList?uuid=' + uuid)"
                  >
                    任务队列
                  </el-dropdown-item>
                  <el-dropdown-item
                    @click="this.$router.push('/uploadList?uuid=' + uuid)"
                  >
                    文件列表
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:left>
      <left-menu @change="leftMenuItemChange" />
    </template>
    <template v-slot:content>
      <div id="content" class="w-full h-full">
        <div
          id="prview"
          v-show="editorType == 'view'"
          @mousedown="mouseDown"
          @mouseup="mouseUp"
          @click="mouseClick"
          style="width: 100%; height: 100%; overflow: hidden"
        ></div>
        <div
          v-show="editorType == 'text'"
          style="width: 100%; height: 100%; overflow: hidden"
        >
          <vue-codemirror
            v-model="optionString"
            @change="textChange"
            :extensions="editorExtensions"
          ></vue-codemirror>
        </div>
      </div>
    </template>
    <template v-slot:content-menu>
      <content-menu @change="contentMenuItemChange"></content-menu>
    </template>
    <template v-slot:right>
      <div class="w-full h-full">
        <div class="w-full h-full" id="right-form">
          <right-form :active="leftMenuItemActive" :uuid="uuid"></right-form>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <footer-menu :uuid="uuid"></footer-menu>
    </template>
  </base-editor>
</template>
<script>
/* eslint-disable */
import BaseEditor from "@/module/base-editor.vue";
import LeftMenu from "./left-menu.vue";
import panorama from "@/util/mock/panorama";
import JsonFormatter from "json-string-formatter";
import UnKnownFile from "@/components/icon/unKnownFile.vue";
import FooterMenu from "./footer-menu.vue";
import ContentMenu from "./content-menu.vue";
import RightForm from "./right-form.vue";
import krpanoUtil from "../../../util/krpano/util";

export default {
  props: {
    uuid: String,
  },
  components: {
    LeftMenu,
    BaseEditor,
    UnKnownFile,
    FooterMenu,
    ContentMenu,
    RightForm,
  },
  data() {
    return {
      optionString: "",

      /**
       * 编辑器类型
       */
      editorType: "",
      /**
       * 左侧菜单选中项
       */
      leftMenuItemActive: "",

      /**
       * 资源列表
       */
    };
  },
  computed: {
    access_token() {
      return this.$store.state.auth.access_token;
    },
  },
  methods: {
    leftMenuItemChange(item) {
      if (item === "infomation-4") {
        let event = new Event("reSetEditerWindowSize");
        event.data = {
          layout: "right",
          type: "maxWidth",
        };
        window.dispatchEvent(event);
      } else {
        let event = new Event("reSetEditerWindowSize");
        event.data = {
          layout: "content",
          type: "maxWidth",
        };
        window.dispatchEvent(event);
      }
      this.leftMenuItemActive = item;
    },
    contentMenuItemChange(item) {
      this.editorType = item;
    },
    textChange(val) {
      val;
    },
    KrpanoReady(prview) {
      prview;
      console.log("krpano 就绪");
    },
    mouseDown(event) {
      event;
      console.log("鼠标长按");
    },
    mouseClick(event) {
      event;
      console.log("鼠标点击");
    },
    mouseUp(event) {
      event;
      console.log("鼠标放开");
    },
  },
  watch: {},
  mounted() {
    this.option = panorama;
    this.optionString = JsonFormatter.format(JSON.stringify(this.option));
    this.editorType = "view";
    embedpano({
      swf: "./krpano/tour.swf",
      xml: "./krpano/test.xml",
      target: "prview",
      html5: "auto",
      mobilescale: 1.0,
      passQueryParameters: true,
      onready: this.KrpanoReady,
      // initvars: { xmlPath: './test.xml' },
      consolelog: true,
    });
  },
};
</script>