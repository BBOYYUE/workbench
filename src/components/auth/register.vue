<template>
  <div class="flex flex-row justify-center h-screen w-screen absolute top-0"
       style="background:#1F2937;">
    <div class="flex flex-col justify-center">
      <el-card class="w-96">
        <el-form label-position="top"
                 :model="form"
                 :rules="rules"
                 ref="registerFormRef">
          <h1 class="text-3xl font-bold">注册页</h1>
          <div class="box pr-4 m-0"
               :style="{overflowY :'auto',maxHeight: '500px'}">
            <el-form-item label="用户名:"
                          prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码:"
                          prop="password">
              <el-input type="password"
                        v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码:"
                          prop="repassword">
              <el-input type="password"
                        v-model="form.repassword"></el-input>
            </el-form-item>
            <el-form-item label="手机号码:"
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
            <el-form-item label="邀请码:">
              <el-input v-model="form.invitation_code"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         class="w-full"
                         @click="register('registerFormRef')">注册</el-button>
            </el-form-item>
          </div>
          <div class="flex flex-row justify-between">
            <el-button type="text"
                       @click="this.$router.push('/login')">登陆</el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import { ElCard, ElForm, ElFormItem, ElInput, ElButton } from "element-plus";
import { mapMutations, mapState, mapActions } from 'vuex'
import * as MutationType from '../../MutationType'
import { ElNotification } from 'element-plus'
export default {
  components: { ElCard, ElForm, ElFormItem, ElInput, ElButton },
  name: "base-register",
  data () {
    return {
      tip: "发送",
      form: {
        name: '',
        password: "",
        repassword: '',
        phone: '',
        invitation_code: '',
        verification_code: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
          {
            min: 5,
            message: "密码太短",
            trigger: 'blur',
          }
        ],
        repassword: [
          {
            required: true,
            message: '请输入确认密码',
            trigger: 'blur',
          },
          {
            min: 5,
            message: "密码太短",
            trigger: 'blur',
          },
          (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入手机号码',
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
    }
  },
  computed: mapState({
    verification_key: (state) => state.auth.verification_key,
    isAuth: (state) => state.isAuth
  }),
  methods: {
    ...mapActions({
      [MutationType.VERIFICATION_CODE_STORE]: 'auth/' + MutationType.VERIFICATION_CODE_STORE,
      [MutationType.VERIFICATION_CODES]: 'auth/' + MutationType.VERIFICATION_CODES
    }),
    ...mapMutations({
    }),
    register (formRef) {
      let that = this
      this.$refs[formRef].validate((valid) => {
        if (!valid) return
        that[MutationType.VERIFICATION_CODE_STORE]({
          name: that.form.name,
          password: that.form.password,
          phone: that.form.phone,
          invitation_code: that.form.invitation_code,
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
        ElNotification({
          title: "错误",
          message: "手机号码格式不正确",
          type: "error",
          onClose: function () { },
        })
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
<style scoped>
.box::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
  scrollbar-arrow-color: red;
  position: relative;
  left: 2px;
}
.box::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
  scrollbar-arrow-color: red;
}
.box::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>