<template>
    <div class="zuzhixinxi">
        组织信息

        <el-radio-group v-model="$parent.radio">
            <el-radio :label="1">企业</el-radio>
            <el-radio :label="2">组织</el-radio>
        </el-radio-group>

        <p v-if="$parent.radio=='1'">
            企业信息
        </p>
        <p v-if="$parent.radio=='2'">
            组织信息
        </p>

        <el-button @click="prev">上一步</el-button>
        <el-button @click="next">下一步</el-button>
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
            prev(){
                if(this.$parent.active >0){
                    this.$parent.active--
                    window.sessionStorage.setItem('active',this.$parent.active)
                }
            },
            next(){
                if(this.$parent.active < this.$parent.stepArr.length-1){
                    alert(this.$parent.radio)
                    this.$parent.active++
                    window.sessionStorage.setItem('active',this.$parent.active)
                }
            }
        },
        watch:{
            '$parent.radio'(a){
                console.log(a);
                if(a==1){
                    this.$parent.detail='企业信息'
                }else{
                    this.$parent.detail='组织信息'
                }
                console.log(this.$parent.detail);
            }
        },
    }
</script>
<style>

</style>
