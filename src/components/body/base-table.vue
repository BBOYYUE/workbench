<template>
  <el-card>
    <!-- <dialog-form></dialog-form> -->
    <template #header>
      <div class="flex flex-row justify-between">
        <div>
          <span class="text-lg font-semibold">{{ name }}列表</span>
        </div>
        <div class="">
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
    /**
     * 模块配置项结束
     */

    modelData () {
      let list = []
      /**
       * 这里添加了一个过滤条件, 就是查看 activeModule 的 model 是否包含多个表格项, 如果包含的话, 只显示包含的项 
       * pluralize 将一个
       */

      /**
       * 这里先做区分, active 前缀指的是在 vuex 中当前操作的模块信息.
       * 没又 active 前缀指的.
       */
      if (this.activeModule && this.activeModule.model === this.model) {
        console.log("这里表示当前项使用的模块和当前选中的模块相同")

        if (this.isSelfCorrelation && this.activeModelData) {
          if (this.type == 'list') {
            console.log(111, this.model, this.entities, this.entities[this.model])
            for (let item in this.entities[this.model]) {
              console.log(this.entities[this.model][item])
              if (this.entities[this.model][item].parent_id === 0) {
                list.push(this.entities[this.model][item])
              }
            }
            return list
          } else if (this.type == 'detail') {
            let selfCorrelationKey = this.selfCorrelationKey;
            console.log(this.activeModelData, selfCorrelationKey)
            for (let item in this.activeModelData[selfCorrelationKey]) {
              let key = this.activeModelData[selfCorrelationKey][item];
              list.push(this.entities[this.model][key])
            }
            return list
          }
        } else {
          return this.model && this.entities[this.model] ? this.entities[this.model] : {};
        }
      }

      /**
       * TODO 这里将来需要重构
       */
      if (this.activeHasMany) {
        console.log("这里表示当前项包含子项")
        /**
         * 这个的 this.model 是当前模块的英文名
         */
        if (this.activeModelData[pluralize(this.model)]) {
          console.log(this.activeModelData[pluralize(this.model)])
          /**
           * 这里的 filters 是当前模块的可关联项列表
           */
          let filters = this.activeModelData[pluralize(this.model)];
          for (let index in filters) {
            /**
             * 这里拿到关联项
             */
            if (this.entities[this.model][filters[index]]) {
              let data = this.entities[this.model][filters[index]];
              /**
               * 这里校验了一下 hasMany 的过滤逻辑
               */
              for (let item in this.activeHasMany) {
                let option = this.activeHasMany[item];
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
    activeDataId () {
      return this.$store.state.option && this.$store.state.option.activeDataId ? this.$store.state.option.activeDataId : 0;
    },
    activeModelData () {
      return this.activeModel && this.activeEntites && this.activeEntites[this.activeModel] && this.activeDataId && this.activeEntites[this.activeModel][this.activeDataId] ? this.activeEntites[this.activeModel][this.activeDataId] : {};
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
            console.log(err, err.response.statusText);
            this.$message.error(err.response.status + ": " + err.response.statusText);
          }
        })
    },
    canShow (canShow, data) {
      let judge = false;
      for (let item in this.canShow) {
        let canShow = this.canShow[item]
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
  },
  data () {
    return {
      dialogVisible: false,
      form: {},
      dialogFieldType: ""
    }
  }
}
</script>