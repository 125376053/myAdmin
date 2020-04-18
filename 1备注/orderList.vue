<template>
    <div class="orderManage-wrapper">

        <!--状态操作-->
        <div class="filterStatus">

            <div class="filterItem">
                <span>状态:</span>
                <el-select v-model="payValue" placeholder="请选择" style="width: 100px;">
                    <el-option
                        v-for="item in payStatus"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>

            <div class="filterItem">
                <span>到期时间:</span>
                <el-date-picker
                    v-model="payDate"
                    size="small"
                    style="width:310px;"
                    type="datetimerange"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>

            <div class="filterItem">
                <span>域名:</span>
                <el-input placeholder="请输入搜索关键字" v-model="searchKey" @keyup.enter.native="search"></el-input>
                <el-button type="text" @click="search">搜索</el-button>
            </div>

        </div>


        <div class="teshuTable">

            <el-table :data="datalist" @sort-change='sortChange'>

                <el-table-column
                    prop=""
                    label="订单号"
                    align="center"
                    :show-overflow-tooltip="true"
                >
                    <template slot-scope="scope">
                        <div class="addTr1">
                            <el-button class="zhangEllipses" @click="toDetail(scope.row.orderID)" type="text" size="mini">
                                {{scope.row.orderID}}
                        </el-button>
                        </div>
                        <div class="addTr2">11111</div>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="subject"
                    label="通用名"
                    align="center"
                    :show-overflow-tooltip="true"
                >
                    <template slot-scope="scope">
                        <div class="addTr1">
                            <el-button
                                class="zhangEllipses"
                                type="text"
                                size="mini"
                                @click="clickCertInfor(scope.row.orderID)"
                            >
                                {{scope.row.subject}}
                        </el-button>
                        </div>
                        <div class="addTr2">11111</div>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="productName"
                    label="产品名称"
                    align="center"
                    :show-overflow-tooltip="true"
                >
                    <template slot-scope="scope">
                        <div class="addTr1">
                            <p>{{scope.row.productName}}</p>
                        </div>
                        <div class="addTr2">11111</div>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="brandName"
                    label="品牌"
                    align="center"
                    :show-overflow-tooltip="true"
                >
                    <template slot-scope="scope">
                        <div class="addTr1">
                            <p>{{scope.row.brandName}}</p>
                        </div>
                        <div class="addTr2">11111</div>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="validDate"
                    label="有效期/月"
                    align="center"
                    :show-overflow-tooltip="true"
                >
                    <template slot-scope="scope">
                        <div class="addTr1">
                            <p>{{scope.row.validDate}}</p>
                        </div>
                        <div class="addTr2">11111</div>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="notAfter"
                    label="起始时间"
                    min-width="100"
                    sortable="custom"
                    align="center"
                    :show-overflow-tooltip="true"
                >
                    <template slot-scope="scope">
                        <div class="addTr1">
                            <p>{{scope.row.notAfter}}</p>
                        </div>
                        <div class="addTr2">11111</div>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="notAfter"
                    label="到期时间"
                    min-width="100"
                    sortable="custom"
                    align="center"
                    :show-overflow-tooltip="true"
                >
                    <template slot-scope="scope">
                        <div class="addTr1">
                            <p>{{scope.row.notAfter}}</p>
                        </div>
                        <div class="addTr2">11111</div>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="status"
                    label="状态"
                    align="center"
                    :show-overflow-tooltip="true"
                >
                    <template slot-scope="scope">
                        <div class="addTr1" type="text" size="mini">{{statusArr[scope.row.status]}}</div>
                        <div class="addTr2">11111</div>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center" min-width="160" :show-overflow-tooltip="true">
                    <template slot-scope="scope">

                        <div class="addTr1">
                            <a download v-if="statusArr[scope.row.status] === '已签发' || statusArr[scope.row.status] === '替换中' || statusArr[scope.row.status] === '已替换' || statusArr[scope.row.status] === '更新中' || statusArr[scope.row.status] === '已更新'" :href='api+"/api/orderManage/download/cert?orderID=" + scope.row.orderID' style="color:#409EFF;">下载证书</a>

                            <el-dropdown>
                                <el-button type="text">更多操作</el-button>
                                <el-dropdown-menu slot="dropdown">

                                    <el-dropdown-item>
                                        <!--v-if="scope.row.renewPermission" -->
                                        <el-button @click="updateCert(scope.row)" type="text" size="small">更新证书</el-button>
                                    </el-dropdown-item>

                                    <el-dropdown-item>
                                        <!--v-if="scope.row.replacePermission"-->
                                        <el-button @click="aginSign(scope.row)" type="text" size="small">重新签发</el-button>
                                    </el-dropdown-item>

                                    <el-dropdown-item>
                                        <el-button type="text" @click="service(scope.row)" v-if="true" size="small">支持服务</el-button>
                                    </el-dropdown-item>

                                    <el-dropdown-item>
                                        <el-button v-if="scope.row.cancelPermission" @click="cancelOrder(scope.row.orderID)" type="text" size="small">取消
                                    </el-button>
                                    </el-dropdown-item>

                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>

                        <div class="addTr2">11111</div>

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

        <!--支持服务-->
        <el-dialog class="el-dialog2" title="支持服务" :visible.sync="serviceDialog" width="510px">
            <div class="service">
                <div class="show">
                    <p>
                        <span>通用名:</span>
                        <b>{{serviceDetail.subject}}</b>
                    </p>
                    <p>
                        <span>有效期:</span>
                        <b>{{serviceDetail.validDate}}</b>
                    </p>
                    <p>
                        <span>产品名称:</span>
                        <b>{{serviceDetail.productName}}</b>
                    </p>
                    <p>
                        <span>用户账号:</span>
                        <b>{{serviceInfo.userAccno}}</b>
                    </p>
                </div>

                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="80px"
                    :inline="true"
                    class="form"
                >
                    <el-form-item class="zhang-form" label="联系人:" prop="ren">
                        <el-input v-model="ruleForm.ren"></el-input>
                    </el-form-item>
                    <el-form-item class="zhang-form" label="手机号:" prop="tel">
                        <el-input v-model="ruleForm.tel"></el-input>
                    </el-form-item>
                    <el-form-item class="zhang-form" label="qq/微信:" prop="qq">
                        <el-input v-model="ruleForm.qq"></el-input>
                    </el-form-item>
                    <el-form-item class="zhang-form" label="邮箱:" prop="email">
                        <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>

                    <el-form-item class="zhang-form" label="问题描述:" prop="desc">
                        <el-input v-model="ruleForm.desc" type="textarea" style="width: 368px;"></el-input>
                    </el-form-item>

                    <el-form-item style="display: block; text-align: center;margin-top: 20px;">
                        <a class="aBtn1" href="javascript:;" @click="submitForm('ruleForm')">提交</a>
                        <a class="aBtn2" style="margin-left: 10px;" href="javascript:;"
                           @click="serviceDialog=false">取消</a>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>

        <!--证书信息-->
        <el-dialog title="证书信息" :visible.sync="certDialog" width="760px" class="certDialog">
            <certInfor :orderID="orderID"></certInfor>
        </el-dialog>

    </div>
