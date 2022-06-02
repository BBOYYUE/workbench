import { v4 as uuidv4 } from "uuid";
export default {
  "name": "作品管理",
  "id": 5,
  "panel": {},
  "icon": 'document',
  "model": "work",
  "namespace": "project",
  "apiUrl": "http://192.168.10.10/api/v2/works",
  "rule": {
    'canShow': ["show_all_work", "show_work"]
  },
  "create": {
    fields: [
      {
        name: "name",
        alias: "作品名称",
        type: "text"
      },
      {
        name: "work_type",
        alias: '作品类型',
        type: "select",
        apiUrl: "http://192.168.10.10/api/v2/getWorkType",
        filterField: "name",
        relation_model: "workType",
        relation_namespace: "dictionary"
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
        alias: "作品名称",
        type: "text"
      },
      {
        name: "work_type",
        alias: '作品类型',
        type: "select",
        apiUrl: "http://192.168.10.10/api/v2/getWorkType",
        filterField: "name",
        relation_model: "workType",
        relation_namespace: "dictionary"
      },
      {
        name: "uuid",
        alias: "作品uuid",
        type: "text",
        disabled: true
      }
    ],
  },
  "list": {
    "actions": [
      {
        name: "发布作品",
        buttonType: "success",
        onclick: ["showDialogForm", "create"],
      },
      {
        name: "绑定作品",
        buttonType: "success",
        onclick: ["showDialogForm", "bind"],
        canShow: ['type', 'eq', 'belongsToMany']
      }
    ],
    "fields": [
      {
        name: "name",
        alias: "作品名称",
        type: "buttonText",
        onclick: ['goToDetailByTableItem', 'uuid']
      },
      {
        name: "work_type",
        alias: '作品类型',
        type: "select",
        apiUrl: "http://192.168.10.10/api/v2/getWorkType",
        filterField: "name",
        relation_model: "workType",
        relation_namespace: "dictionary"
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
            canShow: ['type', 'neq', 'belongsToMany']
          },
          {
            name: "unbind",
            alias: "移除",
            type: "danger",
            tip: "确认移除?",
            onclick: ["unBindData", 'id'],
            canShow: ['type', 'eq', 'belongsToMany']
          },
          {
            name: "unbind",
            alias: "移除",
            type: "danger",
            tip: "确认移除?",
            onclick: ["unBindData", 'id'],
            canShow: ['type', 'eq', 'hasMany']
          },
        ]
      },
    ],
  },
  "details": {
    "actions": [
      {
        name: "编辑作品",
        buttonType: "primary",
        onclick: ["showWorkEditer", "_bank"],
      },
    ],
    "fields": [
      {
        name: "name",
        alias: "作品名称",
        type: "buttonText",
      },
      {
        name: "work_type",
        alias: '作品类型',
        type: "select",
        apiUrl: "http://192.168.10.10/api/v2/getWorkType",
        filterField: "name",
        relation_model: "workType",
        relation_namespace: "dictionary"
      },
    ],
  },
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