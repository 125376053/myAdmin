<template>
    <div class="orderCert-wrapper">
      <div class="orderCert-contain">
        <div class="place brand" style="margin-top: 20px">
          <el-col :span="3"><span class="tit">品牌：</span></el-col>
          <el-col :span="21">
            <el-tabs v-model="selectBrand" type="card" @tab-click="brandClick" style="display:inline-block">
              <el-tab-pane v-for="item in allData" :label="item.brand" :name="item.brand" :key="item.brand" :disabled="$route.query.updata?true:false?true:false">{{item.comment}}</el-tab-pane>
            </el-tabs>
          </el-col>
        </div>
        <div class="place type" style="margin-top: 20px">
          <el-col :span="3"><span class="tit">类型：</span></el-col>
          <el-col :span="21">
            <el-tabs v-model="selectType" type="card" @tab-click="typeClick" style="display:inline-block" :disabled="$route.query.updata?true:false?true:false">
              <el-tab-pane label="EV" name="EV" :disabled="showEVNO || $route.query.updata?true:false">扩展验证（EV）证书，帮助确保证书持有组织的真实性。绿色地址栏显示组织名称，确保网站的安全性，树立网站可信形象，从而不给欺诈钓鱼网站以可乘之机。</el-tab-pane>
              <el-tab-pane label="OV" name="OV" :disabled="showOVNO || $route.query.updata?true:false">帮助确保证书持有组织的真实性，可以最大程度上提升网站的可靠和信任度。</el-tab-pane>
              <!-- <el-tab-pane label="DV" name="DV" :disabled="showDVNO">仅验证域名所有权，不验证证书持有组织信息。适用于中小企业及个人用户。</el-tab-pane> -->
            </el-tabs>
          </el-col>
        </div>
        <div class="place type" style="margin-top: 20px">
          <el-col :span="3"><span class="tit">功能：</span></el-col>
          <el-col :span="21">
            <el-tabs v-model="selectFunc" type="card"  @tab-click="funcClick" style="display:inline-block">
              <el-tab-pane label="单域名" name="单域名" :disabled="showSingNO || $route.query.updata?true:false">保护一个完整域名，例如pay.domain.com。当使用顶级域www.domain.com时，赠送domain.com域名，反之domain.com亦赠送www.domain.com域名。</el-tab-pane>
              <el-tab-pane label="多域名" name="多域名" :disabled="showManyNO || $route.query.updata?true:false">保护多个完整域名，例如pay1.domain.com、buy2.domain.com、pay.domain.cn、sub.buy.domain.com将计算为4个域名。支持多个不同顶级域。</el-tab-pane>
              <el-tab-pane label="通配符" name="通配符" :disabled="showWildNO || $route.query.updata">保护一个通配符域名。例如一个通配符证书 *. domain.com，可用于www.domain.com ， mail.domain.com ，pay.domain.com 等（“*”号可被任意 字母+数字+“-”的组合替换），但不可用于 www.sub.domain.com。</el-tab-pane>
              <el-tab-pane label="多域名通配符" name="多域名通配符" :disabled="showMWildNO || $route.query.updata?true:false">可混合多个完整域名和多个通配符域名，一张证书即可实现多个域名的安全保护。支持多个不同顶级域名。申请和使用均灵活方便。</el-tab-pane>
            </el-tabs>
          </el-col>
        </div>
        <div v-show="selectFunc === '多域名'">
          <div class="place dCount">
            <el-col :span="3"><span class="tit">域名个数：</span></el-col>
            <el-col :span="21" style="margin-bottom:15px">
               <el-input-number :disabled="$route.query.updata?true:false" :min="2" v-model="dCount1" :max="dMaxCount" label="描述文字"></el-input-number>
              <!-- <el-input-number :disabled="$route.params.updata?true:false" v-model="dCount1" :min="2" :max="dMaxCount" @change="dcoun1Change"  label="描述文字"></el-input-number> -->
            </el-col>
          </div>
        </div>
        <div v-show="selectFunc === '多域名通配符'">
          <div class="place dCount">
            <el-col :span="3"><span class="tit">域名个数：</span></el-col>
            <el-col :span="21" style="margin-bottom:15px">
              <el-input-number :disabled="$route.query.updata?true:false" v-model="dCount" :min="selectBrand === 'GlobalSign' || selectBrand === 'Entrust'?0:1" @change="dChange" label="描述文字"></el-input-number>
            </el-col>
          </div>
          <div class="place dWCount" >
            <el-col :span="3"><span class="tit">通配符域名个数：</span></el-col>
            <el-col :span="21" style="margin-bottom:15px">
              <el-input-number :disabled="$route.query.updata?true:false" v-model="dWCount" :min="1"  @change="dWChange" label="描述文字"></el-input-number>
            </el-col>
          </div>
        </div>
        <div class="place product" style="margin-top: 20px">
          <el-col :span="3"><span class="tit">产品：</span></el-col>
          <el-col :span="21">
            <el-tabs v-model="selectProduct" type="card"  @tab-click="productClick" style="display:inline-block">
              <el-tab-pane :disabled="$route.query.updata?true:false" v-for="product in products" :key="product" :label="product" :name="product"></el-tab-pane>
            </el-tabs>
          </el-col>
        </div>
        <div class="place time" style="margin-top: 20px">
          <el-col :span="3"><span class="tit">年限：</span></el-col>
          <el-col :span="21">
            <el-tabs v-model="selectYear" type="card" @tab-click="yearsClick" style="display:inline-block">
              <el-tab-pane label="1年" name="1年" :disabled="showOneNO" ></el-tab-pane>
              <el-tab-pane label="2年" name="2年" :disabled="showTwoNO" ></el-tab-pane>
              <!-- <el-tab-pane label="3年" name="3年" :disabled="showThreeNO" ></el-tab-pane> -->
            </el-tabs>
          </el-col>
        </div>
        <div class="place price" style="margin-top: 20px;">
          <el-col :span="3"><span class="tit">价格：</span></el-col>
          <el-col :span="21"><span class="calculatePrice">￥{{price}}</span></el-col>
        </div>
        <div style="margin-top:50px;">
          <el-col :span="3"><span class="tit">&nbsp;</span></el-col>
          <el-col :span="21">
            <!-- <router-link :to="{ name: 'OrderSteps',params:{funType:this.selectFunc,type:this.selectType,productCode:this.productCode,years:this.selectYear,dCount1:this.dCount1,dCount:this.dCount,dWCount:this.dWCount}}"> -->
              <el-button type="primary" @click="nextStep" style="margin-top:50px;width:150px">下一步</el-button>
            <!-- </router-link> -->
          </el-col>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "orderCert",
  data: function() {
    return {
      brandEnName:"",
      selectBrand: "",
      selectType: "",
      selectFunc: "",
      selectProduct: "",
      selectYear: "",
      showOVNO: false,
      showDVNO: false,
      showEVNO: false,
      showSingNO: false,
      showManyNO: false,
      showWildNO: false,
      showMWildNO: false,
      showOneNO: false,
      showTwoNO: false,
      showThreeNO: false,
      dCount1: 2,
      dCount: 1,
      dWCount: 1,
      dMaxCount: 1,
      dWMaxCount: 1,
      maxDomainCount: 1,
      price:0,
      productID:"",
      productCode:"",
      orgID:"",
      allData: "",
      brandList: [],
      productList: [],
      type: [],
      func: [],
      products: [],
      years: []
    };
  },
  created() {},
  watch: {
    "$route":function(to,from){
      this.brandEnName = this.$route.meta.brandEnName
      this.orgID = localStorage.getItem("orgID");
      this.$axios
      .post("/api/rapidOrder/productList", { orgID: this.orgID, brandEnName: this.brandEnName})
      .then(res => {
        let data = res.data;
        console.log(data)
        if (data.code === 0) {
          this.allData = data.data;
          for (let product of this.allData[0].products) {
            //初始化产品列表
            if (this.products.indexOf(product.productName_ZH) < 0) {
              this.products.push(product.productName_ZH);
            }
          }
          // 设置默认选中
          this.selectBrand = this.allData[0].brand;
          this.brandClick(this.selectBrand);
          this.calculatePrice();
        }else{
          this.$message({
            type:'error',
            message:data.desc
          })
        }
      });
    }
  },
  mounted() {
    console.log("this.$route")
    console.log(this.$route)
    // alert(this.$route)
    // roterParams = $route.params
    this.brandEnName = this.$route.query.brandEnName.toUpperCase();
    this.orgID = localStorage.getItem("orgID");
    this.$axios
      .post("/api/rapidOrder/productList", { orgID: this.orgID, brandEnName: this.brandEnName})
      .then(res => {
        // debugger
        let data = res.data;
        console.log(data)
        // alert(JSON.stringify(data))
        if (data.code === 0) {
          this.allData = data.data;
          for (let product of this.allData[0].products) {
            //初始化产品列表
            if (this.products.indexOf(product.productName_ZH) < 0) {
              this.products.push(product.productName_ZH);
            }
          }
          // 设置默认选中
          this.selectBrand = this.allData[0].brand;
          // this.brandClick(this.selectBrand);
          if(this.$route.query.updata){
            // this.selectBrand = data.data.brand
            this.getBrandProductList(this.selectBrand);
           
            this.selectType = this.$route.query.productType
            this.selectFunc = this.$route.query.funType          
            // sthis.dCount1 = this.$route.query.dCount1
            // this.dCount = this.$route.query.dCount
            // this.dWCount = this.$route.query.dWCount
            
            this.$set(this,'dCount1',this.$route.query.dCount1)
            this.$set(this,'dCount',this.$route.query.dCount)
            this.$set(this,'dWCount',this.$route.query.dWCount)
            // alert(this.$route.query.dCount)
            // alert(this.dCount1)
            
            this.queryCategoryOne('type', 'productList','type','selectFunc','func')
            this.selectedType();
            this.filterType();
            this.queryCategoryTwo('products', 'productList', 'productName_ZH', 'selectType', 'type', 'selectFunc', 'func')
            this.selectProduct = this.$route.query.productName
            this.showDomainCount('productList','type','productName_ZH','func');
            this.queryYear('years', 'productList','func', 'type', 'productName_ZH','validityPeriod')
            this.selectYear = this.$route.query.validDate
            this.filterYear();
          }else{
            // 设置默认选中
            // this.selectBrand = this.allData[0].brand;
            this.brandClick(this.selectBrand);
          }
          this.calculatePrice();
        }
      });
  },
  methods: {
    nextStep(){
      // debugger
      if ((this.selectBrand === 'GlobalSign' || this.selectBrand === 'Entrust') && (this.selectFunc === '多域名通配符')) {
        if(this.dCount == 0 && this.dWCount == 1){
          this.$message({
            type:"error",
            message:"多域名通配符产品域名个数和通配符域名个数总数不能低于2！",
          })
        }else{
          this.$router.push({
          name:'clientServerSteps',
          params:{
            funType:this.selectFunc,
            type:this.selectType,
            productCode:this.productCode,
            years:this.selectYear,
            dCount1:this.dCount1,
            dCount:this.dCount,
            dWCount:this.dWCount,
            productName:this.selectProduct,
            price:this.price,
            brandEnName:this.selectBrand}
          })
        }
      }else if(this.$route.query.updata){
        this.$router.push({
          name:'clientServerSteps',
          params:{
            funType:this.selectFunc,
            type:this.selectType,
            productCode:this.productCode,
            years:this.selectYear,
            dCount1:this.dCount1,
            dCount:this.dCount,
            dWCount:this.dWCount,
            productName:this.selectProduct,
            price:this.price,
            updata:true,
            orderID:this.$route.query.orderID,
            brandEnName:this.selectBrand}
          })
      }else{
        this.$router.push({
          name:'clientServerSteps',
          params:{
            funType:this.selectFunc,
            type:this.selectType,
            productCode:this.productCode,
            years:this.selectYear,
            dCount1:this.dCount1,
            dCount:this.dCount,
            dWCount:this.dWCount,
            productName:this.selectProduct,
            price:this.price,
            brandEnName:this.selectBrand}
          })
      }
      
    },
    dcoun1Change(value){
      this.dCount1 = value;
      this.calculatePrice();
    },
    dChange(value) {
      this.dCount = value;
      if (value + this.dWCount >= this.maxDomainCount) {
        this.$message({
          message: "不能超过最大域名数量" + this.maxDomainCount + "条",
          type: "warning"
        });
        this.$nextTick(() => {
          this.dCount = this.maxDomainCount - this.dWCount;
        });
      }else{
        this.calculatePrice();
      }
    },
    dWChange(value) {
      this.dWCount = value;
      if (value + this.dCount >= this.maxDomainCount) {
        this.$message({
          message: "不能超过最大域名数量" + this.maxDomainCount + "条",
          type: "warning"
        });
        this.$nextTick(() => {
          this.dWCount = this.maxDomainCount - this.dCount;
        });
      }else{
        this.calculatePrice();
      }
    },
    showDomainCount(productList,type,productName_ZH,func){
      for (let item of this[productList]) {
        if(item[type] === this.selectType && item[productName_ZH] === this.selectProduct) {
           this.maxDomainCount = item.maxDomainCount;
           if(item[func] === "多域名"){
             this.dMaxCount = item.maxDomainCount;
           }else if (item[func] === "多域名通配符") {
             if (this.selectBrand === 'GlobalSign' || this.selectBrand === 'Entrust') {
               this.dCount = 0;
               this.dWCount = 2;
             }else{
               this.dCount = 1;
               this.dWCount = 1;
             }
           } 
        }
      }
    }, 
    queryCategory(category, productList, name, selectCategory) {
      this[category] = [];
      for (var item of this[productList]) {
        if (this[category].indexOf(item[name]) < 0) {
          this[category].push(item[name]);
        }
      }
      // this[selectCategory] = this[category[0]];
    },
    queryCategoryOne(category, productList, name, selectJudge,judge) {
      this[category] = [];
      for (var item of this[productList]) {
        if(item[judge] === this[selectJudge]){
          if (this[category].indexOf(item[name]) < 0) {
            this[category].push(item[name]);
          }
        }
      }
    },
    queryCategoryTwo(category, productList, name, selectJudge,judge, selectJudge1,judge1) {
      this[category] = [];
      for (var item of this[productList]) {
        if(item[judge] === this[selectJudge] && item[judge1] === this[selectJudge1] ){
          if (this[category].indexOf(item[name]) < 0) {
            this[category].push(item[name]);
          }
        }
      }
    },
    queryYear(years, productList,func, type, productName_ZH,validityPeriod){
      this[years] = [];
      for (let item of this[productList]) {
        if(item[func] === this.selectFunc && item[type] === this.selectType && item[productName_ZH] === this.selectProduct){
          if(this[years].indexOf(item[validityPeriod]) < 0){
            this[years].push(item[validityPeriod])
          }
        }
      }
    },
    getProductId(){
      this.getBrandProductList(this.selectBrand);
      for (let item of this.productList) {
        if(item.validityPeriod === this.selectYear && item.productName_ZH === this.selectProduct){
          this.productID = item.productID
        }
      }
    },
    getProductCode(){
      this.getBrandProductList(this.selectBrand);
      for (let item of this.productList) {
        if(item.validityPeriod === this.selectYear && item.productName_ZH === this.selectProduct){
          this.productCode = item.productCode
        }
      }
    },
    calculatePrice(){
      this.getProductId();
      this.getProductCode();
      let postJson = {};
      postJson['orgID'] = this.orgID === "undefined" || this.orgID === '' ?"":this.orgID;
      postJson['productID'] = this.productID;
      postJson['funcName'] = this.selectFunc;
       if (this.selectFunc === '单域名') {
        postJson['SANsCount'] = 1
        postJson['wildcardSANsCount'] = 0
      }
       if (this.selectFunc === '通配符') {
        postJson['SANsCount'] = 0
        postJson['wildcardSANsCount'] = 0
      }
      if (this.selectFunc === '多域名') {
        postJson['SANsCount'] = this.dCount1
        postJson['wildcardSANsCount'] = 0
      }
      if (this.selectFunc === '多域名通配符') {
        postJson['SANsCount'] = this.dCount
        postJson['wildcardSANsCount'] = this.dWCount
      }
      this.$axios.post("/api/orderManage/productPrice",postJson).then(res => {
        let data = res.data;
        if (data.code === 0) {
          // console.log(postJson)
          this.price = data.data
        }else{
          this.$message({
            type:'error',
            message:data.desc
          })
        }
      })
    },
    getBrandProductList(brand) {
      for (var value of this.allData) {
        if (value.brand === brand) {
          this.productList = value.products;
        }
      }
    },
    brandClick(tab) {
      this.getBrandProductList(this.selectBrand);
      // console.log(this.productList)
      this.queryCategory('type', 'productList', "type", 'selectType');
      this.selectedType();
      this.filterType();

      this.queryCategoryOne('func', 'productList','func','selectType','type')
      this.selectedFunc();
      this.filterFunc();

      this.queryCategoryTwo('products', 'productList', 'productName_ZH', 'selectType', 'type', 'selectFunc', 'func')
      this.selectProduct = this.products[0];

      this.queryYear('years', 'productList','func', 'type', 'productName_ZH','validityPeriod')
      this.selectYear = this.years[0];
      this.filterYear();

      this.showDomainCount('productList','type','productName_ZH','func');

      this.calculatePrice();

    },
    typeClick(tab) {
      this.getBrandProductList(this.selectBrand);
      this.queryCategoryOne('func', 'productList','func','selectType','type')
      this.selectedFunc();
      this.filterFunc();

      this.queryCategoryTwo('products', 'productList', 'productName_ZH', 'selectType', 'type', 'selectFunc', 'func')
      this.selectProduct = this.products[0];

      this.queryYear('years', 'productList','func', 'type', 'productName_ZH','validityPeriod')
      this.selectYear = this.years[0];
      this.filterYear();

      this.showDomainCount('productList','type','productName_ZH','func');
      this.calculatePrice();

    },
    funcClick(tab) {
      this.getBrandProductList(this.selectBrand);

      this.queryCategoryOne('type', 'productList','type','selectFunc','func')
      this.selectedType();
      this.filterType();

      this.queryCategoryTwo('products', 'productList', 'productName_ZH', 'selectType', 'type', 'selectFunc', 'func')
      this.selectProduct = this.products[0];

     this.queryYear('years', 'productList','func', 'type', 'productName_ZH','validityPeriod')
      this.selectYear = this.years[0];
      this.filterYear();

      this.showDomainCount('productList','type','productName_ZH','func');
      this.calculatePrice();

    },
    productClick(tab) {
      this.queryYear('years', 'productList','func', 'type', 'productName_ZH','validityPeriod')
      this.showDomainCount('productList','type','productName_ZH','func');
      this.selectYear = this.years[0];
      this.filterYear();
      this.calculatePrice();
    },
    yearsClick(){
      this.calculatePrice();
    },
    selectCategory(category,arr,selectCategory){
      if(this[category].indexOf(this[selectCategory]) < 0){
        for (let i = 0; i < arr.length; i++) {
          if (this[category].indexOf(arr[i]) > -1) {
            this[selectCategory] = arr[i]
            return
          }  
        }
      }
    },
    selectedType(){
    //   let typrArr = ["OV", "EV"]
      let typrArr = ["EV", "OV"]
      this.selectCategory('type',typrArr,'selectType')
    },
    selectedFunc(){
      let funcArr = ["单域名", "多域名", "通配符", "多域名通配符"]
    //   let funcArr = ["多域名通配符", "通配符","多域名","单域名"]
      this.selectCategory('func',funcArr,'selectFunc')
    },
    filterCategory(arr1, arr2, category) {
      for (let i = 0; i < arr2.length; i++) {
        this[arr2[i]] = false;
      }
      for (var i = 0; i < arr1.length; i++) {
        if (category.indexOf(arr1[i]) < 0) {
          this[arr2[i]] = true;
        }
      }
    },
    filterType() {
      //过滤类型
      let arr1 = ["OV", "EV"];
      let arr2 = ["showOVNO", "showEVNO"];
    // let arr1 = ["EV", "OV"];
    //   let arr2 = ["showEVNO", "showOVNO"];
      this.filterCategory(arr1, arr2, this.type);
    },
    filterFunc() {
      //过滤功能
      let arr1 = ["单域名", "多域名", "通配符", "多域名通配符"];
      let arr2 = ["showSingNO", "showManyNO", "showWildNO", "showMWildNO"];
      this.filterCategory(arr1, arr2, this.func);
    },
    filterYear() {
      //过滤年限
      let arr1 = ["1年", "2年", "3年"];
      let arr2 = ["showOneNO", "showTwoNO", "showThreeNO"];
      this.filterCategory(arr1, arr2, this.years);
    }
  }
};
</script>

