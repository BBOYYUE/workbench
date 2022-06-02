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
  "rule": {
    'canShow': ["show_all_product", "show_product"]
  },
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
        apiUrl: "http://192.168.10.10/api/v2/getProductType",
        filterField: "name",
        relation_model: "productType",
        relation_namespace: "dictionary"
      },
      {
        name: "project_id",
        alias: '所属项目',
        type: "select",
        apiUrl: "http://192.168.10.10/api/v2/projects",
        filterField: "name",
        relation_model: "project",
        relation_namespace: "project"
      },

    ],
  },
  "update": {
    fields: [
      {
        name: "id",
        alias: "id",
        type: "text",
        disabled: true
      },
      {
        name: "name",
        alias: "产品名称",
        type: "text"
      },
      {
        name: "type",
        alias: '产品类型',
        type: "select",
        apiUrl: "http://192.168.10.10/api/v2/getProductType",
        filterField: "name",
        relation_model: "productType",
        relation_namespace: "dictionary"
      },
      {
        name: "project_id",
        alias: '所属项目',
        type: "select",
        apiUrl: "http://192.168.10.10/api/v2/projects",
        filterField: "name",
        relation_model: "project",
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
        alias: "产品名称",
        type: "buttonText",
        onclick: ['goToDetailByTableItem', 'uuid']
      },
      {
        name: "uuid",
        alias: "uuid",
        type: "text"
      },
      {
        name: "type",
        alias: '产品类型',
        type: "select",
        apiUrl: "http://192.168.10.10/api/v2/getProductType",
        filterField: "name",
        relation_model: "productType",
        relation_namespace: "dictionary"
      },
      {
        name: "project_id",
        alias: '所属项目',
        type: "select",
        apiUrl: "http://192.168.10.10/api/v2/projects",
        filterField: "name",
        relation_model: "project",
        relation_namespace: "project"
      },
      {
        name: "actions",
        alias: '操作',
        type: "actions",
        align: "center",
        actions: [
          {
            name: "delete",
            alias: "删除",
            type: "danger",
            tip: "确认删除?",
            onclick: ["deleteData", 'id'],
          },
        ]
      },
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
        alias: "产品名称",
        type: "text",
      },
      {
        name: "type",
        alias: '产品类型',
        type: "select",
        apiUrl: "http://192.168.10.10/api/v2/getProductType",
        filterField: "name",
        relation_model: "productType",
        relation_namespace: "dictionary"
      },
      {
        name: "project_id",
        alias: '所属项目',
        type: "select",
        apiUrl: "http://192.168.10.10/api/v2/projects",
        filterField: "name",
        relation_model: "project",
        relation_namespace: "project"
      }]
  },
  "hasMany": [{
    "page": 1,
    "module": 3
  }],

  "button-group": {}
}