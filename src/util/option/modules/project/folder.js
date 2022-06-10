import { v4 as uuidv4 } from "uuid";


/**
 * 作品目录管理
 * 
 */
export default {
  "name": "作品目录",
  "id": 4,
  "icon": 'document',
  "model": "folder",
  "namespace": "project",
  "isSelfCorrelation": true,
  "selfCorrelationKey": "folders",
  "apiUrl": "http://192.168.10.10/api/v2/assets",
  "include": ['folders', 'works'],
  "rule": {
    'canShow': ["show_all_asset", "show_asset"]
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
    fields: [{
      name: "name",
      alias: "目录名称",
      type: "text"
    }, {
      name: "parent_id",
      alias: '父级目录',
      type: "select",
      apiUrl: "http://192.168.10.10/api/v2/assets",
      filterField: "name",
      relation_model: "folders",
      relation_namespace: "project",
      canShow: ['type', 'eq', 'hasMany']
    }],
    api: ""
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
        alias: "目录名称",
        type: "text"
      },
      {
        name: "parent_id",
        alias: '父级目录',
        type: "select",
        apiUrl: "http://192.168.10.10/api/v2/assets",
        filterField: "name",
        relation_model: "folders",
        relation_namespace: "project",
        canShow: ['type', 'eq', 'hasMany']
      }],
    api: ""
  },
  "list": {
    "actions": [
      {
        name: "创建目录",
        buttonType: "success",
        onclick: ["showDialogForm", "create"],
        canShow: ['type', 'neq', 'list']
      },
    ],
    "fields": [
      {
        name: "name",
        alias: "目录名称",
        type: "buttonText",
        onclick: ['goToDetailByTableItem', 'uuid']
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
            hasRule: [['permissionList', 'has', 'delete_asset'], ['isOwner', 'method', true]]
          },
        ]
      },
    ],
  },
  "details": {
    "actions": [
      {
        name: "编辑目录",
        buttonType: "primary",
        onclick: ["showInlineForm", "update"],
      }
    ],
    "fields": [{
      name: "name",
      alias: "目录名称",
      type: "buttonText",
    }],
  },

  /**
   * 理论上后台可以有多个页面, page 为页面id. 更多的page 在 /util/option/pages 中添加
   * 这里表示关联别的模块, 这里目录有 asset_type , 
   * 只有asset_type等于指定值的目录才会和莫格模块进行关联 
   * 
   */
  "hasMany": [
    /**
     * 自关联
     */
    {
      "page": 1,
      "module": 4,
      "canShow": ['asset_type', 'eq', 3]
    },
  ],
  "belongsToMany": [{
    "page": 1,
    "module": 5
  }],
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