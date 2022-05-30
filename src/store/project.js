import { normalize, schema } from 'normalizr'
import * as MutationType from "../MutationType"
import { v4 as uuidv4 } from "uuid";
import axios from 'axios'

const module = new schema.Entity('module')
const product = new schema.Entity('product', {
  modules: [module]
});
const project = new schema.Entity('project', {
  products: [product],
})

const moduleList = new schema.Array(module)
const poductList = new schema.Array(product)
const projectList = new schema.Array(project)



export default {
  namespaced: true,
  state: {
    module: {},
    product: {},
    project: {},
    activeProjectId: 1,
    activeModuleId: 1,
    activeProductId: 1,
  },
  getters: {},
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
      let relation_filed;
      let relation_model_id;
      apiUrl = formData.apiUrl
      model = formData.model
      form = formData.form
      relation_model = formData.relation_model ?? undefined
      relation_filed = formData.relation_filed ?? undefined
      relation_model_id = formData.relation_model_id ?? undefined
      context.commit(MutationType.STORE_DATA, { apiUrl, model, form, relation_model, relation_model_id, relation_filed });
    }
  },
  mutations: {
    [MutationType.SET_MORE] (state, data) {
      state[data.type] = data.value
    },
    [MutationType.GET_LIST] (state, formData) {
      let { apiUrl, model } = formData
      /**
       * 这里很神奇的可以直接拿到 store 对象
       */
      this.commit('setFetching', true)
      axios.get(apiUrl).then((res) => {
        switch (model) {
          case 'module':
            state.module = Object.assign({}, state.module, normalize(res.data.data, moduleList).entities.module)
            break
          case 'product':
            state.product = Object.assign({}, state.product, normalize(res.data.data, poductList).entities.product)
            break
          case 'project':
          default:
            state.project = Object.assign({}, state.project, normalize(res.data.data, projectList).entities.project)
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
          case 'module':
            state.module = Object.assign({}, state.module, { [res.data.data.id]: res.data.data })
            break
          case 'product':
            state.product = Object.assign({}, state.product, { [res.data.data.id]: res.data.data })
            break
          case 'project':
          default:
            state.project = Object.assign({}, state.project, { [res.data.data.id]: res.data.data })
            break
        }
        that.commit('setFetching', false)
      }).catch((err) => {
        console.log(err)
      })
    },
    [MutationType.STORE_DATA] (state, formData) {
      console.log(formData);
      let { apiUrl, model, form, relation_model, relation_model_id, relation_filed } = formData
      this.commit('setFetching', true)
      let that = this;
      axios.post(apiUrl, form).then((res) => {
        console.log(model);
        switch (model) {
          case 'module':
            state.module = Object.assign({}, state.module, { [res.data.data.id]: res.data.data })
            break
          case 'product':
            state.product = Object.assign({}, state.product, { [res.data.data.id]: res.data.data })
            break
          case 'project':
          default:
            state.project = Object.assign({}, state.project, { [res.data.data.id]: res.data.data })
            break
        }
        if (relation_model && relation_filed) {
          state[relation_model][relation_model_id][relation_filed].push(res.data.data.id)
        }
        that.commit('setFetching', false)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}