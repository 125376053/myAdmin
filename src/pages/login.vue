<template>
    <div class="loginWrap">
        <div style="width: 100%;height: 100px;background: #ccc;position: fixed;">123</div>
        <div style="height:100px;"></div>
        <div class="login" style="height: 4000px;">
            <el-button @click="login">登录</el-button>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                username:''
            }
        },
        methods:{
            login(){
                console.log(this.$store);

                this.$store.dispatch('getLogin',{
                    password: "zcj7416275",
                    userAccno: "125376053@qq.com"
                }).then(res=>{
                    this.$router.push({
                        path:'/'
                    })
                }).catch(err=>{
                    console.log(err);
                })
            }
        }
    }
</script>
<style>

</style>
