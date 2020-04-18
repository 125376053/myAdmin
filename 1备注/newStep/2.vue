<template>
    <div>
        <button @click="replace">替换</button>
        <button @click="update">更新</button>
    </div>
</template>
<script>
    export default{
        methods:{
            replace(){

                this.$router.push({
                    path:'/newStep/newStepIndex',
                    query:{
                        name:'张超杰',
                        age:30
                    }
                })

            },
            update(){

                this.$router.push({
                    path:'/newStep/1',
                    query:{
                        name:'111',
                        age:2222,
                        brand:'mpki',
                        price:500,
                        domain:'www.baidu2.com'
                    }
                })

            }
        }
    }
</script>
<style>

</style>
