import { v4 as uuidv4 } from "uuid";
export default {
  "name": "产品信息",
  "id": 2,
  "icon": 'document',
  "model": "product",
  "namespace": "project",
  "uuid": uuidv4().substring(0, 5),
  "panel": {},
  "list": {
    "actions": [
      {
        name: "新增",
        buttonType: "success",
        onclick: ["showDialogForm", "createField"],
      },
    ],
    "fields": [
      {
        name: "name",
        alias: "产品名称",
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
      alias: "产品名称",
      type: "buttonText",
    }]
  },
  "hasMany": [{
    "page": 1,
    "module": 3
  }],
  "button-group": {}
}