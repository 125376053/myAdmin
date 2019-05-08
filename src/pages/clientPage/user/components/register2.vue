<template>
    <div class="register2-wrapper">
      
      <div class="contain">
        <div class="title">完善注册信息</div>
        <p class="tips">您已选择注册开通<strong v-show="isOrgan">企业账户</strong><strong v-show="!isOrgan">个人账户</strong>，请完善注册信息，即刻开始使用证书智能管理系统吧！</p>
        <el-form ref="personalForm" :model="personalForm" label-width="1px">
            <el-form-item>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item prop="lastName" required>
                    <el-input placeholder="请输入姓氏" v-model="personalForm.lastName">
                        <template slot="prepend">姓：</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item  prop="firstName" required>
                    <el-input placeholder="请输入名字" v-model="personalForm.firstName">
                        <template slot="prepend">名：</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item v-if="isOrgan">
                <el-col :span="24">
                  <el-form-item prop="organization" required  >
                    <el-input placeholder="企业名称" v-model="personalForm.organization">
                        <template slot="prepend">企业名称</template>
                    </el-input>
                  </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item prop="password" required  v-if="isActive">
                <el-col :span="24">
                    <el-input placeholder="密码" type="password" v-model="personalForm.password">
                        <template slot="prepend">密码</template>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
              <el-row :gutter="20">
                <el-col :span="12">
                   <el-form-item prop="orgPhone" required v-if="isOrgan">
                    <el-input placeholder="请输入企业电话" v-model="personalForm.orgPhone">
                        <template slot="prepend">企业电话：</template>
                    </el-input>
                   </el-form-item>
                </el-col>
                <el-col :span="12">
                   <el-form-item prop="phone" required>
                    <el-input placeholder="请输入手机号" v-model="personalForm.phone">
                        <template slot="prepend">手机：</template>
                    </el-input>
                   </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item v-if="isOrgan">
                <el-row :gutter="20" >
                    <el-col :span="12">
                      <el-form-item prop="title" required>
                        <el-input placeholder="请输入职务" v-model="personalForm.title">
                            <template slot="prepend">职务：</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                   <el-col :span="12">
                    <el-form-item prop="division" required>
                      <el-input placeholder="请输入部门名称" v-model="personalForm.division">
                          <template slot="prepend">部门名称</template>
                      </el-input>
                    </el-form-item>
                </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item prop="state" required>
                      <el-input placeholder="请输入省份" v-model="personalForm.state">
                          <template slot="prepend">省份：</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item style="text-align:left" prop="country" required>
                      <div class="el-input-tit">国家：</div>
                        <el-select class="select-country" filterable v-model="personalForm.country" placeholder="请选择国家">
                            <el-option v-for="item in countryList" :key="item.code" :label="item.name_ZH+'('+item.code+')'" :value="item.code"></el-option>
                            <!-- <el-option label="中国" value="1"></el-option>
                            <el-option label="美国" value="2"></el-option>
                            <el-option label="英国" value="3"></el-option> -->
                        </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
            </el-form-item>
             <el-form-item>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item prop="location" required>
                      <el-input placeholder="请输入城市" v-model="personalForm.location">
                          <template slot="prepend">城市：</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item prop="zipCode" required>
                      <el-input placeholder="请输入邮编" v-model="personalForm.zipCode">
                          <template slot="prepend">邮编：</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
            </el-form-item>
            <el-form-item prop="address" required>
                <el-col :span="24">
                    <el-input placeholder="请输入地址" v-model="personalForm.address">
                        <template slot="prepend">地址：</template>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  style="width:260px;" size="medium" @click="savePersonalInfo('personalForm')">保存</el-button>
            </el-form-item>
        </el-form>
        <!-- <el-form ref="organForm" v-show="isOrgan" :model="organForm" label-width="1px">
            <el-form-item>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item prop="lastName" required>
                    <el-input placeholder="请输入姓氏" v-model="organForm.lastName">
                        <template slot="prepend">姓：</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item  prop="firstName" required>
                    <el-input placeholder="请输入名字" v-model="organForm.firstName">
                        <template slot="prepend">名：</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item required>
                <el-col :span="24">
                   <el-form-item prop="phone">
                    <el-input placeholder="请输入手机号" v-model="organForm.phone">
                        <template slot="prepend">手机：</template>
                    </el-input>
                   </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item prop="state" required>
                      <el-input placeholder="请输入省份" v-model="personalForm.state">
                          <template slot="prepend">省份：</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <div class="el-input-tit">国家</div>
                        <el-select class="select-country" v-model="personalForm.country" placeholder="请选择国家">
                            <el-option label="中国" value="1"></el-option>
                            <el-option label="美国" value="2"></el-option>
                            <el-option label="英国" value="3"></el-option>
                        </el-select>
                  </el-col>
                </el-row>
            </el-form-item>
             <el-form-item>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item prop="location" required>
                      <el-input placeholder="请输入城市" v-model="personalForm.location">
                          <template slot="prepend">城市：</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item prop="zipCode">
                      <el-input placeholder="请输入邮编" v-model="personalForm.zipCode">
                          <template slot="prepend">邮编：</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
            </el-form-item>
            <el-form-item prop="address" required>
                <el-col :span="24">
                    <el-input placeholder="请输入地址" v-model="personalForm.address">
                        <template slot="prepend">地址：</template>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  style="width:260px;" size="medium" @click="saveOrganInfo('organForm')">保存</el-button>
            </el-form-item>
        </el-form> -->
      </div>
    </div>
