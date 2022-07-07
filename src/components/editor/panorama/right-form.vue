<template>
  <keep-alive>
    <component :is='formComponent'
               :uuid="uuid"></component>
  </keep-alive>
</template>
<script>
/**
 * 左侧菜单的所有表单组件
 */
import InformationForm from "./forms/information-form.vue"
import SceneGroupForm from "./forms/scene-group-from.vue";
import PanoForm from "./forms/pano-form.vue";
import MapForm from "./forms/map-form.vue";
import HotspotGroupForm from "./forms/hotspot-group-form.vue";
import HotspotForm from "./forms/hotspot-form.vue";
import TextForm from "./forms/text-form.vue";
import ImgForm from "./forms/img-form.vue";
import AngleForm from "./forms/angle-form.vue";
import EventListen from "./forms/event-listen.vue";
import EventResponse from "./forms/event-response.vue";

/**
 * 这里需要增加一些info组件
 */


export default {
  props: {
    uuid: String,
    active: String
  },
  components: {
    InformationForm,
    SceneGroupForm,
    PanoForm,
    MapForm,
    HotspotGroupForm,
    HotspotForm,
    TextForm,
    ImgForm,
    AngleForm,
    EventListen,
    EventResponse
  },
  setup () {

  },
  computed: {
    formComponent () {
      // let event
      switch (this.active) {
        case "infomation-1":
          return "InformationForm"
        case "infomation-2":
          return "SceneGroupForm"
        case "infomation-3":
          return "PanoForm"
        case "infomation-4":
          return "MapForm"
        case "scene-1":
          return 'AngleForm';
        case "box-1":
          return "HotspotGroupForm"
        case "box-2":
          return "HotspotForm"
        case "box-3":
          return "TextForm"
        case "box-4":
          return "ImgForm"
        case "event-1":
          return "EventListen"
        case "event-2":
          return "EventResponse"
        default:
          return ""
      }
    }
  },
}
</script>