<style lang="scss" scoped>
.orderCert-wrapper {
  margin:12px 15px 0;
  height: calc(100% - 12px);
  .personal-title{
    height: 40px;
    line-height: 40px;
    padding-left:24px;
    background: rgba(0, 0, 0, 0.3);
    color:#fff; 
    img{
      padding-right:6px; 
    }
  }
  .orderCert-contain{
    padding-top: 10px;
    background-color:rgba(255, 255, 255, 0.95);
    height: 100%;
  }
  .place {
    .tit {
      display: inline-block;
      vertical-align: top;
      margin-top: 10px;
      padding-right: 5px;
      width: 100%;
      text-align: right;
      color: #555;
      font-weight: bold;
    }
    .el-tab-pane {
      font-size: 12px;
      margin-bottom: 10px;
    }
    .calculatePrice{
      font-size: 16px;
      color: #e6a23c;
      font-weight: 600;
      margin-top: 10px;
      display: inline-block;
    }
  }
  .dCount,
  .dMCount {
    margin-bottom: 15px;
  }
}
</style>
<style>
.orderCert-wrapper .el-tabs--card > .el-tabs__header {
  border-bottom: none;
  margin-bottom: 10px;
}
.orderCert-wrapper .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: 1px solid #e4e7ed;
  border-radius: 5px;
}
.orderCert-wrapper .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  border-bottom-color: #409eff;
}
.orderCert-wrapper .el-tabs--card > .el-tabs__header .el-tabs__item {
  height: 32px;
  line-height: 32px;
}
.orderCert-wrapper .el-tabs__content{
  overflow: initial;
}
.orderCert-wrapper .el-input--medium .el-input__inner{
 line-height: 36px;
 height: 36px;
}
</style>
