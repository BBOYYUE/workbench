import { normalize, schema } from 'normalizr'
import * as MutationType from "../MutationType"
import { v4 as uuidv4 } from "uuid";

const module = new schema.Entity('module')
const product = new schema.Entity('product', {
  modules: [module]
});
const project = new schema.Entity('project', {
  products: [product],
})

const dataSchema = new schema.Array(project)
const assetData = [
  {
    "id": 1,
    "name": "测试项目",
    "uuid": "f3dc0399-fcce-470c-80eb-20975057f741",
    "address": "",
    "phone": "",
    "icon": "",
    "slogan": "",
    "option": null,
    "status": 0,
    "lock": 1,
    "products": [
      {
        "id": 1,
        "name": "测试产品",
        "type": 1,
        "uuid": "d70d7a1c-63c3-4c29-9bbd-4d0c8ffc6c68",
        "status": 0,
        "lock": 1,
        "modules": [
          {
            "id": 1,
            "name": "测试模块",
            "icon": "",
            "uuid": "859a89a0-0758-4fbb-a2c6-6d6334036430",
            "router": "",
            "type": "",
            "lock": 1
          }
        ]
      }
    ]
  }
];

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
  getters: {
    entities () {
      return normalize(assetData, dataSchema).entities
    },
  },
  mutations: {
    [MutationType.SET_MORE] (state, data) {
      state[data.type] = data.value
    },
  }
}