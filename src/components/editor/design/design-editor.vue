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
    <template v-slot:left>
      <left-menu @change="leftMenuItemChange"></left-menu>
    </template>
    <template v-slot:content>
      <div id="content"
           class="w-full h-full">
        <div id="prview"
             class="bg-white"
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
import LeftMenu from '../design/left-menu.vue';
import FooterMenu from "./footer-menu.vue";
import ContentMenu from "./content-menu.vue"
import RightForm from "./right-form.vue"
export default {
  components: { BaseEditor, LeftMenu, FooterMenu, ContentMenu, RightForm },
  setup () {

  },
  mounted () {
    this.editorType = 'view'
  },
  data () {
    return {
      option: {},
      optionString: "",
      editorType: "",
      leftMenuItemActive: ""
    }
  },
  methods: {
    leftMenuItemChange (item) {
      this.leftMenuItemActive = item
    },
    contentMenuItemChange (item) {
      this.editorType = item
    },
    textChange (val) {
      val
    },
    prviewReady (prview) {
      prview
    }
  },
  computed: {
    access_token () {
      return this.$store.state.auth.access_token
    }
  },
}
</script>