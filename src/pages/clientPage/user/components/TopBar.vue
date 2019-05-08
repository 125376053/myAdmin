/*
 * @Author: jiangyan 
 * @Date: 2018-05-30 11:30:44 
 * @Last Modified by: jiangyan
 * @Last Modified time: 2019-03-26 10:27:41
 */
<template>
<div class="topBar">
  <img class="logo" src="../../../assets/logo.png">
  <!-- <span class="title">CIM证书智能管理系统</span> -->
  <!-- <div class="titleMenu" v-show="userName">
    <el-dropdown @command="itemClick">
      <span class="btnStyle" style="margin-right:20px;margin-left:30px;">{{userName}}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="accountManage" v-show="userType ==='ENTERPRISE' && isAdmin">用户管理</el-dropdown-item>
        <el-dropdown-item command="departmentManage" v-show="userType ==='ENTERPRISE' && isAdmin">用户组管理</el-dropdown-item>
        <el-dropdown-item command="personalCenter">个人中心</el-dropdown-item>
        <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
        <el-dropdown-item command="loginOut">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
  <div class="titleMenu" v-show="isEnterprise && userName">
    <el-dropdown @command="enterpriseItem">
      <span class="btnStyle" style="margin-right:20px;margin-left:30px;">{{orgName}}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item disabled v-for="item in $store.state.getSubOrgList.subOrgList" :key="item.orgID" >{{item.subOrgName}}{{item.status === 'AUTHED'?'':"(未验证)"}}</el-dropdown-item>
        <el-dropdown-item command="manageEnterprise">管理企业</el-dropdown-item> 
      </el-dropdown-menu>
    </el-dropdown>
  </div> -->
  <a href="https://cim.itrus.cn/" target="_blank"><div class="titleMenu btnStyle">下载CIM客户端</div></a>
  <!-- <el-dialog title="修改密码" :visible.sync="dialogVisible" width="450px" style="margin-top:20px;">
    <el-form :model="condition" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item prop="oldPassword">
        <span class="spanStyle">旧密码：</span>
        <el-input class="inputStyle" type="password" v-model="condition.oldPassword" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <br>
      <el-form-item prop="newPassword" class="password-input">
        <span class="spanStyle">新密码：</span>
        <el-input class="inputStyle" type="password" prefix-icon="el-icon-bell"  placeholder="设置登录密码" v-model="condition.newPassword" auto-complete="off" ></el-input>
        <div style="margin-top:10px;color:#999;font-size:12px;"><span style="display:inline-block;margin-right:8px;margin-left:40px">安全密码强度</span><span :class="level>0?level<5?'empty weak':'empty':'empty'"></span><span :class="level >= 2 ?'empty medium':'empty'"></span><span :class="level >= 3 ?'empty strong':'empty'"></span><span>{{level===1?'弱':level===2?'中':(level===3)||(level===4)?'强':''}}</span></div>
        <div style="color:#999;font-size:12px;line-height:0;margin-left:40px;">8-16 个字符，请使用字母、数字或特殊符号的组合密码</div>
      </el-form-item>
      <el-form-item prop="checkPassword">
        <span class="spanStyle">确认新密码：</span>
        <el-input class="inputStyle" type="password" v-model="condition.checkPassword" placeholder="请再次输入新密码"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="changePassword">修 改</el-button>
    <el-button @click="dialogVisible = false">取 消</el-button>
  </span>
  </el-dialog> -->
</div>
</template>

