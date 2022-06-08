import { v4 as uuidv4 } from "uuid"

export default {
  name: "模型编辑器",
  version: "3.0",
  id: 13,
  top: {},
  editor: {
    actions: [
      {
        name: 'light',
        alias: "光源",
        actions: [
          {
            name: "ambientLight",
            alias: "环境光",
            forms: [
              {
                name: "intensity",
                alias: "强度"
              },
              {
                name: "color",
                alias: "颜色"
              },
            ]
          },
          {
            name: "directionalLight",
            alias: "平行光",
            forms: [
              {
                name: "intensity",
                alias: "强度"
              },
              {
                name: "postion",
                alias: "位置",
              },
              {
                name: "color",
                alias: "颜色"
              },
            ]
          }
        ]
      },
      {
        name: 'camera',
        alias: "相机"
      },
      {
        name: "controller",
        alias: "控制器"
      },
      {
        name: "shadow",
        alias: "阴影"
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
        alias: "可视化编辑器"
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
        name: 'obj',
        alias: '物体'
      },
      {
        name: 'mtl',
        alias: '材质'
      },
    ]
  }
}