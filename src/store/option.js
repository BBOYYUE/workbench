import { normalize, schema } from 'normalizr'
import * as MutationType from "../MutationType"
import { v4 as uuidv4 } from "uuid";
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
        {
          "id": 1,
          "name": "项目管理",
          "uuid": uuidv4().substring(0, 5),
          "modules": [
            {
              "name": "项目列表",
              "id": 1,
              "panel": {},
              "icon": 'document',
              "model": "project",
              "list": {},
              "uuid": uuidv4().substring(0, 5),
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
              "id": 2,
              "icon": 'document',
              "model": "product",
              "uuid": uuidv4().substring(0, 5),
              "panel": {},
              "list": {},
              "button-group": {}
            },
            {
              "name": "置业顾问列表",
              "id": 3,
              "icon": 'document',
              "model": "adviser",
              "uuid": uuidv4().substring(0, 5),
              "panel": {},
              "list": {},
              "button-group": {}
            },
            {
              "name": "客户列表",
              "id": 4,
              "icon": 'document',
              "model": "customer",
              "uuid": uuidv4().substring(0, 5),
              "panel": {},
              "list": {},
              "button-group": {}
            },
            {
              "name": "作者列表",
              "id": 5,
              "icon": 'document',
              "model": "author",
              "uuid": uuidv4().substring(0, 5),
              "panel": {},
              "list": {},
              "button-group": {}
            },
            {
              "name": "开发者列表",
              "id": 6,
              "icon": 'document',
              "model": "developer",
              "uuid": uuidv4().substring(0, 5),
              "panel": {},
              "list": {},
              "button-group": {}
            }
          ]
        },
        {
          "id": 2,
          "name": "作品管理",
          "uuid": uuidv4().substring(0, 5),
          "modules": [
            {
              "name": "全景作品",
              "id": 7,
              "icon": 'document',
              "model": "work",
              "uuid": uuidv4().substring(0, 5),
              "panel": {},
              "list": {},
              "button-group": {}
            },
            {
              "name": "平面作品",
              "id": 8,
              "icon": 'document',
              "model": "work",
              "uuid": uuidv4().substring(0, 5),
              "panel": {},
              "list": {},
              "button-group": {}
            },
            {
              "name": "模型作品",
              "id": 9,
              "icon": 'document',
              "model": "work",
              "uuid": uuidv4().substring(0, 5),
              "panel": {},
              "list": {},
              "button-group": {}
            },
            {
              "name": "序列帧作品",
              "id": 10,
              "icon": 'document',
              "model": "work",
              "uuid": uuidv4().substring(0, 5),
              "panel": {},
              "list": {},
              "button-group": {}
            }
          ]
        },
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
    activeModuleId: 1
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