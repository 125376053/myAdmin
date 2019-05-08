<template>
    <div class="selectArea-wrapper" ref="selecAreaWrapper">
        <el-tabs type="border-card" class="selectArea-contain">
          <div class="distributed" >
              <div>
                <div>
                  <el-input placeholder="请输入内容" v-model="area" style="width:234px;border:1px solid #2c99de;border-radius:3px;">
                    <el-button slot="append" @click="addArea(area)">添加区域</el-button>
                  </el-input>
                </div>
                <div :style="{visibility: areaInfo.length > 0 ? 'visible': 'hidden'}">
                  <p style="width:234px;text-align:left;margin-top:10px;">选择已有区域并登陆：</p>
                  <div style="height:160px;">
                    <el-radio-group v-model="selected" @change="selectAreaFunc">
                      <!-- <el-radio-button :label="index" v-for="(item, index) in areaInfo" :key="index">{{item.areaName}}</el-radio-button> -->
                      <el-radio-button :label="item.areaName" v-for="(item, index) in areaInfo" :key="index">{{item.areaName}}</el-radio-button>
                    </el-radio-group>
                  </div>
                </div>
              </div>
              <div class="centerBtn" @click="saveArea('DISTRIBUTED')">下一步</div>
            </div>
          <!-- <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i> 集中管理模式</span>
            <div class="centralized">
              <p>集中管理模式适合应用于：</p>
              <p>通过公共网络扫描您的服务器。依赖公网DNS以域名方式，或直接以公网IP方式对服务器发起 https服务监控扫描。</p>
              <p>通过内部网络监控扫描您的https服务器。您的CIM客户端与您接受监测的https服务站点处于同一内部网络中。</p>
              <div>
                <div class="centerBtn" @click="saveArea('CENTRALIZATION')">下一步</div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane style="">
            <span slot="label"><i class="el-icon-date"></i> 分布式管理模式</span>
            <div class="distributed">
              <p>分布式管理模式适用于监测多个网络或数据隔离的数据中心中的https服务站点。</p>
              <div>
                <div>
                  <el-input placeholder="请输入内容" v-model="area" style="width:234px;border:1px solid #2c99de;border-radius:3px;">
                    <el-button slot="append" @click="addArea(area)">添加区域</el-button>
                  </el-input>
                </div>
                <div :style="{visibility: areaInfo.length > 0 ? 'visible': 'hidden'}">
                  <p style="width:234px;text-align:left;margin-top:10px;">选择已有区域并登陆：</p>
                  <div style="height:160px;">
                    <el-radio-group v-model="selected">
                      <el-radio-button :label="index" v-for="(item, index) in areaInfo" :key="index">{{item}}</el-radio-button>
                    </el-radio-group>
                  </div>
                </div>
              </div>
              <div class="centerBtn" @click="saveArea('DISTRIBUTED')">下一步</div>
            </div>
          </el-tab-pane> -->
        </el-tabs>
    </div>
</template>

