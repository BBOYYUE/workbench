import { v4 as uuidv4 } from "uuid";
export default {
  "name": "权限管理",
  "id": 9,
  "icon": 'document',
  "model": "permission",
  "namespace": "project",
  "apiUrl": "http://192.168.10.10/api/v2/permissions",
  "uuid": uuidv4().substring(0, 5),
  "rule": {
    'canShow': ["show_all_permission", "show_permission"]
  },
  "create": {
    fields: [
      {
        name: "name",
        alias: "权限名",
        type: "text"
      },
    ],
  },
  "list": {
    "actions": [
      {
        name: "创建权限",
        buttonType: "success",
        onclick: ["showDialogForm", "create"],
        canShow: ['type', 'neq', 'belongsToMany']
      },
      {
        name: "绑定权限",
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
        alias: "权限名称",
        type: "text",
      },
    ],
  },
}