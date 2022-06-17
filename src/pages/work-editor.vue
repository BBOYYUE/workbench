<template>
  <div>
    <component :is="editComponent"></component>
  </div>
</template>
<script>
/**
 * 编辑器操作逻辑...
 * 上传文件 -> 文件分组 -> 分析文件 -> 生成配置json -> 修改配置项 -> 更新配置文件
 *
 * 1. 文件上传页面, 展示文件列表, 单张全景图为一个资源, 需要一个分组功能,
 * 2. 编辑页面, 可视化编辑器 和 json 编辑器
 */
import { mapState } from "vuex";
import * as MutationType from "../MutationType";
import "./work-editor.scss";
import PanoramaEditor from "@/components/editor/panorama/panorama-editor"
import ThreeEditor from "@/components/editor/three/three-editor"
import DesignEditor from "@/components/editor/design/design-editor"
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
    PanoramaEditor,
    ThreeEditor,
    DesignEditor
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
    editComponent () {
      switch (this.workType) {
        case "1":
          return 'panorama-editor';
        case "2":
          return 'design-editor';
        case "3":
          return 'three-editor';
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
