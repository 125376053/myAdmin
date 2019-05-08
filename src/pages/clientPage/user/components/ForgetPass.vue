<template>
  <div class="forget-wrapper" ref="forgetWrapper">
    <transition name="el-zoom-in-bottom">
      <div class="forget-form-wrapper" v-show="show">
        <div class="title">重置密码</div>
        <el-form :model="accountForm" ref="accountForm" :rules="rules2" label-width="92px">
            <el-form-item prop="userAccno" label="用户ID：">
                <el-input  placeholder="请输入用户邮箱/手机号" v-model="accountForm.userAccno"></el-input>
            </el-form-item>
        </el-form>
        <el-form :model="condition" :rules="rules" ref="ruleForm" label-width="92px">
          <el-form-item prop="verifyCode" label="验证码：">
            <el-input style="width:170px" type="text"   placeholder="验证码" v-model="condition.verifyCode" auto-complete="off"></el-input>
            <el-button type="primary" style="width:96px;padding:0;text-align:center;height:32px;line-height:32px;boder:none;" disabled v-show="isCountDowm"><span >{{countTime}}s后发送</span></el-button>
            <el-button type="primary" style="width:96px;padding:0;text-align:center;height:32px;line-height:32px;boder:none;" v-show="!isCountDowm" @click="getVerifycode(accountForm.userAccno)"><span >点击获取</span></el-button>
          </el-form-item>
          <el-form-item prop="newPassword" label="设置密码：" class="password-input">
            <el-input
              class="inputStyle"
              type="password"
              placeholder="8-16个字符，使用字母、数字或特殊符号的组合"
              v-model="condition.newPassword"
              auto-complete="off"
            ></el-input>
            <div style="margin-top:10px;color:#999;font-size:12px;line-height:14px;margin-top:6px;">
              <span style="display:inline-block;margin-right:8px;margin-left:52px;margin-top:8px;">安全密码强度</span>
              <span :class="level>0?level<5?'empty weak':'empty':'empty'"></span>
              <span :class="level >= 2 ?'empty medium':'empty'"></span>
              <span :class="level >= 3 ?'empty strong':'empty'"></span>
              <span>{{level===1?'弱':level===2?'中':(level===3)||(level===4)?'强':''}}</span>
            </div>
            <!-- <div style="color:#999;font-size:12px;line-height:0;margin-left:60px;width:230px;line-height:14px;word-break:break-word;">8-16 个字符，请使用字母、数字或特殊符号的组合密码</div> -->
          </el-form-item>
          <el-form-item prop="checkPassword" label="确认密码：">
            <el-input
              class="inputStyle"
              type="password"
              v-model="condition.checkPassword"
              placeholder="请再次输入新密码"
            ></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align:center">
          <el-button type="primary" style="text-align:center;margin-top:28px;" @click="resetPassword">重置密码</el-button>
        </div>
        <div class="oprate-btn">
          <el-button type="text" @click="toLogin">登录</el-button>
          <el-button type="text" @click="toRegister">注册</el-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { checkPwdSecurity } from "@/utils/pwdSecurityVerify";
export default {
  name: "login",
  data() {
    var checkPasswordFn = (rule, value, callback) => {
      if (value !== this.condition.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("账号不能为空!"));
      } else {
        let phoneReg = /^1[3-578]\d{9}$/;
        let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (phoneReg.test(value) || mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱或者手机号"));
        }
      }
    };
    return {
      show: false,
      countTime:60,
      isCountDowm:false,
      condition: {
        verifyCode:"",
        newPassword: "",
        checkPassword: ""
      },
      accountForm: {
        userAccno: ""
      },
      rules2: {
        userAccno: [{ validator: validAccount, trigger: "blur" }, { required: true, message: '用户ID不能为空', trigger: 'blur' },]
      },
      rules: {
        verifyCode: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          }
        ],  
        newPassword: [
          {
            required: true,
            message: "新密码不能为空",
            trigger: "blur"
          },
          {
            pattern: /^(?![0-9]+$)[a-zA-Z0-9~!@#$%^&*]{8,20}$/,
            message: "8-16个字符，请使用字母、数字或特殊符号的组合密码",
            trigger: "blur"
          }
        ],
        checkPassword: [
          {
            required: true,
            message: "确认密码不能为空",
            trigger: "blur"
          },
          { validator: checkPasswordFn, trigger: "blur" }
        ]
      }
    };
  },
   watch: {
    "condition.newPassword": {
      handler: function() {
        checkPwdSecurity(this, this.condition.newPassword, this.level);
      },
      deep: true //深度监听
    }
  },
  components: {},
  created() {},
  computed: {
    level() {
      return this.$store.state.other.level;
    }
  },
  mounted() {
    this.show = !this.show;
  },
  methods: {
    countDown() {
      this.countTime = 60;
      this.isCountDowm = true;
      let timer = setInterval(() => {
        if (this.countTime) {
          this.countTime--;
        } else {
          this.isCountDowm = false;
          clearInterval(timer);
        }
      }, 1000);
    },
    toRegister() {
      this.$router.push({ name: "register" });
    },
    toLogin() {
      this.$router.push({ name: "login" });
    },
    getVerifycode(userAccno){
        this.countDown();
        this.$refs["accountForm"].validate(valid => {
            if (valid) {
                this.$axios.post("/api/login/resetVerifyCode",{
                    userAccno:userAccno
                }).then(res => {
                    let data = res.data;
                    if (data.code === 0) {
                        // console.log(data);
                    }else{
                        this.$message({
                            type:"error",
                            message:data.desc
                        })
                    }
                })
            }
        })
    },
    resetPassword() {
        this.$refs["accountForm"].validate(valid => {
            if (valid) {
                this.$refs["ruleForm"].validate(valid => {
                    if (valid) {
                        this.$axios.post("/api/login/resetPassword",{
                            userAccno:this.accountForm.userAccno,
                            verifyCode:this.condition.verifyCode,
                            newPassword:this.condition.newPassword
                        }).then(res => {
                            let data = res.data;
                            if (data.code === 0) {
                                // console.log(data);
                                this.$router.push({name:"login"})
                                this.$message({
                                    type:"success",
                                    message:data.desc
                                })
                            }else{
                                this.$message({
                                    type:"error",
                                    message:data.desc
                                })
                            }
                        })
                    }
                })
            }
        })
    }
  }
};
</script>

<style lang="scss" >
.forget-wrapper {
  .forget-form-wrapper {
    background: #f7fafe;
    position: absolute;
    width: 410px;
    height: 450px;
    padding-left:20px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 0 10px #ccc;
    transition: all 0.4 linear;
    &.screw-enter-active,
    .screw-leave-active {
      opacity: 0;
    }
    &.screw-enter,
    .screw-leave-to {
      opacity: 0;
    }
    .title {
      padding: 20px 0;
      color: #666;
      text-align: center;
      font-weight: 700;
      font-size: 20px;
    }
  }
  .oprate-btn {
    text-align: right;
    margin-right: 40px;
  }
  .empty {
    display: inline-block;
    width: 36px;
    height: 10px;
    background-color: #e3e3e3;
    margin-right: 5px;
  }
  .weak {
    background: #ff0000;
  }
  .medium {
    background: #ff9900;
  }
  .strong {
    background: #33cc00;
  }
}
</style>
<style>
.forget-form-wrapper .el-form-item__error {
  top: 36px;
  margin-left: 52px;
}
.forget-form-wrapper .el-input--medium .el-input__inner{
    padding:0 0 0 10px;
}
</style>


