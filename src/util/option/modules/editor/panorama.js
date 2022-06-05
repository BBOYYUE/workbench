import { v4 as uuidv4 } from "uuid"

export default {
    name: "全景编辑器",
    version: "3.0",
    id: 12,
    top: {},
    editor: {
        actions: [
            {
                name: 'view',
                alias: "视角",
                actions: [
                    {
                        name: 'default',
                        alias: "默认角度",
                    },
                    {
                        name: 'max',
                        alias: "最小角度",
                    },
                    {
                        name: 'min',
                        alias: "最小角度",
                    },
                    {
                        name: 'verticalRange',
                        alias: "垂直可视范围",
                    },
                    {
                        name: 'horizontalRange',
                        alias: "水平可视范围",
                    },
                ]
            },
            {
                name: 'flag',
                alias: "标牌"
            },
            {
                name: 'hotspot',
                alias: "热点"
            },
            {
                name: "text",
                alias: "文本"
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
                name: "asset",
                alias: "资源",
                canGroup: true,
                groups: [
                    {
                        name: "default",
                        alias: "默认分组",
                    },
                    {
                        name: "next",
                        alias: "默认分组2",
                    }
                ],
                actions: [
                    {
                        name: 'pano',
                        alias: '场景'
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