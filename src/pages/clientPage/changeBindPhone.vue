<template>
    <div class="changeBindPhone-wrapper">
      <div class="contain">
        <div class="title">更换手机号绑定</div>
        <el-form ref="originalPhoneForm" :rules="rule" :model="originalPhoneForm">
          <el-form-item prop="phone">
                <el-col :span="24">
                   <el-input :placeholder="'请输入原来手机号'+ $route.params.phone"  v-model="originalPhoneForm.phone">
                        <template slot="prepend">原手机：</template>
                    </el-input>
                </el-col> 
            </el-form-item>
        </el-form>
        <el-form ref="phoneForm" :rules="rule" :model="phoneForm">
          <el-form-item prop="phone">
                <el-col :span="24">
                   <el-input placeholder="请输入要绑定的手机号"  v-model="phoneForm.phone">
                        <template slot="prepend">新手机：</template>
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
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  style="width:100px;display:inline-block" size="small" @click="save('bindPhoneForm')">保存</el-button>
              <el-button type="primary"  style="width:100px;display:inline-block" size="small" @click="cancelBind('bindPhoneForm')">取消</el-button>
              <!-- <span style="margin-left:20px;text-decoration: underline;cursor:pointer;" @click="toDashed">取消</span> -->
            </el-form-item>
        </el-form>
        <div class="tips">
          <div>温馨提示：</div>
          <p>1.为确保您的信息安全，我们已将您手机号码中的部分信息做了隐藏处理。您需要正确输入原手机号，才能更换手机号码的绑定。</p>
          <p>2.请使用中国大陆手机号。绑定成功即可用于登录和密码找回。绑定的手机号还可用于接收服务器证书配置异常时的通知。</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "changeBindPhone",
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
      originalPhoneForm:{
          phone: ""
      },
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
      // this.originalPhoneForm.phone = this.$route.params.phone;
      // this.type = true;
      // this.timepicker();
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
            .post("/api/userManage/phoneVerifyCode", {
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
                  type: "error",
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
                .post("/api/userManage/phoneEdit", {
                  oldPhone: this.originalPhoneForm.phone,
                  newPhone: this.phoneForm.phone,
                  verifyCode: this.bindPhoneForm.valide
                })
                .then(res => {
                  let data = res.data;
                  if (data.code === 0) {
                    // console.log(data)
                    this.$message({
                      type:"success",
                      message:data.desc
                    });
                    // this.$router.push({ name: "dashboard"});
                    this.$router.push({ name: "clientPersonalCenter"});
                  }else{
                    this.$message({
                      type:"error",
                      message:data.desc
                    })
                  }
                  
                });
            } else {
              this.$message("请输入正确的表单信息");
            }
          });
        }
      });
    },
    cancelBind() {
      // alert(this.userName)
      this.$router.push({ name: "dashboard"});
    }
  }
};
</script>

<style lang="scss" scoped>
.changeBindPhone-wrapper {
  margin:12px 15px 0;
  height: calc(100% - 12px);
  background-color: #fff;
  // position: absolute;
  // // top: 0;
  // left: 0;
  // right: 0;
  // // bottom: 0;
  // margin: auto;
  .title {
    margin-bottom: 10px;
    line-height: 20px;
    font-weight: bold;
    text-align: center;
    font-size: 18px;
  }
  .contain {
    width: 500px;
    height: 424px;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin: auto;
    border: 1px solid #eee;
    text-align: center;
    margin-top: 50px;
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
      p{
        margin: 6px 0;
        line-height: 20px;
      }
    }
  }
}
</style>
<style>
.changeBindPhone-wrapper .el-dialog__body {
  padding-top: 10px;
  padding-bottom: 15px;
}
.changeBindPhone-wrapper .el-form-item--medium .el-form-item__content {
  margin-left: 0 !important;
}
</style>

