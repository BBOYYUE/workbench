<template>
  <base-editor>
    <template v-slot:header>
      <div class="h-full flex flex-col justify-center">
        <div class="text-white text-lg ml-4"
             v-show="this.activeModule">
          {{ moduleName }}
          <span class="text-base">{{ moduleVersion }}</span>
        </div>
      </div>
    </template>
    <template v-slot:left>
      <div class="h-full w-full  overflow-hidden"
           id="left">
        <el-menu>
          <el-sub-menu :index="item.name"
                       v-for="(item, x) in moduleEditor.actions"
                       :key="item">
            <template #title>
              <span>{{ item.alias }}</span>
            </template>
            <el-menu-item :index="x + '-' + y"
                          v-for="(action, y) in item.actions"
                          :key="action"
                          @click="setActiveAction(action)">{{ action.alias }}</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
    </template>
    <template v-slot:content>
      <div class="w-full h-full flex flex-col"
           id="content">
        <div class="w-full h-8 bg-gray-700 flex flex-row justify-end">
          <div v-for="item in this.moduleContent.actions"
               :key="item"
               class="h-full flex flex-col justify-center mx-1">
            <div class="p-1 rounded-md text-gray-500"
                 style="font-size: 0.5rem"
                 @click="setActiveContent(item)"
                 :class="
                                activeContent.name == item.name
                                    ? 'text-gray-300'
                                    : 'text-gray-500'
                            ">
              {{ item.alias }}
            </div>
          </div>
        </div>
        <div v-show="activeContent.name === 'textEditor'">
          <vue-codemirror v-model="code" />
        </div>
        <div v-show="activeContent.name === 'visualizationEditor'">
          <visualizationEditor></visualizationEditor>
        </div>
        <div v-show="activeContent.name === 'preview'">
          <preview></preview>
        </div>
      </div>
    </template>
    <template v-slot:right>
      <div v-show="activeAction"
           class="flex flex-wrap p-2  text-white w-72">
        <div v-for="form in moduleEditorForm[activeAction.name]"
             :key="form"
             class="w-11/12 m-2 text-white">
          <el-form label-position="top">
            <el-button v-if="form.type == 'buttonText'">{{form.alias}}</el-button>
            <el-form-item :label="form.alias"
                          v-if="form.type == 'slider'">
              <el-slider :range="form.range"
                         v-if="form.range"
                         :min="form.min"
                         :max="form.max"></el-slider>
              <el-slider v-else></el-slider>
            </el-form-item>
            <el-form-item :label="form.alias"
                          v-if="form.type == 'text'">
              <el-input></el-input>
            </el-form-item>
            <el-form-item :label="form.alias"
                          v-if="form.type == 'select'">
              <el-select>
                <el-option />
              </el-select>
            </el-form-item>
            <el-form-item :label="form.alias"
                          v-if="form.type == 'checkbox'">
              <el-checkbox></el-checkbox>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="h-full w-full"
           id="footer">
        <el-tabs type="border-card"
                 class="h-full w-full">
          <el-tab-pane label="资源列表"
                       key="asset"
                       class="h-full">
            <el-tabs :closable="true"
                     tabPosition="left"
                     @tab-remove="tabRemove"
                     class="h-full">
              <el-tab-pane label="默认分组"
                           key="defaultGroup"
                           class="h-full">
                <el-tabs type="border-card"
                         class="h-full">
                  <el-tab-pane :label="action.alias"
                               v-for="action in moduleFooter.actions"
                               :key="action"
                               class="h-full">
                    <grid-layout v-model:layout="layout"
                                 :col-num="12"
                                 :row-height="30"
                                 :is-draggable="true"
                                 :is-resizable="true"
                                 :is-mirrored="false"
                                 :vertical-compact="true"
                                 :margin="[10, 10]"
                                 :use-css-transforms="true">

                      <grid-item v-for="item in layout"
                                 :x="item.x"
                                 :y="item.y"
                                 :w="item.w"
                                 :h="item.h"
                                 :i="item.i"
                                 :key="item.i">
                        {{item.i}}
                      </grid-item>
                    </grid-layout>
                  </el-tab-pane>
                </el-tabs>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="文件列表"
                       key="files"
                       class="h-full w-full flex flex-row flex-wrap space-x-2">
            <div class="w-24 h-20 text-center flex flex-col justify-between">
              <div class="text-center">
                <un-known-file class="w-12 h-12"></un-known-file>
              </div>
              <div class="overflow-clip">区域鸟瞰.jpg</div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="上传列表"
                       key="files"
                       class="h-full w-full">
            <el-upload class="w-full h-full"
                       action="https://jsonplaceholder.typicode.com/posts/"
                       multiple
                       drag>
              <el-icon class="el-icon--upload">
                <upload-filled />
              </el-icon>
              <div class="el-upload__text">
                拖到这里或者 <em>点击上传</em>
              </div>
            </el-upload>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
  </base-editor>
</template>
<script>
/**
 * 编辑器操作逻辑...
 * 上传文件 -> 文件分组 -> 分析文件 -> 生成配置json -> 修改配置项 -> 更新配置文件
 *
 * 1. 文件上传页面, 展示文件列表, 单张全景图为一个资源, 需要一个分组功能,
 * 2. 编辑页面, 可视化编辑器 和 json 编辑器
 */
