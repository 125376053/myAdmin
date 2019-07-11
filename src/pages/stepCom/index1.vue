<template>
    <div class="zuzhixinxi">
        组织信息
        <el-button @click="next">下一步</el-button>
    </div>
</template>
<script>
    export default{
        methods:{
            next(){
                console.log(this.$parent.active);
                console.log(this.$parent.stepArr);
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
