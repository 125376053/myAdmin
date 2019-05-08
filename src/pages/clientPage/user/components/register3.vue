<template>
    <div class="register3-wrapper">
      <div class="contain">
        <div class="title">手机号绑定</div>
        <el-form ref="phoneForm" :rules="rule" :model="phoneForm">
          <el-form-item prop="phone">
                <el-col :span="24">
                   <el-input placeholder="请输入手机号"  v-model="phoneForm.phone">
                        <template slot="prepend">手机：</template>
                    </el-input>
                </el-col>
            </el-form-item>
        </el-form>
        <el-form ref="bindPhoneForm" :rules="rule" :model="bindPhoneForm">
            <el-form-item>
                <el-row :gutter="8">
                    <el-col :span="17">
                      <el-form-item prop="valide">
                        <el-input placeholder="请输入验证码" v-model="bindPhoneForm.valide">
                            <template slot="prepend">验证码：</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                   <el-col :span="2">
                      <el-button type="primary" style="width:110px;height:32px;margin-top:3px;line-height:32px;padding:0" @click="getValidate" v-show="!isCount">发送验证码</el-button>
                      <el-button type="primary" style="width:110px;height:32px;margin-top:3px;line-height:32px;padding:0" disabled v-show="isCount">{{time}}s重新发送</el-button>
                      <!-- <el-button type="primary" v-if="type" :disabled="type&&time>0" @click="getValidate">{{time==5||time==0?'发送验证码':time+'S'}}</el-button>
                      <el-button type="primary" v-else :disabled="type&&time>0" @click="getValidate">{{time==5||time==0?'发送验证码':time+'S'}}</el-button> -->
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  style="width:100px;display:inline-block" size="small" @click="save('bindPhoneForm')">保存</el-button>
              <span style="margin-left:20px;text-decoration: underline;cursor:pointer;" @click="toDashed">跳过</span>
            </el-form-item>
        </el-form>
        <div class="tips">
          <div>温馨提示：</div>
          <p>请使用中国大陆手机号。绑定成功即可用于登录和密码找回。绑定的手机号还可用于接收服务器证书配置异常时的通知。</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "register3",
  data() {
    let validPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("手机号不可为空"));
      } else {
        let reg = /^1[3456789]\d{9}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入有效的手机号码"));
        } else {
          callback();
        }
      }
    };
    return {
      userInfo: null,
      userName:"",
      type: false,
      time: 60,
      isCount: false,
      phoneForm: {
        phone: ""
      },
      bindPhoneForm: {
        valide: ""
      },
      rule: {
        phone: [{ validator: validPhone, trigger: "blur" }],
        valide: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    // alert("royterParams"+JSON.stringify(this.$route.params))
    if (this.$route.params.phone) {
      this.phoneForm.phone = this.$route.params.phone;
      this.type = true;
      // this.timepicker();
    }
    else if(this.$route.params.userInfo){
      this.userInfo=this.$route.params.userInfo;
      this.userName=this.$route.params.userName;
      
      // alert(this.userName);
      // alert(JSON.stringify(this.$route.params.userInfo));
    }
  },
  computed: {
    flag() {
      return;
    }
  },
  methods: {
    timepicker() {
      this.time = 60;
      this.isCount = true;
      let timer = setInterval(() => {
        if (this.time <= 0) {
          this.isCount = false;
          clearInterval(timer);
        } else {
          this.time--;
        }
      }, 1000);
    },
    getValidate() {
      this.$refs["phoneForm"].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/register/sendVerifyCode", {
              phone: this.phoneForm.phone
            })
            .then(res => {
              let data = res.data;
              if (data.code === 0) {
                // console.log(data)
                this.$message("验证码已发送成功");
                this.timepicker();
              } else {
                this.$message({
                  type: "danger",
                  message: data.desc
                });
              }
            });
        } else {
          this.$message("请填写正确的手机号码！");
        }
      });
    },
    save(formName) {
      this.$refs["phoneForm"].validate(valid => {
        if (valid) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.$axios
                .post("/api/register/phoneBound", {
                  phone: this.phoneForm.phone,
                  verifyCode: this.bindPhoneForm.valide
                })
                .then(res => {
                  let data = res.data;
                  if (data.code === 0) {
                    // console.log(data)
                    this.$router.push({ name: "dashboard",params:{userInfo:this.userInfo,userName:this.userName} });
                  }
                  this.$message(data.desc);
                });
            } else {
              this.$message("请输入正确的表单信息");
            }
          });
        }
      });
    },
    toDashed() {
      this.$router.push({ name: "dashboard",params:{userInfo:this.userInfo,userName:this.userName} });
    }
  }
};
</script>

<style lang="scss" scoped>
.register3-wrapper {
  .title {
    padding-bottom: 10px;
    line-height: 20px;
    font-weight: bold;
    text-align: center;
    font-size: 18px;
  }
  .contain {
    width: 500px;
    height: 345px;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin: auto;
    border: 1px solid #eee;
    text-align: center;
    line-height: 26px;
    padding: 20px 50px 30px;
    .count-down {
      color: #999;
      font-size: 12px;
      .red {
        color: #f56c6c;
        text-decoration: underline;
        cursor: pointer;
      }
    }
    .tips {
      text-align: left;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
<style>
.register3-wrapper .el-dialog__body {
  padding-top: 10px;
  padding-bottom: 15px;
}
.register3-wrapper .el-form-item--medium .el-form-item__content {
  margin-left: 0 !important;
}
</style>

