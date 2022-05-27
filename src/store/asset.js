import { normalize, schema } from 'normalizr'
import * as MutationType from "../MutationType"
import { v4 as uuidv4 } from "uuid";
import axios from 'axios'

const panorama = new schema.Entity('panoramas')
const three = new schema.Entity('threes')

const group = new schema.Entity('groups', {
  panoramas: [panorama],
  threes: [three]
})
const work = new schema.Entity('works', {
  groups: [group]
})

const folder = new schema.Entity('folders', {
  works: [work]
});
const folders = new schema.Array(folder);
folder.define({ folders })

// const folder = new schema.Entity('folder', {
//   folders: [work],
// })
// const dir = new schema.Entity('folder', {
//   folders: [folder],
//   panoramas: [panorama]
// })
const folderList = new schema.Array(folder)
const workList = new schema.Array(work)
export default {
  namespaced: true,
  state: {
    activeFoderId: 0,
    activeAssetId: 0,
    folders: {},
    works: {},
    groups: {},
    panoramas: {},
    threes: {}
  },
  actions: {
    [MutationType.GET_LIST] (context, formData) {
      let apiUrl;
      let model;
      apiUrl = formData.apiUrl
      model = formData.model
      if (formData.include || formData.filter || formData.sort || formData.fields || formData.append) {
        apiUrl = apiUrl + "?1=1"
        apiUrl = formData.include ? apiUrl + "&include=" + formData.include : apiUrl
        apiUrl = formData.filter ? apiUrl + "&filter=" + formData.filter : apiUrl
        apiUrl = formData.sort ? apiUrl + "&sort=" + formData.sort : apiUrl
        apiUrl = formData.fields ? apiUrl + "&fields=" + formData.fields : apiUrl
        apiUrl = formData.append ? apiUrl + "&append=" + formData.append : apiUrl
      }
      context.commit(MutationType.GET_LIST, { apiUrl, model });
    }
  },
  getters: {
    // entities () {
    //   let entities = normalize(assetData, dataSchema).entities
    //   return entities
    // },
  },
  mutations: {
    [MutationType.SET_MORE] (state, data) {
      state[data.type] = data.value
    },
    [MutationType.GET_LIST] (state, formData) {
      let { apiUrl, model } = formData
      this.commit('setFetching', true)
      axios.get(apiUrl).then((res) => {
        switch (model) {
          case 'works':
            state.works = Object.assign({}, state.works, normalize(res.data.data, workList).entities.works)
            break
          case 'folders':
            state.folders = Object.assign({}, state.folders, normalize(res.data.data, folderList).entities.folders)
            break
          default:
            state.folders = Object.assign({}, state.folders, normalize(res.data.data, folderList).entities.folders)
            break
        }
        this.commit('setFetching', false)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}