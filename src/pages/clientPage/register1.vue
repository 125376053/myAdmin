<template>
    <div class="register1-wrapper">
        <div class="contain">
          <div class="title">账户激活</div>
            <div style="line-height:30px;margin-top:20px;">您登录证书智能管理系统的用户名为 <span>{{this.$route.params.email}}</span>。您可以使用此用户名查询和管理所有使用该邮箱注册的天威诚信SSL证书产品。</div>
             <el-button type="primary" @click="openLink">登录邮箱激活</el-button>
            <div class="count-down"><span v-show="isCountDowm">{{countTime}}秒之后重新发送激活邮件</span><span class="red" v-show="!isCountDowm" @click="sendEmailFunc">重新发送</span>　账户激活邮件已发送到您的邮箱，邮件有效期为24小时！</div>
        </div>
    </div>
</template>

<script>
export default {
  name: "register1",
  data() {
    return {
      isCountDowm: true,
      countTime: 180,
      paramsEmail: "",
      userID: ""
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {
    console.log(this.$route)
    console.log(this.$route.params)
    this.userID = this.$route.params.userID;
    this.countDown();
  },
  methods: {
    countDown() {
      this.countTime = 180;
      this.isCountDowm = true;
      let timer = setInterval(() => {
        if (this.countTime) {
          this.countTime--;
        } else {
          this.isCountDowm = false;
          clearInterval(timer);
        }
      }, 1000);
    },
    sendEmailFunc() {
      this.countDown();
      this.$axios.post("/api/register/emailActivity", {userID:this.userID}).then(res => {
          let data = res.data
          if(data.code === 0){
              this.$message("邮件发送成功");
          }
      })
    },
    openLink() {
      // console.log("ssss:")
      // console.log(this.$route.params)
      this.paramsEmail = this.$route.params.email.split("@")[1];
      // console.log(this.paramsEmail);
      // window.open("http://mail." + this.paramsEmail);
      var sendJson = {};
      sendJson["cmd"] = "systemConfig";
      sendJson["method"] = "openUrlByDefaultBrower";
      sendJson["url"] = "http://mail." + this.paramsEmail;
      parent.sendDataTread(sendJson);
    }
  }
};
</script>

<style lang="scss" scoped>
.register1-wrapper {
  margin:10px;
  height: calc(100% - 20px);
  background-color: #fff;
  .title {
    line-height: 20px;
    font-weight: bold;
    text-align: center;
    font-size: 18px;
  }
  .contain {
    width: 800px;
    height: 300px;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin: auto;
    border: 1px solid #eee;
    text-align: center;
    line-height: 56px;
    padding: 48px 20px;
    .count-down {
      color: #999;
      font-size: 12px;
      .red {
        color: #f56c6c;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>

