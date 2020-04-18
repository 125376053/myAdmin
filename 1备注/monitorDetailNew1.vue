<template>
    <div class="pageWrap certDetail-wrapper">
        <div class="top-bar"></div>

        <div class="content-wrapper">
            <!--头-->
            <div class="head-wrapper">
                <img style="box-sizing: content-box;" :onerror="qsimg"
                     :src="certDetail.certInfo?'http://' + certDetail.server + '/favicon.ico':''">
                <div class="head-content">
                    <h2 style="color:#1e6ec7;font-size:30px;">{{httpUrl}}</h2>
                    <div style="font-size:14px;">
                        <p style="margin: 10px 0;">
                            <span class="tit">IP地址：</span>
                            {{certDetail.serverIp ? certDetail.serverIp : ""}}
              <span
                            class="tit"
                            style="margin-left:40px;"
                        >服务器：</span>
                            {{certDetail.server ? certDetail.server : ""}}
            </p>
                        <p>
                            <span class="tit">检测时间：</span>
                            {{certDetail.scanTime ? certDetail.scanTime : ""}}
            </p>
                    </div>
                </div>
            </div>

            <!--证书信息-->
            <div class="info-detail tabContent">
                <img class="ssl-icon" src="../../assets/ssl.png">
                <div class="title-wrapper">
                    <div class="cert-info">证书信息



                    </div>
                </div>

                <div class="tabDiv">
                    <div class="tab2">
                        <ul>
                            <li v-for="(item2,index2) in certInfo" :class="{curTabBtn2:index2==curTabIndex1}"
                                class="tabBtn2" @click="tab1Click(item2,index2)">
                                {{item2.publicKey}}证书



                            </li>
                        </ul>
                        <!--外层tab 内层是公用template-->
                        <div :class="'certInfo'+index2" v-for="(item2,index2) in certInfo"
                             v-show="curTabIndex1==index2">
                            <div class="certInfoContent">
                                <div class="top">
                                    <img class="left" :src="imgs[item2.certType]" alt="">
                                    <div class="right">
                                        <p>
                                            <i class="icon iconfont1 icontubiao-30"></i>
                                            <a>颁发给：</a>
                                            <el-tooltip effect="light" :content="item2.subjDN" placement="top"
                                                        :enterable="false" popper-class="haha">
                                                <b>{{item2.commonName}}</b>
                                            </el-tooltip>
                                        </p>
                                        <p>
                                            <i class="icon iconfont1 icontubiao-26"></i>
                                            <a>颁发者：</a>
                                            <el-tooltip effect="light" :content="item2.issuerDN" placement="top"
                                                        :enterable="false" popper-class="haha">
                                                <b>{{item2.issuer}}</b>
                                            </el-tooltip>
                                        </p>
                                        <p>
                                            <i class="icon iconfont1 icontubiao-28"></i>
                                            <a>有效期：</a>
                                            <b>
                                                {{item2.dateFrom}}
                                            至
                                            {{item2.dateTo}}
                                            (剩余{{day(item2.dateTo)}}天)
                                        </b>
                                        </p>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <p>
                                        <b>
                                            <a>备用名称</a>
                                            <i>(通配符域名<font style="color:red">{{length1}}</font>个,完整域名<font
                                                style="color:red">{{length2}}</font>个)</i>
                                        </b>

                                        <!--外层控制查看详情-->
                                        <span :style="{height:isShow?'auto':'75px'}">
                                        <!--内层控制是否显示查看详情 内层高度大于75显示-->
                                        <a v-gaodu v-if="item2.SANS">
                                            <!--SANS-->
                                            <i v-if="index3 != domain(item2.SANS).length-1"
                                               v-for="(item3,index3) in domain(item2.SANS)" style="font-style: normal;">
                                                {{item3 + ' | '}}
                                            </i>
                                            <i v-if="index3 == domain(item2.SANS).length-1"
                                               v-for="(item3,index3) in domain(item2.SANS)" style="font-style: normal;">
                                                {{item3}}
                                            </i>
                                        </a>
                                    </span>
                                        <a class="lookAll" @click.stop="()=>{
                                        isShow=!isShow
                                    }">【{{isShow ? '收起' : '查看'}}详情】</a>
                                    </p>
                                    <p><b>序列号</b><span>{{item2.serialNum}}</span></p>
                                    <p><b>SHA1指纹</b><span>{{item2.sha1Fing}}</span></p>
                                    <p><b>SHA256指纹</b><span>{{item2.sha256Fing}}</span></p>
                                    <p><b>签名算法</b><span>{{item2.signAlgo}}</span></p>
                                    <p><b>证书状态</b><span>{{status}}</span></p>
                                    <p><b>OCSP</b><span>{{item2.ocspURL}}</span></p>
                                    <p><b>CRL</b><span>{{item2.crlURL}}</span></p>
                                    <p><b>颁发者证书</b><span>{{item2.caURL}}</span></p>
                                </div>
                                <img class="positionImg" :src="imgsType[item2.publicKey+item2.pubKeyBits]" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--证书链-->
            <div class="info-detail">
                <img class="icon-style" src="../../assets/qianfazhe.png">
                <div class="title-wrapper" style="height:100%;position:relative;">
                    <div class="cert-info">证书链</div>
                    <div v-if="certDetail.chainStatus==1"
                         style="position:absolute;color:#e52222;font-size:13px;font-weight:bold;top:36px;right:10px;">
                        <img
                            style="vertical-align:sub;padding-right:5px;" src="../../assets/th.png">证书链不全


                    </div>
                    <div v-if="certDetail.chainStatus==2"
                         style="position:absolute;color:#e52222;font-size:13px;font-weight:bold;top:36px;right:10px;">
                        <img
                            style="vertical-align:sub;padding-right:5px;" src="../../assets/th.png">证书链不受信


                    </div>

                    <!--证书链信息-->
                    <div class="tabDiv">

                        <div class="tab2">
                            <ul>
                                <li v-for="(item2,index2) in chainInfo" :class="{curTabBtn2:index2==curTabIndex2}"
                                    class="tabBtn2" @click="tab2Click(item2,index2)">
                                    证书链{{(index2 + 1)}}



                                </li>
                            </ul>

                            <div :class="'chainInfo'+index2" v-for="(item2,index2) in chainInfo"
                                 v-if="curTabIndex2 == index2">
                                <div :class="'chainInfo'+index2+'-'+index3" v-for="(item3,index3) in item2">
                                    <div class="chainInfoContent">
                                        <div class="lineImg">
                                            <!--<img :src="chainInfoImg[index3]" alt="">-->
                                            <img :src="showImgArr(index3,item2)" alt="">
                                            <!--最后一个不显示竖线-->
                                            <i v-show="index3!=item2.length-1"></i>
                                        </div>
                                        <p>
                                            <span>颁发给：</span>
                                            <span>{{item3.commonName}}</span>
                                        </p>
                                        <p>
                                            <span>颁发者：</span>
                                            <span>{{item3.issuer}}</span>
                                        </p>
                                        <!--第一个只有已过期才标红-->
                                        <!--<p v-if="index3==0">
                                          <span>有效期：</span>
                                          <span :style="{color:!days(item3.dateTo)?'red':''}">
                                                  {{item3.dateFrom}}
                                                  ~
                                                  {{item3.dateTo}}
                                                  (剩余{{days(item3.dateTo)}}天)
                                                  </span>
                                        </p>-->
                                        <p v-if="index3==0">
                                            <span>有效期：</span>
                                            <span :style="{color:!days[index3]?'red':''}">
                        {{item3.dateFrom}}
                        ~
                        {{item3.dateTo}}
                        (剩余{{days[index3]}}天)
                      </span>
                                        </p>
                                        <!--后2个已过期<0标红 || 小于365标红-->
                                        <!--<p v-if="index3!=0">
                                          <span>有效期：</span>
                                          <span
                                            :style="{color:!days(item3.dateTo) || days(item3.dateTo)<365 ?'red':''}">
                                                  {{item3.dateFrom}}
                                                  ~
                                                  {{item3.dateTo}}
                                                  (剩余{{days(item3.dateTo)}}天)
                                                  </span>
                                        </p>-->
                                        <p v-if="index3!=0">
                                            <span>有效期：</span>
                                            <span :style="{color:!days[index3] || days[index3]<365 ?'red':''}">
                        {{item3.dateFrom}}
                        ~
                        {{item3.dateTo}}
                        (剩余{{days[index3]}}天)
                      </span>
                                        </p>
                                        <p>
                                            <span>算法：</span>
                                            <span>{{item3.keySize}}/{{item3.signAlgo || item3.signAlg}}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div style="clear:both"></div>
            </div>

            <!--协议-->
            <div class="info-detail">
                <img class="icon-style" src="../../assets/xieyi.png">
                <div class="title-wrapper">
                    <div class="cert-info">协议</div>
                </div>
                <div style="margin-top:25px;">
                    <span style="color:#555;font-size:15px;font-weight:bold;margin-left:80px;">支持的协议：</span>
                    <span class="title-item" v-for="(item,index) in suites">
            <a :style="{color:colorArr[index%colorArr.length]}" v-if="index==suites.length-1">{{item.protocol}}</a>
            <a :style="{color:colorArr[index%colorArr.length]}" v-else>{{item.protocol}}/</a>
          </span>
                </div>
                <div
                    style="color:#555;font-size:15px;font-weight:bold;margin-top:20px;margin-bottom:25px;margin-left:80px;">
                    支持的加密套件



                </div>
                <!-- <div class="vertical-bottom"></div> -->
                <el-collapse v-model="activeNames" v-for="(item,index) in suites" :key="index"
                             style="margin-left:80px;">
                    <el-collapse-item :title="'#'+item.protocol" style="color:#1e6ec7;" :name="index+1">
                        <div style="letter-spacing:1.5px;line-height:20px;" v-for="(item1,index) in item.suiteList"
                             :key="index">
                            <!-- {{item1.suiteStrength}} -->
                            <span style="display:inline-block;min-width:440px;"
                                  :style="{color:(item1.suiteStrength == 2)?'#e17b18':(item1.suiteStrength == 3)?'#e02121':'#333'}">{{item1.name}}</span>&nbsp;
                            <span style="display:inline-block;min-width:400px;">{{item1.kxType}} {{item1.namedGroupName}} <span
                                v-show="item1.kxStrength">(eq.&nbsp;{{item1.kxStrength}}&nbsp;bits&nbsp;RSA)&nbsp;FS</span></span>
                            <span>{{item1.cipherStrength}}</span>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>

            <!--客户端握手模拟-->
            <div class="info-detail">
                <img class="icon-style" src="../../assets/woshou.png">
                <div class="title-wrapper">
                    <div class="cert-info">客户端握手模拟</div>
                </div>
                <div style="margin:25px auto;">
                    <div style="line-height:35px;padding-left:20px;" v-for="(item,index) in sims" :key="index">
                        <a v-if="item.keySize || item.protocol || item.suiteName">
              <span style="display:inline-block;min-width:250px;color:#1e6ec7;">{{item.name}}
                  <i title="浏览器不支持SNI" style="font-style: normal;color:orange;" v-if="!item.supportsSni">No SNI</i>
              </span>
                            <span style="display:inline-block;min-width:225px;">
                {{item.keySize}}
                <i style="font-style: normal;" v-show="item.signAlgo">({{item.signAlgo}})</i>
                <i style="font-style: normal;" v-show="!item.signAlgo">-</i>
              </span>
                            <span style="display:inline-block;min-width:85px;color:#2fd12f;">{{item.protocol}}</span>
                            <span style="display:inline-block;min-width:350px;">{{item.suiteName}}</span>
                            <span style="display:inline-block;min-width:89px;color:#2fd12f;"
                                  v-show="item.kxType=='ECDH' || item.kxType=='DH'">
                FS <i style="font-style: normal;color:red;" v-if="item.supportRc4">RC4</i>
              </span>
                            <!--<span style="display:inline-block;min-width:89px;color:#2fd12f;" v-show="item.kxType!='ECDH' || item.kxType!='DH'"></span>-->
                        </a>
                        <a v-if="!item.protocol || !item.suiteName">
                            <span style="display:inline-block;min-width:250px;color:#1e6ec7;">{{item.name}}</span>
                            <span style="color:red;">握手失败(handshake_failure)</span>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                recordID: "",
                PKID: this.$route.query.PKID || "",
                dataVersion: this.$route.query.dataVersion || '',
                certDetail: {},
                typeImgs: [require('../../assets/DV.png'), require('../../assets/OV.png'), require('../../assets/EV.png')],
                tempSans: '',
                flag: false,
                issuerFlag: false,
                sxFlag: 0,
                activeNames: [1], // 默认加密套件打开的
                version: [],
                httpUrl: '',
                isChecked: false,
                show_info: false,  // 加载条
                show_status_certInfo: false,
                show_status_chainInfo: false,
                qsimg: 'this.src="' + require('../../assets/qsimg.png') + '"',
                styleColor: {},

                // 新加的
                curTabIndex1: 0,
                curTabIndex2: 0,
                certInfo: [],
                chainInfo: [],
                suites: [],
                protocol: [], //协议
                sims: [],
                code: -1,
                imgs: {
                    'OV': require("../../assets/OV.png"),
                    'EV': require("../../assets/EV.png"),
                    'DV': require("../../assets/DV.png")
                },
                length1: 0,
                length2: 0,
                imgsType: {
                    'RSA2048': require("../../assets/2048.png"),
                    'RSA4096': require("../../assets/4096.png"),
                    'EC256': require("../../assets/256.png")
                },
                status: '',
                colorArr: ['#f89999', '#000', '#ffbb54'],
                isShow: false,
                renew: false, //是否为刷新
                port: '', //端口
                timer: null,
                host: '',
            };
        },
        mounted () {
            this._getDetail()
        },
        directives: {
            gaodu: {
                bind: function (el) {
                    // 初始化只执行一次
                    console.log('初始化');
                },
                update: function (el, newValue, oldValue) {
                    // 更新的时候执行
                    console.log('更新');
                    var height = el.offsetHeight
                    console.log(height);
                    if (height > 75) {
                        document.querySelector(".lookAll").style.display = 'block'
                    } else {
                        document.querySelector(".lookAll").style.display = 'none'
                    }
                },
                unbind: function () {
                    console.log('销毁');
                }
            }
        },
        computed: {
            // 新加的
            showImgArr(index4, item2){
                return (index4, item2) => {
                    if (index4 == 0) {
                        return require('../../assets/ssldui.png')
                    } else if (index4 == item2.length - 1) {
                        return require('../../assets/root.png')
                    } else {
                        return require('../../assets/ca.png')
                    }
                }
            },
            days() {
                var time = [];
                if (!this.chainInfo) {
                    return;
                }
                this.chainInfo[this.curTabIndex2].forEach((item, index) => {
                    console.log(item.dateTo);
                    var start = new Date(item.dateTo);
                    var end = new Date();
                    var s = start.getTime() - end.getTime();
                    var days = Math.floor(s / (24 * 3600 * 1000));
                    // <0 已过期 0-30即将到期(0-30) 30-90 正常>90
                    if (days < 0) {
                        this.status = "已过期";
                    }
                    if (days > 0 && days < 30) {
                        this.status = "即将到期(0-30)";
                    }
                    if (days > 30 && days < 90) {
                        this.status = "即将到期(30-90)";
                    }
                    if (days > 90) {
                        this.status = "正常";
                    }
                    time.push(days);
                });
                console.log(time);
                return time;
            },
            domain(d){
                return (d) => {
                    var str = d.replace(/DNS:/g, '');
                    var arr = str.split(', ')
                    //console.log(arr);
                    var arr1 = []
                    var arr2 = []
                    arr.forEach(item => {
                        if (item.includes('*')) {
                            arr1.push(item)
                        } else {
                            arr2.push(item)
                        }
                    })
                    this.length1 = arr1.length
                    this.length2 = arr2.length
                    return arr
                }
            },
        },
        methods: {
            day(time) {
                var start = new Date(time);
                console.log(start);
                var end = new Date();
                var s = start.getTime() - end.getTime();
                var days = Math.floor(s / (24 * 3600 * 1000));
                // <0 已过期 0-30即将到期(0-30) 30-90 正常>90
                if (days < 0) {
                    this.status = "已过期";
                }
                if (days > 0 && days < 30) {
                    this.status = "即将到期(0-30)";
                }
                if (days > 30 && days < 90) {
                    this.status = "即将到期(30-90)";
                }
                if (days > 90) {
                    this.status = "正常";
                }
                return days;
            },
            _getDetail() {
                this.$axios
                    .post("/api/monitorReport/details", {
                        PKID: this.PKID,
                        dataVersion: this.dataVersion
                    }).then(res => {
                    let data = res.data;
                    if (data.code === 0) {
                        if (data.data.certState == 99) {
                            this.$message({
                                type: "error",
                                message: data.data.scanErrInfo
                            });
                        }
                        if (data.data.certState == 0) {
                            this.certDetail = data.data;
                            this.certInfo = data.data.certInfo
                            this.chainInfo = data.data.chainInfo
                            this.suites = data.data.cipherInfo
                            this.sims = data.data.simsInfo
                        }

                    } else {
                        this.$message({
                            type: "error",
                            message: data.data.scanErrInfo
                        });
                    }
                });
            },
            // table
            tab1Click(item2, index2){
                this.curTabIndex1 = index2
            },
            tab2Click(item2, index2){
                this.curTabIndex2 = index2
            },
        }
    };
