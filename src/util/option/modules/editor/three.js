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
                alias: "光源"
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
                name: "asset",
                alias: "资源",
                canGroup: true,
                actions: [
                    {
                        name: 'obj',
                        alias: '物体'
                    },
                    {
                        name: 'mtl',
                        alias: '材质'
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