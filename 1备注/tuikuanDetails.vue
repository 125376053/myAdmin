<template>
    <div class="orderDetails-wrapper" style="min-width:850px;">

        <div class="z_orderInfor">
            <p class="title_one">
                <span class="red_line"></span>
                <span class="order_title">订单信息</span>
            </p>
            <div class="bianhao_wrap">
                <p class="bianhao_one">
                    <span class="color666">订单编号：</span>
                    <span class="color333">{{ruleForm.orderInfo.orderID}}</span>
                </p>
                <p class="bianhao_one">
                    <span class="color666">订单状态：</span>
                    <span class="color333">{{ruleForm.orderInfo.statusDesc}}</span>
                </p>
                <p class="bianhao_one">
                    <span class="color666">原价：</span>
                    <span class="color333">{{ruleForm.orderInfo.price}}</span>
                </p>
            </div>
            <div class="bianhao_wrap">
                <p class="bianhao_one">
                    <span class="color666">创建时间：</span>
                    <span class="color333">{{ruleForm.orderInfo.createTime}}</span>
                </p>
                <p class="bianhao_one">
                    <span class="color666">退款时间：</span>
                    <span class="color333" style="color:#FF6600;">{{ruleForm.orderInfo.refundTime}}</span>
                </p>
                <p class="bianhao_one" v-if="ruleForm.orderInfo.orgOrderID">
                    <span class="color666">原订单号：</span>
                    <span class="color333">{{ruleForm.orderInfo.orgOrderID}}</span>
                </p>
            </div>
            <div class="bianhao_wrap">
                <p class="bianhao_one">
                    <span class="color666">支付状态：</span>
                    <span class="color333">{{ruleForm.orderInfo.payStatus}}</span>
                </p>
                <p class="bianhao_one">
                    <span class="color666">退款金额：</span>
                    <span class="color333">{{ruleForm.orderInfo.refund_amount}}</span>
                </p>
            </div>
        </div>

        <div class="z_orderInfor">
            <p class="title_one">
                <span class="red_line"></span>
                <span class="order_title">产品信息</span>
            </p>
            <div class="bianhao_wrap">
                <p class="bianhao_one">
                    <span class="color999">通用名：</span>
                    <span class="color333">{{ruleForm.orderInfo.commonName}}</span>
                </p>
                <p class="bianhao_one">
                    <span class="color999">产品名称:</span>
                    <span class="color333">{{ruleForm.orderInfo.productName}}</span>
                </p>
                <p class="bianhao_one">
                    <span class="color999">品牌:</span>
                    <span class="color333">{{ruleForm.orderInfo.brand}}</span>
                </p>
            </div>
            <div class="bianhao_wrap">
                <p class="bianhao_one">
                    <span class="color999">有效期:</span>
                    <span class="color333">{{ruleForm.orderInfo.validDate}}</span>
                </p>
                <p class="bianhao_one">
                    <span class="color999">签发时间:</span>
                    <span class="color333">
                  {{ruleForm.orderInfo.notBefore.substring(0, ruleForm.orderInfo.notBefore.length)}}
            </span>
                </p>
                <p class="bianhao_one">
                    <span class="color999">到期时间:</span>
                    <span class="color333">
                {{ruleForm.orderInfo.notAfter.substring(0, ruleForm.orderInfo.notAfter.length)}}
            </span>
                </p>
            </div>
            <div class="bianhao_wrap">
                <p class="bianhao_one">
                    <span class="color999">密钥算法:</span>
                    <span class="color333">{{ruleForm.orderInfo.keySize}}</span>
                </p>
                <p class="bianhao_one">
                    <span class="color999">签名算法:</span>
                    <span class="color333">{{ruleForm.orderInfo.signatureAlgorithm}}</span>
                </p>
                <p class="bianhao_one">
                    <el-popover
                        placement="left"
                        width="460"
                        v-model="csrPop">
                        <div class="tipsWrap">
                            <h5>{{orderID}}订单CSR</h5>
                            <el-input :rows="10" id="copyCSR" refs="copyCSR" type="textarea"
                                      v-model="ruleForm.orderInfo.CSR"></el-input>
                        </div>
                        <div style="text-align: right; margin-top: 20px;">
                            <el-button size="mini" type="primary" @click="copyCSR">复制</el-button>
                        </div>
                        <el-button style="padding: 0;font-size: 12px;" type="text" slot="reference">查看CSR</el-button>
                    </el-popover>
                </p>
            </div>
            <div class="bianhao_wrap">
                <p class="bianhao_one" style="width: 100%">
                    <span class="color999">附加域名：</span>
                    <span class="color333" style="width:calc(100% - 70px);word-break: break-all;float: left;">{{allDomain}}</span>
                </p>
            </div>
        </div>

        <div class="z_orderInfor">
            <p class="title_one">
                <span class="red_line"></span>
                <span class="order_title">证书信息</span>
            </p>

            <div class="certWrap">
                <div class="certInfor">
                    <p class="bianhao_one1">
                        <span class="order_title">企业信息</span>
                    </p>
                    <p class="bianhao_one1">
                        <span class="color999">企业名称：</span>
                        <span class="color333">{{ruleForm.orderInfo.orgName}}</span>
                    </p>
                    <p class="bianhao_one1">
                        <span class="color999">部门名称：</span>
                        <span class="color333">{{ruleForm.orderInfo.orgUnit}}</span>
                    </p>
                    <p class="bianhao_one1">
                        <span class="color999">座机号：</span>
                        <span class="color333">{{ruleForm.orderInfo.phone}}</span>
                    </p>
                    <p class="bianhao_one1">
                        <span class="color999">国家代码：</span>
                        <span class="color333">{{ruleForm.orderInfo.country}}</span>
                    </p>
                    <p class="bianhao_one1">
                        <span class="color999">省市名称：</span>
                        <span class="color333">{{ruleForm.orderInfo.state}}</span>
                    </p>
                    <p class="bianhao_one1">
                        <span class="color999">市区名称：</span>
                        <span class="color333">{{ruleForm.orderInfo.location}}</span>
                    </p>
                    <p class="bianhao_one1">
                        <span class="color999">邮政编码：</span>
                        <span class="color333">{{ruleForm.orderInfo.postcode}}</span>
                    </p>
                    <p class="bianhao_one1">
                        <span class="color999">地址：</span>
                        <span class="color333" style="width:calc(100% - 50px);word-break:break-all;float:left;line-height: 20px;margin-top: 5px;">
                            {{ruleForm.orderInfo.address}}
                        </span>
                    </p>
                </div>
                <div class="certInfor">
                    <p class="bianhao_one1">
                        <span class="order_title">公司联系人信息</span>
                    </p>
                    <p class="bianhao_one1">
                        <span class="color999">姓氏：</span>
                        <span class="color333">{{ruleForm.contactInfo[0].lastName}}</span>
                    </p>
                    <p class="bianhao_one1">
                        <span class="color999">名字：</span>
                        <span class="color333">{{ruleForm.contactInfo[0].firstName}}</span>
                    </p>
                    <p class="bianhao_one1">
                        <span class="color999">职务：</span>
                        <span class="color333">{{ruleForm.contactInfo[0].title}}</span>
                    </p>
                    <p class="bianhao_one1">
                        <span class="color999">座机：</span>
                        <span class="color333">{{ruleForm.contactInfo[0].altPhone}}</span>
                    </p>
                    <p class="bianhao_one1">
                        <span class="color999">手机：</span>
                        <span class="color333">{{ruleForm.contactInfo[0].phone}}</span>
                    </p>
                    <p class="bianhao_one1">
                        <span class="color999">部门：</span>
                        <span class="color333">{{ruleForm.contactInfo[0].department}}</span>
                    </p>
                    <p class="bianhao_one1">
                        <span class="color999">邮箱：</span>
                        <span class="color333">{{ruleForm.contactInfo[0].email}}</span>
                    </p>
                </div>
                <div class="certInfor">
                    <p class="bianhao_one1">
                        <span class="order_title">技术联系人信息</span>
                    </p>
                    <p class="bianhao_one1">
                        <span class="color999">姓氏：</span>
                        <span class="color333">{{ruleForm.contactInfo[1].lastName}}</span>
                    </p>
                    <p class="bianhao_one1">
                        <span class="color999">名字：</span>
                        <span class="color333">{{ruleForm.contactInfo[1].firstName}}</span>
                    </p>
                    <p class="bianhao_one1">
                        <span class="color999">职务：</span>
                        <span class="color333">{{ruleForm.contactInfo[1].title}}</span>
                    </p>
                    <p class="bianhao_one1">
                        <span class="color999">座机：</span>
                        <span class="color333">{{ruleForm.contactInfo[1].altPhone}}</span>
                    </p>
                    <p class="bianhao_one1">
                        <span class="color999">手机：</span>
                        <span class="color333">{{ruleForm.contactInfo[1].phone}}</span>
                    </p>
                    <p class="bianhao_one1">
                        <span class="color999">部门：</span>
                        <span class="color333">{{ruleForm.contactInfo[1].department}}</span>
                    </p>
                    <p class="bianhao_one1">
                        <span class="color999">邮箱：</span>
                        <span class="color333">{{ruleForm.contactInfo[1].email}}</span>
                    </p>
                </div>
            </div>

        </div>

        <div style="text-align:center;">
            <el-button class="return" @click="back" type="">返回</el-button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "OrderDetails",
        data() {
            return {
                orderID: "",
                csrPop: false,
                ruleForm: {
                    orderInfo: {
                        orderID: "",
                        orgOrderID: "",
                        orderType: "",
                        createDate: "",
                        commonName: "",
                        SANs: "",
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
                        cancelPermission: false,
                        notAfter: '',
                        notBefore: ''
                    },
                    contactInfo: [
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
                    attachmentInfo: [
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
                // 附加域名非主域名
                // SANs_Normal 附加普通域名
                // SANs_WildCard 附加通配符域名
                if (this.ruleForm.orderInfo.SANs_Normal !== "[]") {
                    var arr = [...this.ruleForm.orderInfo.SANs_Normal, ...this.ruleForm.orderInfo.SANs_WildCard]
                    //return this.ruleForm.orderInfo.SANs_Normal + ";" + this.ruleForm.orderInfo.SANs_WildCard;
                    return arr.join('\xa0\xa0\xa0\xa0\xa0\xa0\xa0')
                }
            }
        },
        mounted() {
            if (this.$route.params.orderID) {
                this.orderID = this.$route.params.orderID;
            }
            if (this.$route.query.orderID) {
                this.orderID = this.$route.query.orderID;
            }
            this._getDetails();
        },
        methods: {
            _getDetails(){
                this.$axios
                    .post("/api/orderManage/detail", {orderID: this.orderID})
                    .then(res => {
                        let data = res.data;
                        if (data.code === 0) {
                            // console.log(data);
                            this.ruleForm = data.data
                        } else {
                            this.$message({
                                type: "error",
                                message: data.desc
                            })
                        }
                    });
            },
            downLoadCert(orderID) {
                // window.open("/api/orderManage/download/cert?orderID=" + orderID);
                // this.$axios.get("/api/orderManage/download/cert?orderID=" + orderID);
                this.$axios({
                    method: "get",
                    url: "/api/orderManage/download/cert?orderID=" + orderID,
                    responseType: "blob"
                }).then(res => {
                    let objUrl = URL.createObjectURL(res.data);
                    window.open(objUrl)
                });
            },
            downloadPerssion(orderID, attachmentID){
                // window.open("/api/orderManage/download?orderID=" + orderID + "&attachmentID=" + attachmentID);
                // this.$axios.get("/api/orderManage/download?orderID=" + orderID + "&attachmentID=" + attachmentID);
                this.$axios({
                    method: "get",
                    url: "/api/orderManage/download?orderID=" + orderID + "&attachmentID=" + attachmentID,
                    responseType: "blob"
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
                            orderID: orderID,
                            isCimClient: false
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
                this.$router.push({name: "OrderManage"});
            }
        }
    };
</script>
<style lang="scss" scoped>
    * {
        margin: 0;
    }
    .orderDetails-wrapper {
        overflow: hidden;
        margin-top: 20px;
        padding-bottom: 20px;
        .z_orderInfor {
            border: 1px solid #dde5eb;
            overflow: hidden;
            margin-bottom: 20px;
            .title_one {
                height: 35px;
                line-height: 35px;
                font-size: 14px;
            }
            .red_line {
                float: left;
                height: 35px;
                width: 3px;
                background: #ff6666;
            }
            .order_title {
                float: left;
                font-weight: bold;
                color: #333;
                margin-left: 12px;
            }
            .bianhao_wrap {
                border-top:1px solid #dde5eb;
                overflow: hidden;
            }
            .bianhao_one{
                float: left;
                height: 35px;
                line-height: 35px;
                padding: 0 10px;
                font-size: 12px;
                width: 33.3%;
                border-right: 1px solid #dde5eb;
                box-sizing: border-box;
            }
            .bianhao_one:nth-child(3){
                border-right: 0;
            }
            .color999 {
                color: #333;
                float: left;
                /*width: 70px;*/
                font-size: 12px;
            }
            .color333 {
                color: #333;
                font-size: 12px;
            }
            .color666 {
                color: #666;
                float: left;
                /*width: 70px;*/
                font-size: 12px;
            }
            .divButton {
                float: right;
            }

            .certWrap{
                border-top: 1px solid #dde5eb;
                /*padding:15px 0;*/
                overflow: hidden;
                padding-bottom:10px;
            }
            .certInfor{
                width: 33.3%;
                float:left;
                border-right: 1px solid #dde5eb;
                .order_title{
                    margin-left:0;
                }
                padding-top: 10px;
                margin-bottom:-3000px;
                padding-bottom:3000px;
                box-sizing: border-box;
            }
            .certInfor:last-child{
                border-right: 0;
            }
            .bianhao_one1{
                height: 28px;
                line-height: 28px;
                padding: 0 10px;
                font-size: 12px;
            }
        }
        .return {
            width: 96px;
            height: 35px;
            color: #FF6666;
            border-color: #FF6666;
        }
        .return:hover {
            background: #ff6666;
            color: #fff;
        }
    }
</style>
