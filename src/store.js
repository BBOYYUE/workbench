import { createStore } from 'vuex'
import option from "./store/option";
import asset from "./store/asset";
import project from "./store/project"
import dictionary from './store/dictionary';
import auth from "./store/auth"
const store = createStore({
  getters: {},
  actions: {},
  mutations: {
    setFetching (state, fetching) {
      state.fetching = fetching
    },
    setStale (state, stale) {
      state.stale = stale
    },
    setAuth (state, isAuth) {
      state.isAuth = isAuth
    }
  },
  state: {
    fetching: false,
    /**
     * 当前数据是否已失效
     */
    stale: false,
    isAuth: true,
  },
  modules: {
    option: option,
    asset: asset,
    project: project,
    dictionary: dictionary,
    auth: auth
  }
})

export default store
