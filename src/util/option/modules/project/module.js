import { v4 as uuidv4 } from "uuid";
export default {
  "name": "模块信息",
  "id": 3,
  "icon": 'document',
  "model": "module",
  "namespace": "project",
  "apiUrl": "http://192.168.10.10/api/v2/modules",
  "uuid": uuidv4().substring(0, 5),
  "include": 'works',
  "rule": {
    'canShow': ["show_all_module", "show_module"]
  },
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
        name: "id",
        alias: "id",
        type: "text",
        disabled: true
      },
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
        hasRule: ['permissionList', 'has', 'create_module']
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
            hasRule: [['permissionList', 'has', 'delete_module'], ['isOwner', 'method', true]]
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
        hasRule: [['permissionList', 'has', 'edit_module'], ['isOwner', 'method', true]]
      },
    ],
    "fields": [
      {
        name: "name",
        alias: "模块名称",
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
    ]
  },
  "belongsToMany": [{
    "page": 1,
    "module": 5
  }],
  "button-group": {}
}