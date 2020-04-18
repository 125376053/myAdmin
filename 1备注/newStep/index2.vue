<template>
    <div class="zuzhixinxi">
        csr
        {{JSON.stringify(stepObj)}}

        输入框的值{{stepObj.text}}

        <el-button @click="next">下一步</el-button>
        <el-button @click="prev">上一步</el-button>
    </div>
</template>
<script>

    export default{
        props:['active','stepObj'],
        data(){
            return{
                two:{
                    age:25,
                    name:'zhangchaojie2',
                    adress:'beijing'
                }
            }
        },
        methods:{
            next(){
                console.log(2);
                console.log(this.active, this.stepObj);

                this.$emit('update:active',this.active+1)
                //this.$emit('stepObj',{...this.stepObj,...this.two}) // 正确
                this.$emit('update:stepObj',{...this.stepObj,...this.two}) // 正确
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
