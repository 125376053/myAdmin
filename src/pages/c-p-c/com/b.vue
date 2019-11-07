<template>
    <div>
       b
        <button @click="next">下一步</button>
    </div>
</template>
<script>
    export default{
        data(){
            return{

            }
        },
        mounted(){

        },
        methods:{
            next(){
                this.$parent.active=3
            }
        }
    }
</script>
