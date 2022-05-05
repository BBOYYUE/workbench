<template>
  <el-card>
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
    <el-table>
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
import axios from 'axios'
export default {
  props: { option: Object, type: String },
  setup () {

  },
  activated () {
    /**
     * 每次一打开的时候请求数据
     */
  },
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

    /**
     * 新增或者编辑时, 表单项的字段类型
     */
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
    apiUrl () {
      return this.option && this.option.apiUrl ? this.option.apiUrl : ''
    },
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