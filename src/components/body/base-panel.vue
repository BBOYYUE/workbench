<template>
  <el-card>
    <template #header>
      <div class="flex flex-row justify-between">
        <div>
          <el-icon class="mr-3 font-semibold"
                   @click="clearData(), goBack()">
            <back />
          </el-icon>
          <span class="text-lg font-semibold">{{ name }}面板</span>
        </div>
        <div class="">
          <el-button v-for="item in actions"
                     :type="item.buttonType"
                     :key="item"
                     :disabled="item.hasRule?!hasRule(item.hasRule, panelData):false"
                     v-show="item.canShow?canShow(item.canShow):true"
                     @click="onPanelkActionClick(item.onclick)">{{ item.name }}</el-button>
        </div>
      </div>
    </template>
    <div v-if="inlineVisible">
      <el-form>
        <div v-for="item in inlineField"
             :key="item">
          <el-form-item :label="item.alias + ':'"
                        v-if="item.type === 'text'">
            <el-input v-model="form[item.name]"
                      :disabled="item.disabled" />
          </el-form-item>
          <el-form-item :label="item.alias + ':'"
                        v-else-if="item.type === 'select'">
            <el-select class="w-full"
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
                       no-data-text="没有数据">
              <el-option v-for="item in selectOption[item.name]"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="flex flex-row justify-end">
          <el-button @click="this.inlineVisible = false">取消</el-button>
          <el-button @click="this.updateData()"
                     type="success">保存</el-button>
        </div>
      </el-form>
    </div>
    <div v-else>
      <el-descriptions v-show="fields">
        <el-descriptions-item v-for="item in fields"
                              :key="item.name"
                              :label="item.alias">
          <div v-if="item.type == 'text'">
            {{ panelData[item.name] }}
          </div>
          <div v-else-if="item.type == 'select'">
            {{ this.getSelectData(item, panelData[item.name])}}
          </div>
          <div v-else-if="item.type == 'buttonText'">
            <el-button type="text">{{ panelData[item.name] }}</el-button>
          </div>
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
  setup () { },
  computed: {
    http () {
      let instance = axios.create({
        timeout: 1000 * 12,
      })
      instance.interceptors.request.use((req) => {
        // if (Object.keys(this.loadingAPI).length === 0) {
        //   store.commit('SHOW_LOADING')
        // }
        req.headers.Authorization = 'Bearer ' + this.$store.state.auth.access_token
        return req
      })
      instance.interceptors.response.use((res) => {
        // if (Object.keys[this.loadingAPI].length === 0) {
        //   store.commit('HIDE_LOADING')
        // }
        return res
      })
      return instance
    },
    info () {
      return { name: "name", label: "项目名称" };
    },
    auth () {
      return this.$store.state.auth
    },
    permissionList () {
      return this.$store.getters['auth/permissionList'] ?? new Set([])
    },
    namespace () {
      return this.option && this.option.namespace
        ? this.option.namespace
        : "";
    },
    name () {
      return this.option && this.option.name ? this.option.name : "";
    },
    details () {
      return this.option ? this.option.details : "";
    },
    create () {
      return this.option && this.inlineFormType && this.option.create
        ? this.option.create
        : [];
    },
    update () {
      return this.option && this.inlineFormType && this.option.update
        ? this.option.update
        : [];
    },
    inlineField () {
      return this[this.inlineFormType]
        ? this[this.inlineFormType].fields
        : [];
    },
    inlineApi () {
      return this[this.inlineFormType]
        ? this[this.inlineFormType].api
        : [];
    },

    actions () {
      return this.option &&
        this.option.details &&
        this.option.details.actions
        ? this.option.details.actions
        : "";
    },
    fields () {
      return this.option &&
        this.option.details &&
        this.option.details.fields
        ? this.option.details.fields
        : "";
    },
    model () {
      return this.option && this.option.model ? this.option.model : "";
    },
    entities () {
      return this.$store.getters[this.namespace + "/entities"];
    },
    storeState () {
      return this.$store.state[this.namespace];
    },
    modelData () {
      return this.model && this.storeState[this.model]
        ? this.storeState[this.model]
        : {};
    },
    activeDataId () {
      return this.$store.state.option.activeDataId;
    },
    panelData () {
      return this.activeDataId && this.modelData[this.activeDataId]
        ? this.modelData[this.activeDataId]
        : [];
    },
  },
  methods: {
    isOwner (val, data) {
      if (!(this.auth && this.auth.user)) return false == val;
      let judge = data.user_id == this.auth.user.id
      return judge == val
    },
    checkCanShow (key, rule, val, data) {
      let judge = true;
      if (!this[key]) return
      switch (rule) {
        case "neq":
          judge = judge && this[key] != val;
          break;
        case "eq":
          judge = judge && this[key] == val;
          break;
        case 'in':
          judge = judge && this[key].include(val);
          break;
        case 'nin':
          judge = judge && !this[key].include(val);
          break;
        case 'has':
          judge = judge && this[key].has(val);
          break;
        case 'nhas':
          judge = judge && !this[key].has(val);
          break;
        case 'method':
          judge = judge && this[key](val, data);
          break;
        default:
          judge = judge && this[key] == val;
          break;
      }
      return judge
    },
    hasRule (canShow, data = {}) {
      return this.canShow(canShow, data)
    },
    canShow (canShow, data = {}) {
      if (!canShow) return true;
      let judge = true;
      if (Array.isArray(canShow[0])) {
        for (let item in canShow) {
          judge = judge && this.checkCanShow(canShow[item][0], canShow[item][1], canShow[item][2], data)
        }
      } else {
        judge = judge && this.checkCanShow(canShow[0], canShow[1], canShow[2], data)
      }
      return judge;
    },

    /**
     * 从远程服务器获取下拉选项
     */
    selectRemoteMethod (name, apiUrl, filterField, keyword) {
      this.selectOption[name] = []
      this.http
        .get(apiUrl + "?filter[" + filterField + "]=" + keyword)
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
    /**
     * 下拉字段获取数据实际的值
     */
    getSelectData (item, value) {
      let relation_namespace = item.relation_namespace ?? undefined
      let relation_model = item.relation_model ?? undefined
      let req = "暂无";
      if (relation_namespace && relation_model) {
        let data = this.$store.state[relation_namespace][relation_model][value] ?? undefined
        if (data) {
          req = data.name
        }
      }
      return req
    },
    onPanelkActionClick (onclick) {
      if (!onclick) return;
      if (isArray(onclick[0])) {
        for (let i = 0; i < onclick.length; i++) {
          this.onPanelkActionClick(onclick[i]);
        }
      } else {
        this[onclick[0]](onclick[1]);
      }
    },
    goBack () {
      this.$store.commit("option/" + [MutationType.SET_MORE], {
        type: "activeType",
        value: 1,
      });
    },
    showInlineForm (field) {
      this.inlineFormType = field;
      this.inlineVisible = true;
      let that = this
      for (let item in this.inlineField) {
        let field = this.inlineField[item].name;
        this.form[field] = this.panelData[field];
        if (this.inlineField[item].type == "select") {
          if (!this.selectOption[this.inlineField[item].name]) {
            let relation_namespace = this.inlineField[item].relation_namespace ?? undefined
            let relation_model = this.inlineField[item].relation_model ?? undefined
            if (relation_namespace && relation_model) {
              let data = this.$store.state[relation_namespace][relation_model][this.form[this.inlineField[item].type]] ?? undefined
              if (data) {
                this.selectOption[that.inlineField[item].name] = [{
                  value: data.id,
                  label: data.name
                }]
              }
            }
            this.http
              .get(this.inlineField[item].apiUrl + "?filter[id]=" + this.form[this.inlineField[item].name])
              .then((res) => {
                if (res.data.data) {
                  res.data.data.forEach(element => {
                    that.selectOption[that.inlineField[item].name] = [{
                      value: element.id,
                      label: element.name
                    }]
                  });
                }
              });
          }
        }
      }
    },
    showWorkEditer (field) {
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
    updateData () {
      let that = this;
      let formData = {
        form: this.form,
        apiUrl: this.inlineApi ? this.inlineApi : this.option.apiUrl,
        model: this.namespace
      };
      this.$store
        .dispatch(
          that.namespace + "/" + MutationType.UPDATE_DATA,
          formData
        ).then(() => {
          that.$message.success("保存成功!")
        }).catch(() => {
          that.$message.success("保存失败!")
        });
    },
    clearData () {
      this.inlineVisible = false
      this.form = {}
      this.inlineFormType = ""
      this.selectOption = {}
    }
  },
  data () {
    return {
      inlineVisible: false,
      form: {},
      inlineFormType: "",
      selectOption: {},
    };
  },
};
</script>