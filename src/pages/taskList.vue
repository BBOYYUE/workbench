<template>
  <base-layout>
    <template v-slot:header>
      <div class="h-full flex flex-col justify-center">
        <div class="h-16 w-80">
          <div
            class="
              text-3xl
              italic
              inline-block
              align-middle
              text-md text-white
              pl-6
            "
          >
            <el-icon
              class="inline-block align-top relative right-2 cursor-pointer"
              @click="this.$router.go(-1)"
            >
              <Back />
            </el-icon>
            任务队列
            <span class="text-sm not-italic"> {{ version }}</span>
          </div>
          <div class="inline-block align-middle h-full w-0"></div>
        </div>
      </div>
    </template>
    <template v-slot:left-menu>
      <el-menu>
        <el-menu-item :index="'1'">
          <el-icon><List /></el-icon>
          <template #title>概览</template>
        </el-menu-item>
        <el-menu-item :index="'2'" disabled>
          <el-icon><Tickets /></el-icon>
          <template #title>处理中</template>
        </el-menu-item>
        <el-menu-item :index="'3'" disabled>
          <el-icon><CircleCheck /></el-icon>
          <template #title>已成功</template>
        </el-menu-item>
        <el-menu-item :index="'4'" disabled>
          <el-icon><CircleClose /></el-icon>
          <template #title>已失败</template>
        </el-menu-item>
      </el-menu>
    </template>
    <template v-slot:body>
      <div class="m-2">
        <el-table :data="taskList" style="width: 100%">
          <el-table-column prop="id" label="id" width="180" />
          <el-table-column prop="name" label="资源名称" width="180" />
          <el-table-column prop="status" label="任务状态" />
          <el-table-column prop="progress" label="任务进度" />
        </el-table>
      </div>
    </template>
  </base-layout>
</template>
<script>
import BaseLayout from "@/components/layout/base-layout.vue";
import axios from "axios";
export default {
  components: { BaseLayout },
  setup() {},
  props: { uuid: String },
  mounted() {
    let that = this;
    that.getTaskList();
  },
  computed: {
    access_token() {
      return this.$store.state.auth.access_token;
    },
    http() {
      let instance = axios.create({
        timeout: 1000 * 12,
      });
      instance.interceptors.request.use((req) => {
        req.headers.Authorization =
          "Bearer " + this.$store.state.auth.access_token;
        return req;
      });
      instance.interceptors.response.use((res) => {
        return res;
      });
      return instance;
    },
  },
  deactivated() {
    clearInterval(this.interval);
  },
  methods: {
    getTaskList() {
      this.http
        .get("http://192.168.10.10/api/v2/getAssetTaskList?uuid=" + this.uuid)
        .then((res) => {
          console.log(res);
          this.taskList = res.data.data;
        });
    },
  },
  data() {
    return {
      taskList: [],
    };
  },
};
</script>