import { v4 as uuidv4 } from "uuid"

export default {
  name: "平面图编辑器",
  version: "3.0",
  id: 11,
  top: {},
  editor: {
    actions: [
      {
        name: "info",
        alias: "基本信息",
        actions: [
          {
            name: "img",
            alias: "切图",
            forms: [
              {
                name: "width",
                alias: "图片宽度"
              },
              {
                name: "height",
                alias: "图片高度",
                type: 'text'
              },
              {
                name: "top",
                alias: "据顶部距离",
                type: 'text'
              },
              {
                name: "left",
                alias: "距左侧距离",
                type: 'text'
              },
              {
                name: "slideIndex",
                alias: "轮播页码",
                type: 'text'
              },
            ]
          },
          {
            name: "layer",
            alias: "图层",
            forms: [
              {
                name: "name",
                alias: "图层名称"
              },
              {
                name: "zIndex",
                alias: "图层深度",
                type: 'text'
              },
              {
                name: "type",
                alias: "图层类型",
                type: 'select'
              },
              {
                name: "width",
                alias: "图层画布宽度",
                type: 'text'
              },
              {
                name: "height",
                alias: "图层画布高度",
                type: 'text'
              }
            ]
          },
          {
            name: "page",
            alias: "页面",
            forms: [
              {
                name: "name",
                alias: "名称",
                type: 'text'
              },
              {
                name: "mode",
                alias: "页面切换方式",
                type: 'select'
              },
            ]
          },
        ]
      },
      {
        name: 'animation',
        alias: "动画",
        actions: [
          {
            name: "startAnimation",
            alias: "入场动画",
            forms: [
              {
                name: "animationType",
                alias: "动画类型",
                type: "select"
              },
              {
                name: "animationDuration",
                alias: "动画持续时间",
                type: "text"
              },
            ]
          },
          {
            name: "loopAnimation",
            alias: "循环动画",
            forms: [
              {
                name: "animationType",
                alias: "动画类型",
                type: "select"
              },
              {
                name: "animationDuration",
                alias: "动画持续时间",
                type: "text"
              },
              {
                name: "animationTimes",
                alias: "动画展示次数",
                type: "text"
              },
            ]
          }
        ]
      },
      {
        name: "other",
        alias: "其他",
        actions: [
          {
            name: 'onclick',
            alias: "点击事件",
            forms: [
              {
                name: "name",
                alias: "事件类型",
                type: "select"
              },
              {
                name: "value",
                alias: "事件参数",
                type: "text"
              }
            ]
          },
          {
            name: "canshow",
            alias: "展示条件",
            forms: [
              {
                name: "name",
                alias: "条件类型",
                type: "select"
              },
              {
                name: "value",
                alias: "条件参数",
                type: "text"
              }
            ]
          },
        ]
      }
    ],
  },
  content: {
    actions: [
      {
        name: "visualizationEditor",
        alias: "可视化编辑器"
      },
      {
        name: "textEditor",
        alias: "文本编辑器"
      },
      {
        name: "preview",
        alias: "预览"
      }
    ]
  },
  footer: {
    actions: [
      {
        name: 'page',
        alias: '页面'
      },
      {
        name: 'layer',
        alias: '图层'
      },
      {
        name: "cutGraph",
        alias: "切图"
      }
    ]
  }
}