<template>
  <el-card>
    <!--顶部功能区-->
    <template #header>
      <div class="flex flex-row justify-between">
        <div>
          <span class="text-lg font-semibold">{{ name }}列表</span>
        </div>

        <div class="flex flex-row space-x-10">
          <!-- <div class="flex flex-row space-x-2">
            <el-input v-model="input3"
                      placeholder="请输入搜索关键字"
                      class="input-with-select">
              <template #append>
                <el-button>
                  <el-icon :size="size"
                           :color="color">
                    <Search />
                  </el-icon>
                </el-button>
              </template>
              <template #prepend>
                <el-select v-model="select"
                           placeholder="关键字类型"
                           style="width: 120px">
                  <el-option label="名称"
                             value="name" />
                  <el-option label="uuid"
                             value="uuid" />
                </el-select>
              </template>
            </el-input>
            <el-select v-model="select"
                       placeholder="排序"
                       style="width: 120px">
              <el-option label="名称"
                         value="name" />
              <el-option label="uuid"
                         value="uuid" />
            </el-select>
          </div> -->
          <div class="flex flex-row space-x-2">
            <el-button v-for="item in actions"
                       :type="item.buttonType"
                       :key="item"
                       :disabled="item.hasRule?!hasRule(item.hasRule):false"
                       v-show="item.canShow?canShow(item.canShow):true"
                       @click="onTabeleActionClick(item.onclick)">{{ item.name }}</el-button>
          </div>
        </div>
        <!-- <button-group></button-group> -->
      </div>
    </template>
    <el-table :data="tableData"
              v-show="fields"
              ref="baseTable"
              :max-height="type && type == 'list'? innerHeight - 300:500">
      <el-table-column v-for="item in fields"
                       :key="item.name"
                       :label="item.alias"
                       :align="item.align??'left'">
        <template #default="scope">
          <div v-if="item.type == 'text'"
               @click="this.onTableItemClick(item.onclick, scope.row)">
            {{ scope.row[item.name] }}
          </div>
          <div v-else-if="item.type == 'select'">
            {{getSelectData(item, scope.row[item.name])}}
          </div>
          <div v-else-if="item.type == 'actions'">
            <el-popconfirm :title="aciton.tip"
                           v-for="aciton in item.actions"
                           :key="aciton"
                           confirmButtonText="确定"
                           cancelButtonText="取消"
                           @confirm="this.onTableItemClick(aciton.onclick, scope.row)">
              <template #reference>
                <el-button :type="aciton.type"
                           :disabled="aciton.hasRule?!hasRule(aciton.hasRule, scope.row):false">
                  {{aciton.alias}}
                </el-button>
              </template>
            </el-popconfirm>
          </div>
          <el-button v-else-if="item.type == 'buttonText'"
                     type="text"
                     @click="this.onTableItemClick(item.onclick, scope.row)">{{ scope.row[item.name] }}</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination v-show="type==='list'"
                   background
                   layout="prev, pager, next"
                   @update:current-page="currentPageChange"
                   :current-page="currentPage"
                   :page-size="paginate.per_page"
                   :total="paginate.total" />
    <!--新增表单-->
    <el-dialog v-model="dialogVisible"
               width="500px"
               :title="name">
      <el-form v-if="dialogFieldType == 'create'">
        <div v-for="item in dialogField"
             :key="item">
          <el-form-item :label="item.alias + ':'"
                        v-if="item.type === 'text'">
            <el-input v-model="form[item.name]" />
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
      </el-form>
      <el-form v-else>
        <el-form-item :label="'绑定'+this.option.name + '数据:'">
          <el-select class="w-full"
                     v-model="form.relation_model_id"
                     filterable
                     remote
                     :remote-method="
                                (keyword) => {
                                    // 这里之所以这样写, 是因为当前作用域既有 apiurl 又有keyword
                                    this.selectRemoteMethod(
                                        'bind',
                                        this.option.apiUrl,
                                        'name',
                                        keyword
                                    );
                                }
                            "
                     placeholder="请输入"
                     clearable
                     no-data-text="没有数据">
            <el-option v-for="item in selectOption.bind"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div>
          <el-button @click="this.dialogVisible = false">取消</el-button>
          <el-button @click="dialogFieldType == 'create'?this.storeData():this.bindData()"
                     type="success">保存</el-button>
        </div>
      </template>
    </el-dialog>
  </el-card>
