import { createRouter, createWebHashHistory } from 'vue-router'
import homeComponent from "./pages/index.vue"
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
