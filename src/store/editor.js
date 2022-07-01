import { normalize, schema } from 'normalizr'
import * as MutationType from "../MutationType"
import { v4 as uuidv4 } from "uuid";
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
    list: [],
    detail: {}
  },
  actions: {
    [MutationType.GET_LIST] (context, formData) {
      axiosConfig(context)
      context.commit(MutationType.GET_LIST, {
        apiUrl: "http://192.168.10.10/api/v2/resource",
        uuid: formData.uuid
      })
    },
    [MutationType.UPDATE_DATA] (context, formData) {
    }
  },
  mutations: {
    [MutationType.GET_LIST] (state, formData) {
      let { apiUrl, uuid } = formData;
      http.get(apiUrl + '?uuid=' + uuid).then((res) => {
        state.list = res.data.data.resource
        console.log(res.data)
      });
    },
    [MutationType.UPDATE_DATA] (context, formData) {
    }
  }
}