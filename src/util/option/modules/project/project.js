import { v4 as uuidv4 } from "uuid";
export default {
  "name": "项目信息",
  "id": 1,
  "icon": 'document',
  "model": "project",
  "namespace": "project",
  "apiUrl": "http://192.168.10.10/api/v2/projects",
  "uuid": uuidv4().substring(0, 5),
  "include": 'products,users',
  "rule": {
    'canShow': ["show_all_project", "show_project"]
  },
  "sort": [
    {
      name: "创建日期",
      value: "created_at"
    },
  ],
  "filter": [
    {
      name: "名称",
      value: "name"
    }, {
      name: "uuid",
      value: "uuid"
    }
  ],

  "create": {
    fields: [
      {
        name: "name",
        alias: "项目名称",
        type: "text"
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
      }, {
        name: "name",
        alias: "项目名称",
        type: "text"
      }, {
        name: "address",
        alias: '项目地址',
        type: "text"
      }, {
        name: "phone",
        alias: '联系方式',
        type: "text"
      }, {
        name: "slogan",
        alias: "slogan",
        type: "text"
      }],
  },
  "list": {
    "actions": [
      {
        name: "新增",
        buttonType: "success",
        onclick: ["showDialogForm", "create"],
        hasRule: ['permissionList', 'has', 'create_project']
      },
    ],
    "fields": [
      {
        name: "name",
        alias: "项目名称",
        type: "buttonText",
        onclick: ['goToDetailByTableItem', 'uuid']
      },
      {
        name: "uuid",
        alias: "uuid",
        type: "text"
      },
      {
        name: "address",
        alias: "地址",
        type: "text"
      },
      {
        name: "phone",
        alias: "联系方式",
        type: "text"
      },
      {
        name: "slogan",
        alias: "slogan",
        type: "text"
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
            hasRule: [['permissionList', 'has', 'delete_project'], ['isOwner', 'method', true]]
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
        hasRule: [['permissionList', 'has', 'edit_product'], ['isOwner', 'method', true]]
      },
    ],
    "fields": [
      {
        name: "name",
        alias: "项目名称",
        type: "text",
      },
      {
        name: "uuid",
        alias: "uuid",
        type: "text"
      },
      {
        name: "address",
        alias: "地址",
        type: "text"
      },
      {
        name: "phone",
        alias: "联系方式",
        type: "text"
      },
      {
        name: "slogan",
        alias: "slogan",
        type: "text"
      }
    ],
  },
  "hasMany": [{
    "page": 1,
    "module": 2
  }],
  "belongsToMany": [{
    "page": 1,
    "module": 7
  }],
  "button-group": [
    {
      "name": "一键加速"
    },
    {
      "name": "刷新项目信息"
    }
  ]
}