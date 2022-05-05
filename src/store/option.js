import { normalize, schema } from 'normalizr'
import * as MutationType from "../MutationType"
import { v4 as uuidv4 } from "uuid";
import project from "../util/option/pages/project"
const module = new schema.Entity('module')
const page = new schema.Entity('page', {
  modules: [module],
})
const option = new schema.Entity('option', {
  pages: [page]
})
const dataSchema = new schema.Array(option)
const optionData =
  [
    {
      "id": 1,
      "title": "阿尔法工作台",
      "version": "3.0.1",
      "uuid": uuidv4().substring(0, 5),
      "pages": [
        project,
        {
          "id": 3,
          "name": "文件管理器",
          "model": "file",
          "uuid": uuidv4().substring(0, 5),
        }
      ],
    }
  ]
export default {
  namespaced: true,
  state: {
    module: {},
    page: {},
    option: {},
    activePageId: 1,
    activeModuleId: 1,
    activeType: 1,
    activeDataId: 1,
  },
  getters: {
    entities () {
      return normalize(optionData, dataSchema).entities
    }
  },
  mutations: {
    [MutationType.SET_MORE] (state, data) {
      state[data.type] = data.value
    },
  }
}