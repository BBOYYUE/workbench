import { v4 as uuidv4 } from "uuid"

export default {
    name: "平面图编辑器",
    version: "3.0",
    id: 11,
    top: {},
    editor: {
        actions: [
            {
                name: 'animation',
                alias: "动画"
            },
            {
                name: "zIndex",
                alias: "图层深度"
            },
            {
                name: "type",
                alias: "图层类型"
            },
            {
                name: 'onclick',
                alias: "点击事件"
            },
            {
                name: "canshow",
                alias: "展示条件"
            },
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
                name: "asset",
                alias: "资源",
                canGroup: true,
                actions: [
                    {
                        name: 'page',
                        alias: '页面'
                    },
                    {
                        name: 'layer',
                        alias: '图层'
                    },
                ]
            },
            {
                name: "file",
                alias: "文件"
            },
        ]
    }
}