<script>
export default {
  name: "selectMode",
  data() {
    return {
      activeName: "first",
      selected:"",
      area:"",
      areaInfo:[],
      userID:"",
      areaNameArr:[]
    };
  },
  components: {},
  created() {},
  mounted() {
    // alert(JSON.parse(localStorage.getItem("areaInfo")).length)
    this.areaInfo = JSON.parse(localStorage.getItem("areas"));
    this.userID = localStorage.getItem("userID");
    this._getAreaList();
  },
  methods: {
    _getAreaList(){
      let psotJson = {};
      psotJson["userID"] = this.userID;
      postMessage["condition"] = ""
      postMessage["requestPage"] = 1
      postMessage["pageCount"] = 5
      this.$axios.post("/api/areaManage/areaList",psotJson).then(res => {
        let data = res.data;
        if (data.code === 0) {
          // console.log(data)
          this.areaInfo = data.data.areas;
          this.selected = this.areaInfo[0].areaName
        }else{
          this.$message({
            type:"error",
            message:data.desc
          })
        }
      })
    },
    selectAreaFunc(e){
      this.area = e;
    },
    addArea(areaName){
      for(let item = 0;item < this.areaInfo.length; item++){
        this.areaNameArr.push(this.areaInfo[item].areaName)
      }
      if (areaName != '') {
          if (this.areaNameArr.indexOf(areaName) < 0) {
            if (this.areaInfo.length < 5) {
              this.areaInfo.push({"areaName":areaName});
              this.areaNameArr.push(areaName);
              this.selected = this.areaInfo[this.areaInfo.length-1].areaName;
            }else{
              this.$message({
                type:"error",
                message:"添加个数不能超过5个！"
              })
            }
          }else{
            this.$message({
              type:"error",
              message:"区域名不能重复！"
            })
          }
      }
    },
    saveArea(type){
      // debugger
      for(let item = 0;item < this.areaInfo.length; item++){
        if (this.areaNameArr.indexOf(this.areaInfo[item].areaName) < 0) {
          this.areaNameArr.push(this.areaInfo[item].areaName)
        }
      }
      if(this.selected != ''){
        this.$axios.post("/api/areaManage/selectManageType",{
          manageType:type,
          areaName:this.areaNameArr,
          selectedAreaName:this.selected
        }).then(res => {
          let data = res.data;
          if (data.code === 0) {
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("areaID", data.data.areaID);
            parent.document.querySelector(".uName").innerHTML=localStorage.userName
            parent.document.querySelector("#loginInit").style.display='none';
            parent.document.querySelector("#userInfo").style.display='inline-block'; 
            location.href = "/__itrus5/home.html?flag=login";
          }else{
            this.$message({
              type:"error",
              message:data.desc
            })
          }
        })
      }else{
        this.$message({
          type:"error",
          message:"请选择机房"
        })
      }
      
    }
  }
};
</script>

<style lang="scss" >
.selectArea-wrapper {
  .selectArea-contain {
    position: absolute;
    width: 650px;
    height: 360px;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    margin:auto;
    border-radius: 4px;
    background-color: rgba($color: #fff, $alpha: 0.9);
    // box-shadow: 0 0 10px #888;
    transition: all 0.4 linear;
    .centralized{
      padding: 0 15px;
      p{
        line-height: 30px;
      }
      .centerBtn{
        text-align: center;
        color: #fff;
        background-color: #2c99de;
        width: 286px;
        height: 32px;
        line-height: 32px;
        margin: 0 auto;
        margin-top: 60px;
        cursor: pointer;
      }
    }
    .distributed{
      width: 100%;
      text-align: center;
      margin-top: 36px;
      p{
        color: #666;
        width: 100%;
        margin: 0 auto 10px;
      }
      .centerBtn{
        text-align: center;
        color: #fff;
        background-color: #2c99de;
        width: 286px;
        height: 32px;
        line-height: 32px;
        margin: 0 auto;
        margin-top: 8px;
        cursor: pointer;
      }
    }
    &.screw-enter-active,
    .screw-leave-active {
      opacity: 0;
    }
    &.screw-enter,
    .screw-leave-to {
      opacity: 0;
    }
  }

}
</style>
<style>
.selectArea-wrapper .el-tabs--border-card>.el-tabs__header .el-tabs__item{
  text-align: center;
  width: 51%;
  font-size:16px;
}
.selectArea-wrapper .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  background-color: #2c99de; 
  border-right-color: #2c99de;
  border-left-color: #2c99de;
  color: #fff;
  font-size:16px;
}
.selectArea-wrapper .el-tabs--border-card>.el-tabs__header{
  border-bottom: #2c99de 1px solid;
}
.selectArea-wrapper .el-tabs__nav{
  width:100%;
}
.selectArea-wrapper .el-tabs--border-card{
  border:none;
}
.selectArea-wrapper .el-radio-button, .el-radio-button__inner{
  display: block;
  background-color:transparent;
}
.el-radio-button--medium .el-radio-button__inner{
  width: 234px;
  height: 22px;
  line-height: 22px;
  margin-bottom:10px;
  border:1px solid #2c99de;
  padding: 0;
  border-radius: 3px;
}
.el-radio-button__inner{

}
.el-input-group__append, .el-input-group__prepend{
  padding: 0 5px;
  font-size: 12px;
  color: #fff;
  background-color: #2c99de;
  border:none;
  left:1px;
}
.el-radio-button:first-child .el-radio-button__inner{
  border-radius: 0;
   border: 1px solid #2c99de;
}
.selectArea-wrapper .el-input--medium .el-input__inner{
  border: none;
}
.selectArea-wrapper .el-radio-button__orig-radio:checked+.el-radio-button__inner{
 
}
</style>


