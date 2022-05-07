<template>
  <el-card>
    <template #header>
      <div class="flex flex-row justify-between">
        <div>
          <el-icon class="mr-3 font-semibold"
                   @click="goBack()">
            <back />
          </el-icon>
          <span class="text-lg font-semibold">{{ name }}面板</span>
        </div>
        <div class="">
          <el-button v-for="item in actions"
                     :type="item.buttonType"
                     :key="item"
                     @click="onPanelkActionClick(item.onclick)">{{item.name}}</el-button>
        </div>
      </div>
    </template>
    <div v-if="inlineVisible">
      <el-form>
        <el-form-item :label="item.alias + ':'"
                      v-for="item in inlineField"
                      :key="item">
          <el-input v-model="form[item.name]"
                    :disabled="item.disabled" />
        </el-form-item>
        <div class="flex flex-row justify-end">
          <el-button @click="this.inlineVisible = false">取消</el-button>
          <el-button @click="this.saveData()"
                     type="success">保存</el-button>
        </div>
      </el-form>
    </div>
    <div v-else>
      <el-descriptions v-show="fields">
        <el-descriptions-item v-for="item in fields"
                              :key="item.name"
                              :label="item.alias">
          {{panelData[item.name]}}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-card>
</template>
<script>
import {
  Back,
} from '@element-plus/icons-vue'
import * as MutationType from "../../MutationType";
import axios from 'axios'
import { isArray } from '@vue/shared';
export default {
  components: { Back },
  props: { option: Object },
  setup () {

  },
  computed: {
    info () {
      return { name: "name", label: "项目名称" };
    },
    name () {
      return this.option && this.option.name ? this.option.name : ""
    },
    details () {
      return this.option ? this.option.details : ''
    },
    create () {
      return this.option && this.inlineFieldType && this.option.create ? this.option.create : []
    },
    update () {
      return this.option && this.inlineFieldType && this.option.update ? this.option.update : []
    },
    inlineField () {
      return this[this.inlineFieldType] ? this[this.inlineFieldType].fields : []
    },
    inlineApi () {
      return this[this.inlineFieldType] ? this[this.inlineFieldType].api : []
    },

    actions () {
      return this.option && this.option.details && this.option.details.actions ? this.option.details.actions : ''
    },
    fields () {
      return this.option && this.option.details && this.option.details.fields ? this.option.details.fields : ''
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
    modelData () {
      return this.model && this.entities[this.model] ? this.entities[this.model] : {};
    },
    activeDataId () {
      return this.$store.state.option.activeDataId
    },
    panelData () {
      return this.activeDataId && this.modelData[this.activeDataId] ? this.modelData[this.activeDataId] : []
    }
  },
  methods: {
    onPanelkActionClick (onclick) {
      if (!onclick) return;
      if (isArray(onclick[0])) {
        for (let i = 0; i < onclick.length; i++) {
          this.onPanelkActionClick(onclick[i]);
        }
      } else {
        this[onclick[0]](onclick[1])
      }
    },
    goBack () {
      this.$store.commit('option/' + [MutationType.SET_MORE], { type: "activeType", value: 1 });
    },
    showInlineForm (field) {
      this.inlineFieldType = field
      this.inlineVisible = true

      for (let item in this.inlineField) {
        let field = this.inlineField[item].name;
        this.form[field] = this.panelData[field]
      }
    },
    showWorkEditer (field) {
      let work_type = this.panelData.work_type;
      let asset_type = this.panelData.asset_type;
      let asset_uuid = this.panelData.uuid;
      window.open(location.href + "work-editor?work_type=" + work_type + "&asset_type=" + asset_type + "&uuid=" + asset_uuid, '_blank');
    },
    saveData () {
      axios.post(this.inlineApi, this.form)
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
    }
  },
  data () {
    return {
      inlineVisible: false,
      form: {},
      inlineFieldType: ""
    }
  }
}
</script>