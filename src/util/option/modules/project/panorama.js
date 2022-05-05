import { v4 as uuidv4 } from "uuid";
export default {
  "name": "全景作品",
  "id": 4,
  "panel": {},
  "icon": 'document',
  "model": "folder",
  "namespace": "asset",
  "isSelfCorrelation": true,
  "selfCorrelationKey": "folders",
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
        name: "创建文件夹",
        buttonType: "success",
        onclick: ["showDialogForm", "create"],
      },
    ],
    "fields": [
      {
        name: "name",
        alias: "文件夹名称",
        type: "buttonText",
        onclick: ['goToDetailByTableItem', 'uuid']
      },
    ],
  },
  "details": {
    "actions": [
      {
        name: "发布作品",
        buttonType: "success",
        onclick: ["showInlineForm", "update"],
      },
      {
        name: "编辑",
        buttonType: "primary",
        onclick: ["showInlineForm", "update"],
      }
    ],
    "fields": [
      {
        name: "name",
        alias: "文件夹名称",
        type: "buttonText",
      }
    ],
  },
  "hasMany": [{
    "page": 1,
    "module": 4,
    "name": 'folder',
    "canShow": [[
      'parent_id', 'neq', 0
    ]]
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