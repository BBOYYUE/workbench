<template>
    <base-editor>
        <template v-slot:header>
            <div class="h-full flex flex-col justify-center">
                <div class="text-white text-xl ml-2" v-show="this.activeModule">
                    {{ moduleName }}
                    <span class="text-base">{{ moduleVersion }}</span>
                </div>
            </div>
        </template>
        <template v-slot:left>
            <div class="h-full w-full" id="left">
                <el-menu>
                    <el-sub-menu
                        :index="item.name"
                        v-for="(item, x) in moduleEditor.actions"
                        :key="item"
                    >
                        <template #title>
                            <span>{{ item.alias }}</span>
                        </template>
                        <el-menu-item
                            :index="x + '-' + y"
                            v-for="(action, y) in item.actions"
                            :key="action"
                            @click="setActiveAction(action)"
                            >{{ action.alias }}</el-menu-item
                        >
                    </el-sub-menu>
                </el-menu>
            </div>
        </template>
        <template v-slot:content>
            <div class="w-full h-full flex flex-col" id="content">
                <div class="w-full h-8 bg-gray-700 flex flex-row justify-end">
                    <div
                        v-for="item in this.moduleContent.actions"
                        :key="item"
                        class="h-full flex flex-col justify-center mx-1"
                    >
                        <div
                            class="p-1 rounded-md text-gray-500"
                            style="font-size: 0.5rem"
                            @click="setActiveContent(item)"
                            :class="
                                activeContent.name == item.name
                                    ? 'text-gray-300'
                                    : 'text-gray-500'
                            "
                        >
                            {{ item.alias }}
                        </div>
                    </div>
                </div>
                <div v-show="activeContent.name === 'textEditor'">
                    <vue-codemirror v-model="code" />
                </div>
            </div>
        </template>
        <template v-slot:right> </template>
        <template v-slot:footer>
            <div class="h-full" id="footer">
                <el-tabs type="border-card" class="h-full">
                    <el-tab-pane
                        :label="footer.alias"
                        v-for="footer in moduleFooter.actions"
                        :key="footer"
                        class="h-full"
                    >
                        <el-tabs
                            :closable="true"
                            tabPosition="left"
                            @tab-remove="tabRemove"
                            class="h-full"

                        >
                            <el-tab-pane
                                :label="group.alias"
                                v-for="group in footer.groups"
                                :key="group"
                                class="h-full"
                            >
                                <el-tabs
                                    type="border-card"
                                    class="h-full"
                                >
                                    <el-tab-pane
                                        :label="action.alias"
                                        v-for="action in footer.actions"
                                        :key="action"
                                        class="h-full"
                                    ></el-tab-pane>
                                </el-tabs>
                            </el-tab-pane>
                        </el-tabs>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </template>
    </base-editor>
</template>
<script>
/**
 * 编辑器操作逻辑...
 * 上传文件 -> 文件分组 -> 分析文件 -> 生成配置json -> 修改配置项 -> 更新配置文件
 *
 * 1. 文件上传页面, 展示文件列表, 单张全景图为一个资源, 需要一个分组功能,
 * 2. 编辑页面, 可视化编辑器 和 json 编辑器
 */
import baseEditor from "@/module/base-editor.vue";
import { mapState } from "vuex";
import * as MutationType from "../MutationType";
import "./work-editor.scss";
export default {
    components: { baseEditor },
    props: {
        workType: String,
        assetType: String,
        uuid: String,
    },
    data() {
        return {
            activeAction: {},
            activeContent: {},
            code: "",
        };
    },
    computed: mapState({
        option: (state) => state.option.option,
        page: (state) => state.option.page[2],
        module: (state) => state.option.module,
        activeModule() {
            switch (this.workType) {
                case "1":
                    return this.module[12];
                case "2":
                    return this.module[11];
                case "3":
                    return this.module[13];
            }
        },
        moduleName() {
            return this.activeModule ? this.activeModule.name : "";
        },
        moduleVersion() {
            return this.activeModule ? this.activeModule.version : "";
        },
        moduleContent() {
            return this.activeModule
                ? this.activeModule.content
                : { actions: [] };
        },
        moduleEditor() {
            return this.activeModule
                ? this.activeModule.editor
                : { actions: [] };
        },
        moduleFooter() {
            return this.activeModule
                ? this.activeModule.footer
                : { actions: [] };
        },
    }),
    methods: {
        setActiveAction(action) {
            this.activeAction = action;
        },
        setActiveContent(action) {
            this.activeContent = action;
            console.log(this.activeContent);
        },
        tabRemove() {},
        tabAdd() {},
        authGates() {
            let user = localStorage.getItem("user");
            if (user && user != "undefined" && Object.keys(user).length > 0) {
                console.log(user);
                let auth = JSON.parse(user);
                this.$store.commit(
                    "auth/" + MutationType.SET_ACCESS_TOKEN,
                    auth.access_token
                );
                this.$store.dispatch(
                    "auth/" + MutationType.AUTHENTICATION_UPDATE
                );
                this.$store.commit("setFetching", false);
            } else {
                this.$message.error("登陆失效!");
                this.$router.push("login");
            }
        },
    },
    name: "work-edit",
    mounted() {
        let entities = this.$store.getters["option/entities"];
        this.$store.commit("option/" + [MutationType.SET_MORE], {
            type: "module",
            value: entities.module,
        });
        this.$store.commit("option/" + [MutationType.SET_MORE], {
            type: "page",
            value: entities.page,
        });
        this.$store.commit("option/" + [MutationType.SET_MORE], {
            type: "option",
            value: entities.option,
        });
        this.$store.dispatch("dictionary/getDictionary");
        this.authGates();
        console.log(this.activeModule);
    },

    setup() {},
};
</script>
