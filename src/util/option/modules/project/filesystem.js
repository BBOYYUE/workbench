import { v4 as uuidv4 } from "uuid";
export default {
  "name": "文件夹",
  "id": 6,
  "panel": {},
  "icon": 'document',
  "model": "folder",
  "namespace": "filesystem",
  "isSelfCorrelation": true,
  "selfCorrelationKey": "childer",
  "apiUrl": "",
  "create": {
    fields: [{
      name: "name",
      alias: "文件夹名称",
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
        name: "编辑",
        buttonType: "primary",
        onclick: ["showWorkEditer", "update"],
      },
    ],
    "fields": [{
      name: "name",
      alias: "文件夹名称",
      type: "buttonText",
    }],
  },
  "hasMany": [{
    "page": 1,
    "module": 4,
  }, {
    "page": 1,
    "module": 5
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