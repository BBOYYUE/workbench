<template>
  <div class="flex flex-row justify-center h-screen w-screen absolute top-0"
       style="background:#1F2937;">
    <div class="flex flex-col justify-center">
      <el-card class="w-96">
        <div class="flex flex-col space-y-5">
          <div>
            <h1 class="text-3xl font-bold">手机验证码登陆</h1>
          </div>
          <div>
            <el-form label-position="top"
                     :model="form"
                     :rules="rules"
                     ref="phoneLoginFormRef">
              <el-form-item label="电话号码:"
                            prop="phone">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
              <el-form-item label="验证码:"
                            prop="verification_code">
                <el-input v-model="form.verification_code">
                  <template #append>
                    <el-button size="mini"
                               @click="sendsms">{{tip}}</el-button>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           class="w-full"
                           @click="login('phoneLoginFormRef')">登录</el-button>
              </el-form-item>
              <div class="flex flex-row justify-between">
                <el-button type="text"
                           @click="this.$router.push('/login')">登录</el-button>
                <el-button type="text"
                           @click="this.$router.push('/register')">注册</el-button>
              </div>
            </el-form>
          </div>
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
  name: "phone-login",
  mounted () {
    this.$store.commit('setAuth', false)
  },
  data () {
    return {
      form: {
        phone: "",
        verification_code: "",
      },
      rules: {
        phone: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          }
        ],
        verification_code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur',
          }
        ],
      },
      tip: "发送",
      intervalId: ""
    }
  },
  computed: mapState({
    verification_key: (state) => state.auth.verification_key,
    isAuth: (state) => state.isAuth
  }),
  methods: {
    ...mapActions({
      [MutationType.VERIFICATION_CODE_AUTHENTICATION]: 'auth/' + MutationType.VERIFICATION_CODE_AUTHENTICATION,
      [MutationType.VERIFICATION_CODES]: 'auth/' + MutationType.VERIFICATION_CODES
    }),
    login (formRef) {
      let that = this
      this.$refs[formRef].validate((valid) => {
        if (!valid) return
        that[MutationType.VERIFICATION_CODE_AUTHENTICATION]({
          phone: that.form.phone,
          verification_code: that.form.verification_code,
          verification_key: that.verification_key
        })
      });
    },
    sendsms () {
      if (this.intervalId) return;
      let that = this;
      let phone = this.form.phone
      var myreg = /^1[3-9]\d{9}$/;
      if (!myreg.test(phone)) {
        this.$message.error('手机号码格式不正确')
        return false;
      }
      this.tip = 60;
      this[MutationType.VERIFICATION_CODES]({ phone })
      this.intervalId = setInterval(function () {
        that.countdown()
      }, 1000);

    },
    countdown () {
      if (this.tip > 0) {
        this.tip = this.tip - 1
      } else {
        this.tip = '发送';
        clearInterval(this.intervalId);
        this.intervalId = undefined
      }
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