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
                var infor = {
                    name:'zhangsna',
                    age:48,
                    adress:'北京'
                }
                infor=JSON.stringify(infor)
                window.localStorage.setItem('infor',infor)
                //window.opener.close();
                console.log(window.opener.document)
                console.log(window.opener.document.querySelector("#loginName"))
            }
        }
    }
</script>
<style>

</style>
