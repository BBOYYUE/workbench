import { v4 as uuidv4 } from "uuid"

export default {
  name: "全景编辑器",
  version: "3.0",
  id: 12,
  top: {},
  editor: {
    actions: [
      {
        name: 'info',
        alias: "基本信息",
        actions: [
          {
            name: 'pano',
            alias: "场景",
            forms: [
              {
                name: "name",
                alias: "场景名称",
                type: "text"
              }
            ]
          },
        ]
      },
      {
        name: 'view',
        alias: "视角",
        actions: [
          {
            name: 'defaultFov',
            alias: "初始视角",
            forms: [
              {
                name: "fov",
                alias: "把当前视角设为初始视角",
                type: "buttonText"
              }
            ]
          },
          {
            name: 'defaultFovRange',
            alias: "视角范围限制",
            forms: [
              {
                name: 'defaultFovRange',
                alias: "视角范围限制",
                type: "slider",
                range: true,
                min: -180,
                max: 180
              }
            ]
          },
          {
            name: 'verticalRangeFov',
            alias: "垂直视角限制",
            forms: [
              {
                name: 'verticalRangeFov',
                alias: "视角范围限制",
                type: "slider",
                range: true,
                min: -180,
                max: 180
              }
            ]
          },
          {
            name: 'horizontalRangeFov',
            alias: "水平视角限制",
            forms: [
              {
                name: 'horizontalRangeFov',
                alias: "视角范围限制",
                type: "slider",
                range: true,
                min: -180,
                max: 180
              }
            ]
          },
        ]
      },
      {
        name: 'flagGroup',
        alias: "标牌",
        actions: [
          {
            name: 'flagGroup',
            alias: "标牌分组",
            forms: [
              {
                name: 'flagGroup',
                alias: "分组名称",
                type: "text"
              },
              {
                name: 'flagGroupFov',
                alias: "把当前视角设置为分组初始视角",
                type: "buttonText"
              },
              {
                name: 'hiddenFlagGroup',
                alias: "隐藏分组",
                type: "checkbox"
              },
            ]
          },
          {
            name: 'flag',
            alias: "标牌",
            forms: [
              {
                name: 'name',
                alias: "标牌名称",
                type: 'text'
              },
              {
                name: 'type',
                alias: "标牌类型",
                type: 'select'
              },
              {
                name: 'line-height',
                alias: "线长",
                type: 'slider'
              },
            ]
          },
          {
            name: 'hotspot',
            alias: "热点",
            forms: [
              {
                name: 'name',
                alias: "热点名称",
                type: 'text'
              },
              {
                name: 'type',
                alias: "热点类型",
                type: 'select'
              }
            ]
          },
        ]
      },
      {
        name: "other",
        alias: "其他",
        actions: [
          {
            name: 'text',
            alias: "文本",
            forms: [
              {
                name: 'content',
                alias: "文本内容",
                type: 'text'
              },
              {
                name: 'x',
                alias: "文本位置 x",
                type: 'text'
              },
              {
                name: 'y',
                alias: "文本位置 y",
                type: 'text'
              },
              {
                name: 'size',
                alias: "字体大小",
                type: 'select'
              },
            ]
          }
        ]
      },
    ],
  },
  content: {
    actions: [
      {
        name: "visualizationEditor",
        alias: "可视化编辑"
      },
      {
        name: "textEditor",
        alias: "文本编辑"
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
        name: 'scene',
        alias: '场景'
      },
      {
        name: 'map',
        alias: "地图"
      }
    ]
  }
}