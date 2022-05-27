import { createStore } from 'vuex'
import option from "./store/option";
import asset from "./store/asset";
import project from "./store/project"
const store = createStore({
  getters: {},
  actions: {},
  mutations: {
    setFetching (state, fetching) {
      state.fetching = fetching
    },
    setStale (state, stale) {
      state.stale = stale
    }
  },
  state: {
    fetching: false,
    stale: false,
  },
  modules: {
    option: option,
    asset: asset,
    project: project
  }
})

export default store
