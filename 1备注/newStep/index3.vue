<template>
    <div class="zuzhixinxi">
        域名验证
        <el-button @click="next">下一步</el-button>
        <el-button @click="prev">上一步</el-button>
        {{JSON.stringify(stepObj)}}
    </div>
</template>
<script>
    export default{
        props:['active','stepObj'],
        data(){
            return{
                three:{
                    price:200,
                    domain:'qq.com'
                }
            }
        },
        methods:{
            next(){
                console.log(3);
                console.log(this.active, this.stepObj);
                this.$emit('update:active',this.active+1)
                //this.$emit('stepObj',{...this.stepObj,...this.three})
                this.$emit('update:stepObj',{...this.stepObj,...this.three})
            },
            prev(){
                console.log(this.stepObj);
                this.$emit('update:active',this.active-1)
            }
        }
    }
</script>
<style>

</style>
