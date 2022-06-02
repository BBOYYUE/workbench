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
    },

    [MutationType.UPDATE_DATA] (context, formData) {
      let apiUrl;
      let model;
      let form;
      apiUrl = formData.apiUrl + "/" + formData.form.id
      model = formData.model
      form = formData.form
      context.commit(MutationType.UPDATE_DATA, { apiUrl, model, form });
    },
    [MutationType.STORE_DATA] (context, formData) {
      let apiUrl;
      let model;
      let form;
      let relation_model;
      let relation_field;
      let relation_model_id;
      let relation_namespace;
      apiUrl = formData.apiUrl
      model = formData.model
      form = formData.form
      relation_namespace = formData.relation_namespace ?? undefined
      relation_model = formData.relation_model ?? undefined
      relation_field = formData.relation_field ?? undefined
      relation_model_id = formData.relation_model_id ?? undefined
      context.commit(MutationType.STORE_DATA, { apiUrl, model, form, relation_namespace, relation_model, relation_model_id, relation_field });
    },
    [MutationType.DELETE_DATA] (context, formData) {
      let apiUrl;
      let model;
      let form;
      let relation_model;
      let relation_field;
      let relation_model_id;
      let relation_namespace;
      apiUrl = formData.apiUrl
      model = formData.model
      form = formData.form
      relation_namespace = formData.relation_namespace ?? undefined
      relation_model = formData.relation_model ?? undefined
      relation_field = formData.relation_field ?? undefined
      relation_model_id = formData.relation_model_id ?? undefined
      context.commit(MutationType.DELETE_DATA, { apiUrl, model, form, relation_namespace, relation_model, relation_model_id, relation_field });
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
    },
    [MutationType.UPDATE_DATA] (state, formData) {
      let { apiUrl, model, form } = formData
      let that = this;
      this.commit('setFetching', true)
      axios.put(apiUrl, form).then((res) => {
        switch (model) {
          case 'works':
            state.works = Object.assign({}, state.works, { [res.data.data.id]: res.data.data })
            break
          case 'folders':
            state.folders = Object.assign({}, state.folders, { [res.data.data.id]: res.data.data })
            break
          default:
            state.folders = Object.assign({}, state.folders, { [res.data.data.id]: res.data.data })
            break

        }
        that.commit('setFetching', false)
      }).catch((err) => {
        console.log(err)
      })
    },
    [MutationType.STORE_DATA] (state, formData) {
      let { apiUrl, model, form, relation_namespace, relation_model, relation_model_id, relation_field } = formData
      this.commit('setFetching', true)
      let that = this;
      axios.post(apiUrl, form).then((res) => {
        console.log(model);
        switch (model) {
          case 'works':
            state.works = Object.assign({}, state.works, { [res.data.data.id]: res.data.data })
            break
          case 'folders':
          default:
            state.folders = Object.assign({}, state.folders, { [res.data.data.id]: res.data.data })
            break
        }
        if (relation_model && relation_field) {
          that.commit(relation_namespace + '/' + MutationType.CREATE_RELATION, {
            relation_model: relation_model,
            relation_field: relation_field,
            relation_model_id: relation_model_id,
            id: res.data.data.id
          })
        }
        that.commit('setFetching', false)
      }).catch((err) => {
        console.log(err)
      })
    },
    [MutationType.CREATE_RELATION] (state, formData) {
      let { model, relation_field, relation_model_id, id } = formData
      state[model][relation_model_id][relation_field].push(id);
    },
    [MutationType.REMOVE_RELATION] (state, formData) {
      let { model, relation_field, relation_model_id, id } = formData
      state[model][relation_model_id][relation_field].filter((item) => {
        return item != id
      });
    },
    [MutationType.DELETE_DATA] (state, formData) {
      let { apiUrl, model, form, relation_namespace, relation_model, relation_model_id, relation_field } = formData
      this.commit('setFetching', true)
      let that = this;
      axios.delete(apiUrl, form).then((res) => {
        console.log(model);
        switch (model) {
          case 'works':
            delete state.works[form.id]
            break
          case 'folders':
            delete state.folders[form.id]
            break
          default:
            delete state.folders[form.id]
            break
        }
        if (relation_model && relation_field) {
          that.commit(relation_namespace + '/' + MutationType.CREATE_RELATION, {
            relation_model: relation_model,
            relation_field: relation_field,
            relation_model_id: relation_model_id,
            id: form.id
          })
        }
        that.commit('setFetching', false)
      }).catch((err) => {
        console.log(err)
      })
    },
  }
}