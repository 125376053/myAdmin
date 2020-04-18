<template>
    <div>
        {{JSON.stringify($route.query)}}
        <button @click="xiadan">下单</button>
    </div>
</template>
<script>
    export default{
        data(){
            return{

            }
        },
        methods:{
            xiadan(){
                // create
                if(JSON.stringify(this.$route.query) == '{}'){
                    this.$router.push({
                        path:'/newStep/newStepIndex',
                        query:{
                            name:'1',
                            age:2,
                            brand:'mssl',
                            price:100,
                            domain:'www.baidu.com'
                        }
                    })
                }else{
                    this.$router.push({
                        path:'/newStep/newStepIndex',
                        query:{
                            ...this.$route.query
                        }
                    })
                }
            }
        }
    }
</script>
<style>

</style>