</template>

<script>
    import {services} from "./mixins/service"
    import {status} from "./mixins/status"
    import certInfor from "./pay/certInfor.vue"
    export default {
        components: {
            certInfor
        },
        name: "orderManage",
        data() {
            return {
                api: window.origin,
                hoverIndex: -1,
                hoverIndex1: -1,
                showCharts: true,
                currentpage: 1,
                pagesize: 10,
                totalcount: 0,
                datalist: [],
                searchKey: "",
                replaceDialog: false,
                flag: false,
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
                    WAIT_TO_SIGN: "待签发",
                    ORDER_NO_CSR: 'CSR待补全',
                    UNKNOWN: '未知'
                },
                multipleSelection: [],
                orderBy: '',
                sort: ''
            };
        },
        mixins: [services, status],
        mounted() {
            this._getOrderList();
        },
        computed: {},
        methods: {
            // 排序
            sortChange(column){
                this.sort = column.order === 'ascending' ? 'asc' : 'desc'
                this.orderBy = column.prop
                this._getOrderList()
            },
            // 获取订单
            _getOrderList() {
                this.$axios.post("/api/orderManage/list", {
                    condition: this.searchKey, //关键字
                    orderBy: this.orderBy,
                    sort: this.sort,
                    orderStatus: this.orderValue,  // 订单状态
                    // 字段要改
                    payStatus: this.payValue, // 0--未支付 1--支付成功，2--支付失败,3--支付超时，4--支付完成，5--待退款，6--退款成功，7--退款失败，8--退款中
                    selectTimeType: this.timeValue, // 选择时间类型 1--到期时间 2--下单时间 3--退款时间
                    startTime: this.payDate[0], //
                    endTime: this.payDate[1], // 结束时间
                    selectQueryOrderStatus: this.filterIndex, // 0--全部，1--已支付 2--退款
                    requestPage: this.currentpage,
                    pageCount: this.pagesize
                }).then(res => {
                    let data = res.data;
                    if (data.code === 0) {
                        console.log(data)
                        this.datalist = data.data.orders;
                        this.totalcount = data.data.total;
                    }
                });
            },

            // 订单详情
            toDetail(orderID){
                if (this.flag) {
                    window.open('/#/orderManage/orderDetail?orderID=' + orderID)
                } else {
                    this.$router.push({name: 'orderDetail', params: {orderID: orderID}, query: {orderID: orderID}})
                }
            },

            // 搜索
            search() {
                this.currentpage = null
                this._getOrderList();
            },

            handleSizeChange(val) {
                this.pagesize = val;
                this._getOrderList();
            },
            handleCurrentChange(val) {
                this.currentpage = val;
                this._getOrderList();
            },

            // 取消订单
            cancelOrder(orderID){
                this.$confirm("取消该订单, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$axios
                        .post("/api/orderManage/cancel", {
                            orderID: orderID,
                            isCimClient: false
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

            // 更新证书
            updateCert(row){
                this.orderID = row.orderID
                this.$axios.post("/api/orderManage/detail", {
                    orderID: this.orderID
                }).then(res => {
                    let data = res.data;
                    if (data.code === 0) {
                        this.orderInfo = data.data.orderInfo;
                        console.log(this.orderInfo);
                        this.$router.push({
                            path: "/certApply/selectCert",
                            query: {
                                updata: true,

                                brand: this.orderInfo.brand,
                                type: this.orderInfo.productType,
                                funType: this.orderInfo.function,

                                dCount1: this.orderInfo.SANs_Normal_Count,
                                dCount: this.orderInfo.SANs_Normal_Count,
                                dWCount: this.orderInfo.SANs_WildCard_Count,

                                productID: this.orderInfo.productID,
                                productCode: this.orderInfo.productCode,
                                productName: this.orderInfo.productName,

                                years: this.orderInfo.validDate,
                                price: this.orderInfo.price,

                                orderID: this.orderID, // 详情接口需要
                                isMultiDomains: this.orderInfo.isMultiDomains,
                                isWildCards: this.orderInfo.isWildCards
                            }
                        })
                    }
                });
            },

            // 重新签发证书
            aginSign(row){
                this.orderID = row.orderID
                this.$axios.post("/api/orderManage/detail", {
                    orderID: this.orderID
                }).then(res => {
                    let data = res.data;
                    if (data.code === 0) {
                        this.orderInfo = data.data.orderInfo;
                        console.log(this.orderInfo);
                        this.$router.push({
                            path: "/certApply/orderStep",
                            query: {
                                replace: true,

                                brand: this.orderInfo.brand,
                                type: this.orderInfo.productType,
                                funType: this.orderInfo.function,

                                dCount1: this.orderInfo.SANs_Normal_Count,
                                dCount: this.orderInfo.SANs_Normal_Count,
                                dWCount: this.orderInfo.SANs_WildCard_Count,

                                productID: this.orderInfo.productID,
                                productCode: this.orderInfo.productCode,
                                productName: this.orderInfo.productName,

                                years: this.orderInfo.validDate,
                                price: this.orderInfo.price,

                                orderID: this.orderID, // 详情接口需要
                                isMultiDomains: this.orderInfo.isMultiDomains,
                                isWildCards: this.orderInfo.isWildCards
                            }
                        })
                    }
                });
            },
        }
    };
</script>

<style lang="scss" scoped>
   .teshuTable{
       .addTr1{
           height: 36px;
           line-height: 36px;
       }
       .addTr2{
           height: 36px;
           line-height: 36px;
           background: red;
       }
   }
</style>
