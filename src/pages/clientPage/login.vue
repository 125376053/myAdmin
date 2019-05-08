<template>
    <div class="login-wrapper" ref="loginWrapper">
      <transition name="el-zoom-in-bottom">
        <div class="login-form-wrapper" v-show="show">
            <!-- <div class="title">用户登录</div> -->
            <el-tabs v-model="activeName" class="tab">
                <el-tab-pane label="密码登录" name="first">
                    <el-form :model="loginFormPwd" status-icon :rules="rules" ref="loginFormPwd" label-width="100px" class="rule-form">
                        <el-form-item prop="userAccno">
                            <el-input prefix-icon="el-icon-mobile-phone"  placeholder="手机或邮箱" v-model="loginFormPwd.userAccno"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" prefix-icon="el-icon-bell"  placeholder="登录密码" @keyup.enter.native="pwdLogin('loginFormPwd')" v-model="loginFormPwd.password" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button style="width:270px;margin-top:22px;" type="primary" @keyup.enter.native="pwdLogin('loginFormPwd')" @click="pwdLogin('loginFormPwd')">登录</el-button>
                        </el-form-item>        
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="验证码登录" name="second">
                    <el-form :model="accountForm" ref="accountForm" :rules="rules2">
                          <el-form-item prop="userAccno">
                            <el-input prefix-icon="el-icon-mobile-phone"  placeholder="手机或邮箱" v-model="accountForm.userAccno"></el-input>
                          </el-form-item>
                    </el-form>
                    <el-form :model="loginFormValid" status-icon :rules="rules" ref="loginFormValid" label-width="100px" class="rule-form">
                        <el-form-item prop="verifyCode">
                            <el-input style="width:180px" type="text" prefix-icon="el-icon-bell"  placeholder="验证码" v-model="loginFormValid.verifyCode" auto-complete="off"></el-input>
                            <el-button style="width:80px;font-size:12px;padding:0;height:32px;line-height:32px;margin-left:8px;border:none;" type="primary" disabled v-show="isCountDowm"><span >{{countTime}}s后发送</span></el-button>
                            <el-button style="width:80px;font-size:12px;padding:0;height:32px;line-height:32px;margin-left:8px;border:none;" type="primary" v-show="!isCountDowm" @click="getVerifycode"><span >点击获取</span></el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button style="width:270px;margin-top:22px;" type="primary" @keyup.enter.native="submitForm" @click="verifyLogin('loginFormValid')">登录</el-button>
                        </el-form-item>        
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            
            <div class="oprate-btn" >
                <el-button type="text" style="font-size:12px;text-align:left;display:inline-block;" @click="backTo">返回&nbsp;&nbsp;</el-button>
                <div style="text-align:right;display:inline-block;width:216px;">
                    <el-button type="text" style="font-size:12px;text-align:right;" @click="toForgetPass">忘记密码&nbsp;&nbsp;</el-button>
                    <el-button type="text" style="font-size:12px;text-align:right;" @click="toRegister">注册</el-button>
                </div>
            </div>

            <div class="relevant">
                <el-button type="text">iTrusChina</el-button>
                <span>|</span>
                <el-button type="text" @click="openLink('server')" >服务协议</el-button>
                <span>|</span>
                <el-button type="text" @click="openLink('private')">隐私保护</el-button>
            </div>
        </div>
      </transition>
    </div>
</template>

