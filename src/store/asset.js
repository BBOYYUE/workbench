import { normalize, schema } from 'normalizr'
import * as MutationType from "../MutationType"
// import { v4 as uuidv4 } from "uuid";

const panorama = new schema.Entity('panorama')
const folder = new schema.Entity('folder', {
  panoramas: [panorama]
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
const dataSchema = new schema.Array(folder)
const assetData = [
  {
    "id": 1,
    "name": "测试全景根目录",
    "uuid": "3fa8a454-4f70-4528-b2e7-3a43aef960f2",
    "asset_type": 3,
    "work_type": 1,
    "option": "[]",
    "order": 1,
    "alias": "3fa8a454",
    "parent_id": 0,
    "xml": null,
    "folders": [{
      "id": 2,
      "name": "测试全景目录",
      "uuid": "3fa8a454-4f70-4528-b2e7-3a43aef960f2",
      "asset_type": 3,
      "work_type": 1,
      "option": "[]",
      "order": 1,
      "alias": "3fa8a454",
      "parent_id": 1,
      "xml": null,
      "folders": [
        {
          "id": 3,
          "name": "测试全景作品",
          "uuid": "b3ab9131-36cf-4d5c-a209-5ef31b9b29a7",
          "asset_type": 1,
          "work_type": 1,
          "option": "[]",
          "order": 1,
          "alias": "b3ab9131",
          "parent_id": 2,
          "xml": {
            "id": 9,
            "name": "0ddd5aef",
            "type": 2,
            "status": 0,
            "use_type": 4,
            "order": 2,
            "uuid": "0ddd5aef-cd45-4b95-a090-074a604da22e",
            "alias": "0ddd5aef.xml",
            "extension": "xml",
            "model_type": "Bboyyue\\Asset\\Model\\Asset",
            "model_id": 3,
            "user_id": 0,
            "group_id": 0,
            "created_at": "2022-04-26T06:49:19.000000Z",
            "updated_at": "2022-04-26T06:49:19.000000Z",
            "deleted_at": null,
            "parent_id": 3
          },
          "panoramas": [
            {
              "id": 4,
              "name": "测试全景图",
              "uuid": "42ebf6b2-cd6f-4e15-9b89-ecc615914403",
              "asset_type": 2,
              "work_type": 1,
              "option": "[]",
              "order": 1,
              "alias": "42ebf6b2",
              "parent_id": 3,
              "small": {
                "id": 6,
                "name": "small",
                "type": 2,
                "status": 0,
                "use_type": 2,
                "order": 3,
                "uuid": "37cb8638-942c-4f37-b537-35dbfbb17c59",
                "alias": "37cb8638.jpg",
                "extension": "jpg",
                "model_type": "Bboyyue\\Asset\\Model\\Asset",
                "model_id": 4,
                "user_id": 0,
                "group_id": 0,
                "created_at": "2022-04-26T06:49:17.000000Z",
                "updated_at": "2022-04-26T06:49:17.000000Z",
                "deleted_at": null,
                "parent_id": 4
              },
              "xml": {
                "id": 8,
                "name": "cb0de85b",
                "type": 2,
                "status": 0,
                "use_type": 4,
                "order": 5,
                "uuid": "9db55b42-b2c8-482d-bfb3-04ce1230d755",
                "alias": "9db55b42.xml",
                "extension": "xml",
                "model_type": "Bboyyue\\Asset\\Model\\Asset",
                "model_id": 4,
                "user_id": 0,
                "group_id": 0,
                "created_at": "2022-04-26T06:49:18.000000Z",
                "updated_at": "2022-04-26T06:49:18.000000Z",
                "deleted_at": null,
                "parent_id": 4
              },
              "tiles": {
                "id": 7,
                "name": "cb0de85b",
                "type": 2,
                "status": 0,
                "use_type": 3,
                "order": 4,
                "uuid": "12721af8-8d13-4598-a397-0aabc5b7f3d2",
                "alias": "12721af8.tiles",
                "extension": "tiles",
                "model_type": "Bboyyue\\Asset\\Model\\Asset",
                "model_id": 4,
                "user_id": 0,
                "group_id": 0,
                "created_at": "2022-04-26T06:49:17.000000Z",
                "updated_at": "2022-04-26T06:49:17.000000Z",
                "deleted_at": null,
                "parent_id": 4
              }
            }
          ]
        }
      ]
    }]
  }
]
export default {
  namespaced: true,
  state: {
    activeFoderId: 0,
    activeAssetId: 0,
    folders: [],
    panoramas: []
  },
  getters: {
    entities() {
      return normalize(assetData, dataSchema).entities
    },
  },
  mutations: {
    [MutationType.SET_MORE](state, data) {
      state[data.type] = data.value
    },
  }
}