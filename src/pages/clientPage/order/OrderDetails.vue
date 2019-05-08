<template>
    <div class="orderDetails-wrapper">
        <!-- <div class="title">
          <h3>{{orderID}}订单验证状态</h3>
          <div class="divButton">
            <el-button type="primary" style="padding:0;height26px;line-height:26px;width:84px;font-size:12px;" @click="downLoadCert(orderID)" v-show="ruleForm.orderInfo.statusDesc === '已签发' || ruleForm.orderInfo.statusDesc === '替换中' || ruleForm.orderInfo.statusDesc === '已替换' || ruleForm.orderInfo.statusDesc === '更新中' || ruleForm.orderInfo.statusDesc === '已更新'">下载证书</el-button>
            <el-button type="primary" style="padding:0;height26px;line-height:26px;width:84px;font-size:12px;" @click="cancelOrder(orderID)" v-show="ruleForm.orderInfo.statusDesc === '待审核' || ruleForm.orderInfo.statusDesc === '待审批' || ruleForm.orderInfo.statusDesc === '待签发' || ruleForm.orderInfo.cancelPermission">取消订单</el-button>
          </div>
        </div> -->
         <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="width:90%;margin:0 auto;">
            <el-form-item>
                <el-row :gutter="10">
                    <el-col :span="6">
                        <el-form-item  label="主域名:" prop="commonName"  label-width="80px">
                            <el-input disabled v-model="ruleForm.orderInfo.commonName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item  label="产品名称:" prop="productName" label-width="80px">
                            <el-input disabled v-model="ruleForm.orderInfo.productName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="有效期:" prop="validDate" label-width="80px">
                            <el-input disabled v-model="ruleForm.orderInfo.validDate"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item  label="订单号:" prop="orderID" label-width="80px">
                            <el-input disabled v-model="ruleForm.orderInfo.orderID"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-row :gutter="10">
                    <el-col :span="6">
                        <el-form-item  label="原订单号:" prop="orgOrderID" label-width="80px">
                            <el-input disabled v-model="ruleForm.orderInfo.orgOrderID"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="订单状态:" prop="statusDesc"  label-width="80px">
                            <el-input disabled v-model="ruleForm.orderInfo.statusDesc"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item  label="秘钥算法:" prop="keySize" label-width="80px">
                            <el-input disabled v-model="ruleForm.orderInfo.keySize"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="签名算法:" prop="signatureAlgorithm"  label-width="80px">
                            <el-input disabled v-model="ruleForm.orderInfo.signatureAlgorithm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-col :span="24">
                    <el-form-item  label="附加域名:" prop="SANs" label-width="80px">
                        <el-input disabled type="textarea" v-model="ruleForm.orderInfo.SANs"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item class="contactsInput" >
              <el-row :gutter="30">
                <el-col :span="8" v-show="ruleForm.orderInfo.productType !== 'DV'">
                    <div class="tit">组织信息</div>
                    <el-form-item  label="组织名称:" prop="orgName" label-width="75px">
                      <el-input disabled  v-model="ruleForm.orderInfo.orgName"></el-input>
                    </el-form-item>
                    <el-form-item  label="部门名称:" prop="orgUnit" label-width="75px">
                        <el-input disabled  v-model="ruleForm.orderInfo.orgUnit"></el-input>
                    </el-form-item>
                    <el-form-item  label="座机号码:" prop="phone" label-width="75px">
                        <el-input disabled  v-model="ruleForm.orderInfo.phone"></el-input>
                    </el-form-item>
                    <el-form-item  label="国家代码:" prop="country" label-width="75px">
                      <el-input disabled  v-model="ruleForm.orderInfo.country"></el-input>
                    </el-form-item>
                    <el-form-item  label="省市名称:" prop="state" label-width="75px">
                        <el-input disabled  v-model="ruleForm.orderInfo.state"></el-input>
                    </el-form-item>
                    <el-form-item  label="市或区名:" prop="location" label-width="75px">
                        <el-input disabled  v-model="ruleForm.orderInfo.location"></el-input>
                    </el-form-item>
                    <el-form-item  label="邮政编码:" prop="postcode" label-width="75px">
                        <el-input disabled  v-model="ruleForm.orderInfo.postcode"></el-input>
                    </el-form-item>
                    <el-form-item  label="地址:" prop="address" label-width="75px">
                        <el-input disabled  v-model="ruleForm.orderInfo.address"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <div class="tit">公司联系人信息</div>
                    <el-form-item  label="姓氏:" prop="lastName" label-width="50px">
                      <el-input disabled  v-model="ruleForm.contactInfo[0].lastName"></el-input>
                    </el-form-item>
                    <el-form-item  label="名字:" prop="firstName" label-width="50px">
                        <el-input disabled  v-model="ruleForm.contactInfo[0].firstName"></el-input>
                    </el-form-item>
                    <el-form-item  label="职务:" prop="title" label-width="50px">
                        <el-input disabled  v-model="ruleForm.contactInfo[0].title"></el-input>
                    </el-form-item>
                    <el-form-item  label="座机:" prop="altPhone" label-width="50px">
                      <el-input disabled  v-model="ruleForm.contactInfo[0].altPhone"></el-input>
                    </el-form-item>
                    <el-form-item  label="手机:" prop="phone" label-width="50px">
                        <el-input disabled  v-model="ruleForm.contactInfo[0].phone"></el-input>
                    </el-form-item>
                    <el-form-item  label="部门:" prop="department" label-width="50px">
                        <el-input disabled  v-model="ruleForm.contactInfo[0].department"></el-input>
                    </el-form-item>
                    <el-form-item  label="邮箱:" prop="email" label-width="50px">
                        <el-input disabled  v-model="ruleForm.contactInfo[0].email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <div class="tit">技术联系人信息</div>
                    <el-form-item  label="姓氏:" prop="lastName" label-width="50px">
                      <el-input disabled  v-model="ruleForm.contactInfo[1].lastName"></el-input>
                    </el-form-item>
                    <el-form-item  label="名字:" prop="firstName" label-width="50px">
                        <el-input disabled  v-model="ruleForm.contactInfo[1].firstName"></el-input>
                    </el-form-item>
                    <el-form-item  label="职务:" prop="title" label-width="50px">
                        <el-input disabled  v-model="ruleForm.contactInfo[1].title"></el-input>
                    </el-form-item>
                    <el-form-item  label="座机:" prop="altPhone" label-width="50px">
                      <el-input disabled  v-model="ruleForm.contactInfo[1].altPhone"></el-input>
                    </el-form-item>
                    <el-form-item  label="手机:" prop="phone" label-width="50px">
                        <el-input disabled  v-model="ruleForm.contactInfo[1].phone"></el-input>
                    </el-form-item>
                    <el-form-item  label="部门:" prop="department" label-width="50px">
                        <el-input disabled  v-model="ruleForm.contactInfo[1].department"></el-input>
                    </el-form-item>
                    <el-form-item  label="邮箱:" prop="email" label-width="50px">
                        <el-input disabled  v-model="ruleForm.contactInfo[1].email"></el-input>
                    </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item class="authInput" v-show="ruleForm.orderInfo.productType !== 'DV'">
              <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="tit">认证资料：</div>
                        <el-form-item style="margin-bottom:0;" v-for="item in ruleForm.attachmentInfo" :label="item.attachmentName+':'" :key="item.index"  label-width="100px">
                            <el-button style="padding:0" @click="downloadPerssion(orderID,item.attachmentID)" type="text">{{item.attachmentID}}.{{item.attachmentType}}</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form> -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="width:90%;margin:0 auto;">
            <el-form-item class="infodotted" style="border-bottom:1px dotted #999;margin-bottom:14px;padding-bottom:10px">
                <div class="tit">订单信息</div>
                <el-row>
                    <el-col :span="8">
                        <el-form-item  label="订单编号:" prop="orderID" label-width="80px">
                            <el-input disabled v-model="ruleForm.orderInfo.orderID"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="订单状态:" prop="statusDesc"  label-width="80px">
                            <el-input disabled v-model="ruleForm.orderInfo.statusDesc"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item  label="原订单号:" prop="orgOrderID" label-width="80px" v-show="ruleForm.orderInfo.orgOrderID">
                            <el-input disabled v-model="ruleForm.orderInfo.orgOrderID"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item class="infodotted">
                <div class="tit">产品信息</div>
                <el-row>
                    <el-col :span="8">
                        <el-form-item  label="通用名:" prop="commonName"  label-width="80px">
                            <el-input disabled v-model="ruleForm.orderInfo.commonName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item  label="产品名称:" prop="productName" label-width="80px">
                            <el-input disabled v-model="ruleForm.orderInfo.productName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item  label="品牌:" prop="productName" label-width="80px">
                            <el-input disabled v-model="ruleForm.orderInfo.brand"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item  label="秘钥算法:" prop="keySize" label-width="80px">
                            <el-input disabled v-model="ruleForm.orderInfo.keySize"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="签名算法:" prop="signatureAlgorithm"  label-width="80px">
                            <el-input disabled v-model="ruleForm.orderInfo.signatureAlgorithm"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-popover
                        placement="left"
                        width="460"
                        v-model="csrPop">
                        <div class="tipsWrap">
                          <h5>{{orderID}}订单CSR</h5>
                          <el-input :rows="10" id="copyCSR" refs="copyCSR" type="textarea" v-model="ruleForm.orderInfo.CSR"></el-input>
                        </div>
                        <div style="text-align: right; margin-top: 20px;">
                          <el-button size="mini"  type="primary" @click="copyCSR">复制</el-button>
                        </div>
                        <el-button style="padding:0;" type="text" slot="reference">查看订单CSR</el-button>
                      </el-popover>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
              <el-row>
                 <el-col :span="8">
                    <el-form-item label="有效期:" prop="validDate" label-width="80px">
                      <el-input disabled v-model="ruleForm.orderInfo.validDate"></el-input>
                    </el-form-item>
                  </el-col>
                 <el-col :span="8">
                    <el-form-item label="签发时间:" prop="validDate" label-width="80px">
                      <el-input disabled v-model="notBefore"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="到期时间:" prop="validDate" label-width="80px">
                      <el-input disabled v-model="notAfter"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
            </el-form-item>
            <el-form-item  style="border-bottom:1px dotted #999;margin-bottom:14px;">
                <el-col :span="24">
                    <el-form-item  label="附加域名:" prop="SANs" label-width="80px">
                        <el-input disabled type="textarea" v-model="ruleForm.orderInfo.SANs"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item class="contactsInput" >
              <el-row>
                <el-col :span="8" v-show="ruleForm.orderInfo.productType !== 'DV'">
                    <div class="tit">企业信息</div>
                    <el-form-item  label="企业名称:" prop="orgName" label-width="75px">
                      <el-input disabled  v-model="ruleForm.orderInfo.orgName"></el-input>
                    </el-form-item>
                    <el-form-item  label="部门名称:" prop="orgUnit" label-width="75px">
                        <el-input disabled  v-model="ruleForm.orderInfo.orgUnit"></el-input>
                    </el-form-item>
                    <el-form-item  label="座机号码:" prop="phone" label-width="75px">
                        <el-input disabled  v-model="ruleForm.orderInfo.phone"></el-input>
                    </el-form-item>
                    <el-form-item  label="国家代码:" prop="country" label-width="75px">
                      <el-input disabled  v-model="ruleForm.orderInfo.country"></el-input>
                    </el-form-item>
                    <el-form-item  label="省市名称:" prop="state" label-width="75px">
                        <el-input disabled  v-model="ruleForm.orderInfo.state"></el-input>
                    </el-form-item>
                    <el-form-item  label="市或区名:" prop="location" label-width="75px">
                        <el-input disabled  v-model="ruleForm.orderInfo.location"></el-input>
                    </el-form-item>
                    <el-form-item  label="邮政编码:" prop="postcode" label-width="75px">
                        <el-input disabled  v-model="ruleForm.orderInfo.postcode"></el-input>
                    </el-form-item>
                    <el-form-item  label="地址:" prop="address" label-width="75px">
                        <el-input disabled  v-model="ruleForm.orderInfo.address"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <div class="tit">公司联系人信息</div>
                    <el-form-item  label="姓氏:" prop="lastName" label-width="50px">
                      <el-input disabled  v-model="ruleForm.contactInfo[0].lastName"></el-input>
                    </el-form-item>
                    <el-form-item  label="名字:" prop="firstName" label-width="50px">
                        <el-input disabled  v-model="ruleForm.contactInfo[0].firstName"></el-input>
                    </el-form-item>
                    <el-form-item  label="职务:" prop="title" label-width="50px">
                        <el-input disabled  v-model="ruleForm.contactInfo[0].title"></el-input>
                    </el-form-item>
                    <el-form-item  label="座机:" prop="altPhone" label-width="50px">
                      <el-input disabled  v-model="ruleForm.contactInfo[0].altPhone"></el-input>
                    </el-form-item>
                    <el-form-item  label="手机:" prop="phone" label-width="50px">
                        <el-input disabled  v-model="ruleForm.contactInfo[0].phone"></el-input>
                    </el-form-item>
                    <el-form-item  label="部门:" prop="department" label-width="50px">
                        <el-input disabled  v-model="ruleForm.contactInfo[0].department"></el-input>
                    </el-form-item>
                    <el-form-item  label="邮箱:" prop="email" label-width="50px">
                        <el-input disabled  v-model="ruleForm.contactInfo[0].email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <div class="tit">技术联系人信息</div>
                    <el-form-item  label="姓氏:" prop="lastName" label-width="50px">
                      <el-input disabled  v-model="ruleForm.contactInfo[1].lastName"></el-input>
                    </el-form-item>
                    <el-form-item  label="名字:" prop="firstName" label-width="50px">
                        <el-input disabled  v-model="ruleForm.contactInfo[1].firstName"></el-input>
                    </el-form-item>
                    <el-form-item  label="职务:" prop="title" label-width="50px">
                        <el-input disabled  v-model="ruleForm.contactInfo[1].title"></el-input>
                    </el-form-item>
                    <el-form-item  label="座机:" prop="altPhone" label-width="50px">
                      <el-input disabled  v-model="ruleForm.contactInfo[1].altPhone"></el-input>
                    </el-form-item>
                    <el-form-item  label="手机:" prop="phone" label-width="50px">
                        <el-input disabled  v-model="ruleForm.contactInfo[1].phone"></el-input>
                    </el-form-item>
                    <el-form-item  label="部门:" prop="department" label-width="50px">
                        <el-input disabled  v-model="ruleForm.contactInfo[1].department"></el-input>
                    </el-form-item>
                    <el-form-item  label="邮箱:" prop="email" label-width="50px">
                        <el-input disabled  v-model="ruleForm.contactInfo[1].email"></el-input>
                    </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
        </el-form>
        <!-- <div style="text-align:center">
            <el-button @click="back" type="primary">返回</el-button>
        </div> -->
    </div>
