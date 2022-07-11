import { createRouter, createWebHashHistory } from 'vue-router'
import homeComponent from "./pages/index.vue"
import workEditorComponent from "./pages/work-editor.vue"
import login from "./components/auth/login.vue"
import phoneLogin from "./components/auth/phoneLogin.vue"
import register from "./components/auth/register.vue"
import taskListComponent from "./pages/taskList.vue"
import uploadListComponent from "./pages/uploadList"

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
  },
  {
    path: '/taskList',
    name: 'taskList',
    component: taskListComponent,
    props: route => ({
      uuid: route.query.uuid
    })
  },
  {
    path: '/uploadList',
    name: 'uploadList',
    component: uploadListComponent,
    props: route => ({
      uuid: route.query.uuid
    })
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  }, {
    path: '/phone-login',
    name: 'phone-login',
    component: phoneLogin,
  }, {
    path: '/register',
    name: 'register',
    component: register,
  }
]

const router = createRouter({
  history: createWebHashHistory('/workbench/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    to, from, savedPosition
    return {
      x: 0,
      y: 0,
    }
  },
})

export default router
