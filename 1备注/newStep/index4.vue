<template>
    <div class="zuzhixinxi">
        联系人信息
        <el-button @click="prev">上一步</el-button>
    </div>
</template>
<script>
    export default{
        props:['active','stepObj'],
        data(){
            return{

            }
        },
        methods:{
            prev(){
                console.log(this.stepObj);
                this.$emit('update:active',this.active-1)
            }
        }
    }
</script>
<style>

</style>
