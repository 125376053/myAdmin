<template>
    <div class="toSignOrder-wrapper">
        <h3>{{orderID}}订单验证状态</h3>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item>
                <el-row :gutter="2">
                    <el-col :span="8">
                        <el-form-item  label="主域名:" prop="commonName"  label-width="80px">
                            <el-input disabled v-model="ruleForm.commonName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item  label="产品名称:" prop="productName" label-width="80px">
                            <el-input disabled v-model="ruleForm.productName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="有效期:" prop="validDate" label-width="80px">
                            <el-input disabled v-model="ruleForm.validDate"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-row :gutter="5">
                    <el-col :span="8">
                        <el-form-item  label="订单号:" prop="orderID" label-width="80px">
                            <el-input disabled v-model="ruleForm.orderID"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item  label="秘钥算法:" prop="keySize" label-width="80px">
                            <el-input disabled v-model="ruleForm.keySize"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="签名算法:" prop="signatureHashAlgorithm"  label-width="80px">
                            <el-input disabled v-model="ruleForm.signatureHashAlgorithm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-col :span="24">
                    <el-form-item  label="附加域名:" prop="SANs" label-width="80px">
                        <el-input disabled type="textarea" v-model="ruleForm.SANs"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
        </el-form>
        <div>
            <div class="authTit">域名验证（<span>{{ruleForm.authMethod === 'DNS'?'DNS验证':ruleForm.authMethod === 'FILE'?'文件验证':'邮件验证'}}</span>）：</div>
            <div v-show="ruleForm.authMethod === 'DNS'" class="authDetail">
                <div>
                    <span class="tit">记录类型：</span>
                    <span class="txt">TXT</span>
                </div>
                <div>
                    <span class="tit">主机记录：</span>
                    <span class="txt">{{ruleForm.checkName}}</span>
                </div>
                <div>
                    <span class="tit">解析记录值：</span>
                    <span class="txt">{{ruleForm.checkValue}}</span>
                </div>
            </div>
            <div v-show="ruleForm.authMethod === 'FILE'" class="authDetail">
                <div>
                    <span class="tips">建立{{ruleForm.checkName}}的页面</span>
                </div>
                <div>
                    <span class="tit">文件内容：</span>
                    <span class="txt">{{ruleForm.checkValue}}</span>
                </div>
                <div>
                    <span class="tips">完成以后通知我们来进行验证。</span>
                </div>
            </div>
            <div v-show="ruleForm.authMethod === 'EMAIL'" class="authDetail">
                <div>
                    <span class="tips">请前往以下邮箱查收邮件。在收到证书颁发机构的域名授权邮件后，按照邮件要求审批即可完成域名验证。</span>
                </div>
                <div>
                    <div class="tips" v-for=" item in ruleForm.email" :key="item">{{item}}</div>
                </div>
            </div>
        </div>
        <div style="text-align:center">
            <el-button @click="back" type="primary">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
  name: "toSignOrder",
  data() {
    return {
      orderID: "",
      ruleForm: {
        orderID: "",
        commonName: "",
        productName: "",
        validDate: "",
        keySize: "",
        SANs_Normal: "",
        signatureHashAlgorithm: "",
        SANs_WildCard: "",
        authMethod: "",
        checkName: "",
        checkValue: "",
        email: ""
      },
      rules: {}
    };
  },
  computed: {
    allDomain() {
      return this.ruleForm.SANs_Normal + ";" + this.ruleForm.SANs_WildCard;
    }
  },
  mounted() {
    this.orderID = this.$route.params.orderID;
    this.$axios
      .post("/api/orderManage/status", { orderID: this.orderID })
      .then(res => {
        let data = res.data;
        if (data.code === 0) {
        //   console.log(data);
          this.ruleForm = data.data;
        } else {
          this.$message({
            type: "error",
            message: data.desc
          });
        }
      });
  },
  methods: {
    back() {
      this.$router.push({ name: "OrderManage" });
    }
    
  }
};
</script>

<style scoped lang="scss">
.toSignOrder-wrapper {
  padding: 20px 40px;
  h3 {
    font-size: 14px;
    border-bottom: 1px solid #999;
    padding-bottom: 10px;
    margin-bottom: 40px;
  }
  .authTit {
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #888;
  }
  .authDetail {
    .tit {
      color: #606266;
      font-size: 13px;
      padding: 5px 10px;
      line-height: 30px;
      width: 100px;
      text-align: right;
      display: inline-block;
    }
    .txt {
      font-size: 12px;
    }
    .tips {
      margin-left: 25px;
      display: block;
      line-height: 30px;
    }
  }
}
</style>
<style>
.toSignOrder-wrapper .el-input.is-disabled .el-input__inner {
  color: #999;
  font-size: 12px;
}
.toSignOrder-wrapper .el-textarea.is-disabled .el-textarea__inner {
  color: #999;
  font-size: 12px;
}
.toSignOrder-wrapper label {
  font-weight: normal;
  font-size: 13px;
}
</style>
