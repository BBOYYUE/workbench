<template>
  <div class="my-3 mx-5 text-white">
    <el-scrollbar height="600px">
      <el-form label-position="top">
        <el-form-item label="场景名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="全景图">
          <el-image
            style="width: 210px; height: 105px"
            :src="thumbUrl"
            fit="fill"
            @click="toggleFileSelectShow()"
          />
        </el-form-item>
        <!--
          todo 缺场景角度和热点分组的完善
        -->
        <el-form-item label="场景角度">
          <el-select>
            <el-option>默认角度</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="热点分组">
          <el-select>
            <el-option>交通配套</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="热点">
          <el-select>
            <el-option>项目地</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文字"> </el-form-item>
        <el-form-item label="图片"> </el-form-item>
      </el-form>
      <div
        class="
          border border-solid
          rounded-sm
          border-gray-700
          text-center
          cursor-pointer
          h-10
          flex flex-col
          justify-center
        "
        @click="save"
      >
        <span>快速保存</span>
      </div>
    </el-scrollbar>
    <right-file-select-dialog
      ref="rightFileSelectDialog"
      @save="updateForm"
      type="radio"
    ></right-file-select-dialog>
  </div>
</template>
<script>
import axios from "axios";
import RightFileSelectDialog from "../../common/right-file-select-dialog.vue";
import * as MutationType from "@/MutationType";
export default {
  setup() {},
  components: { RightFileSelectDialog },
  mounted() {
    this.form.uuid = this.uuid;
  },
  props: { uuid: String },
  computed: {
    access_token() {
      return this.$store.state.auth.access_token;
    },
    http() {
      let http = axios.create({
        timeout: 1000 * 12,
      });
      http.interceptors.request.use((req) => {
        req.headers.Authorization = "Bearer " + this.access_token;
        return req;
      });
      return http;
    },
  },
  methods: {
    save() {
      // this.http
      //   .post("http://192.168.10.10/api/v2/resource", this.form)
      //   .then((res) => {
      //     console.log(res);
      //   });
      this.$store.dispatch("editor/" + MutationType.UPDATE_DATA, this.form);
    },
    toggleFileSelectShow() {
      this.$refs.rightFileSelectDialog.fileSelectShow = true;
    },
    updateForm(form) {
      let that = this;
      axios
        .get("http://192.168.10.10/api/v2/filesystems/" + form.file_uuid)
        .then(function (res) {
          console.log(res);
          that.thumbUrl = that.getThumbPath(res.data.data.file_path);
        });
      this.form = Object.assign({}, this.form, form);
      console.log(form);
    },
    getThumbPath(filePath) {
      return "http://192.168.10.10:9000/alpha-api/" + filePath;
    },
  },
  data() {
    return {
      thumbUrl:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      form: {
        uuid: "",
        name: "",
        resource_type: 2,
        file_uuid: "",
      },
    };
  },
  watch: {
    checkFileList(val) {
      console.log(val);
    },
  },
};
</script>