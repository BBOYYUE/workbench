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
        name: "router",
        alias: '英文名',
        type: "text"
      }, 
      // {
      //   name: "type",
      //   alias: '模块类型',
      //   type: "select"
      // }
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
          name: "router",
          alias: '英文名',
          type: "text"
        }, 
        // {
        //   name: "type",
        //   alias: '模块类型',
        //   type: "select"
        // }
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
  "hasMany": [{
    "page": 1,
    "module": 5
  }],
  "button-group": {}
}