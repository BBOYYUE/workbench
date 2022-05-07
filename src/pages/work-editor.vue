<template>
  <base-editor>
    <template v-slot:body>
      <component :is="editorType"
                 :assetType="assetType"
                 :uuid="uuid"></component>
    </template>
  </base-editor>
</template>
<script>
import baseEditor from '@/module/base-editor.vue';
import PanoramaEditor from '@/components/editor/panorama/panoramaEditor.vue';
import ThreeEditor from '@/components/editor/three/threeEditor.vue';
import DesignEditor from '@/components/editor/design/designEditor.vue';

const PANORAMA = String(1);
const DESIGN = String(2);
const THREE = String(3);
const SEQUENCE = String(4);

const ASSET_TYPE = {
  PANORAMA: {
    1: "work",
    2: "asset",
    3: "dir",
  },
  DESIGN: {
    1: "work",
    2: "asset",
    3: "dir",
  },
  THREE: {
    1: "work",
    2: "asset",
    3: "dir",
  },
  SEQUENCE: {

  }
}

export default {
  components: { baseEditor, PanoramaEditor, ThreeEditor, DesignEditor },
  props: {
    workType: String,
    assetType: String,
    uuid: String
  },
  name: "work-edit",
  mounted () {
    console.log(this.workType, this.assetType, this.uuid, this.$route.query)
  },
  setup () {

  },
  computed: {
    editorType () {
      console.log(this.workType, THREE)
      switch (this.workType) {
        case PANORAMA:
          return 'PanoramaEditor';
        case DESIGN:
          return "DesignEditor";
        case THREE:
          return "ThreeEditor";
        default:
          return 'PanoramaEditor';
      }
    },
  },
}
</script>