<template>
  <el-card>
    <template #header>
      <div class="flex flex-row justify-between">
        <div>
          <span class="text-lg font-semibold">{{ name }}列表</span>
        </div>

        <div class="flex flex-row space-x-10">
          <div class="flex flex-row  space-x-2">
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
          </div>
          <el-button v-for="item in actions"
                     :type="item.buttonType"
                     :key="item"
                     @click="onTabeleActionClick(item.onclick)">{{item.name}}</el-button>
        </div>
        <!-- <button-group></button-group> -->
      </div>
    </template>
    <el-table :data="tableData"
              v-show="fields"
              ref="baseTable">
      <el-table-column v-for="item in fields"
                       :key="item.name"
                       :label="item.alias">
        <template #default="scope">
          <div v-show="item.type == 'text'"
               @click="this.onTableItemClick(item.onclick, scope.row)">{{scope.row[item.name]}}</div>
          <el-button v-show="item.type == 'buttonText'"
                     type="text"
                     @click="this.onTableItemClick(item.onclick, scope.row)">{{scope.row[item.name]}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible"
               width="500px"
               :title="name">
      <el-form>
        <el-form-item :label="item.alias + ':'"
                      v-for="item in dialogField"
                      :key="item">
          <el-input v-model="form[item.name]" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div>
          <el-button @click="this.dialogVisible = false">取消</el-button>
          <el-button @click="this.saveData()"
                     type="success">保存</el-button>
        </div>
      </template>
    </el-dialog>
  </el-card>
</template>
<script>
import { isArray } from '@vue/shared';
import * as MutationType from "../../MutationType";
import pluralize from "pluralize"
import axios from 'axios'
export default {
  props: { option: Object, type: String },
  computed: {
    /**
     * 当前组件展示的 模块配置项开始
     */
    fetching () {
      return this.$store.state.fetching
    },
    stale () {
      return this.$store.state.stale
    },
    info () {
      return { name: "name", label: "项目名称" };
    },
    name () {
      return this.option && this.option.name ? this.option.name : ""
    },
    list () {
      return this.option ? this.option.list : ''
    },
    isSelfCorrelation () {
      return this.option ? this.option.isSelfCorrelation : false
    },
    selfCorrelationKey () {
      return this.option ? this.option.selfCorrelationKey : ""
    },
    create () {
      return this.option && this.dialogFieldType && this.option.create ? this.option.create : []
    },
    update () {
      return this.option && this.dialogFieldType && this.option.update ? this.option.update : []
    },
    dialogField () {
      return this[this.dialogFieldType] ? this[this.dialogFieldType].fields : []
    },
    dialogApi () {
      return this[this.dialogFieldType] ? this[this.dialogFieldType].api : []
    },
    actions () {
      return this.option && this.option.list && this.option.list.actions ? this.option.list.actions : ''
    },
    fields () {
      return this.option && this.option.list && this.option.list.fields ? this.option.list.fields : ''
    },
    namespace () {
      return this.option && this.option.namespace ? this.option.namespace : ''
    },
    model () {
      return this.option && this.option.model ? this.option.model : ''
    },
    entities () {
      return this.$store.getters[this.namespace + '/entities'];
    },
    storeState () {
      return this.$store.state[this.namespace]
    },
    optionId () {
      return this.option && this.option.id ? this.option.id : 0
    },

    /**
     * hasmany
     */
    hasManyData () {
      let list = []
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
              let data = this.storeState[this.model][filters[index]];
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
                  list.push(data)
                } else {
                  if (this.canShow(option.canShow, data)) {
                    list.push(data)
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
      return this.model && this.activeStoreState[this.model] ? this.activeStoreState[this.model] : [];
    },

    /**
     * 自关联第一页
     */
    selfCorrelationDataList () {
      let list = []
      if (this.activeModelData) {
        for (let item in this.activeStoreState[this.model]) {
          if (this.activeStoreState[this.model][item].parent_id === 0) {
            list.push(this.activeStoreState[this.model][item])
          }
        }
      }
      return list
    },
    /**
     * 自关联其他页
     */
    selfCorrelationDataDetail () {
      let list = []
      if (this.activeModelData && this.selfCorrelationKey) {
        console.log(this.activeModelData)
        for (let item in this.activeModelData[this.selfCorrelationKey]) {
          let key = this.activeModelData[this.selfCorrelationKey][item];
          list.push(this.activeStoreState[this.model][key])
        }
      }
      return list
    },
    /**
     * 模块配置项结束
     */



    /**
     * 整个后台展示的模块配置项 开始
     */
    activeModuleId () {
      return this.$store.state.option && this.$store.state.option.activeModuleId ? this.$store.state.option.activeModuleId : 0;
    },
    activeModule () {
      return this.$store.state.option && this.$store.state.option.module && this.activeModuleId ? this.$store.state.option.module[this.activeModuleId] : {}
    },
    activeHasMany () {
      return this.activeModule && this.activeModule.hasMany ? this.activeModule.hasMany : []
    },
    activeNamespace () {
      return this.activeModule && this.activeModule.namespace ? this.activeModule.namespace : ""
    },
    activeModel () {
      return this.activeModule && this.activeModule.model ? this.activeModule.model : ""
    },
    activeEntites () {
      return this.$store.getters[this.activeNamespace + '/entities'];
    },
    activeStoreState () {
      return this.$store.state[this.activeNamespace]
    },
    activeDataId () {
      return this.$store.state.option && this.$store.state.option.activeDataId ? this.$store.state.option.activeDataId : 0;
    },
    activeModelData () {
      return this.activeModel &&
        this.activeStoreState &&
        this.activeStoreState[this.activeModel] &&
        this.activeDataId &&
        this.activeStoreState[this.activeModel][this.activeDataId] ?
        this.activeStoreState[this.activeModel][this.activeDataId] :
        {};
    },
    /**
     * 整个后台的配置项, 结束
     */

    tableData () {
      let list = [];
      for (let item in this.modelData) {
        list.push(this.modelData[item])
      }
      return list;
    },
    tableWidth () {
      return this.$refs.baseTable.bodyWidth
    },

    modelDataKey () {
      return this.modelDataType + '_' + this.model + '_' + this.type + '_' + this.activeDataId
    }


  },
  methods: {

    onTableItemClick (onclick, tableItem) {
      if (!onclick) return;
      if (isArray(onclick[0])) {
        for (let i = 0; i < onclick.length; i++) {
          this.onTableItemClick(onclick[i], tableItem);
        }
      } else {
        this[onclick[0]](onclick[1], tableItem)
      }
    },
    goToDetailByTableItem (key, tableItem) {
      this.$store.commit('option/' + [MutationType.SET_MORE], { type: "activeType", value: 2 });
      this.$store.commit('option/' + [MutationType.SET_MORE], { type: "activeDataId", value: tableItem.id });
      this.$store.commit('option/' + [MutationType.SET_MORE], { type: "activeModuleId", value: this.option.id });
    },

    onTabeleActionClick (onclick) {
      if (!onclick) return;
      if (isArray(onclick[0])) {
        for (let i = 0; i < onclick.length; i++) {
          this.onTabeleActionClick(onclick[i]);
        }
      } else {
        this[onclick[0]](onclick[1])
      }
    },

    /**
     * 弹窗表单项的字段类型
     */
    showDialogForm (field) {
      this.dialogFieldType = field
      this.dialogVisible = true
    },
    saveData () {
      axios.post(this.dialogApi, this.form)
        .then((res) => {
          this.form = {}
          this.$message.success("保存成功!");
          if (res.data.code != 200) return
        })
        .catch((err) => {
          if (err.response.data.errors) {
            for (let item in err.response.data.errors) {
              let msg = err.response.data.errors[item][0]
              this.$message.error(msg);
            }
          } else {
            this.$message.error(err.response.status + ": " + err.response.statusText);
          }
        })
    },
    canShow (canShow, data) {
      let judge = false;
      for (let item in canShow) {
        let canShow = canShow[item]
        let key = canShow[0];
        let rule = canShow[1];
        let val = canShow[2];
        switch (rule) {
          case 'neq':
            judge = (data[key] != val);
            break;
          case 'eq':
          default:
            judge = (data[key] == val);
            break;
        }
      }
      return judge;
    },
    getData (modelDataType, namespace, model, apiUrl, include) {
      let formData = {
        apiUrl,
        model
      }
      switch (modelDataType) {
        case 'selfCorrelationDataDetail':
        case 'selfCorrelationDataList':
        case 'hasManyData':
        case 'selfData':
        default:
          formData.include = include
          break;
      }
      this.$store.dispatch(namespace + "/" + MutationType.GET_LIST, formData)
    }
  },
  beforeMount () {
    if (this.option) {
      let modelDataType;
      if (this.activeModule && this.activeModule.model) {
        if (this.activeModule.model == this.model) {
          if (this.isSelfCorrelation) {
            if (this.type == 'detail') {
              modelDataType = 'selfCorrelationDataDetail';
            } else {
              modelDataType = 'selfCorrelationDataList';
            }
          } else {
            modelDataType = 'selfData';
          }
        } else {
          modelDataType = 'hasManyData'
        }
      }
      console.log(modelDataType)
      this.modelDataType = modelDataType
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
    }
  },
  watch: {
    fetching (val) {
      if (!val) {
        let that = this
        /**
         * 这里有点奇奇怪怪
         */
        setTimeout(function () {
          that.modelData = that[that.modelDataType]
        }, 100)
      }
    },
    modelDataKey (val) {
      if (this.modelDataType && val) {
        let modelData = this[this.modelDataType]
        if (modelData && (modelData.length == 0 || Object.keys(modelData).length == 0)) {
          this.getData(this.modelDataType, this.option.namespace, this.option.model, this.option.apiUrl, this.option.include);
        } else {
          this.modelData = this[this.modelDataType]
        }
      }
    },
    stale (val) {
      if (val) {
        this.getData(this.modelDataType, this.option.namespace, this.option.model, this.option.apiUrl, this.option.include);
      }
    },
    option (val) {
      if (val) {
        let modelDataType;
        if (this.activeModule && this.activeModule.model) {
          if (this.activeModule.model == this.model) {
            if (this.isSelfCorrelation) {
              if (this.type == 'detail') {
                modelDataType = 'selfCorrelationDataDetail';
              } else {
                modelDataType = 'selfCorrelationDataList';
              }
            } else {
              modelDataType = 'selfData';
            }
          } else {
            modelDataType = 'hasManyData'
          }
        }
        this.modelDataType = modelDataType
      }
    },
  }
}
</script>