<script>
import { checkPwdSecurity } from "@/utils/pwdSecurityVerify";
export default {
  name: "TopBar",
  data: function() {
    var checkPasswordFn = (rule, value, callback) => {
      if (value !== this.condition.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      userInfo: null,
      block: true,
      name: "",
      userID: "",
      userType: "",
      orgID: "",
      userName: "",
      orgName: "",
      orgInfo: "",
      status: "",
      subOrgList:[],
      isEnterprise: false,
      dialogVisible: false,
      condition: {
        oldPassword: "",
        newPassword: "",
        checkPassword: ""
      },
      rules: {
        oldPassword: [
          {
            required: true,
            message: "旧密码不能为空",
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
      },
      loading: null
    };
  },
  computed: {
    level() {
      return this.$store.state.other.level;
    }
  },
  watch: {
    "condition.newPassword": {
      handler: function() {
        checkPwdSecurity(this, this.condition.newPassword, this.level);
      },
      deep: true //深度监听
    }
  },
  methods: {
    enterpriseItem() {
      if (arguments[0] == "manageEnterprise") {
        this.$router.push({ name: "enterpriseManage" });
      }
    },
    itemClick() {
      if (arguments[0] == "loginOut") {
        this.$store
          .dispatch("loginOut")
          .then(() => {
            localStorage.clear();
            this.$router.push({ name: "login" });
          })
          .catch((error) => {
            // console.log("error");
            alert(error)
          });
      } else if (arguments[0] == "accountManage") {
        this.$router.push({ name: "accountManage" });
      } else if (arguments[0] == "departmentManage") {
        this.$router.push({ name: "departmentManage" });
      } else if (arguments[0] == "personalCenter") {
        this.$router.push({ name: "personalCenter" });
      } else if (arguments[0] == "changePassword") {
        this.dialogVisible = true;
      }
    },
    changePassword() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/userManage/authEdit", {
              oldPwd: this.condition.oldPassword,
              newPwd: this.condition.newPassword
            })
            .then(res => {
              let data = res.data;
              if (data.code === 0) {
                this.$message({
                  type: "success",
                  message: data.desc
                });
                this.dialogVisible = false;
                // console.log(data)
              } else {
                this.$message({
                  type: "error",
                  message: data.desc
                });
              }
            });
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    // alert(localStorage.userName)
    // alert(this.$route.params.userName)
    // alert( JSON.stringify(this.$route.params));
    this.userID = localStorage.getItem("userID");
    this.userType = localStorage.getItem("userType");
    this.orgID = localStorage.getItem("orgID");
    this.orgName = localStorage.getItem("orgName");
    this.userName = localStorage.getItem("userName"); 
    this.orgInfo = JSON.parse(localStorage.getItem("orgInfo"));
    this.status = localStorage.getItem("status");
    this.isAdmin = localStorage.getItem("isAdmin");
    // console.log("localStorage.getItem");
    // console.log(localStorage.getItem("userName"));
    if (this.$route.params.userInfo) {
      this.userInfo = this.$route.params.userInfo;
      this.userID = this.userInfo.userID;
      this.userName = this.$route.params.userName;
      this.userType = this.userInfo.userType;
      this.orgID = this.userInfo.orgID;
      this.orgName = this.userInfo.orgName;
      this.orgInfo = this.userInfo.orgInfo;
      this.status = this.userInfo.status;
      this.isAdmin = this.userInfo.isAdmin;
    }
    this.$store.dispatch("getSubOrganList").then(() => {
      this.subOrgList = this.$store.state.getSubOrgList.subOrgList
      // console.log("this.subOrgList")
      // console.log(this.subOrgList)
    });
    
  }
};
</script>

<style lang="scss" scoped>
.topBar .el-form-item__error {
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
.topBar {
  background-color: #222333;
  width: 100%;
  height: 90px;
}

.inputStyle {
  width: 285px;
}

.spanStyle {
  display: inline-block;
  width: 86px;
  text-align: right;
}

.logo {
  // width: 55px;
  // height: 55px;
  margin-left: 80px;
  margin-top: 13px;
  vertical-align: middle;
}

.title {
  color: white;
  margin-left: 15px;
  vertical-align: middle;
  font-size: 20px;
  font-weight: 900;
}

.titleMenu {
  float: right;
}

.activeStyle {
  color: #e9524b !important;
  border-bottom: solid 3px #e9524b;
}

.btnStyle {
  font-size: 14px;
  display: inline-block;
  padding-left: 20px;
  padding-right: 20px;
  height: 90px;
  line-height: 90px;
  cursor: pointer;
  color: white;
}
</style>
<style>
.topBar .el-form-item__content {
  margin-left: 0 !important;
}
.topBar .el-form-item__error {
  margin-left: 100px;
}
.topBar .el-form-item__error {
  top: 36px;
}
.topBar .el-form-item {
  margin-bottom: 0;
}
.topBar .password-input.el-form-item {
  margin-bottom: 22px;
}
</style>

