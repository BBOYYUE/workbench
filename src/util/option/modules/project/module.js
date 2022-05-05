import { v4 as uuidv4 } from "uuid";
export default {
  "name": "模块信息",
  "id": 3,
  "icon": 'document',
  "model": "module",
  "namespace": "project",
  "uuid": uuidv4().substring(0, 5),
  "panel": {},
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
        alias: "模块名称",
        type: "buttonText",
        onclick: ['goToDetailByTableItem', 'uuid']
      },
      {
        name: "uuid",
        alias: "uuid",
        type: "text"
      },
    ],
  },
  "details": {
    "actions": [],
    "fields": [{
      name: "name",
      alias: "模块名称",
      type: "buttonText",
    }]
  },
  "button-group": {}
}