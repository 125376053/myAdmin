<template>
    <div>
        <!--1 倒计时调用-->
        <div style="background: red;width: 120px;height: 30px; cursor: pointer;" ref="noResetTimeBtn" @click="getYan">获取验证码</div>

        <div>{{name | changeHanZi('衣服','价格') }}</div>

        <input type="text" v-limit="140">
        <p>140</p>

    </div>
</template>
<script>
    export default{
        data(){
            return {
                name:'1,2'
            }
        },
        mounted(){
            // 3 倒计时调用
            if(this.getCookie('captcha')){
                this.noResetTime('noResetTimeBtn','captcha');
            }
        },
        methods:{
            getYan(){
                // 2 倒计时调用
                this.noResetTime('noResetTimeBtn','captcha');
            }
        }
    }
</script>
<style>
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
</style>
