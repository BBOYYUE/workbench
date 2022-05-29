import { v4 as uuidv4 } from "uuid";
export default {
  "name": "产品信息",
  "id": 2,
  "icon": 'document',
  "model": "product",
  "namespace": "project",
  "apiUrl": "http://192.168.10.10/api/v2/products",
  "include": 'modules',
  "uuid": uuidv4().substring(0, 5),
  "create": {
    fields: [
      {
        name: "name",
        alias: "产品名称",
        type: "text"
      },
      {
        name: "type",
        alias: '产品类型',
        type: "select",
        apiUrl: "",
        filterField: "name"
      },
      {
        name: "project",
        alias: '所属项目',
        type: "select",
        apiUrl: "http://192.168.10.10/api/v2/projects",
        filterField: "name"
      }
    ],
  },
  "update": {
    fields: [
      {
        name: "name",
        alias: "产品名称",
        type: "text"
      }, 
      {
        name: "type",
        alias: '产品类型',
        type: "select",
        sourceUrl: ""
      }, 
      {
        name: "project",
        alias: '所属项目',
        type: "select",
        sourceUrl: ""
      }
    ],
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