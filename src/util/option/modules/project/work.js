import { v4 as uuidv4 } from "uuid";
export default {
  "name": "作品目录",
  "id": 4,
  "panel": {},
  "icon": 'document',
  "model": "folder",
  "namespace": "asset",
  "isSelfCorrelation": true,
  "selfCorrelationKey": "folders",
  "apiUrl": "",
  "create": {
    fields: [{
      name: "name",
      alias: "目录名称",
      type: "text"
    }],
    api: ""
  },
  "update": {
    fields: [{
      name: "name",
      alias: "目录名称",
      type: "text"
    }, {
      name: "uuid",
      alias: "目录uuid",
      type: "text",
      disabled: true
    }],
    api: ""
  },
  "list": {
    "actions": [
      {
        name: "创建目录",
        buttonType: "success",
        onclick: ["showDialogForm", "create"],
      },
    ],
    "fields": [
      {
        name: "name",
        alias: "目录名称",
        type: "buttonText",
        onclick: ['goToDetailByTableItem', 'uuid']
      },
    ],
  },
  "details": {
    "actions": [
      {
        name: "编辑目录",
        buttonType: "primary",
        onclick: ["showInlineForm", "update"],
      }
    ],
    "fields": [{
      name: "name",
      alias: "目录名称",
      type: "buttonText",
    }],
  },
  "hasMany": [{
    "page": 1,
    "module": 4,
    "canshow": ['asset_type', 'eq', 3]
  }, {
    "page": 1,
    "module": 5,
    "canshow": ['asset_type', 'eq', 1]
  }, {
    "page": 1,
    "module": 6,
    "canshow": ['asset_type', 'eq', 1]
  }],
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