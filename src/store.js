import { createStore } from 'vuex'
import option from "./store/option";
import asset from "./store/asset";
import project from "./store/project"
const store = createStore({
  getters: {},
  actions: {},
  mutations: {},
  state: {},
  modules: {
    option: option,
    asset: asset,
    project: project
  }
})

export default store
