<template>
    <div class="zuzhixinxi">
        csr
        <el-button @click="prev">上一步</el-button>
        <el-button @click="next">下一步</el-button>
    </div>
</template>
<script>
    export default{
        methods:{
            prev(){
                if(this.$parent.active >=0){
                    this.$parent.active--
                    window.sessionStorage.setItem('active',this.$parent.active)
                }
            },
            next(){
                if(this.$parent.active < this.$parent.stepArr.length-1){
                    this.$parent.active++
                    window.sessionStorage.setItem('active',this.$parent.active)
                }
            }
        }
    }
</script>
<style>

</style>
