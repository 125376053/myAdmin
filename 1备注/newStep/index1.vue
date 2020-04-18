<template>
    <div class="zuzhixinxi">
        组织信息
        {{JSON.stringify(stepObj)}}

        <el-input type="text" v-model="first.text" />

        <el-button @click="next">下一步123</el-button>
        <el-button @click="prev">上一步</el-button>
    </div>
</template>
<script>
    export default{
        props:['active','stepObj'],
        data(){
            return{
                first:{
                    text:''
                }
            }
        },
        methods:{
            next(){
                this.$emit('update:active',this.active+1)
                // this.$emit('stepObj',{...this.stepObj,...first}) // 非同步更新
                this.$emit('update:stepObj',{...this.stepObj,...this.first}) // 同步更新

                // Object.assign() 用法 要能在watch监控的写法
                // this.$emit('update:stepObj',Object.assign({},this.stepObj,this.first))
                // this.$emit('update:stepObj',Object.assign(this.stepObj,first)) // 错误原始对象已经发生了改变，切断了监控 watch不起作用了
            },
            prev(){
                console.log(this.stepObj);
                this.$router.push({
                    path:'/newStep/1',
                    // 修改以后的数据参数 这里有选择的写入参数 不可整体写入 太多了
                    query:{
                        ...this.stepObj
                    }
                })
            }
        }
    }
</script>
<style>

</style>
