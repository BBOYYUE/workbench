import { v4 as uuidv4 } from "uuid";


/**
 * 作品目录管理
 * 
 */
export default {
  "name": "作品目录",
  "id": 4,
  "panel": {},
  "icon": 'document',
  "model": "folders",
  "namespace": "asset",
  "isSelfCorrelation": true,
  "selfCorrelationKey": "folders",
  "apiUrl": "http://192.168.10.10/api/v2/assets",
  "include": ['folders', 'works'],
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
    }],
    api: ""
  },
  "update": {
    fields: [{
      name: "name",
      alias: "目录名称",
      type: "text"
    }, {
      name: "uuid",
      alias: "目录uuid",
      type: "text",
      disabled: true
    }],
    api: ""
  },
  "list": {
    "actions": [
      {
        name: "创建目录",
        buttonType: "success",
        onclick: ["showDialogForm", "create"],
      },
    ],
    "fields": [
      {
        name: "name",
        alias: "目录名称",
        type: "buttonText",
        onclick: ['goToDetailByTableItem', 'uuid']
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
      "canshow": ['asset_type', 'eq', 3]
    },
    // {
    //   "page": 1,
    //   "module": 5,
    //   "canshow": ['asset_type', 'eq', 1]
    // },
    {
      "page": 1,
      "module": 5,
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