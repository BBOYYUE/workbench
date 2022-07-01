<template>
  <el-table :data="taskList"
            height="160"
            style="width: 100%">
    <el-table-column prop="id"
                     label="id"
                     width="180" />
    <el-table-column prop="name"
                     label="资源名称"
                     width="180" />
    <el-table-column prop="status"
                     label="任务状态" />
    <el-table-column prop="progress"
                     label="任务进度" />
  </el-table>
</template>
<script>
import axios from "axios";
export default {
  props: { uuid: String },
  mounted () {
    let that = this;
    that.getTaskList();
    // this.interval = setInterval(function () {
    //   that.getTaskList();
    // }, 5000)
  },
  deactivated () {
    clearInterval(this.interval)
  },
  computed: {
    access_token () {
      return this.$store.state.auth.access_token
    },
    http () {
      let instance = axios.create({
        timeout: 1000 * 12,
      })
      instance.interceptors.request.use((req) => {
        req.headers.Authorization = 'Bearer ' + this.$store.state.auth.access_token
        return req
      })
      instance.interceptors.response.use((res) => {
        return res
      })
      return instance
    },
  },
  methods: {
    getTaskList () {
      this.http.get('http://192.168.10.10/api/v2/getAssetTaskList?uuid=' + this.uuid).then((res) => {
        console.log(res)
        this.taskList = res.data.data
      })
    }
  },
  data () {
    return {
      taskList: []
    }
  },
}
</script>