import baseEditor from "@/module/base-editor.vue";
import { mapState } from "vuex";
import * as MutationType from "../MutationType";
import "./work-editor.scss";
import UnKnownFile from '@/components/icon/unKnownFile.vue';
import { GridLayout, GridItem } from 'vue-grid-layout';
// import { normalize, schema } from 'normalizr'

// let forms = new schema.Entity('forms')
// let action = new schema.Entity('action', {
//   forms: [forms]
// })
// let actions = new schema.Array(action)
// actions.define({ actions })
// let editor = new schema.Entity('editor', {
//   actions: [actions],
//   forms: [forms]
// })


export default {
  components: {
    baseEditor,
    UnKnownFile,
    GridLayout,
    GridItem
  },
  props: {
    workType: String,
    assetType: String,
    uuid: String,
  },
  data () {
    return {
      activeAction: {},
      activeContent: {},
      code: "",
      editorData: {},
      layout: [
        { "x": 0, "y": 0, "w": 2, "h": 2, "i": "0" },
        { "x": 2, "y": 0, "w": 2, "h": 4, "i": "1" },
        { "x": 4, "y": 0, "w": 2, "h": 5, "i": "2" },
        { "x": 6, "y": 0, "w": 2, "h": 3, "i": "3" },
        { "x": 8, "y": 0, "w": 2, "h": 3, "i": "4" },
        { "x": 10, "y": 0, "w": 2, "h": 3, "i": "5" },
        { "x": 0, "y": 5, "w": 2, "h": 5, "i": "6" },
        { "x": 2, "y": 5, "w": 2, "h": 5, "i": "7" },
        { "x": 4, "y": 5, "w": 2, "h": 5, "i": "8" },
        { "x": 6, "y": 3, "w": 2, "h": 4, "i": "9" },
        { "x": 8, "y": 4, "w": 2, "h": 4, "i": "10" },
        { "x": 10, "y": 4, "w": 2, "h": 4, "i": "11" },
        { "x": 0, "y": 10, "w": 2, "h": 5, "i": "12" },
        { "x": 2, "y": 10, "w": 2, "h": 5, "i": "13" },
        { "x": 4, "y": 8, "w": 2, "h": 4, "i": "14" },
        { "x": 6, "y": 8, "w": 2, "h": 4, "i": "15" },
        { "x": 8, "y": 10, "w": 2, "h": 5, "i": "16" },
        { "x": 10, "y": 4, "w": 2, "h": 2, "i": "17" },
        { "x": 0, "y": 9, "w": 2, "h": 3, "i": "18" },
        { "x": 2, "y": 6, "w": 2, "h": 2, "i": "19" }
      ],
    };
  },
  computed: mapState({
    option: (state) => state.option.option,
    page: (state) => state.option.page[2],
    module: (state) => state.option.module,
    activeModule () {
      switch (this.workType) {
        case "1":
          return this.module[12];
        case "2":
          return this.module[11];
        case "3":
          return this.module[13];
      }
    },
    moduleName () {
      return this.activeModule ? this.activeModule.name : "";
    },
    moduleVersion () {
      return this.activeModule ? this.activeModule.version : "";
    },
    moduleContent () {
      return this.activeModule
        ? this.activeModule.content
        : { actions: [] };
    },
    moduleEditorForm () {
      let data = {}
      for (let item in this.moduleEditor.actions) {
        let action = this.moduleEditor.actions[item]
        data[action.name] = {}
        console.log(action)
        for (let index in action.actions) {
          let forms = action.actions[index]
          console.log(forms)
          data[action.name][forms.name] = forms.forms
          data[forms.name] = forms.forms
        }
      }
      return data
    },
    moduleEditor () {
      return this.activeModule
        ? this.activeModule.editor
        : { actions: [] };
    },
    moduleFooter () {
      return this.activeModule
        ? this.activeModule.footer
        : { actions: [] };
    },
  }),
  methods: {
    setActiveAction (action) {
      this.activeAction = action;
    },
    setActiveContent (action) {
      this.activeContent = action;
      console.log(this.activeContent);
    },
    getFormComponenet (form) {
      switch (form.type) {
        case 'text':
          return 'el-input'
        case 'bottonText':
          return 'el-button'
      }
    },
    tabRemove () { },
    tabAdd () { },
    authGates () {
      let user = localStorage.getItem("user");
      if (user && user != "undefined" && Object.keys(user).length > 0) {
        let auth = JSON.parse(user);
        this.$store.commit(
          "auth/" + MutationType.SET_ACCESS_TOKEN,
          auth.access_token
        );
        this.$store.dispatch(
          "auth/" + MutationType.AUTHENTICATION_UPDATE
        );
        this.$store.commit("setFetching", false);
      } else {
        this.$message.error("登陆失效!");
        this.$router.push("login");
      }
    },
  },
  name: "work-edit",
  mounted () {
    let entities = this.$store.getters["option/entities"];
    this.$store.commit("option/" + [MutationType.SET_MORE], {
      type: "module",
      value: entities.module,
    });
    this.$store.commit("option/" + [MutationType.SET_MORE], {
      type: "page",
      value: entities.page,
    });
    this.$store.commit("option/" + [MutationType.SET_MORE], {
      type: "option",
      value: entities.option,
    });
    this.$store.dispatch("dictionary/getDictionary");
    this.authGates();
  },
  watch: {
    activeAction (val) {
      console.log(val)
    }
  },
  setup () { },
};
</script>
