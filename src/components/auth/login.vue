<template>
  <div class="flex flex-row justify-center h-screen w-screen absolute top-0"
       style="background:#1F2937;">
    <div class="flex flex-col justify-center">
      <el-card class="w-96">

        <h1 class="text-3xl font-bold">登录页</h1>
        <el-form label-position="top"
                 :model="form"
                 :rules="rules"
                 ref="loginFormRef">
          <el-form-item label="手机号码:"
                        prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码:"
                        prop="password">
            <el-input type="password"
                      v-model="form.password"></el-input>
          </el-form-item>
        </el-form>
        <el-form-item>
          <el-button type="primary"
                     class="w-full"
                     @click="this.login('loginFormRef')">登录</el-button>
        </el-form-item>
        <div class="flex flex-row justify-between">
          <el-button type="text"
                     @click="this.$router.push('/phone-login')">手机验证码登录</el-button>
          <el-button type="text"
                     @click="this.$router.push('/register')">注册</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { ElCard, ElForm, ElFormItem, ElInput, ElButton } from "element-plus";
import * as MutationType from '../../MutationType'
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
  components: { ElCard, ElForm, ElFormItem, ElInput, ElButton },
  name: "base-login",
  data () {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          }
        ],
      }
    }
  },
  computed: mapState({
    isAuth: (state) => state.isAuth
  }),
  methods: {
    ...mapActions({
      [MutationType.AUTHENTICATION]: 'auth/' + MutationType.AUTHENTICATION
    }),
    login (formRef) {
      let that = this
      this.$refs[formRef].validate((valid) => {
        if (!valid) return
        that[MutationType.AUTHENTICATION]({
          username: that.form.username,
          password: that.form.password,
        })
      });
    },
  },
  watch: {
    isAuth (val) {
      if (val === true) {
        let redirect = this.$route.query.redirect;
        if (redirect) {
          this.$router.push(redirect)
        } else {
          this.$router.push('/')
        }
      }
    }
  }
}
</script>