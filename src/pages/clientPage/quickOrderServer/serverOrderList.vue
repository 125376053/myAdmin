<template>
    <div class="orderManage-wrapper">
        <div class="head">
          <!-- <div class="head-item">
             <router-link :to="{name:'OrderCert'}"><el-button type="danger">订购证书</el-button></router-link>
          </div> -->
          <div class="head-item">
            <!-- <el-input placeholder="请输入搜索关键字" prefix-icon="el-icon-search" v-model="searchKey"  @keyup.enter.native="search(searchKey)"></el-input> -->
            <el-button type="danger" icon="el-icon-search" @click="searchDialog=true">查找</el-button>
            <!-- <el-button v-on:click="toggleCharts" class="showChartsBtn" type="primary">图表展示</el-button> -->
          </div>
        </div>
        <!-- <div class="showCharts" :style="{'z-index':(showCharts==true?'1':'-1')}" v-show="showCharts">
          <div class="charts">
            <ve-histogram :data="chartData1"></ve-histogram>
          </div>
          <div class="charts ">
            <ve-pie :data="chartData2"></ve-pie>
          </div>
          <div class="charts" >
            <ve-line :data="chartData3"></ve-line>
          </div>
        </div> -->
        <div class="data-table">
          <el-table
            :data="datalist"
            border
            style="width: 100%">
            <el-table-column
              prop="orderID"
              label="订单号"
              width="75">
              <!-- <template slot-scope="scope"><div @contextmenu.prevent="toNewDetailTab(scope.row.orderID)" ><router-link :to="{name:'OrderDetails',params:{orderID:scope.row.orderID}}"><el-button type="text" size="mini">{{ scope.row.orderID }}</el-button></router-link></div></template> -->
              <template slot-scope="scope"><div @contextmenu.prevent="toNewDetailTab(scope.row.orderID)" ><div @click="toDetail(scope.row.orderID)"><el-button type="text" size="mini">{{ scope.row.orderID }}</el-button></div></div></template>
            </el-table-column>
            <el-table-column
              prop="subject"
              label="颁发给"
              width="75">
              <template slot-scope="scope">{{ scope.row.subject }}</template>
            </el-table-column>
            <el-table-column
              prop="orgName"
              label="企业名称"
              width="75">
              <template slot-scope="scope">{{ scope.row.orgName }}</template>
            </el-table-column>
            <el-table-column
              prop="orgUnit"
              label="部门"
              width="75">
              <template slot-scope="scope">{{ scope.row.orgUnit }}</template>
            </el-table-column>
            <el-table-column
              prop="productName"
              label="产品名称"
              width="75">
              <template slot-scope="scope">{{ scope.row.productName }}</template>
            </el-table-column>
            <el-table-column
              prop="productName"
              label="开通服务"
              width="75">
              <template slot-scope="scope">{{ scope.row.brandName }}</template>
            </el-table-column>
            <el-table-column
              prop="validDate"
              label="有效期(月)"
              width="75">
              <template slot-scope="scope">{{ scope.row.validDate }}</template>
            </el-table-column>
            <el-table-column
              prop="notAfter"
              label="到期时间"
              width="75">
              <template slot-scope="scope">{{ scope.row.notAfter }}</template>
            </el-table-column>
            <el-table-column
              prop="notAfter"
              label="创建时间"
              width="75">
              <template slot-scope="scope">{{ scope.row.createTime }}</template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="订单状态"
              width="75">
              <template slot-scope="scope">
                <router-link v-if="statusArr[scope.row.status] === '待签发'" :to="{name:'toSignOrder',params:{orderID:scope.row.orderID}}"><el-button type="text" size="mini">{{ statusArr[scope.row.status] }}</el-button></router-link>
                <div v-else type="text" size="mini">{{ statusArr[scope.row.status] }}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="75">
              <template slot-scope="scope">
                <!-- <el-button v-if="statusArr[scope.row.status] === '待审核' || statusArr[scope.row.status] === '待审批'" @click="editOrder(scope.row.orderID)" type="text" size="small">编辑</el-button> -->
                <el-button v-if="statusArr[scope.row.status] === '已取消'" @click="deleteOrder(scope.row.orderID)" type="text" size="small">删除</el-button>
                <el-button v-if="statusArr[scope.row.status] === '已签发' || statusArr[scope.row.status] === '替换中' || statusArr[scope.row.status] === '已替换' || statusArr[scope.row.status] === '更新中' || statusArr[scope.row.status] === '已更新'" @click="downLoadCert(scope.row.orderID)" type="text" size="small">下载证书</el-button>
                <el-button v-if="scope.row.renewPermission" @click="updateOrder(scope.row.orderID)" type="text" size="small">更新</el-button>
                <!-- <el-button v-if="statusArr[scope.row.status] === '已取消'" @click="updateOrder(scope.row.orderID)" type="text" size="small">更新</el-button> -->
                <el-button v-if="scope.row.replacePermission" @click="replace(scope.row.orderID,scope.row.brandName)" type="text" size="small">替换</el-button>
                <!-- <el-button v-if="statusArr[scope.row.status] === '已取消'" @click="replace(scope.row.orderID)"  type="text" size="small">替换</el-button> -->
                <el-button v-if="statusArr[scope.row.status] === '待签发' || scope.row.cancelPermission" @click="cancelOrder(scope.row.orderID)" type="text" size="small">取消</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page-wrapper">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" 
            :current-page="currentpage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalcount">
          </el-pagination>
      </div>
      <el-dialog title="替换" :visible.sync="replaceDialog" width="500px" >
        <div style="width:348px;margin:0 auto;margin-bottom:40px;">
          <div class="alogm_replace" @mouseover="hoverIndex=1" @mouseout="hoverIndex=-1" @click="alogmReplace">
            <span class="ico_alogm_replace" :class="{'hover_alogm_Bg':hoverIndex===1}">秘钥替换</span>
            <span class="alogmR" :class="{'hover_alogmR':hoverIndex===1}">您可更换证书秘钥或算法</span>
          </div>
          <div class="domian_replace"  @mouseover="hoverIndex1=1" @mouseout="hoverIndex1=-1"  @click="domianReplace">
            <span class="ico_domian_replace" :class="{'hover_domian_Bg':hoverIndex1 === 1}">域名替换</span>
            <span class="domianR" :class="{'hover_domianR':hoverIndex1 === 1}">您可对域名数量进行编辑</span>
          </div>
        </div>
      </el-dialog>
      <el-dialog title="搜索" :visible.sync="searchDialog" width="520px" >
        <el-form ref="searchCondition" :model="searchCondition" label-width="80px">
          <el-form-item label="颁发给">
            <el-input v-model="searchCondition.subject"></el-input>
          </el-form-item>
          <el-form-item label="服务">
            <el-select v-model="searchCondition.serverName" placeholder="请选择服务" style="width:100%">
              <el-option label="MPKI" value="MPKI"></el-option>
              <el-option label="MSSL" value="MSSL"></el-option>
              <el-option label="CERTCENTRAL" value="CERTCENTRAL"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="到期时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="searchCondition.endDate1" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="text-align:center">-</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="searchCondition.endDate2" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="searchCondition.createDate1" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="text-align:center">-</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="searchCondition.createDate2" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
            <el-button @click="resetForm('searchCondition')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      hoverIndex:-1,
      hoverIndex1:-1,
      checkedOrderId:"",
      brandName:"",
      showCharts: true,
      replaceDialog:false,
      searchDialog:false,
      currentpage: 1,
      pagesize: 10,
      totalcount: 0,
      datalist: [],
      searchKey:"",
      flag:false,
      searchCondition:{
        subject:"",
        serverName:"",
        endDate1:"",
        endDate2:"",
        createDate1:"",
        createDate2:""
      },
      statusArr: {
        WAIT_TO_AUDIT: "待审核",
        REJECTED_AUDIT: "审核拒绝",
        WAIT_TO_APPROVAL: "待审批",
        REJECTED_APPROVAL: "审批拒绝",
        PROCESSING: "处理中",
        SIGNED: "已签发",
        CANCELLING: "取消中",
        CANCELLED: "已取消",
        REPLACING: "替换中",
        REPLACED: "已替换",
        RENEWING: "更新中",
        RENEWED: "已更新",
        REVOKED: "已吊销",
        WAIT_TO_SIGN: "待签发"
      },
      multipleSelection: [],
      chartData1: {
        columns: ["到期状态", "到期用户数量"],
        rows: [
          { 到期状态: "已过期", 到期用户数量: 32371 },
          { 到期状态: "30天内", 到期用户数量: 12328 },
          { 到期状态: "31-90天内", 到期用户数量: 92381 },
          { 到期状态: "91-365天内", 到期用户数量: 92381 }
        ]
      },
      chartData2: {
        columns: ["证书类型", "证书使用量"],
        rows: [
          { 证书类型: "OV", 证书使用量: 32371 },
          { 证书类型: "EV", 证书使用量: 12328 },
          { 证书类型: "DV", 证书使用量: 92381 }
        ]
      },
      chartData3: {
        columns: ["证书品牌", "证书数量"],
        rows: [
          { 证书品牌: "Digicert", 证书数量: 32371 },
          { 证书品牌: "GeoTrust", 证书数量: 32371 },
          { 证书品牌: "Symantic", 证书数量: 12328 },
          { 证书品牌: "GlobalSign", 证书数量: 92381 },
          { 证书品牌: "Entrust", 证书数量: 92381 }
        ]
      }
    };
  },
  mounted() {
    alert("mounted")
    this._getOrderList();
    // this.$store.dispatch('getlist')
    this.showCharts = false;
    let that = this;
    document.onkeydown = function(e) {
      // debugger
      if (e.keyCode==17) {
        that.flag=true;
      }
    }
    document.onkeyup = function(e) {
      // if (e.keyCode==17) {
        that.flag = false
      // }
    }
  },
  computed: {},
  methods: {
    _getOrderList() {
      let postJson = {}
      postJson['subject'] = this.searchCondition?this.searchCondition.subject:'';
      if (this.searchCondition.serverName === 'MPKI') {
        postJson['serverName'] = 'Symantec-Quick-MPKI';
      }else if (this.searchCondition.serverName === 'MSSL') {
        postJson['serverName'] = 'GlobalSign-Quick-MSSL';
      }else if (this.searchCondition.serverName === 'CERTCENTRAL') {
        postJson['serverName'] = 'DigCert-Quick-CERTCENTRAL';
      }else{
        postJson['serverName'] = '';
      }
      postJson['endDate1'] = this.searchCondition?this.searchCondition.endDate1:"";
      postJson['endDate2'] = this.searchCondition?this.searchCondition.endDate2:"";
      postJson['createDate1'] = this.searchCondition?this.searchCondition.createDate1:'';
      postJson['createDate2'] = this.searchCondition?this.searchCondition.createDate2:'';
      postJson['orderBy'] = '';
      postJson['requestPage'] = this.currentpage;
      postJson['pageCount'] = this.pagesize

      this.$axios.post("/api/rapidOrder/list", postJson).then(res => {
        let data = res.data;
        if (data.code === 0) {
          // console.log("data");
          // console.log(data);
          this.datalist = data.data.orders;
          this.totalcount = data.data.total;
        }
      });
    },
    toggleCharts() {
      this.showCharts = !this.showCharts;
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      this.searchCondition = {}
    },
    handleSizeChange(val) {
      this.pagesize = val;
      // this. _getOrderList({ condition: this.searchKey });
     this._getOrderList();
    },
    handleCurrentChange(val) {
      this.currentpage = val;
      this._getOrderList();
    },
    toNewDetailTab(orderID){
      window.open('/#/order/OrderDetails?orderID='+orderID)
    },
    toDetail(orderID){
      if(this.flag){
        window.open('/#/order/OrderDetails?orderID='+orderID)
      }else{
        this.$router.push({name:'serverDetails',params:{orderID:orderID}})
      }
    },
    search(searchKey) {
      //搜索
      // console.log("this")
      // console.log(this.searchCondition)
      this._getOrderList();
      this.searchDialog = false;
      // this._getOrderList({ condition: searchKey });
    },
    downLoadCert(orderID) {
      // window.open("/api/orderManage/download/cert?orderID=" + orderID);
      this.$axios({
        method:"get",
        url:"/api/rapidOrder/downloadCert?orderID=" + orderID,
        responseType:"blob"
      }).then(res => {
        let objUrl = URL.createObjectURL(res.data);
        window.open(objUrl)
      });
    },
    deleteOrder(orderID) {
      this.$confirm("删除该订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$axios
          .post("/api/rapidOrder/remove", { orderID: orderID })
          .then(res => {
            let data = res.data;
            if (data.code === 0) {
              this._getOrderList({});
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              this.$message({
                type: "error",
                message: data.desc
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editOrder(orderID){
      // alert(2)
      this.$router.push({name:"OrderSteps",params:{orderID:orderID,from:'edit'}})
    },
    cancelOrder(orderID){
      this.$confirm("取消该订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$axios
          .post("/api/rapidOrder/cancel", {
            orderID:orderID,
            isCimClient:false
          })
          .then(res => {
            let data = res.data;
            if (data.code === 0) {
              this._getOrderList({});
              this.$message({
                type: "success",
                message: "已取消!"
              });
            } else {
              this.$message({
                type: "error",
                message: data.desc
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已放弃取消！"
          });
        });
    },
    replace(orderID,brandName){
      this.replaceDialog=true
      this.checkedOrderId = orderID
      this.brandName = brandName
    },
    alogmReplace(){
      this.$router.push({name:'serverSteps',params:{replace:'alogmRepalce',orderID:this.checkedOrderId,brandEnName:this.brandName}})
    },
    domianReplace(){
      this.$router.push({name:'serverSteps',params:{replace:'domianRepalce',orderID:this.checkedOrderId?this.checkedOrderId:'',brandEnName:this.brandName}})
    },
    updateOrder(orderID){
      this.checkedOrderId = orderID
      this.$axios
        .post("/api/rapidOrder/detail", { orderID: this.checkedOrderId })
        .then(res => {
          let data = res.data;
          if (data.code === 0) {
            console.log("data");
            console.log(data);
            var orderInfo = data.data.orderInfo; 
            newQuickOrder(orderInfo.brand)  
            this.$router.push({name:this.orderInfo.brand+'Server',params:{
              updata:true,
              orderID:this.checkedOrderId,
              funType:this.orderInfo.function,
              dCount1:this.orderInfo.SANs_Normal_Count,
              dCount:this.orderInfo.SANs_Normal_Count,
              dWCount:this.orderInfo.SANs_WildCard_Count,
              productType:this.orderInfo.productType,
              productName:this.orderInfo.productName,
              validDate:this.orderInfo.validDate
              }
            })
          }
        });
      
    }
  }
};
</script>

<style lang="scss" scoped>
.orderManage-wrapper {
  .head {
    display: flex;
    justify-content: space-between;
    // margin-top: 16px;
    .head-item {
      display: flex;
      padding: 16px;
      .showChartsBtn {
        margin-left: 20px;
      }
    }
  }
  .alogm_replace{
    width:348px;
    height:53px;
    line-height: 53px;
    border:1px solid #3388ff;
    border-radius: 5px;
    cursor: pointer;
    font-size:0px;
    .ico_alogm_replace{
      display: inline-block;
      width: 132px;
      height:51px;
      background-color:#3388ff;
      color: #fff;
      // background-image: url("../../assets/alogm.png");
      background-repeat:no-repeat;
      padding-left:52px;
      background-position: 16px 10px;
      font-size:16px;
    }
    .alogmR{
      display: inline-block;
      height:51px;
      line-height: 55px;
      color: #333;
      text-align:center;
      font-size:14px;
      width:214px;
    }
    .hover_alogm_Bg{
      background-color: #277af0;
    }
    .hover_alogmR{
      color:#fff;
      background-color: #3388ff;
    }
  }
  .domian_replace{
    width:348px;
    height:53px;
    line-height: 53px;
    border:1px solid #1fb18a;
    border-radius: 5px;
    margin-top:38px;
    cursor: pointer;
    font-size:0;
    .ico_domian_replace{
      display: inline-block;
      width: 132px;
      height:51px;
      background-color:#1fb18a;
      color: #fff;
      // background-image: url("../../assets/domin.png");
      background-repeat:no-repeat;
      padding-left:52px;
      background-position: 16px 10px;
      font-size:16px;
    }
    .domianR{
      display: inline-block;
      height:51px;
      line-height: 55px;
      color: #333;
      text-align:center;
      font-size:14px;
      font-size:14px;
      width:214px;
    }
    .hover_domian_Bg{
      background-color: #1a9173;
    }
    .hover_domianR{
      color:#fff;
      background-color: #1fb18a;
    }
  }
  
  .showCharts {
    position: relative;
    .charts {
      display: inline-block;
      width: 33%;
    }
  }
}

</style>