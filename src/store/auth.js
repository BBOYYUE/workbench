import * as MutationType from '../MutationType'
import { ElMessage } from 'element-plus'
import axios from 'axios'

let http = {}
let axiosConfig = (context) => {
  let instance = axios.create({
    timeout: 1000 * 12,
  })

  instance.interceptors.request.use((req) => {
    // if (Object.keys(this.loadingAPI).length === 0) {
    //   store.commit('SHOW_LOADING')
    // }
    req.headers.Authorization = 'Bearer ' + context.rootState.auth.access_token
    return req
  })
  instance.interceptors.response.use((res) => {
    // if (Object.keys[this.loadingAPI].length === 0) {
    //   store.commit('HIDE_LOADING')
    // }
    return res
  })
  http = instance
}

export default {
  namespaced: true,
  state: {
    code: '',
    msg: '',
    user: [],
    expired_at: '',
    expires_in: '',
    access_token: '',
    verification_key: '',
    isLogin: true,
  },
  getters: {
    permissionList (state) {
      let permisions = [];
      if (!state.user || state.user.length == 0) return new Set()
      state.user.permissions.forEach((element) => {
        permisions.push(element.name);
      });
      permisions = new Set(permisions);
      return permisions;
    }
  },
  modules: {},
  actions: {

    /**
     * 普通账号密码登陆
     * @param {*} context 
     * @param {*} data 
     */
    [MutationType.AUTHENTICATION] (context, data) {
      axiosConfig(context)
      let { username, password } = data
      context.commit(MutationType.AUTHENTICATION, {
        apiUrl: 'http://192.168.10.10/api/v1/authorizations',
        formData: {
          password,
          username,
        },
      })
    },
    /**
     * 刷新token
     * @param {*} context 
     */
    [MutationType.AUTHENTICATION_UPDATE] (context) {
      axiosConfig(context)
      context.commit(MutationType.AUTHENTICATION_UPDATE, {
        apiUrl: 'http://192.168.10.10/api/v1/authorizations/update',
      })
    },
    [MutationType.AUTHENTICATION_LOGOUT] (context) {
      axiosConfig(context)
      context.commit(MutationType.AUTHENTICATION_LOGOUT, {
        apiUrl: 'http://192.168.10.10/api/v1/destroy',
      })
    },
    /**
     * 获取手机验证码
     * @param {*} context 
     * @param {*} data 
     */
    [MutationType.VERIFICATION_CODES] (context, data) {
      axiosConfig(context)
      let { phone } = data
      context.commit(MutationType.VERIFICATION_CODES, {
        apiUrl: 'http://192.168.10.10/api/v1/verificationCodes',
        formData: {
          phone,
        },
      })
    },

    /**
     * 
     * @param {*} context 
     * @param {*} data 
     */
    [MutationType.VERIFICATION_CODE_AUTHENTICATION] (context, data) {
      axiosConfig(context)
      let { phone, verification_code, verification_key } = data
      context.commit(MutationType.VERIFICATION_CODE_AUTHENTICATION, {
        apiUrl: 'http://192.168.10.10/api/v1/verificationCodeAuthentication',
        formData: {
          phone,
          verification_code,
          verification_key,
        },
      })
    },
    [MutationType.VERIFICATION_CODE_STORE] (context, data) {
      axiosConfig(context)
      let {
        name,
        password,
        phone,
        invitation_code,
        verification_code,
        verification_key,
      } = data
      context.commit(MutationType.VERIFICATION_CODE_STORE, {
        apiUrl: 'http://192.168.10.10/api/v1/verificationCodeStore',
        formData: {
          name,
          password,
          phone,
          invitation_code,
          verification_code,
          verification_key,
        },
      })
    },
  },
  mutations: {
    [MutationType.SET_ACCESS_TOKEN] (state, access_token) {
      state.access_token = access_token
    },
    [MutationType.AUTHENTICATION_LOGOUT] (state, data) {
      let { apiUrl } = data
      this.commit('setAuth', false)
      http
        .post(apiUrl)
        .then(() => {
          state.user = undefined
          state.access_token = undefined
          if (localStorage) {
            localStorage.setItem('user', undefined)
          }
        })
        .catch((err) => {
          if (err.response.data) {
            console.log(err.response.data)
          }
        })
    },

    [MutationType.AUTHENTICATION_UPDATE] (state, data) {
      let { apiUrl } = data
      http
        .put(apiUrl)
        .then((res) => {
          if (res.data.code && res.data.code == 200) {
            state.code = res.data.code
            state.msg = res.data.msg
            state.user = res.data.data.user
            state.access_token = res.data.data.access_token
            state.expires_in = res.data.data.expires_in
            state.expired_at = res.data.data.expired_at
            // state.token_type = res.date.data.token_type
            if (localStorage.setItem) {
              localStorage.setItem(
                'user',
                JSON.stringify({
                  access_token: state.access_token,
                  user: state.user,
                })
              )
            }
            this.commit('setAuth', true)
          } else if (res.data.code) {
            state.code = res.data.code
            this.commit('setAuth', false)
            state.user = undefined
            state.access_token = undefined
            if (localStorage) {
              localStorage.setItem('user', undefined)
            }
          } else {
            state.msg = res.data.message
          }
        })
        .catch((err) => {
          if (err.response.data) {
            console.log(err.response.data)
          }
        })
    },
    [MutationType.AUTHENTICATION] (state, data) {
      let { apiUrl, formData } = data
      http
        .post(apiUrl, formData)
        .then((res) => {
          if (res.data.code && res.data.code == 200) {
            state.code = res.data.code
            state.msg = res.data.msg
            state.user = res.data.data.user
            state.access_token = res.data.data.access_token
            state.expires_in = res.data.data.expires_in
            state.expired_at = res.data.data.expired_at
            // state.token_type = res.date.data.token_type
            if (localStorage.setItem) {
              localStorage.setItem(
                'user',
                JSON.stringify({
                  access_token: state.access_token,
                  user: state.user,
                })
              )
            }
            ElMessage({
              message: "登陆成功!",
              type: "success"
            })
            this.commit('setAuth', true)
          } else if (res.data.code) {
            ElMessage({
              message: res.data.msg,
              type: "error"
            })
          } else {
            ElMessage({
              message: res.data.message,
              type: "error"
            })
          }
        })
        .catch((err) => {
          ElMessage({
            message: "网络链接超时",
            type: "error"
          })
        })
    },
    [MutationType.VERIFICATION_CODES] (state, data) {
      let { apiUrl, formData } = data
      http
        .post(apiUrl, formData)
        .then((res) => {
          if (res.data.code && res.data.code == 200) {
            state.code = res.data.code
            state.msg = res.data.msg
            state.verification_key = res.data.data.verification_key
            state.expired_at = res.data.data.expired_at
            state.expires_in = res.data.data.expires_in
            // state.token_type = res.date.data.token_type
          } else {
            state.code = res.data.code
            state.msg = res.data.msg
          }
        })
        .catch((err) => {
          if (err.response.data) {
            console.log(err.response.data)
          }
        })
    },
    [MutationType.VERIFICATION_CODE_AUTHENTICATION] (state, data) {
      let { apiUrl, formData } = data
      http
        .post(apiUrl, formData)
        .then((res) => {
          if (res.data.code && res.data.code == 200) {
            state.code = res.data.code
            state.msg = res.data.msg
            state.user = res.data.data.user
            state.access_token = res.data.data.access_token
            state.expires_in = res.data.data.expires_in
            state.expired_at = res.data.data.expired_at
            // state.token_type = res.date.data.token_type
            this.commit('setAuth', true)
            if (localStorage.setItem) {
              localStorage.setItem(
                'user',
                JSON.stringify({
                  access_token: state.access_token,
                  user: state.user,
                })
              )
            }
          } else {
            state.code = res.data.code
            state.msg = res.data.msg
          }
        })
        .catch((err) => {
          if (err.response.data) {
            console.log(err.response.data)
          }
        })
    },
    [MutationType.VERIFICATION_CODE_STORE] (state, data) {
      let { apiUrl, formData } = data
      http
        .post(apiUrl, formData)
        .then((res) => {
          if (res.data.code && res.data.code == 200) {
            state.code = res.data.code
            state.msg = res.data.msg
            state.user = res.data.data.user
            state.access_token = res.data.data.access_token
            state.expires_in = res.data.data.expires_in
            this.commit('setAuth', true)
            if (localStorage.setItem) {
              localStorage.setItem(
                'user',
                JSON.stringify({
                  access_token: state.access_token,
                  user: state.user,
                })
              )
            }
          } else {
            state.code = res.data.code
            state.msg = res.data.msg
          }
        })
        .catch((err) => {
          if (err.response.data) {
            console.log(err.response.data)
          }
        })
    },
  },
}