<script>
export default {
  name: "login",
  data() {
    var validAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("账号不能为空!"));
      } else {
        let phoneReg = /^1[3-578]\d{9}$/;
        // let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
        let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (phoneReg.test(value) || mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱或者手机号"));
        }
      }
    };
    return {
      activeName: "first",
      show: false,
      countTime:60,
      isCountDowm:false,
      resUrl:"https://res.itrus.cn",
      loginFormPwd: {
        userAccno: "",
        password: ""
      },
      loginFormValid: {
        verifyCode: ""
      },
      accountForm: {
        userAccno: ""
      },
      centerDialogVisible: true,
      rules: {
        userAccno: [{ validator: validAccount, trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      },
      rules2: {
        userAccno: [{ validator: validAccount, trigger: "blur" },
        { required: true, message: "手机不能为空", trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  created() {
    //   this.show = !this.show
  },
  mounted() {
    this.show = !this.show;
    this.$store.dispatch("changIsClient",true)
  },
  methods: {
    toRegister() {
      this.$router.push({ name: "clientRegister",params:{isClient:true} });
    },
    toForgetPass() {
      this.$router.push({ name: "clientForgetPass",params:{isClient:true} });
    },
    backTo(){
      location.href = "/__itrus5/home.html?flag=login";
    },
    selectArea(){
    //  parent.document.querySelector(".uName").innerHTML=localStorage.userName
    //  parent.document.querySelector("#loginInit").style.display='none';
    //  parent.document.querySelector("#userInfo").style.display='inline-block';   
      if(localStorage.manageType === 'UNKNOWN'){
        // location.href = "/__itrus5/home.html?flag=login";
        this.$router.push({ name: "selectMode" });
      }else if(localStorage.manageType === 'DISTRIBUTED'){
        this.$router.push({ name: "selectArea" });
      }else if(localStorage.manageType === 'CENTRALIZATION'){
        parent.document.querySelector(".uName").innerHTML=localStorage.userName
        parent.document.querySelector("#loginInit").style.display='none';
        parent.document.querySelector("#userInfo").style.display='inline-block'; 
        location.href = "/__itrus5/home.html?flag=login";
      }
    },
    pwdLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("getLoginUser", {
              url: "/api/login/byAccno",
              data: {
                userAccno: this.loginFormPwd.userAccno,
                password: this.loginFormPwd.password
              }
            })
            .then(res => {
              this.$store.dispatch("changIsClient",true)
              if (localStorage.getItem("status") === 'INCOMPLETE') {
                this.$router.push({name:"clientRegister2",params:{userInfo:this.$store.state.loginUserInfo.userInfo}})
              }else{
                this.selectArea();
              }
              // location.href = "/__itrus5/home.html?flag=login";
            })
            .catch(err => {
              // console.log(err)
              this.$message({
                type:'error',
                message:err.desc
              })
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    verifyLogin(formName) {
      this.$refs["accountForm"].validate(valid => {
        if (valid) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.$store
                .dispatch("getLoginUser", {
                  url: "/api/login/byVerifyCode",
                  data: {
                    userAccno: this.accountForm.userAccno,
                    verifyCode: this.loginFormValid.verifyCode
                  }
                })
                .then(res => {
                  if (localStorage.getItem("status") === 'INCOMPLETE') {
                    this.$router.push({name:"clientRegister2",params:{userInfo:this.$store.state.loginUserInfo.userInfo}})
                  }else{
                    this.selectArea();
                  }
                })
                .catch(err => {
                  this.$message({
                    type:'error',
                    message:err.desc
                  })
                });
            }
          });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    getVerifycode() {
      // console.log(this.accountForm.userAccno)
      // this.countDown();
      this.$refs["accountForm"].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/login/verifyCode", {
              userAccno: this.accountForm.userAccno
            })
            .then(res => {
              let data = res.data;
              if (data.code === 0) {
                this.countDown();
                this.$message(data.desc);
              }else{
                this.$message({
                  type:'error',
                  message:data.desc
                })
              }
            });
        }
      });
    },
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
    openLink(name) { 
      // alert(name)    
      var sendJson = {};
      sendJson["cmd"] = "systemConfig";
      sendJson["method"] = "openUrlByDefaultBrower"; 
      
      if (name === "private") {
        // sendJson["url"] = "http://192.168.31.218:8888/#/user/serverProtocol"
         sendJson["url"] = this.resUrl + "/#/user/privatePolicy";
      }
      if (name === "server") {
        // sendJson["url"] = "http://192.168.31.218:8888/#/user/privatePolicy";
        sendJson["url"] = this.resUrl + "/#/user/serverProtocol"
       
      }
      parent.sendDataTread(sendJson);
    }
  }
};
</script>

<style lang="scss" >
.login-wrapper {
  .login-form-wrapper {
    position: absolute;
    width: 350px;
    height: 365px;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    // z-index: 9;
    margin:auto;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 0 10px #888;
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
    width: 270px;
    margin-right: 40px;
    font-size:12px;
    margin:0 auto;
    margin-top:-26px;
    position: relative;
    z-index: 9;
  }
  .relevant {
    text-align: center;
    color: #999;
    margin-top: 20px;
    .el-button--text {
      color: #999;
      font-size: 12px;

    }
  }
  .el-tabs {
    .el-tabs__header {
      margin-bottom: 36px;
      .el-tabs__nav-wrap {
        padding-left: 30px;
      }
      .el-tabs__nav {
        // padding-left: 144px;
        .el-tabs__active-bar {
          // margin-left: 144px;
        }
      }
    }
  }
}
</style>
<style>
/* @media screen and (max-width: 300px){

} */
.login-wrapper .el-form-item{
  /* margin-bottom: 8px; */
}
</style>


