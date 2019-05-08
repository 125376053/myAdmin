<template>
    <div class="wrapper" ref="loginWrapper">
      <top-bar></top-bar>
      <router-view :class="$store.state.other.pageStyle=='login'?'backgrounds':'registerBg'"></router-view>
      <footers></footers>
    </div>
</template>

<script>
// import { change } from "@/utils/bgTransform.js";
import TopBar from "./components/TopBar";
import footers from "@/views/user/components/Footers";

export default {
  name: "register",
  data() {
      var validatePass = (rule,value,callback) => {
          if (value !== "admin") {
              callback(new Error("请输入正确的用户名!"));
          } else {
              callback();
          }
      };
    return {
        show: false,
        loginForm:{
            userName:'',
            pass:'',
            volid:''
        },
        centerDialogVisible:true,
        rules:{
            userName: [
                { validator: validatePass, trigger: 'blur' }
            ],
            pass: [
                { validator: '', trigger: 'blur' }
            ]
        }
    };
  },
  components: {
    TopBar,
    footers
  },
  created() {
    //   this.show = !this.show
  },
  mounted() {
    this.show = !this.show
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
           // this.$router.push({path: '/register'});
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
  }
};
</script>

<style lang="scss" >
.wrapper { 
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #ccc;
}
</style>

