import { v4 as uuidv4 } from "uuid";
export default {
  "name": "作品管理",
  "id": 5,
  "panel": {},
  "icon": 'document',
  "model": "works",
  "namespace": "asset",
  "apiUrl": "http://192.168.10.10/api/v2/works",
  "create": {
    fields: [{
      name: "name",
      alias: "作品名称",
      type: "text"
    }],
    api: ""
  },
  "update": {
    fields: [{
      name: "name",
      alias: "作品名称",
      type: "text"
    }, {
      name: "uuid",
      alias: "作品uuid",
      type: "text",
      disabled: true
    }],
    api: ""
  },
  "list": {
    "actions": [
      {
        name: "发布作品",
        buttonType: "success",
        onclick: ["showDialogForm", "create"],
      },
    ],
    "fields": [
      {
        name: "name",
        alias: "作品名称",
        type: "buttonText",
        onclick: ['goToDetailByTableItem', 'uuid']
      },
    ],
  },
  "details": {
    "actions": [
      {
        name: "编辑作品",
        buttonType: "primary",
        onclick: ["showWorkEditer", "_bank"],
      },
    ],
    "fields": [
      {
        name: "name",
        alias: "作品名称",
        type: "buttonText",
      }
    ],
  },
  "hasOne": {},
  "uuid": uuidv4().substring(0, 5),
  "button-group": [
    {
      "name": "一键加速"
    },
    {
      "name": "刷新项目信息"
    }
  ]
}