</template>

<script>
export default {
  name: "OrderDetails",
  data() {
    return {
      orderID: "",
      csrPop:false,
      ruleForm: {
        orderInfo:{
          orderID: "",
          orgOrderID: "",
          orderType: "",
          createDate: "",
          commonName: "",
          SANs:"",
          SANs_Normal: "",
          SANs_WildCard: "",
          productType: "",
          productName: "",
          validDate: "",
          keySize: "",
          signatureAlgorithm: "",
          CSR: "",
          orgName: "",
          orgUnit: "",
          country: "",
          state: "",
          location: "",
          address: "",
          postcode: "",
          phone: "",
          authMethod: "",
          checkName: "",
          checkValue: "",
          status: "",
          statusDesc: "",
          cancelPermission:false
        },
        contactInfo:[
          {
            contactType: "",
            firstName: "",
            lastName: "",
            phone: "",
            altPhone: "",
            email: "",
            department: "",
            title: ""
          },
          {
            contactType: "",
            firstName: "",
            lastName: "",
            phone: "",
            altPhone: "",
            email: "",
            department: "",
            title: ""
          }
        ],
        attachmentInfo:[
          {
            attachmentID: "",
            attachmentType: "",
            attachmentName: ""
          },
          {
            attachmentID: "",
            attachmentType: "",
            attachmentName: ""
          }
        ]
      },
      rules: {}
    };
  },
  computed: {
    allDomain() {
      if (this.ruleForm.orderInfo.SANs_Normal !== "[]") {
        return this.ruleForm.orderInfo.SANs_Normal + ";" + this.ruleForm.orderInfo.SANs_WildCard;
      }
    },
    notBefore(){
       if (this.ruleForm.orderInfo.notBefore !== "") {
        return this.ruleForm.orderInfo.notBefore.slice(0,10)
       }else{
         return ""
       }
    },
    notAfter(){
       if (this.ruleForm.orderInfo.notAfter !== "") {
        return this.ruleForm.orderInfo.notAfter.slice(0,10)
       }else{
         return ""
       }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.orderID = vm.$route.query.orderID;
      vm._getDetails
      // alert("id:"+  vm.orderID)
    })
  },
  watch: {
   '$route' (to, from) {
     this.orderID = this.$route.query.orderID;
    this._getDetails();
   }
 },
  mounted() {
    this.orderID = this.$route.query.orderID;
    // alert("id:"+  this.orderID)
    this._getDetails();
  },
  methods: {
    _getDetails(){
      this.$axios
      .post("/api/orderManage/detail", { orderID: this.orderID })
      .then(res => {
        let data = res.data;
        if (data.code === 0) {
          // console.log(data);
          this.ruleForm = data.data
        }else{
          this.$message({
            type:"error",
            message:data.desc
          })
        }
      });
    },
    downLoadCert(orderID) {
      // window.open("/api/orderManage/download/cert?orderID=" + orderID);
      this.$axios({
        method:"get",
        url:"/api/orderManage/download/cert?orderID=" + orderID,
        responseType:"blob"
      }).then(res => {
        let objUrl = URL.createObjectURL(res.data);
        window.open(objUrl)
      });
    },
    downloadPerssion(orderID,attachmentID){
      // window.open("/api/orderManage/download?orderID=" + orderID + "&attachmentID=" + attachmentID);
      this.$axios({
        method:"get",
        url:"/api/orderManage/download?orderID=" + orderID + "&attachmentID=" + attachmentID,
        responseType:"blob"
      }).then(res => {
        let objUrl = URL.createObjectURL(res.data);
        window.open(objUrl)
      });
    },
    cancelOrder(orderID){
      this.$confirm("取消该订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$axios
          .post("/api/orderManage/cancel", {
            orderID:orderID,
            isCimClient:false
          })
          .then(res => {
            let data = res.data;
            if (data.code === 0) {
              this._getDetails({});
              this.$message({
                type: "success",
                message: "已取消!"
              });
            } else {
              this.$message({
                type: "danger",
                message: data.desc
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消失败"
          });
        });
    },
    copyCSR(){
      let url = document.querySelector('#copyCSR');
      url.select(); // 选择对象
      document.execCommand("Copy")
      this.csrPop = false;
    },
     back() {
      this.$router.push({ name: "OrderManage" });
    }
  }
};
</script>

<style lang="scss" scoped>
.orderDetails-wrapper {
  background-color:rgba($color: #fff, $alpha: 0.95);
  margin:10px 10px 0;
  height: calc(100% - 10px);
  padding: 20px 0;
  .title {
    border-bottom: 1px solid #999;
    // padding-bottom: 10px;
    margin: 0 20px;
    margin-bottom: 20px;
    position: relative;
    // margin-top: 30px;
    h3 {
      display: inline-block;
      font-size: 14px;
      padding-left: 20px;
    }
    .divButton {
      display: inline-block;
      position: absolute;
      right: 20px;
      top:8px;
    }
  }
   .tit{
    font-weight: bold;
    border-left:2px solid rgba(42, 42, 140, 1);
    height: 18px;
    line-height: 16px;
    padding-left:7px;
    color:#333;
    margin-bottom:10px;
    margin-bottom:10px;
  }
  .contactsInput {
    .tit{
      color: #666;
      font-size:14px;
      font-weight: bold;
    }
    .el-form-item {
      margin-bottom: 4px;
    }
  }
  .authInput{
    .tit{
      color: #666;
      font-size:14px;
      font-weight: bold;
    }
  }
}
</style>
<style>
.orderDetails-wrapper label {
  font-weight: normal;
  font-size: 13px;
}
.contactsInput .el-form-item {
  margin-bottom: 4px;
}
.orderDetails-wrapper .el-form-item {
  margin-bottom: 0px;
}
.orderDetails-wrapper .el-input--medium .el-input__inner{
  height: 20px;
  line-height: 20px;
}
.orderDetails-wrapper .el-form-item--medium .el-form-item__content, .orderDetails-wrapper .el-form-item--medium .el-form-item__label{
  line-height: 24px;
  color:#333;
  padding-right:0px;
}
.orderDetails-wrapper .el-input.is-disabled .el-input__inner{
  border:none;
  color:#333;
  background-color:transparent;
}
.orderDetails-wrapper .el-textarea.is-disabled .el-textarea__inner{
  border:none;
  color:#333;
  background-color: transparent;
}
</style>

