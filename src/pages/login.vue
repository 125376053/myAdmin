<template>
    <div>
        <el-button @click="login">登录</el-button>
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
                    console.log(res);
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