</script>

<style lang="scss" scoped>
    .certDetail-wrapper {
        color: #555;
        font-size: 13px;
        margin-bottom: 60px;
        .top-bar {
            width: 100%;
            height: 5px;
            background: #1e6ec7;
        }
        .cert-chain-icon {
            height: 100%;
            display: inline-block;
            vertical-align: 22px;
        }
        .sx {
            width: 2px;
            height: calc(100% - 40px);
            display: inline-block;
            background: #1e6ec7;
            position: absolute;
            top: 92px;
            left: 30px;
        }
        .cw {
            background: url('../../assets/cw.png') no-repeat;
            height: calc(100% - 40px);
            display: inline-block;
            position: absolute;
            top: 56px;
            left: 20px;
            width: 19px;
            height: 110px;
        }
        .content-wrapper {
            width: 1100px;
            margin: 0 auto;
            margin-top: 74px;
            color: #555;
            .head-wrapper {
                position: relative;
                border: 2px solid #1e6ec7;
                // background-color: #f3f8fe;
                padding: 39px 42px;
                margin-bottom: 35px;
                img {
                    width: 55px;
                    height: 55px;
                    display: inline-block;
                    padding: 20px;
                    border: 1px solid #ddd;
                    vertical-align: middle;
                    background-color: #fff;
                    // vertical-align: 42px;
                }
                .head-content {
                    display: inline-block;
                    margin-left: 20px;
                    height: 100px;
                    vertical-align: middle;
                    h2 {
                        padding: 0;
                        margin: 0;
                    }

                    .refreshIco {
                        background: url('../../assets/re.png') no-repeat;
                        padding-left: 16px;
                        width: 52px;
                        height: 14px;
                        color: #1e6ec7;
                        position: absolute;
                        top: 42px;
                        right: 16px;
                        cursor: pointer;
                    }
                    .tit {
                        color: #1e6ec7;
                    }
                }
            }
            .ssl-icon {
                width: 40px;
                height: 40px;
                float: left;
            }
            .title-wrapper {
                width: 100%;
                height: 40px;
                line-height: 30px;
                font-size: 24px;
                /*color: #1e6ec7;*/
                .cert-info {
                    margin-left: 40px;
                    height: 32px;
                    border-bottom: solid 2px #1e6ec7;

                    .download-cert {
                        cursor: pointer;
                        font-size: 10px;
                        float: right;
                        .download-icon {
                            vertical-align: text-bottom;
                            width: 18px;
                            height: 18px;
                        }
                    }
                }
                .cert-ico-wrapper {
                    display: inline-block;
                    position: relative;
                    z-index: 2;
                }
            }
            .info-detail {
                //   height: 220px;
                position: relative;
                margin-top: 30px;
                // padding-left: 40px;
                .look-all {
                    color: #4889d2;
                    text-decoration: none;
                    float: right;
                    position: absolute;
                    right: 0;
                    font-size: 12px;
                }
                .look-more {
                    color: #4889d2;
                    text-decoration: none;
                    float: right;
                    position: absolute;
                    right: 0;
                    top: -20px;
                }
                .horizontal {
                    margin-top: 10px;
                    height: 1px;
                    background: #fbfbfb;
                }
                .vertical-bottom {
                    float: left;
                    margin-top: 18px;
                    margin-left: 120px;
                    background: #eaeaea;
                    width: 2px;
                    height: 70px;
                }
                .theme-title-right {
                    border-left: solid 1px #eaeaea;
                    margin-left: 120px;
                    padding-left: 20px;
                    margin-top: 13px;
                    font-size: 13px;
                    color: #333333;
                    text-align: left;
                    .title-item {
                        height: 26px;
                        line-height: 26px;
                    }
                    .title-item-detail {
                        line-height: 19px;
                        word-break: break-word;
                        min-height: 57px;
                        color: #555;
                    }
                }
                .vertical {
                    float: left;
                    margin-top: 18px;
                    margin-left: 120px;
                    background: #eaeaea;
                    width: 2px;
                    height: 165px;
                }
                .title-tip {
                    color: #666;
                    font-size: 12px;
                    width: 94px;
                    margin-left: 16px;
                    margin-top: -5px;
                    transform: scale(0.8);
                    line-height: 18px;
                }
                .theme-title {
                    // height: 169px;
                    font-size: 13px;
                    color: #000;
                    text-align: right;
                    margin-top: 20px;
                    width: 100px;
                    .title-item {
                        height: 26px;
                        line-height: 26px;
                    }
                }
                .cert-info {
                    margin-left: 40px;
                    height: 32px;
                    border-bottom: solid 2px #1e6ec7;

                    .download-cert {
                        padding-top: 6px;
                        font-size: 10px;
                        float: right;
                        .download-icon {
                            vertical-align: text-bottom;
                            width: 18px;
                            height: 18px;
                        }
                    }
                }
                .cert-img {
                    float: left;
                }
                .icon-style {
                    float: left;
                }
                .detail-title {
                    margin-left: 40px;
                    width: calc(100% - 260px);
                    height: 100%;
                    float: left;
                    .title-item {
                        width: 100%;
                        height: 50px;
                        line-height: 50px;
                        border-bottom: solid 1px #f1f1f1;
                        .item-icon {
                            margin: 15px 0 0 10px;
                            vertical-align: -5px;
                        }
                        .item_title {
                            font-size: 12px;
                            color: #484848;
                        }
                        .item-icon-rsa {
                            width: 50px;
                            height: 30px;
                            float: right;
                            margin-top: 10px;
                        }
                        .icon-container {
                            display: inline-block;
                            width: 38px;
                            height: 38px;
                        }
                    }
                }
            }
        }
    }
