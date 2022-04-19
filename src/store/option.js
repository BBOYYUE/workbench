import { normalize, schema } from 'normalizr'
import * as MutationType from "../MutationType"

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
      "pages": [
        {
          "id": 1,
          "name": "项目管理",
          "modules": [
            {
              "name": "项目列表",
              "id": 1,
              "panel": {},
              "list": {},
              "button-group": [
                {
                  "name": "一键加速"
                },
                {
                  "name": "刷新项目信息"
                }
              ]
            },
            {
              "name": "产品列表",
              "id": 1,
              "panel": {},
              "list": {},
              "button-group": {}
            },
            {
              "name": "顾问列表",
              "id": 1,
              "panel": {},
              "list": {},
              "button-group": {}
            },
            {
              "name": "客户列表",
              "id": 1,
              "panel": {},
              "list": {},
              "button-group": {}
            },
            {
              "name": "作者列表",
              "id": 1,
              "panel": {},
              "list": {},
              "button-group": {}
            }
          ]
        },
        {
          "id": 2,
          "name": "作品管理",
          "modules": [
            {
              "name": "全景",
              "id": 1,
              "panel": {},
              "list": {},
              "button-group": {}
            },
            {
              "name": "平面",
              "id": 1,
              "panel": {},
              "list": {},
              "button-group": {}
            },
            {
              "name": "模型",
              "id": 1,
              "panel": {},
              "list": {},
              "button-group": {}
            },
            {
              "name": "序列帧",
              "id": 1,
              "panel": {},
              "list": {},
              "button-group": {}
            }
          ]
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
  },
  getters: {
    entities () {
      return normalize(optionData, dataSchema).entities
    },
  },
  mutations: {
    [MutationType.SET_MORE] (state, data) {
      state[data.type] = data.value
    },
  }
}