</template>
<script>
import { isArray } from "@vue/shared";
import * as MutationType from "../../MutationType";
import pluralize from "pluralize";
import axios from "axios";
import { toRaw } from 'vue-demi';
export default {
  props: { option: Object, type: String },
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
    auth () {
      return this.$store.state.auth
    },
    permissionList () {
      return this.$store.getters['auth/permissionList'] ?? new Set([])
    },
    /**
     * 当前组件展示的 模块配置项开始
     */
    innerHeight () {
      return window.innerHeight
    },
    paginate () {
      return this.$store.state.project.paginate && this.$store.state.project.paginate[this.model] ? this.$store.state.project.paginate[this.model] : { total: 0 }
    },
    fetching () {
      return this.$store.state.fetching;
    },
    stale () {
      return this.$store.state.stale;
    },
    info () {
      return { name: "name", label: "项目名称" };
    },
    name () {
      return this.option && this.option.name ? this.option.name : "";
    },
    list () {
      return this.option ? this.option.list : "";
    },
    isSelfCorrelation () {
      return this.option ? this.option.isSelfCorrelation : false;
    },
    selfCorrelationKey () {
      return this.option ? this.option.selfCorrelationKey : "";
    },
    create () {
      return this.option && this.dialogFieldType && this.option.create
        ? this.option.create
        : [];
    },
    update () {
      return this.option && this.dialogFieldType && this.option.update
        ? this.option.update
        : [];
    },
    dialogField () {
      return this[this.dialogFieldType]
        ? this[this.dialogFieldType].fields
        : [];
    },
    dialogApi () {
      return this[this.dialogFieldType]
        ? this[this.dialogFieldType].api
        : [];
    },
    actions () {
      return this.option && this.option.list && this.option.list.actions
        ? this.option.list.actions
        : "";
    },
    fields () {
      return this.option && this.option.list && this.option.list.fields
        ? this.option.list.fields
        : "";
    },
    namespace () {
      return this.option && this.option.namespace
        ? this.option.namespace
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
    optionId () {
      return this.option && this.option.id ? this.option.id : 0;
    },

    /**
     * belongsToMany
     */

    belongsToMany () {
      let list = [];
      if (this.activeBelongsToMany) {
        /**
         * 这个的 this.model 是当前模块的英文名, 当前 table 展示的数据的模块名
         */
        if (this.activeModelData[pluralize(this.model)]) {
          /**
           * 这里的 filters 是当前模块的可关联项列表
           * 这里的pluralize是名词的复数形式
           */
          let filters = this.activeModelData[pluralize(this.model)];
          for (let index in filters) {
            /**
             * 这里拿到关联项
             */
            if (this.storeState[this.model][filters[index]]) {
              let data =
                this.storeState[this.model][filters[index]];
              /**
               * 这里校验了一下 hasMany 的过滤逻辑
               */
              for (let item in this.activeBelongsToMany) {
                let option = this.activeBelongsToMany[item];

                /**
                 * 如果当前循环项不是当前模块的配置项, 那么跳过
                 */
                if (option.module != this.optionId) continue;

                if (!option.canShow) {
                  list.push(data);
                } else {
                  if (this.canShow(option.canShow)) {
                    list.push(data);
                  }
                }
              }
            }
          }
        }
      }
      return list;
    },
    /**
     * hasmany
     */
    hasMany () {
      let list = [];
      if (this.activeHasMany) {
        /**
         * 这个的 this.model 是当前模块的英文名, 当前 table 展示的数据的模块名
         */
        if (this.activeModelData[pluralize(this.model)]) {
          /**
           * 这里的 filters 是当前模块的可关联项列表
           * 这里的pluralize是名词的复数形式
           */
          let filters = this.activeModelData[pluralize(this.model)];
          for (let index in filters) {
            /**
             * 这里拿到关联项
             */
            if (this.storeState[this.model][filters[index]]) {
              let data =
                this.storeState[this.model][filters[index]];
              /**
               * 这里校验了一下 hasMany 的过滤逻辑
               */
              for (let item in this.activeHasMany) {
                let option = this.activeHasMany[item];

                /**
                 * 如果当前循环项不是当前模块的配置项, 那么跳过
                 */
                if (option.module != this.optionId) continue;

                if (!option.canShow) {
                  list.push(data);
                } else {
                  if (this.canShow(option.canShow)) {
                    list.push(data);
                  }
                }
              }
            }
          }
        }
      }
      return list;
    },

    /**
     * 正常情况
     */
    selfData () {
      return this.model && this.activeStoreState[this.model]
        ? this.activeStoreState[this.model]
        : [];
    },

    /**
     * 自关联第一页
     */
    selfCorrelationDataList () {
      let list = [];
      if (this.activeModelData) {
        for (let item in this.activeStoreState[this.model]) {
          if (
            this.activeStoreState[this.model][item].parent_id === 0
          ) {
            list.push(this.activeStoreState[this.model][item]);
          }
        }
      }
      return list;
    },
    /**
     * 自关联其他页
     */
    selfCorrelationDataDetail () {
      let list = [];
      if (this.activeModelData && this.selfCorrelationKey) {
        for (let item in this.activeModelData[
          this.selfCorrelationKey
        ]) {
          let key =
            this.activeModelData[this.selfCorrelationKey][item];
          list.push(this.activeStoreState[this.model][key]);
        }
      }
      return list;
    },
    /**
     * 模块配置项结束
     */

    /**
     * 整个后台展示的模块配置项 开始
     */
    activeModuleId () {
      return this.$store.state.option &&
        this.$store.state.option.activeModuleId
        ? this.$store.state.option.activeModuleId
        : 0;
    },
    activeModule () {
      return this.$store.state.option &&
        this.$store.state.option.module &&
        this.activeModuleId
        ? this.$store.state.option.module[this.activeModuleId]
        : {};
    },
    activeHasMany () {
      return this.activeModule && this.activeModule.hasMany
        ? this.activeModule.hasMany
        : [];
    },
    activeBelongsToMany () {
      return this.activeModule && this.activeModule.belongsToMany
        ? this.activeModule.belongsToMany
        : "";
    },
    activeName () {
      return this.activeModule && this.activeModule.name
        ? this.activeModule.name
        : "";
    },
    activeNamespace () {
      return this.activeModule && this.activeModule.namespace
        ? this.activeModule.namespace
        : "";
    },
    activeModel () {
      return this.activeModule && this.activeModule.model
        ? this.activeModule.model
        : "";
    },
    activeApiUrl () {
      return this.activeModule && this.activeModule.apiUrl
        ? this.activeModule.apiUrl
        : "";
    },
    activeEntites () {
      return this.$store.getters[this.activeNamespace + "/entities"];
    },
    activeStoreState () {
      return this.$store.state[this.activeNamespace];
    },
    activeDataId () {
      return this.$store.state.option &&
        this.$store.state.option.activeDataId
        ? this.$store.state.option.activeDataId
        : 0;
    },
    activeModelData () {
      return this.activeModel &&
        this.activeStoreState &&
        this.activeStoreState[this.activeModel] &&
        this.activeDataId &&
        this.activeStoreState[this.activeModel][this.activeDataId]
        ? this.activeStoreState[this.activeModel][this.activeDataId]
        : {};
    },
    /**
     * 整个后台的配置项, 结束
     */

    tableData () {
      let list = [];
      for (let item in this.modelData) {
        list.push(this.modelData[item]);
      }
      list.reverse();
      let first = (this.currentPage - 1) * this.paginate.per_page;
      let last = first + this.paginate.per_page;
      let nextList = list.slice(first, last);
      if (nextList.length == 0) {
        nextList = list.slice(list.length - this.paginate.per_page, list.length)
      }
      return nextList;
    },
    tableWidth () {
      return this.$refs.baseTable.bodyWidth;
    },

    modelDataKey () {
      return (
        this.modelDataType +
        "_" +
        this.model +
        "_" +
        this.type +
        "_" +
        this.activeDataId
      );
    },
  },
  methods: {
    currentPageChange (val) {
      this.currentPage = val;
      let list = [];
      for (let item in this.modelData) {
        list.push(this.modelData[item]);
      }
      let first = (val - 1) * this.paginate.per_page;
      let last = first + this.paginate.per_page;
      let nextList = list.slice(first, last);
      if (nextList.length < this.paginate.per_page) {
        this.getData(
          this.modelDataType,
          this.option.namespace,
          this.option.model,
          this.option.apiUrl,
          this.option.include,
          val
        )
      }
    },
    clearData () {
      this.dialogVisible = false
      this.form = {}
      this.dialogFieldType = ""
      this.modelData = {}
      this.modelDataType = ""
      this.selectOption = {}
    },
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
    selectRemoteMethod (name, apiUrl, filterField, keyword) {
      this.selectOption[name] = [];
      this.http
        .get(apiUrl + "?filter[" + filterField + "]=" + keyword)
        .then((res) => {
          if (res.data.data) {
            res.data.data.forEach((element) => {
              this.selectOption[name].push({
                value: element.id,
                label: element.name,
              });
            });
          }
        });
    },

    onTableItemClick (onclick, tableItem) {
      if (!onclick) return;
      if (isArray(onclick[0])) {
        for (let i = 0; i < onclick.length; i++) {
          this.onTableItemClick(onclick[i], tableItem);
        }
      } else {
        this[onclick[0]](onclick[1], tableItem);
      }
    },
    goToDetailByTableItem (key, tableItem) {
      this.$store.commit("option/" + [MutationType.SET_MORE], {
        type: "activeType",
        value: 2,
      });
      this.$store.commit("option/" + [MutationType.SET_MORE], {
        type: "activeDataId",
        value: tableItem.id,
      });
      this.$store.commit("option/" + [MutationType.SET_MORE], {
        type: "activeModuleId",
        value: this.option.id,
      });
    },

    onTabeleActionClick (onclick) {
      if (!onclick) return;
      if (isArray(onclick[0])) {
        for (let i = 0; i < onclick.length; i++) {
          this.onTabeleActionClick(onclick[i]);
        }
      } else {
        this[onclick[0]](onclick[1]);
      }
    },

    /**
     * 弹窗表单项的字段类型
     */
    showDialogForm (field) {
      this.dialogFieldType = field;
      this.dialogVisible = true;
    },
    deleteData (key, item) {
      let that = this;
      let formData = {
        form: {
          id: item.id
        },
        apiUrl: this.option.apiUrl + "/" + item.id,
        model: this.option.model,
      };
      if (this.option.model != this.activeModel || this.modelDataType === 'selfCorrelationDataDetail') {
        formData.relation_namespace = this.activeNamespace
        formData.relation_model = this.activeModel
        formData.relation_field = pluralize(this.option.model)
        formData.relation_model_id = this.activeDataId
      }


      this.$store.dispatch(this.namespace + '/' + MutationType.DELETE_DATA, formData).then(() => {
        that.$message.success("删除成功!")
      }).catch(() => {
        that.$message.success("删除失败!")
      });
    },

    /**
     * 这里需要注意 form 的 relation_model 系列属性和  formData 中的 relation_model 系列属性的含义不同,
     * form 中的 id 是父项, relation_model 系列为子项,  formData 中的 relation_model 为父项的内容. 
     */
    unBindData (key, data) {
      let that = this;
      this.form.action_type = 'unBind'
      this.form.relation_model = this.model
      this.form.relation_model_id = data.id
      this.form.model = this.activeModel
      this.form.id = this.activeDataId
      let formData = {
        form: this.form,
        apiUrl: this.activeApiUrl,
        model: this.activeModel,
        relation_namespace: this.activeNamespace,
        relation_model: this.activeModel,
        relation_field: pluralize(this.option.model),
        relation_model_id: this.activeDataId
      };
      this.$store.dispatch(this.activeNamespace + '/' + MutationType.UPDATE_DATA, formData).then(() => {
        that.form = {};
        that.dialogVisible = false
        that.$message.success("解绑成功!")
      }).catch(() => {
        that.$message.success("解绑失败!")
      });
    },
    bindData () {
      let that = this;
      this.form.action_type = 'bind'
      this.form.relation_model = this.model
      this.form.model = this.activeModel
      this.form.id = this.activeDataId
      let formData = {
        form: this.form,
        apiUrl: this.activeApiUrl,
        model: this.activeModel,
        relation_namespace: this.activeNamespace,
        relation_model: this.activeModel,
        relation_field: pluralize(this.option.model),
        relation_model_id: this.activeDataId
      };
      this.$store.dispatch(this.activeNamespace + '/' + MutationType.UPDATE_DATA, formData).then(() => {
        that.form = {};
        that.dialogVisible = false
        that.$message.success("绑定成功!")
      }).catch(() => {
        that.$message.success("绑定失败!")
      });
    },
    storeData () {
      let that = this;
      let formData = {
        form: this.form,
        apiUrl: this.dialogApi ? this.dialogApi : this.option.apiUrl,
        model: this.option.model,
      };
      if (this.option.model != this.activeModel || this.modelDataType === 'selfCorrelationDataDetail') {
        formData.relation_namespace = this.activeNamespace
        formData.relation_model = this.activeModel
        formData.relation_field = pluralize(this.option.model)
        formData.relation_model_id = this.activeDataId
      }
      this.$store
        .dispatch(
          that.namespace + "/" + MutationType.STORE_DATA,
          formData
        ).then(() => {
          that.form = {};
          that.dialogVisible = false
          that.$message.success("保存成功!")
        }).catch(() => {
          that.$message.success("保存失败!")
        });
    },

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
    getData (modelDataType, namespace, model, apiUrl, include, page = 1) {
      let formData = {
        apiUrl,
        model,
        page,
      };
      switch (modelDataType) {
        case "selfCorrelationDataDetail":
        case "selfCorrelationDataList":
        case "hasMany":
        case "selfData":
        default:
          formData.include = include;
          break;
      }
      this.$store.dispatch(
        namespace + "/" + MutationType.GET_LIST,
        formData
      );
    },
  },
  beforeMount () {
    if (this.option) {
      let modelDataType;
      if (this.activeModule && this.activeModule.model) {
        if (this.activeModule.model == this.model) {
          if (this.isSelfCorrelation) {
            if (this.type == "hasMany") {
              modelDataType = "selfCorrelationDataDetail";
            } else {
              modelDataType = "selfCorrelationDataList";
            }
          } else {
            modelDataType = "selfData";
          }
        } else {
          modelDataType = this.type;
        }
      }
      this.modelDataType = modelDataType;
    }
  },
  mounted () {
  },
  activated () { },
  data () {
    return {
      dialogVisible: false,
      form: {},
      dialogFieldType: "",
      modelData: {},
      modelDataType: "",
      selectOption: {},
      currentPage: 1
    };
  },
  watch: {
    fetching (val) {
      if (!val) {
        let that = this;
        /**
         * 这里有点奇奇怪怪
         */
        setTimeout(function () {
          that.modelData = that[that.modelDataType];
        }, 200);
      }
    },
    modelDataKey (val) {
      if (this.modelDataType && val) {
        let modelData = this[this.modelDataType];
        if (
          modelData &&
          (modelData.length == 0 ||
            Object.keys(modelData).length == 0)
        ) {
          this.getData(
            this.modelDataType,
            this.option.namespace,
            this.option.model,
            this.option.apiUrl,
            this.option.include
          );
        } else {
          this.modelData = this[this.modelDataType];
        }
      }
    },
    stale (val) {
      if (val) {
        this.getData(
          this.modelDataType,
          this.option.namespace,
          this.option.model,
          this.option.apiUrl,
          this.option.include
        );
      }
    },
    option (val) {
      if (val) {
        let modelDataType;
        if (this.activeModule && this.activeModule.model) {
          if (this.activeModule.model == this.model) {
            if (this.isSelfCorrelation) {
              if (this.type == "detail") {
                modelDataType = "selfCorrelationDataDetail";
              } else {
                modelDataType = "selfCorrelationDataList";
              }
            } else {
              modelDataType = "selfData";
            }
          } else {
            modelDataType = "hasManyData";
          }
        }
        this.modelDataType = modelDataType;
      }
    },
  },
};
</script>