</style>

<style scoped="">

    .detailTab {
        height: calc(100vh - 120px);
        font-size: 12px;
        padding: 35px;
    }

    .position {
        position: absolute;
        top: 60px;
        width: calc(100% - 20px);
        height: calc(100vh - 80px);
        z-index: 999;
        background: #E7EAF3;
        padding: 10px !important;
        /*overflow: auto;*/
    }

    .positionImg {
        position: absolute;
        right: 100px;
        top: 65px;
    }

    .detailTab ul {
        width: 100%;
        overflow: hidden;
    }

    .detailTab ul li.tabBtn {
        height: 40px;
        line-height: 40px;
        float: left;
        background: #3378EC;
        font-size: 12px;
        display: block;
        text-decoration: none;
        text-align: center;
        color: #fff;
        margin-right: 4px;
        cursor: pointer;
        box-sizing: border-box;
        padding: 0 20px;
    }

    .detailTab ul li.tabBtn:hover {
        background: #6498F1;
    }

    .detailTab ul li.curTabBtn {
        background: #fff;
        color: #3272E9;
        font-size: 14px;
    }

    .detailTab ul li.curTabBtn:hover {
        background: #fff;
        color: #3272E9;
        font-size: 14px;
    }

    .detailClose {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 64px;
        height: 28px;
        background: #8D99B5;
        border-radius: 5px;
        text-align: center;
        line-height: 28px;
        text-decoration: none;
        color: #fff;
        font-size: 12px;
    }

    .tabContent {
        background: #fff;
        height: calc(100% - 40px);
        overflow: auto;
    }

    .tabContent p {
        line-height: 25px;
        overflow: hidden;
    }

    .tabContent p span:nth-child(1) {
        float: left;
        width: 120px;
    }

    .tabContent p span:nth-child(1) b {
        display: block;
    }

    .tabContent p span:nth-child(2) {
        float: left;
        width: calc(100% - 120px);
    }

    .tab2 {
        padding: 0 10px;
        overflow: hidden;
        position: relative;
        font-size: 13px;
    }

    .tab2 ul {
        border-bottom: 1px solid #E5E7EC;
        height: 43px;
    }

    .tabBtn2 {
        color: #1B1919;
        height: 43px;
        line-height: 50px;
        display: inline-block;
        padding: 0 10px;
        cursor: pointer;
        box-sizing: border-box;
    }

    .curTabBtn2 {
        height: 43px;
        background: #fff;
        color: #337DEE;
        border-bottom: 2px solid #3276EB;
    }

    .errDialog {
        text-align: center;
    }

    .erryy {
        margin: 10px auto 16px;
        font-size: 20px;
        color: #000;
        font-weight: bold;
    }

    /*证书信息*/
    .certInfoContent {
        width: 800px;
        margin: 16px auto;
    }

    .certInfoContent .top {
        height: 120px;
        display: flex;
        justify-content: flex-start;
        align-content: center;
    }

    .certInfoContent .top .left {
        width: 170px;
        height: 120px;
    }

    .certInfoContent .top .right {
        width: 500px;
        height: 120px;
        margin-left: 30px;
        margin-top: 15px;
    }

    .certInfoContent .top .right p {
        line-height: 30px;
        height: 30px;
    }

    .certInfoContent .top .right p i {
        float: left;
        /*margin-top: 10px;*/
        font-size: 12px !important;
        color: #5C96F1;
        margin-right: 10px;
    }

    .certInfoContent .top .right p a {
        float: left;
        font-size: 12px !important;
        color: #5C96F1;
    }

    .certInfoContent .top .right p b {
        float: left;
        font-weight: normal;
        color: #333;
    }

    .certInfoContent .bottom {
        margin-top: 25px;
        position: relative;
    }

    .certInfoContent .bottom p {
        position: relative;
    }

    .certInfoContent .bottom p b {
        width: 117px;
        text-align: right;
        padding-right: 20px;
        float: left;
        border-right: 1px solid #E5E7EC;
    }

    .lookAll {
        position: absolute;
        right: 0;
        top: 50px;
        color: #3276EB;
        cursor: pointer;
    }

    .certInfoContent .bottom p b a {
        display: block;
    }

    .certInfoContent .bottom p b i {
        font-weight: normal;
        font-style: normal;
    }

    .certInfoContent .bottom p span {
        float: left;
        padding-left: 20px;
        width: calc(100% - 210px) !important;
        padding-right: 50px;
    }

    .haha {
        width: 300px !important;
    }

    /*证书链信息*/
    .chainInfoContent {
        /*width: 600px;*/
        margin: 40px 40px;
        position: relative;
    }

    .chainInfoContent p {
        height: 25px;
        overflow: hidden;
    }

    .chainInfoContent p span:nth-child(1) {
        width: 138px !important;
        padding-left: 72px !important;
        display: inline-block;
    }

    .chainInfoContent p span:nth-child(2) {
        /*width: calc(100% - 140px);*/
        border-left: 1px solid #ccc;
        padding-left: 10px;
        box-sizing: border-box;
        display: inline-block;
        height: 25px;
    }

    .lineImg {
        position: absolute;
        left: 0;
        top: 5px;
    }

    .lineImg img {
        position: absolute;
        left: 0;
        top: 0;
        /*width: 42px;
        height: 39px;*/
    }

    .lineImg i {
        display: inline-block;
        height: 97px;
        background: #000;
        width: 1px;
        position: absolute;
        top: 43px;
        left: 33px;
    }

    /*加密套件*/
    .cipherInfo {
        width: 900px;
        margin: 0 auto;
        padding-bottom: 20px;
    }

    .cipherInfo .title1 {
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid #E5E7EC;
        padding: 0 50px;
    }

    .cipherInfo .title1 i {
        font-style: normal;
    }

    /*.cipherInfo .title1 i:nth-child(1){
        color:red;
        font-style: normal;
    }
    .cipherInfo .title1 i:nth-child(2){
        color:#120000;
        font-style: normal;
    }
    .cipherInfo .title1 i:nth-child(3){
        color:yellow;
        font-style: normal;
    }
    .cipherInfo .title1 i:nth-child(4){
        color:#120000;
        font-style: normal;
    }*/
    .pass {

    }

    .pass li {
        border-bottom: 1px solid #E5E7EC;
        padding: 0 50px;
        overflow: hidden;
    }

    .pass li .biaoti {
        color: #3272E9;
        height: 50px;
        line-height: 50px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
    }

    .pass li .biaoti span, .pass li .biaoti i {
        display: block;
    }

    .pass li .list {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .pass li div p {
        flex: 1;
    }

    .pass li div p:first-child {
        text-align: left;
        flex: 2;
    }

    .pass li div p:nth-child(2) {
        text-align: center;
        flex: 1.5;
    }

    .pass li div p:last-child {
        text-align: right;
        margin-right: 0;
    }

    .zhanwei {
        height: 20px;
    }

    /*客户端模拟*/
    .kehuduanmoni {
        /*width: 800px;*/
        margin: 20px auto;
    }

    .kehuduanmoni li {
        height: 40px;
        line-height: 40px;
    }

    .kehuduanmoni li .div {

    }

    .kehuduanmoni li .div .hasData {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .kehuduanmoni li .div .noData {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .kehuduanmoni li .div .hasData p:nth-child(1) {
        flex: 2;
        color: #3272E9;
    }

    .kehuduanmoni li .div .hasData p:nth-child(2) {
        flex: 2;
        color: #333;
    }

    .kehuduanmoni li .div .hasData p:nth-child(3) {
        flex: 1;
        color: #02CB01;
    }

    .kehuduanmoni li .div .hasData p:nth-child(4) {
        flex: 4;
        color: #333;
    }

    .kehuduanmoni li .div .hasData p:nth-child(5) {
        flex: 1;
        color: #02CB01;
    }

    .kehuduanmoni li .div .noData p:nth-child(1) {
        color: #3272E9;
        margin-right: 20px;
    }

    .kehuduanmoni li .div .noData p:nth-child(2) {
        color: red;
    }
</style>



