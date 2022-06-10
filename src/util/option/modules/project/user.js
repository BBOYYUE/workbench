import { v4 as uuidv4 } from "uuid";
export default {
  "name": "用户管理",
  "id": 7,
  "icon": 'document',
  "model": "user",
  "namespace": "project",
  "apiUrl": "http://192.168.10.10/api/v2/users",
  "uuid": uuidv4().substring(0, 5),
  "include": 'roles',
  "rule": {
    'canShow': ["show_all_user", "show_user"]
  },
  "create": {
    fields: [
      {
        name: "name",
        alias: "用户名",
        type: "text"
      },
      {
        name: "password",
        alias: "密码",
        type: "password"
      },
      {
        name: "phone",
        alias: "手机号码",
        type: "text"
      },
      {
        name: "email",
        alias: "邮箱",
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
      },
      {
        name: "name",
        alias: "用户名",
        type: "text"
      },
      {
        name: "password",
        alias: "密码",
        type: "password"
      },
      {
        name: "phone",
        alias: "手机号码",
        type: "text"
      },
      {
        name: "email",
        alias: "邮箱",
        type: "text"
      },
    ],
  },
  "list": {
    "actions": [
      {
        name: "创建用户",
        buttonType: "success",
        onclick: ["showDialogForm", "create"],
        canShow: ['type', 'neq', 'belongsToMany']
      },
      {
        name: "绑定用户",
        buttonType: "success",
        onclick: ["showDialogForm", "bind"],
        canShow: ['type', 'eq', 'belongsToMany']
      },
    ],
    "fields": [
      {
        name: "name",
        alias: "用户名",
        type: "buttonText",
        onclick: ['goToDetailByTableItem', 'uuid']
      },
      {
        name: "phone",
        alias: "手机号码",
        type: "text"
      },
      {
        name: "email",
        alias: "邮箱",
        type: "text"
      },
      {
        name: "actions",
        alias: '操作',
        type: "actions",
        align: "center",
        actions: [
          {
            name: "unbind",
            alias: "移除",
            type: "danger",
            tip: "确认移除?",
            onclick: ["unBindData", 'id'],
            canShow: ['type', 'eq', 'belongsToMany']
          },

        ]
      },
      // {
      //   name: "actions",
      //   alias: '操作',
      //   type: "actions",
      //   align: "center",
      //   actions: [
      //     {
      //       name: "delete",
      //       alias: "删除",
      //       type: "danger",
      //       tip: "确认删除?",
      //       onclick: ["deleteData", 'id'],
      //     },
      //   ]
      // },
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
        alias: "用户名",
        type: "text"
      },
      {
        name: "phone",
        alias: "手机号码",
        type: "text"
      },
      {
        name: "email",
        alias: "邮箱",
        type: "text"
      },
    ]
  },
  "belongsToMany": [{
    "page": 1,
    "module": 8
  }],
}