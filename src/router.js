import { createRouter, createWebHashHistory } from 'vue-router'
import homeComponent from "./pages/index.vue"
import workEditorComponent from "./pages/work-editor.vue"
const isWeChat = /MicroMessenger/i.test(window.navigator.userAgent)
const routes = [
  {
    path: '/',
    name: 'home',
    component: homeComponent,
    props: true,
    meta: {
      auth: isWeChat,
    },
  }, {
    path: '/work-editor',
    name: 'work-editor',
    component: workEditorComponent,
    props: route => ({
      workType: route.query.work_type,
      assetType: route.query.asset_type,
      uuid: route.query.uuid
    }),
    meta: {
      auth: isWeChat,
    },
  }
]

const router = createRouter({
  history: createWebHashHistory('/workbench/'),
  routes,
  scrollBehavior (to, from, savedPosition) {
    to, from, savedPosition
    return {
      x: 0,
      y: 0,
    }
  },
})

export default router