</template>

<script>
export default {
  name: "register1",
  data() {
    return {
      isOrgan: false,
      isActive:false,
      userName:"",
      routerParams:{},
      getBack:{},
      countryList:[],
      organForm: {
        firstName: "",
        lastName: "",
        phone: "",
        state: "",
        country: "",
        location: "",
        address: "",
        zipCode: ""
      },
      personalForm: {
        firstName: "",
        lastName: "",
        title: "",
        phone: "",
        division: "",
        organization: "",
        orgPhone: "",
        state: "",
        country: "",
        location: "",
        address: "",
        zipCode: "",
        password:""
      }
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {
    //  console.log("this.$route.params")
    //  console.log(this.$route.query)
     
    //  alert(this.countryList)
     this.routerParams = this.$route.query;
     this.$axios.post("/api/register/activity",{
       activityID:this.routerParams.activityID,
       token:this.routerParams.token
     }).then(res => {
       let data = res.data;
       if (data.code === 0) {
        //  console.log(data);
        //  alert(JSON.stringify(data));
         this.getBack = data.data;
         localStorage.setItem("token", this.getBack.token);
         this._getCountryList();
        this.$store.state.loginUserInfo.userID = this.getBack.userID;
        this.$store.state.loginUserInfo.userName = this.getBack.userName;
        this.$store.state.loginUserInfo.userType = this.getBack.userType;
        this.$store.state.loginUserInfo.isAdmin = this.getBack.isAdmin;
        this.$store.state.loginUserInfo.orgID = this.getBack.orgID;
        this.$store.state.loginUserInfo.orgName = this.getBack.orgName;
        this.$store.state.loginUserInfo.orgInfo = this.getBack.orgInfo;
        this.$store.state.loginUserInfo.email = this.getBack.email;
        this.$store.state.loginUserInfo.status = this.getBack.status;
        this.$store.state.loginUserInfo.token = this.getBack.token;
        localStorage.setItem("userID", this.getBack.userID);
        localStorage.setItem("userName", this.getBack.userName);
        localStorage.setItem("userType", this.getBack.userType);
        localStorage.setItem("isAdmin", this.getBack.isAdmin);
        localStorage.setItem("orgID", this.getBack.orgID);
        localStorage.setItem("orgName", this.getBack.orgName);
        localStorage.setItem("orgInfo", JSON.stringify(this.getBack.orgInfo));
        localStorage.setItem("email", this.getBack.email);
        localStorage.setItem("status", this.getBack.status);
        localStorage.setItem("token", this.getBack.token);

        if(this.getBack.userType === "PERSONAL"){
          this.isOrgan = false
        }else{
          this.isOrgan = true
        }

       }else{
         this.$message({
           type:'error',
           message:data.resc
         })
       }
     })
  },
  methods: {
    _getCountryList(){
      this.$axios.get("/api/common/getCountryOrAreaCode").then(res => {
        let data = res.data;
        if (data.code === 0) {
          // console.log(data);
          // alert("data");
          // alert(JSON.stringify(data));
          this.countryList = data.data
        }else{
          this.$message({
            type:"error",
            message:data.desc
          })
        }
      })
    },
    savePersonalInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/api/register/onCompletion", {
            firstName:this.personalForm.firstName,
            lastName:this.personalForm.lastName,
            title:this.personalForm.title,
            phone:this.personalForm.phone,
            division:this.personalForm.division,
            organization:this.personalForm.organization,
            orgPhone:this.personalForm.orgPhone,
            country:this.personalForm.country,
            state:this.personalForm.state,
            location:this.personalForm.location,
            zipCode:this.personalForm.zipCode,
            address:this.personalForm.address,
            password:this.personalForm.password,
          }).then(res => {
            let data = res.data;
            if (data.code === 0) {
              localStorage.setItem("userName", this.personalForm.lastName+this.personalForm.firstName);
              this.$router.push({name:"register3",params:{userInfo:this.getBack,userName:this.personalForm.lastName+this.personalForm.firstName}})
            }else{
              this.$message({
                type:'error',
                message:data.desc
              })
            }
          });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.register2-wrapper {
  .title {
    line-height: 50px;
    font-weight: bold;
    text-align: center;
    font-size: 18px;
  }
  .contain {
    width: 800px;
    height: 470px;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin: auto;
    border: 1px solid #eee;
    text-align: center;
    padding: 10px 50px;
    .count-down {
      color: #999;
      font-size: 12px;
      .red {
        color: #f56c6c;
        text-decoration: underline;
        cursor: pointer;
      }
    }
    .el-form-item--medium .el-form-item__content {
      margin-left: 0 !important;
    }
    .el-form-item_error {
      display: none;
    }
    .el-input-tit {
      height: 32px;
      background-color: #f5f7fa;
      color: #909399;
      vertical-align: -3px;
      display: inline-block;
      position: relative;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      padding: 0 20px;
      white-space: nowrap;
    }
    .select-country {
      margin-left: -5px;
      width: 255px;
      display: inline-block;
    }
  }
}
</style>
<style>
.select-country .el-input--medium .el-input__inner {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.register2-wrapper .el-dialog__body {
  padding-top: 10px;
  padding-bottom: 15px;
}
.register2-wrapper .el-form-item--medium .el-form-item__content {
  margin-left: 0 !important;
}
.register2-wrapper .el-form-item__error {
  display: none;
}
</style>

