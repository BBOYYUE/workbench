import { v4 as uuidv4 } from "uuid";
export default {
  "name": "模块信息",
  "id": 3,
  "icon": 'document',
  "model": "module",
  "namespace": "project",
  "apiUrl": "http://192.168.10.10/api/v2/modules",
  "uuid": uuidv4().substring(0, 5),
  "create": {
    fields: [
      {
        name: "name",
        alias: "模块名称",
        type: "text"
      },
      {
        name: "product_id",
        alias: '所属产品',
        type: "select",
        apiUrl: "http://192.168.10.10/api/v2/products",
        filterField: "name",
        relation_model: "product",
        relation_namespace: "project"
      }
    ],
  },
  "update": {
    fields: [
      {
        name: "name",
        alias: "模块名称",
        type: "text"
      },
      {
        name: "product_id",
        alias: '所属产品',
        type: "select",
        apiUrl: "http://192.168.10.10/api/v2/products",
        filterField: "name",
        relation_model: "product",
        relation_namespace: "project"
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
        alias: "模块名称",
        type: "buttonText",
        onclick: ['goToDetailByTableItem', 'uuid']
      },
      {
        name: "uuid",
        alias: "uuid",
        type: "text",
      },
      {
        name: "product_id",
        alias: '所属产品',
        type: "select",
        apiUrl: "http://192.168.10.10/api/v2/products",
        filterField: "name",
        relation_model: "product",
        relation_namespace: "project"
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
    "fields": [{
      name: "name",
      alias: "模块名称",
      type: "buttonText",
    },
    {
      name: "product_id",
      alias: '所属产品',
      type: "select",
      apiUrl: "http://192.168.10.10/api/v2/products",
      filterField: "name",
      relation_model: "product",
      relation_namespace: "project"
    }]
  },
  "hasMany": [{
    "page": 1,
    "module": 5
  }],
  "button-group": {}
}