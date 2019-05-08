/*
 * @Author: jiangyan 
 * @Date: 2018-12-21 20:12:16 
 * @Last Modified by: jiangyan
 * @Last Modified time: 2018-12-24 18:07:02
 */
<template>
    <div class="selectMode-wrapper" ref="selectModeWrapper">
        <el-tabs type="border-card" class="selectMode-contain">
          <el-tab-pane>
            <span slot="label">
              <!-- <i class="el-icon-date"></i> -->
              <div class="leftIco">
                <svg t="1545643970003" class="iconCenter" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1825" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20">
                <path d="M977.066667 290.133333v-4.266666-4.266667c-4.266667-8.533333-12.8-17.066667-21.333334-21.333333l-422.4-204.8c-12.8-4.266667-25.6-4.266667-38.4 0L59.733333 260.266667c-8.533333 8.533333-17.066667 17.066667-21.333333 25.6-4.266667 8.533333-4.266667 17.066667 0 25.6v443.733333c0 17.066667 8.533333 29.866667 25.6 38.4l430.933333 209.066667c4.266667 4.266667 12.8 4.266667 17.066667 4.266666s12.8 0 17.066667-4.266666l422.4-209.066667c12.8-8.533333 25.6-21.333333 25.6-38.4V311.466667c4.266667-8.533333 4.266667-12.8 0-21.333334zM512 123.733333L878.933333 298.666667 512 473.6 140.8 298.666667 512 123.733333zM106.666667 362.666667l366.933333 170.666666 4.266667 388.266667-371.2-183.466667V362.666667z m443.733333 554.666666l-4.266667-384 366.933334-174.933333v379.733333l-362.666667 179.2z" p-id="1826"></path></svg>
              </div>            
             集中管理模式
             </span>
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
            <span slot="label">
              <div class="rightIco">
                <svg t="1545643988206" class="iconDistri" style="" viewBox="0 0 1024 1024" version="1.1"  xmlns="http://www.w3.org/2000/svg" p-id="1968" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20">
                <path d="M721.93605 112.867515l-181.572475-105.244879a56.706943 56.706943 0 0 0-56.794647 0l-181.672709 105.244879a57.132935 57.132935 0 0 0-28.315884 49.490152v210.251705a56.957526 56.957526 0 0 0 28.340943 49.264627l181.484771 105.082a56.619239 56.619239 0 0 0 56.794647 0l181.672709-105.244879a57.471222 57.471222 0 0 0 28.478763-49.264627V162.132142a57.04523 57.04523 0 0 0-28.391059-49.264627z m-41.346202 252.124132l-168.830327 97.727388-168.79274-97.714859v-195.454776l168.918031-97.727388 168.742623 97.727388v195.454776zM448.762943 602.331379l-181.672709-105.244879a56.619239 56.619239 0 0 0-56.782118 0l-181.484771 105.244879A57.132935 57.132935 0 0 0 0.444815 651.771414v210.214118a57.095347 57.095347 0 0 0 28.391059 49.35233l181.484771 105.019355a56.631768 56.631768 0 0 0 56.782119 0l181.672708-105.244879a57.471222 57.471222 0 0 0 28.478763-49.264627V651.596006a57.220639 57.220639 0 0 0-28.478763-49.264627z m-41.220911 252.124132l-168.830328 97.727388-168.830327-97.727388v-195.454776l168.830327-97.727388 168.830328 97.727388v195.454776z m587.617243-252.124132l-181.735354-105.244879a56.619239 56.619239 0 0 0-56.869823 0l-181.484771 105.244879a57.132935 57.132935 0 0 0-28.391059 49.427506v210.226647a57.095347 57.095347 0 0 0 28.391059 49.35233l181.484771 104.94418a56.631768 56.631768 0 0 0 56.794648 0l181.672708-105.244879a57.471222 57.471222 0 0 0 28.478763-49.264627V651.596006a56.869822 56.869822 0 0 0-28.391059-49.264627h0.087704zM953.913305 854.455511l-168.918031 97.727388-168.742623-97.727388v-195.454776l168.830327-97.727388 168.918031 97.727388v195.454776H953.913305z" p-id="1969"></path></svg>
               </div>
               分布式管理模式</span>
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
                    <el-radio-group v-model="selected" @change="selectAreaFunc">
                      <el-radio-button :label="item" v-for="(item, index) in areaInfo" :key="index">{{item}}</el-radio-button>
                    </el-radio-group>
                  </div>
                </div>
              </div>
              <div class="centerBtn" @click="saveArea('DISTRIBUTED')">下一步</div>
            </div>
          </el-tab-pane>
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
      userID:""
    };
  },
  components: {},
  created() {
    //   this.show = !this.show
  },
  mounted() {
    // alert(JSON.parse(localStorage.getItem("areaInfo")).length)
    // this.areaInfo = JSON.parse(localStorage.getItem("areas"));
    this.userID = localStorage.getItem("userID");
  },
  methods: {
    selectAreaFunc(e){
      this.area = e;
    },
    addArea(areaName){
      if (areaName != '') {
        if (this.areaInfo.indexOf(areaName) < 0) {
          if (this.areaInfo.length < 5) {
            this.areaInfo.push(areaName);
            this.selected = this.areaInfo[this.areaInfo.length-1];
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
      this.$axios.post("/api/areaManage/selectManageType",{
        manageType:type,
        areaName:this.areaInfo,
        selectedAreaName:this.selected
      }).then(res => {
        let data = res.data;
        if (data.code === 0) {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("areaID", data.data.areaID);
          parent.document.querySelector(".uName").innerHTML=localStorage.userName;
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
    }
  }
};
</script>

<style lang="scss" >
.selectMode-wrapper {
  .selectMode-contain {
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
    .leftIco{
      display: inline-block;
      .iconCenter{
        fill:#909399;
        vertical-align: -3px;
      }
    }
    .rightIco{
      display: inline-block;
      .iconDistri{
        fill:#909399;
        vertical-align: -3px;
      }
    }
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
.selectMode-wrapper .el-tabs--border-card>.el-tabs__header .el-tabs__item{
  text-align: center;
  width: 51%;
  font-size:16px;
}
.selectMode-wrapper .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  background-color: #2c99de; 
  border-right-color: #2c99de;
  border-left-color: #2c99de;
  color: #fff;
  font-size:16px;
}
.selectMode-wrapper .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active .leftIco .iconCenter{
  fill: #fff
}
.selectMode-wrapper .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active .rightIco .iconDistri{
  fill: #fff
}
.selectMode-wrapper .el-tabs--border-card>.el-tabs__header{
  border-bottom: #2c99de 1px solid;
}
.selectMode-wrapper .el-tabs__nav{
  width:100%;
}
.selectMode-wrapper .el-tabs--border-card{
  border:none;
}
.selectMode-wrapper .el-radio-button, .el-radio-button__inner{
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
.selectMode-wrapper .el-input--medium .el-input__inner{
  border: none;
}
.selectMode-wrapper .el-radio-button__orig-radio:checked+.el-radio-button__inner{
 
}
</style>


