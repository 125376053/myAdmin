<template>
    <div>
        A
        <button @click="next">下一步</button>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                obj:''
            }
        },
        mounted(){
            this.obj={
                name:'zhangsan',
                age:28,
                adress:'shangxi'
            }
        },
        methods:{
            next(){
                this.$parent.active=2
                this.$emit('obj',this.obj)
            }
        }
    }
</script>
