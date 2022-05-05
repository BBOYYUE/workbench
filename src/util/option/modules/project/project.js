import { v4 as uuidv4 } from "uuid";
export default {
  "name": "项目信息",
  "id": 1,
  "panel": {},
  "icon": 'document',
  "model": "project",
  "namespace": "project",
  "create": {
    fields: [{
      name: "name",
      alias: "项目名称",
      type: "text"
    }],
    api: ""
  },
  "update": {
    fields: [{
      name: "name",
      alias: "项目名称",
      type: "text"
    }, {
      name: "uuid",
      alias: "项目uuid",
      type: "text",
      disabled: true
    }],
    api: ""
  },
  "list": {
    "actions": [
      {
        name: "新增",
        buttonType: "success",
        onclick: ["showDialogForm", "create"],
      },
    ],
    "fields": [
      {
        name: "name",
        alias: "项目名称",
        type: "buttonText",
        onclick: ['goToDetailByTableItem', 'uuid']
      },
      {
        name: "uuid",
        alias: "uuid",
        type: "text"
      },
      {
        name: "address",
        alias: "地址",
        type: "text"
      },
      {
        name: "phone",
        alias: "联系方式",
        type: "text"
      },
      {
        name: "slogan",
        alias: "slogan",
        type: "text"
      }
    ],
  },
  "details": {
    "actions": [
      {
        name: "编辑",
        buttonType: "primary",
        onclick: ["showInlineForm", "update"],
      },
    ],
    "fields": [
      {
        name: "name",
        alias: "项目名称",
        type: "buttonText",
      },
      {
        name: "uuid",
        alias: "uuid",
        type: "text"
      },
      {
        name: "address",
        alias: "地址",
        type: "text"
      },
      {
        name: "phone",
        alias: "联系方式",
        type: "text"
      },
      {
        name: "slogan",
        alias: "slogan",
        type: "text"
      }
    ],
  },
  "hasMany": [{
    "page": 1,
    "module": 2
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