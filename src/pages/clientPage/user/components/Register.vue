<template>
    <div class="register-wrapper" ref="registerWrapper">
      <transition name="el-zoom-in-bottom">
        <div class="register-form-wrapper" v-show="show">
            <div class="inner-wrapper">
              <div class="title">欢迎注册</div>
                <div class="oprate-btn">
                <el-button type="text" @click="toForgetPass">忘记密码&nbsp;&nbsp;</el-button>
                <el-button type="text" @click="toLogin">已有账号,快速登录</el-button>
            </div>
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="个人用户" name="PERSONAL">      
                </el-tab-pane>
                <el-tab-pane label="企业用户" name="ENTERPRISE">
                </el-tab-pane>
                <register-input :activeName="activeName"></register-input>
            </el-tabs>
            </div>
        </div>
      </transition>
    </div>
</template>

<script>
// import { change } from "@/utils/bgTransform.js";
// import jigsaw from "@/static/pictureVerification";

import registerInput from "@/components/RegisterInput";

export default {
  name: "register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码不能为空"));
      } else {
        const reg = /^(?![0-9]+$)[a-zA-Z0-9~!@#$%^&*]{8,20}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请按规则输入密码"));
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      show: false,
      activeName: "PERSONAL",
      loginForm: {
        email: "",
        pass: "",
        checkPass: "",
        volid: ""
      },
      centerDialogVisible: true,
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },

  components: {
    registerInput
  },
  computed: {
    level() {
      return this.$store.state.other.level;
    }
  },
  created() {
  },
  mounted() {
    this.show = !this.show;
    // jigsaw.init({
    //   el: document.getElementById("captcha"),
    //   onSuccess: function() {
    //   }
    // });
  },

  methods: {
    toLogin() {
      this.$router.push({ name: "login" });
    },
    toForgetPass() {
      this.$router.push({ name: "forgetPass" });
    },
    getVerifycode() {
      this.$axios
        .post("/login/verifyCode", {
          userAccno: this.loginForm.userAccno
        })
        .then(res => {
          // console.log(this.loginForm.userAccno);
          // console.log(res);
        });
    }
  }
};
</script>

<style lang="scss" >
.register-wrapper {
  // height: 100%;
  height: calc(100% - 190px);
  .register-form-wrapper {
    width: 100%;
    background: #f7fafe;
    height: 100%;
    .inner-wrapper {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 880px;
      height: 475px;
      margin: auto;
      z-index: 9;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: 0 0 5px #999;
      transition: all 0.4 linear;

      .tab-form {
        display: inline-block;
        width: 50%;
        .password-input {
          .el-form-item__error {
            top: 36px;
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
          .red {
            background-color: #de3a25;
          }
        }
        .captcha {
          margin-left: 40px;
        }
      }
      .tips {
        display: inline-block;
        width: 43%;
        margin-left: 30px;
        vertical-align: top;
        font-size:12px;
        .top{
          line-height: 20px;
          background-color: #ecf4ff;
          border: 1px solid #8eb6fb;
          padding: 10px;
          p{
            margin:6px 0; 
          }
        }
        .bottom{
          margin-top:10px;
        }
      }
    }
  }
  .title {
    padding-top: 20px;
    color: #666;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
  }
  .oprate-btn {
    position: absolute;
    text-align: right;
    width: 60%;
    top: 30px;
    right: 30px;
    z-index: 10;
  }

}
</style>
<style>
  .el-tabs__header{
    margin-bottom: 30px;
  }
</style>


