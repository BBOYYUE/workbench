import { v4 as uuidv4 } from "uuid";
export default {
  "name": "模型作品",
  "id": 6,
  "panel": {},
  "icon": 'document',
  "model": "three",
  "namespace": "asset",
  "create": {
    fields: [{
      name: "name",
      alias: "模型名称",
      type: "text"
    }],
    api: ""
  },
  "update": {
    fields: [{
      name: "name",
      alias: "模型名称",
      type: "text"
    }, {
      name: "uuid",
      alias: "模型uuid",
      type: "text",
      disabled: true
    }],
    api: ""
  },
  "list": {
    "actions": [
      {
        name: "创建模型作品",
        buttonType: "success",
        onclick: ["showDialogForm", "create"],
      },
    ],
    "fields": [
      {
        name: "name",
        alias: "模型名称",
        type: "buttonText",
        onclick: ['goToDetailByTableItem', 'uuid']
      },
    ],
  },
  "details": {
    "actions": [
      // {
      //   name: "发布作品",
      //   buttonType: "success",
      //   onclick: ["showInlineForm", "update"],
      // },
      {
        name: "编辑",
        buttonType: "primary",
        onclick: ["showWorkEditer", "_bank"],
      }
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