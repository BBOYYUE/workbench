import { normalize, schema } from 'normalizr'
import * as MutationType from "../MutationType"
import { v4 as uuidv4 } from "uuid";
import axios from 'axios'
import { formProps } from 'element-plus';


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
const permission = new schema.Entity('permission')
const permissionList = new schema.Array(permission)
const role = new schema.Entity('role', {
  permissions: [permission]
})
const user = new schema.Entity('user', {
  roles: [role]
})
const userList = new schema.Array(user)
const work = new schema.Entity('works', {})
const folder = new schema.Entity('folders', {
  works: [work]
});

const folders = new schema.Array(folder);
folder.define({ folders })

const folderList = new schema.Array(folder)
const workList = new schema.Array(work)
const roleList = new schema.Array(role)

const module = new schema.Entity('module', {
  works: [work]
})
const product = new schema.Entity('product', {
  modules: [module]
});
const project = new schema.Entity('project', {
  products: [product],
  users: [user]
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
    folder: {},
    work: {},
    user: {},
    role: {},
    permission: {},
    groups: {},
    panoramas: {},
    threes: {},
    activeProjectId: 1,
    activeModuleId: 1,
    activeProductId: 1,
    activeFoderId: 0,
    activeAssetId: 0,
    paginate: {}
  },
  getters: {},
  actions: {
    [MutationType.GET_LIST] (context, formData) {
      axiosConfig(context)
      let apiUrl;
      let model;
      apiUrl = formData.apiUrl
      model = formData.model
      if (formData.include || formData.filter || formData.sort || formData.fields || formData.append || formData.page) {
        apiUrl = apiUrl + "?page=" + formData.page
        apiUrl = formData.include ? apiUrl + "&include=" + formData.include : apiUrl
        apiUrl = formData.filter ? apiUrl + "&filter=" + formData.filter : apiUrl
        apiUrl = formData.sort ? apiUrl + "&sort=" + formData.sort : apiUrl
        apiUrl = formData.fields ? apiUrl + "&fields=" + formData.fields : apiUrl
        apiUrl = formData.append ? apiUrl + "&append=" + formData.append : apiUrl
      }
      context.commit(MutationType.GET_LIST, { apiUrl, model, include: formData.include });
    },

    [MutationType.UPDATE_DATA] (context, formData) {
      axiosConfig(context)
      let apiUrl;
      let model;
      let form;
      let relation_namespace;
      let relation_model;
      let relation_field;
      let relation_model_id;
      apiUrl = formData.apiUrl + "/" + formData.form.id
      model = formData.model
      form = formData.form
      relation_namespace = formData.relation_namespace ?? undefined
      relation_model = formData.relation_model ?? undefined
      relation_field = formData.relation_field ?? undefined
      relation_model_id = formData.relation_model_id ?? undefined
      context.commit(MutationType.UPDATE_DATA, { apiUrl, model, form, relation_namespace, relation_model, relation_model_id, relation_field });
    },
    [MutationType.STORE_DATA] (context, formData) {
      axiosConfig(context)
      let apiUrl;
      let model;
      let form;
      let relation_namespace;
      let relation_model;
      let relation_field;
      let relation_model_id;
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
      axiosConfig(context)
      let apiUrl;
      let model;
      let form;
      let relation_namespace;
      let relation_model;
      let relation_field;
      let relation_model_id;
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
  mutations: {
    [MutationType.SET_MORE] (state, data) {
      state[data.type] = data.value
    },
    [MutationType.GET_LIST] (state, formData) {
      let { apiUrl, model, include } = formData
      /**
       * 这里很神奇的可以直接拿到 store 对象
       */
      let entities
      this.commit('setFetching', true)
      http.get(apiUrl).then((res) => {
        state.paginate = Object.assign({}, state.paginate, {
          [model]: {
            total: res.data.total,
            current_page: res.data.current_page,
            per_page: res.data.per_page,
            last_page: res.data.last_page,
            form: res.data.form,
            to: res.data.to,
          }
        })
        switch (model) {
          case 'work':
            entities = normalize(res.data.data, workList).entities;
            state.work = Object.assign({}, state.work, entities.works)
            break
          case 'folder':
            state.folder = Object.assign({}, state.folder, normalize(res.data.data, folderList).entities.folders)
            break
          case 'module':
            state.module = Object.assign({}, state.module, normalize(res.data.data, moduleList).entities.module)
            break
          case 'product':
            state.product = Object.assign({}, state.product, normalize(res.data.data, poductList).entities.product)
            break
          case 'user':
            state.user = Object.assign({}, state.user, normalize(res.data.data, userList).entities.user)
            break;
          case 'role':
            entities = normalize(res.data.data, roleList).entities;
            state.permission = Object.assign({}, state.permission, entities.permission)
            state.role = Object.assign({}, state.role, entities.role)
            break;
          case 'permission':
            state.permission = Object.assign({}, state.permission, normalize(res.data.data, permissionList).entities.permission)
            break;
          case 'project':
          default:
            state.project = Object.assign({}, state.project, normalize(res.data.data, projectList).entities.project)
            break
        }
        this.commit('setFetching', false)
      }).catch((err) => {
        console.log(err)
        if (err.response && err.response.data) {
          if (err.response.status === 401) {
            /**
             * 登陆失效
             */
            this.commit('setAuth', false)
          }
        }
      })
    },
    [MutationType.CREATE_RELATION] (state, formData) {
      let { relation_model, relation_field, relation_model_id, id } = formData
      state[relation_model][relation_model_id][relation_field].push(id);
    },
    [MutationType.REMOVE_RELATION] (state, formData) {
      let { relation_model, relation_field, relation_model_id, id } = formData
      state[relation_model][relation_model_id][relation_field] =
        state[relation_model][relation_model_id][relation_field].filter((item) => {
          return item != id
        });
    },
    [MutationType.UPDATE_DATA] (state, formData) {
      let { apiUrl, model, form, relation_namespace, relation_model, relation_field, relation_model_id } = formData
      let that = this;
      this.commit('setFetching', true)
      http.put(apiUrl, form).then((res) => {
        switch (model) {
          case 'user':
            state.user = Object.assign({}, state.user, normalize(res.data.data, user).entities.user)
            break
          case 'role':
            state.role = Object.assign({}, state.role, normalize(res.data.data, role).entities.role)
            break
          case 'permission':
            state.permission = Object.assign({}, state.permission, normalize(res.data.data, permission).entities.permission)
            break
          case 'work':
            state.work = Object.assign({}, state.work, normalize(res.data.data, work).entities.works)
            break
          case 'folder':
            state.folder = Object.assign({}, state.folder, normalize(res.data.data, folder).entities.folders)
            break
          case 'module':
            state.module = Object.assign({}, state.module, normalize(res.data.data, module).entities.module)
            break
          case 'product':
            state.product = Object.assign({}, state.product, normalize(res.data.data, product).entities.product)
            break
          case 'project':
          default:
            state.project = Object.assign({}, state.project, normalize(res.data.data, project).entities.project)
            break
        }
        that.commit('setFetching', false)

        // if (relation_model && relation_field && relation_model == model) {
        //   if (form.action_type == 'bind') {
        //     that.commit(relation_namespace + '/' + MutationType.CREATE_RELATION, {
        //       relation_model: relation_model,
        //       relation_field: relation_field,
        //       relation_model_id: relation_model_id,
        //       id: form.relation_model_id
        //     })
        //   } else {
        //     that.commit(relation_namespace + '/' + MutationType.REMOVE_RELATION, {
        //       relation_model: relation_model,
        //       relation_field: relation_field,
        //       relation_model_id: relation_model_id,
        //       id: form.relation_model_id
        //     })
        //   }
        // }
      }).catch((err) => {
        if (err.response.data) {
          if (err.response.status === 401) {
            /**
             * 登陆失效
             */
            this.commit('setAuth', false)
          }
        }
      })
    },
    [MutationType.STORE_DATA] (state, formData) {
      let { apiUrl, model, form, relation_namespace, relation_model, relation_model_id, relation_field } = formData
      this.commit('setFetching', true)
      let that = this;
      http.post(apiUrl, form).then((res) => {
        switch (model) {
          case 'user':
            state.user = Object.assign({}, state.user, normalize(res.data.data, user).entities.user)
            break;
          case 'role':
            state.role = Object.assign({}, state.role, normalize(res.data.data, role).entities.role)
            break;
          case 'permission':
            state.permission = Object.assign({}, state.permission, normalize(res.data.data, permission).entities.permission)
            break;
          case 'work':
            state.work = Object.assign({}, state.work, normalize(res.data.data, work).entities.works)
            break
          case 'folder':
            state.folder = Object.assign({}, state.folder, normalize(res.data.data, folder).entities.folders)
            break
          case 'module':
            state.module = Object.assign({}, state.module, normalize(res.data.data, module).entities.module)
            break
          case 'product':
            state.product = Object.assign({}, state.product, normalize(res.data.data, product).entities.product)
            break
          case 'project':
          default:
            state.project = Object.assign({}, state.project, normalize(res.data.data, project).entities.project)
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
        if (err.response.data) {
          if (err.response.status === 401) {
            /**
             * 登陆失效
             */
            this.commit('setAuth', false)
          }
        }
      })
    },
    [MutationType.DELETE_DATA] (state, formData) {
      let { apiUrl, model, form, relation_namespace, relation_model, relation_model_id, relation_field } = formData
      this.commit('setFetching', true)
      let that = this;
      http.delete(apiUrl, form).then((res) => {
        console.log(model);
        switch (model) {
          case 'work':
            delete state.work[form.id]
            break
          case 'folder':
            delete state.folder[form.id]
            break
          case 'module':
            delete state.module[form.id]
            break
          case 'product':
            delete state.product[form.id]
            break
          case 'project':
          default:
            delete state.project[form.id]
            break
        }
        if (relation_model && relation_field) {
          that.commit(relation_namespace + '/' + MutationType.REMOVE_RELATION, {
            relation_model: relation_model,
            relation_field: relation_field,
            relation_model_id: relation_model_id,
            id: form.id
          })
        }
        that.commit('setFetching', false)
      }).catch((err) => {
        if (err.response.data) {
          if (err.response.status === 401) {
            /**
             * 登陆失效
             */
            this.commit('setAuth', false)
          }
        }
      })
    },
    setPaginate (state, paginate) {
      state.paginate = Object.assign({}, state.paginate, paginate)
    }
  },

}