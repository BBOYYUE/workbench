import { normalize, schema } from 'normalizr'
import * as MutationType from "../MutationType"
// import { v4 as uuidv4 } from "uuid";

const panorama = new schema.Entity('panorama')
const three = new schema.Entity('three')
const folder = new schema.Entity('folder', {
  panoramas: [panorama],
  threes: [three]
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
    "uuid": "caac2061-4a5f-49e9-a805-a6435e81c4e1",
    "asset_type": 3,
    "work_type": 1,
    "option": "[]",
    "order": 1,
    "alias": "caac2061",
    "parent_id": 0,
    "xml": null,
    "folders": [
      {
        "id": 2,
        "name": "测试全景目录",
        "uuid": "faa27504-0c09-4642-932f-df5cd1754176",
        "asset_type": 3,
        "work_type": 1,
        "option": "[]",
        "order": 1,
        "alias": "faa27504",
        "parent_id": 1,
        "xml": null,
        "folders": [
          {
            "id": 3,
            "name": "测试全景作品",
            "uuid": "bfc3d8a3-10b8-42e6-b3b5-8eb33c30a918",
            "asset_type": 1,
            "work_type": 1,
            "option": "[]",
            "order": 1,
            "alias": "bfc3d8a3",
            "parent_id": 2,
            "xml": {
              "id": 15,
              "name": "798f68d0",
              "type": 2,
              "status": 0,
              "use_type": 4,
              "order": 2,
              "uuid": "798f68d0-5821-4a42-a109-6dd58387d0ee",
              "alias": "798f68d0.xml",
              "extension": "xml",
              "model_type": "Bboyyue\\Asset\\Model\\Asset",
              "model_id": 3,
              "user_id": 0,
              "group_id": 0,
              "created_at": "2022-05-06T06:19:32.000000Z",
              "updated_at": "2022-05-06T06:19:33.000000Z",
              "deleted_at": null,
              "parent_id": 3
            },
            "panoramas": [
              {
                "id": 4,
                "name": "测试全景图",
                "uuid": "d4d3b32a-4cb3-4856-9cae-836998c8dc84",
                "asset_type": 2,
                "work_type": 1,
                "option": "[]",
                "order": 1,
                "alias": "d4d3b32a",
                "parent_id": 3,
                "small": {
                  "id": 12,
                  "name": "small",
                  "type": 2,
                  "status": 0,
                  "use_type": 2,
                  "order": 3,
                  "uuid": "7dcd1980-abca-4e18-94e4-8d51836d7d83",
                  "alias": "7dcd1980.jpg",
                  "extension": "jpg",
                  "model_type": "Bboyyue\\Asset\\Model\\Asset",
                  "model_id": 4,
                  "user_id": 0,
                  "group_id": 0,
                  "created_at": "2022-05-06T06:19:26.000000Z",
                  "updated_at": "2022-05-06T06:19:27.000000Z",
                  "deleted_at": null,
                  "parent_id": 4
                },
                "xml": {
                  "id": 14,
                  "name": "4e01a982",
                  "type": 2,
                  "status": 0,
                  "use_type": 4,
                  "order": 5,
                  "uuid": "aeb750b9-6260-40b9-9bc0-a6f2904049f4",
                  "alias": "aeb750b9.xml",
                  "extension": "xml",
                  "model_type": "Bboyyue\\Asset\\Model\\Asset",
                  "model_id": 4,
                  "user_id": 0,
                  "group_id": 0,
                  "created_at": "2022-05-06T06:19:29.000000Z",
                  "updated_at": "2022-05-06T06:19:29.000000Z",
                  "deleted_at": null,
                  "parent_id": 4
                },
                "tiles": {
                  "id": 13,
                  "name": "4e01a982",
                  "type": 2,
                  "status": 0,
                  "use_type": 3,
                  "order": 4,
                  "uuid": "779b1fd1-102b-4e3d-bec9-e0995a432250",
                  "alias": "779b1fd1.tiles",
                  "extension": "tiles",
                  "model_type": "Bboyyue\\Asset\\Model\\Asset",
                  "model_id": 4,
                  "user_id": 0,
                  "group_id": 0,
                  "created_at": "2022-05-06T06:19:27.000000Z",
                  "updated_at": "2022-05-06T06:19:28.000000Z",
                  "deleted_at": null,
                  "parent_id": 4
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 5,
    "name": "测试模型根目录",
    "uuid": "09bf4ede-9ee0-44f8-8cd1-9210144a5e0a",
    "asset_type": 3,
    "work_type": 3,
    "option": "[]",
    "order": 1,
    "alias": "09bf4ede",
    "parent_id": 0,
    "folders": [
      {
        "id": 6,
        "name": "测试模型目录",
        "uuid": "47ffffb5-756f-4198-ad4b-d91b6f566428",
        "asset_type": 3,
        "work_type": 3,
        "option": "[]",
        "order": 1,
        "alias": "47ffffb5",
        "parent_id": 5,
        "folders": [
          {
            "id": 7,
            "name": "测试模型作品",
            "uuid": "a02bfcc7-1d3f-473d-91d9-7bcaad0b806f",
            "asset_type": 1,
            "work_type": 3,
            "option": "[]",
            "order": 1,
            "alias": "a02bfcc7",
            "parent_id": 6,
            "threes": [
              {
                "id": 8,
                "name": "测试模型",
                "uuid": "48e63d66-a70d-4745-b2cc-470903e8cf7c",
                "asset_type": 2,
                "work_type": 3,
                "option": "[]",
                "order": 1,
                "alias": "48e63d66",
                "parent_id": 7,
                "obj": {
                  "id": 10,
                  "name": "obj",
                  "type": 2,
                  "status": 0,
                  "use_type": 6,
                  "order": 2,
                  "uuid": "3ddb51e8-180e-4b0a-8387-67d23d34f00c",
                  "alias": "3ddb51e8.obj",
                  "extension": "obj",
                  "model_type": "Bboyyue\\Asset\\Model\\Asset",
                  "model_id": 8,
                  "user_id": 0,
                  "group_id": 0,
                  "created_at": "2022-05-06T06:19:19.000000Z",
                  "updated_at": "2022-05-06T06:19:19.000000Z",
                  "deleted_at": null,
                  "parent_id": 9
                },
                "mtl": {
                  "id": 11,
                  "name": "mtl",
                  "type": 2,
                  "status": 0,
                  "use_type": 8,
                  "order": 3,
                  "uuid": "3ef5857e-6440-4580-82d7-f43ce886d93b",
                  "alias": "3ef5857e.mtl",
                  "extension": "mtl",
                  "model_type": "Bboyyue\\Asset\\Model\\Asset",
                  "model_id": 8,
                  "user_id": 0,
                  "group_id": 0,
                  "created_at": "2022-05-06T06:19:26.000000Z",
                  "updated_at": "2022-05-06T06:19:26.000000Z",
                  "deleted_at": null,
                  "parent_id": 9
                }
              }
            ]
          }
        ]
      }
    ]
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