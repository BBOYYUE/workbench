import { v4 as uuidv4 } from "uuid";
export default {
  "name": "角色管理",
  "id": 8,
  "icon": 'document',
  "model": "role",
  "namespace": "project",
  "apiUrl": "http://192.168.10.10/api/v2/roles",
  "uuid": uuidv4().substring(0, 5),
  "include": 'permissions',
  "rule": {
    'canShow': ["show_all_role", "show_role"]
  },
  "create": {
    "fields": [
      {
        name: "name",
        alias: "角色名",
        type: "text"
      },
    ],
  },
  "details": {
    "fields": [
      {
        name: "name",
        alias: "角色名",
        type: "text"
      },
    ]
  },
  "list": {
    "actions": [
      {
        name: "创建角色",
        buttonType: "success",
        onclick: ["showDialogForm", "create"],
        canShow: ['type', 'neq', 'belongsToMany']
      },
      {
        name: "绑定角色",
        buttonType: "success",
        onclick: ["showDialogForm", "bind"],
        canShow: ['type', 'eq', 'belongsToMany']
      }
    ],
    "fields": [
      {
        name: "id",
        alias: "id",
        type: "text"
      },
      {
        name: "name",
        alias: "角色名称",
        type: "buttonText",
        onclick: ['goToDetailByTableItem', 'uuid']
      },
    ],
  },
  "belongsToMany": [{
    "page": 1,
    "module": 9
  }],
}