import { v4 as uuidv4 } from "uuid";
export default {
  "name": "全景作品",
  "id": 5,
  "panel": {},
  "icon": 'document',
  "model": "panorama",
  "namespace": "asset",
  "create": {
    fields: [{
      name: "name",
      alias: "全景名称",
      type: "text"
    }],
    api: ""
  },
  "update": {
    fields: [{
      name: "name",
      alias: "文件夹名称",
      type: "text"
    }, {
      name: "uuid",
      alias: "文件夹uuid",
      type: "text",
      disabled: true
    }],
    api: ""
  },
  "list": {
    "actions": [
      {
        name: "发布全景作品",
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
        name: "编辑全景",
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