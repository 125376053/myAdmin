<template>
    <div class="response">

    </div>
</template>
<script>
    import { productList, areaList } from "../../src/api/order"
    export default{
        data(){
            return {

            }
        },
        mounted(){
            productList({
                password: "zcj7416275",
                userAccno: "125376053@qq.com"
            }).then(res=>{
                console.log(res)
                window.sessionStorage.setItem('token',res.data.data.token)
            })

            areaList({

            }).then(res=>{
                console.log(res);
            })
        }
    }
</script>
<style>
    /*
    1500px 200px 13.3%  1vw =1%

    w 200px
    h 200px

    */
    .response{
        width: 13.3vw;
        height: 13.3vw;
        background: red;
    }
</style>
