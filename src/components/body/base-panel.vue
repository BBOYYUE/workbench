<template>
    <el-card>
        <template #header>
            <div class="flex flex-row justify-between">
                <div>
                    <el-icon class="mr-3 font-semibold" @click="goBack()">
                        <back />
                    </el-icon>
                    <span class="text-lg font-semibold">{{ name }}面板</span>
                </div>
                <div class="">
                    <el-button
                        v-for="item in actions"
                        :type="item.buttonType"
                        :key="item"
                        @click="onPanelkActionClick(item.onclick)"
                        >{{ item.name }}</el-button
                    >
                </div>
            </div>
        </template>
        <div v-if="inlineVisible">
            <el-form>
                <div v-for="item in inlineField" :key="item">
                    <el-form-item
                        :label="item.alias + ':'"
                        v-if="item.type === 'text'"
                    >
                        <el-input
                            v-model="form[item.name]"
                            :disabled="item.disabled"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="item.alias + ':'"
                        v-else-if="item.type === 'select'"
                    >
                        <el-select
                            class="w-full"
                            v-model="form[item.name]"
                            filterable
                            remote
                            :remote-method="
                                (keyword) => {
                                    // 这里之所以这样写, 是因为当前作用域既有 apiurl 又有keyword
                                    this.selectRemoteMethod(
                                        item.name,
                                        item.apiUrl,
                                        item.filterField,
                                        keyword
                                    );
                                }
                            "
                            placeholder="请输入"
                            clearable
                            no-data-text="没有数据"
                        >
                            <el-option
                                v-for="item in selectOption[item.name]"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="flex flex-row justify-end">
                    <el-button @click="this.inlineVisible = false"
                        >取消</el-button
                    >
                    <el-button @click="this.updateData()" type="success"
                        >保存</el-button
                    >
                </div>
            </el-form>
        </div>
        <div v-else>
            <el-descriptions v-show="fields">
                <el-descriptions-item
                    v-for="item in fields"
                    :key="item.name"
                    :label="item.alias"
                >
                    {{ panelData[item.name] }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </el-card>
</template>
<script>
import { Back } from "@element-plus/icons-vue";
import * as MutationType from "../../MutationType";
import axios from "axios";
import { isArray } from "@vue/shared";
export default {
    components: { Back },
    props: { option: Object },
    setup() {},
    computed: {
        info() {
            return { name: "name", label: "项目名称" };
        },
        namespace() {
            return this.option && this.option.namespace
                ? this.option.namespace
                : "";
        },
        name() {
            return this.option && this.option.name ? this.option.name : "";
        },
        details() {
            return this.option ? this.option.details : "";
        },
        create() {
            return this.option && this.inlineFormType && this.option.create
                ? this.option.create
                : [];
        },
        update() {
            return this.option && this.inlineFormType && this.option.update
                ? this.option.update
                : [];
        },
        inlineField() {
            return this[this.inlineFormType]
                ? this[this.inlineFormType].fields
                : [];
        },
        inlineApi() {
            return this[this.inlineFormType]
                ? this[this.inlineFormType].api
                : [];
        },

        actions() {
            return this.option &&
                this.option.details &&
                this.option.details.actions
                ? this.option.details.actions
                : "";
        },
        fields() {
            return this.option &&
                this.option.details &&
                this.option.details.fields
                ? this.option.details.fields
                : "";
        },
        model() {
            return this.option && this.option.model ? this.option.model : "";
        },
        entities() {
            return this.$store.getters[this.namespace + "/entities"];
        },
        storeState() {
            return this.$store.state[this.namespace];
        },
        modelData() {
            return this.model && this.storeState[this.model]
                ? this.storeState[this.model]
                : {};
        },
        activeDataId() {
            return this.$store.state.option.activeDataId;
        },
        panelData() {
            return this.activeDataId && this.modelData[this.activeDataId]
                ? this.modelData[this.activeDataId]
                : [];
        },
    },
    methods: {
        selectRemoteMethod(name, apiUrl, keyword) {
            this.selectOption[name] = []
            axios
                .get(apiUrl + "?filter[" + name + "]=" + keyword)
                .then((res) => {
                    if (res.data.data) {
                        res.data.data.forEach(element => {
                             this.selectOption[name].push({
                                 value: element.id,
                                 label: element.name
                             })
                        });
                    }
                });
        },
        onPanelkActionClick(onclick) {
            if (!onclick) return;
            if (isArray(onclick[0])) {
                for (let i = 0; i < onclick.length; i++) {
                    this.onPanelkActionClick(onclick[i]);
                }
            } else {
                this[onclick[0]](onclick[1]);
            }
        },
        goBack() {
            this.$store.commit("option/" + [MutationType.SET_MORE], {
                type: "activeType",
                value: 1,
            });
        },
        showInlineForm(field) {
            this.inlineFormType = field;
            this.inlineVisible = true;

            for (let item in this.inlineField) {
                let field = this.inlineField[item].name;
                this.form[field] = this.panelData[field];
            }
        },
        showWorkEditer(field) {
            let work_type = this.panelData.work_type;
            let asset_type = this.panelData.asset_type;
            let asset_uuid = this.panelData.uuid;
            window.open(
                location.href +
                    "work-editor?work_type=" +
                    work_type +
                    "&asset_type=" +
                    asset_type +
                    "&uuid=" +
                    asset_uuid,
                "_blank"
            );
        },
        updateData() {
            let that = this;
            let formData = {
                form: this.form,
                apiUrl: this.inlineApi ? this.inlineApi : this.option.apiUrl,
            };
            this.$store
                .dispatch(
                    this.namespace + "/" + MutationType.UPDATE_DATA,
                    formData
                )
                .then(() => {
                    that.form = {};
                });
        },
    },
    data() {
        return {
            inlineVisible: false,
            form: {},
            inlineFormType: "",
        };
    },
};
</script>