import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import store from './store'
// import WechatAuth from 'vue-wechat-auth'
// import axios from 'axios'
import 'animate.css/animate.min.css'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import Hammer from 'hammerjs'
import 'default-passive-events'
import VueCodemirror from 'vue-codemirror'
import { basicSetup } from '@codemirror/basic-setup'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import { lineNumbers, gutter } from "@codemirror/view"
const app = createApp(App)

app.use(VueCodemirror, {
  // optional default global options
  autofocus: true,
  disabled: false,
  indentWithTab: true,
  tabSize: 4,
  placeholder: '在这里输入',
  extensions: [lineNumbers(), gutter({ class: "cm-mygutter" }), json(), oneDark],
  mode: 'application/json'
})
/**
 * 重写了 localStorage
 */
let originalSetItem = localStorage.setItem
localStorage.setItem = function (key, newValue) {
  let event = new Event('setItemEvent')
  event.key = key
  event.newValue = newValue
  window.dispatchEvent(event)
  originalSetItem.apply(this, arguments)
}

/**
* 微信授权相关
*/
// 微信公众号测试账号
/**

let api = 'http://api.alpha.test/api/v1/socials/wechat/authorizations'
let appid = 'wx42d1036ec3e1b66d'
// 微信公众号正式账号
const isProduction = process.env.NODE_ENV !== 'development'
const test = false
if (isProduction && !test) {
  api = 'https://api.alphavisual.cn/api/v1/socials/wechat/authorizations'
  appid = 'wxf8a74c3a05b443df'
}
const pathList = location.href.split('#')[1].split('/')
let project_uuid = ''
let project_type = pathList[1]
if (project_type === 'webvr') {
  project_uuid = pathList[2].split('?')[0]
}
let getParaName = (url) => {
  if (!url || url.indexOf('?') == -1) {
    return
  }
  let paraname = url.split('?')[1]
  return setObject(paraname)
}
let setObject = (paraArr) => {
  let obj = {}
  let a = paraArr.split('&')
  a.forEach((item) => {
    let str = item.split('=')
    let key = str[0]
    let val = str[1]
    obj[key] = val
  })
  return obj
}

let data = Object.assign({}, getParaName(location.href), {
  project_type,
  project_uuid,
})

app.use(WechatAuth, {
  router, // 路由实例对象
  appid: appid, // 您的微信appid
  responseType: 'code', // 返回类型，请填写code
  scope: 'snsapi_userinfo', // 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息）
  getCodeCallback (code, next) {
    axios
      .post(api, {
        code,
        data,
      })
      .then((response) => {
        let data = response.data
        let accessToken = data.data['access_token']
        let user = data.data['user']
        store.commit('user/login', {
          accessToken,
          user,
        })
        if (accessToken) {
          localStorage.setItem('user', JSON.stringify({ accessToken, user }))
          next(accessToken) // 获取access_toeken成功
        } else {
          next() // 获取access_token失败
        }
      })
      .catch(() => {
        next() // ajax出现错误
      })
  },
})
**/

/**
 * 重写了Date的日期格式化
 * @param {*} fmt
 * @returns
 */
Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

/**
 * vue Touch 的自定义指令
 * @param {*} el
 * @param {*} type
 * @param {*} binding
 */
function VueTouch (el, type, binding) {
  this.el = el
  this.type = type
  this.binding = binding
  var hammertime = new Hammer(this.el)
  hammertime.get('pinch').set({ enable: true })
  hammertime.on(this.type, this.binding.value)
}
app.directive('pinch', {
  beforeMount (el, binding) {
    new VueTouch(el, 'pinch', binding)
  },
})
app.directive('press', {
  beforeMount (el, binding) {
    new VueTouch(el, 'press', binding)
  },
})


app.use(router)
app.use(store)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
app.mount('#app')