<template>
  <base-editor>
    <template v-slot:header>
      <div class="h-full flex flex-col justify-center">
        <div class="text-white text-lg ml-4">
          模型编辑器
          <span class="text-base">1.0.0</span>
        </div>
      </div>
    </template>
    <template v-slot:left>
      <left-menu @change="leftMenuItemChange"></left-menu>
    </template>
    <template v-slot:content>
      <div id="content"
           class="w-full h-full">
        <div id="prview"
             v-show="editorType == 'view'"
             style="width: 100%; height: 100%; overflow: hidden"></div>
        <div v-show="editorType == 'text'"
             style="width: 100%; height: 100%; overflow: hidden">
          <vue-codemirror v-model="optionString"
                          @change="textChange"
                          :extensions="editorExtensions"></vue-codemirror>
        </div>
      </div>
    </template>
    <template v-slot:content-menu>
      <content-menu @change="contentMenuItemChange"></content-menu>
    </template>
    <template v-slot:right>
      <div class="w-full h-full">
        <div class="w-full h-full">
          <right-form :active="leftMenuItemActive"></right-form>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <footer-menu></footer-menu>
    </template>
  </base-editor>
</template>
<script>

import BaseEditor from "@/module/base-editor.vue";
import LeftMenu from './left-menu.vue';
import JsonFormatter from "json-string-formatter";
import threejs from "@/util/mock/three"
import SceneUtil from "@/util/three/util"
import FooterMenu from './footer-menu.vue';
import ContentMenu from "./content-menu.vue"
export default {
  setup () {

  },
  data () {
    return {
      editorType: "",
      leftMenuItemActive: ""
    }
  },
  components: { BaseEditor, LeftMenu, FooterMenu, ContentMenu },
  computed: {
    access_token () {
      return this.$store.state.auth.access_token
    }
  },
  mounted () {
    this.option = threejs
    window.addEventListener('contentResize', onResize, false);
    this.optionString = JsonFormatter.format(JSON.stringify(this.option))
    this.editorType = 'view'
    let el = document.getElementById("prview")
    let scene = new SceneUtil(el);
    scene.__init()
    function render () {
      requestAnimationFrame(render);
      scene.renderer.render(scene.scene, scene.camera);
      scene.ctrl.update()
    }
    function onResize () {
      scene.renderer.setSize(el.offsetWidth, el.offsetHeight);
      scene.renderer.render(scene.scene, scene.camera)
    }
    render();
  },
  methods: {
    leftMenuItemChange (item) {
      this.leftMenuItemActive = item
    },
    contentMenuItemChange (item) {
      this.editorType = item
    },
  }
}

</script>