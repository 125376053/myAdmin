<template>
    <div class="orderManage-wrapper">
        <div class="head">
          <div class="head-item">
             <router-link :to="{name:'OrderCert'}"><el-button type="danger">订购证书</el-button></router-link>
          </div>
          <div class="head-item">
             <el-input placeholder="请输入搜索关键字" prefix-icon="el-icon-search" v-model="searchKey"  @keyup.enter.native="search(searchKey)"></el-input>
             <el-button v-on:click="toggleCharts" class="showChartsBtn" type="primary">图表展示</el-button>
          </div>
        </div>
        <div class="showCharts" :style="{'z-index':(showCharts==true?'1':'-1')}" v-show="showCharts">
          <div class="charts">
            <ve-histogram :data="chartData1"></ve-histogram>
          </div>
          <div class="charts ">
            <ve-pie :data="chartData2"></ve-pie>
          </div>
          <div class="charts" >
            <ve-line :data="chartData3"></ve-line>
          </div>
        </div>
        <div class="data-table">
          <el-table
            :data="datalist"
            border
            style="width: 100%">
            <el-table-column
              prop="orderID"
              label="订单号"
              width="">
              <template slot-scope="scope"><router-link :to="{name:'OrderDetails',params:{orderID:scope.row.orderID}}"><el-button type="text" size="mini">{{ scope.row.orderID }}</el-button></router-link></template>
            </el-table-column>
            <el-table-column
              prop="subject"
              label="颁发给"
              width="150">
              <template slot-scope="scope">{{ scope.row.subject }}</template>
            </el-table-column>
            <el-table-column
              prop="orgName"
              label="企业名称"
              width="">
              <template slot-scope="scope">{{ scope.row.orgName }}</template>
            </el-table-column>
            <el-table-column
              prop="orgUnit"
              label="部门"
              width="125">
              <template slot-scope="scope">{{ scope.row.orgUnit }}</template>
            </el-table-column>
            <el-table-column
              prop="productName"
              label="产品名称"
              width="125">
              <template slot-scope="scope">{{ scope.row.productName }}</template>
            </el-table-column>
            <el-table-column
              prop="validDate"
              label="有效期(月)"
              width="">
              <template slot-scope="scope">{{ scope.row.validDate }}</template>
            </el-table-column>
            <el-table-column
              prop="notAfter"
              label="到期时间"
              width="">
              <template slot-scope="scope">{{ scope.row.notAfter }}</template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="订单状态"
              width="120">
              <template slot-scope="scope">
                <router-link v-if="statusArr[scope.row.status] === '待签发'" :to="{name:'clientToSignOrder',params:{orderID:scope.row.orderID}}"><el-button type="text" size="mini">{{ statusArr[scope.row.status] }}</el-button></router-link>
                <div v-else type="text" size="mini">{{ statusArr[scope.row.status] }}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="">
              <template slot-scope="scope">
                <el-button v-if="statusArr[scope.row.status] === '待审核' || statusArr[scope.row.status] === '待审批'" @click="editOrder(scope.row.orderID)" type="text" size="small">编辑</el-button>
                <el-button v-if="statusArr[scope.row.status] === '审核拒绝' || statusArr[scope.row.status] === '已取消' || statusArr[scope.row.status] === '审批拒绝'" @click="deleteOrder(scope.row.orderID)" type="text" size="small">删除</el-button>
                <el-button v-if="statusArr[scope.row.status] === '已签发' || statusArr[scope.row.status] === '替换中' || statusArr[scope.row.status] === '已替换' || statusArr[scope.row.status] === '更新中' || statusArr[scope.row.status] === '已更新'" @click="downLoadCert(scope.row.orderID)" type="text" size="small">下载证书</el-button>
                <!-- <el-button v-if="statusArr[scope.row.status] === '已签发'" @click="update(scope.row.orderID)" type="text" size="small">更新</el-button>
                <el-button v-if="statusArr[scope.row.status] === '已签发'" @click="repalce(scope.row.orderID)" type="text" size="small">替换</el-button> -->
                <el-button v-if="statusArr[scope.row.status] === '待审核' || statusArr[scope.row.status] === '待审批' || statusArr[scope.row.status] === '待签发' || scope.row.cancelPermission" @click="cancelOrder(scope.row.orderID)" type="text" size="small">取消</el-button>
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
    </div>
</template>

<script>
export default {
  name: "orderManage",
  data: function() {
    return {
      showCharts: true,
      currentpage: 1,
      pagesize: 10,
      totalcount: 0,
      datalist: [],
      searchKey:"",
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
    this._getOrderList();
    // this.$store.dispatch('getlist')
    this.showCharts = false;
  },
  computed: {},
  methods: {
    _getOrderList(data={}) {
      this.$axios.post("/api/orderManage/list", {
        condition: !data.condition?'':data.condition,
        orderBy: "",
        requestPage: this.currentpage,
        pageCount: this.pagesize
      }).then(res => {
        let data = res.data;
        if (data.code === 0) {
          // console.log(data);
          this.datalist = data.data.orders;
          this.totalcount = data.data.total;
        }
      });
    },
    toggleCharts() {
      this.showCharts = !this.showCharts;
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this. _getOrderList();
    },
    handleCurrentChange(val) {
      this.currentpage = val;
      this. _getOrderList();
    },
    search(searchKey) {
      //搜索
      this._getOrderList({ condition: searchKey });
    },
    downLoadCert(orderID) {
      // window.open("/api/orderManage/download/cert?orderID=" + orderID);
      // this.$axios.get("/api/orderManage/download/cert?orderID=" + orderID);
      this.$axios({
        method:"get",
        url:"/api/orderManage/download/cert?orderID=" + orderID,
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
          .post("/api/orderManage/delete", { orderID: orderID })
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
                type: "danger",
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
      this.$router.push({name:"clientOrderSteps",params:{orderID:orderID,from:'edit'}})
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
              this._getOrderList({});
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
  .showCharts {
    position: relative;
    .charts {
      display: inline-block;
      width: 33%;
    }
  }
}

</style>