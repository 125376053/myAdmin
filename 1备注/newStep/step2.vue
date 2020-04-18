<template>
    <div class="stepContent">
        <el-steps :active="active">
            <el-step
                v-for="(item,index) in stepArr"
                :title="item.title"
                :icon="item.icon"
                :key="index"
            ></el-step>
        </el-steps>

        {{JSON.stringify(stepObj)}}
        <div v-if="stepArr[active].title==='组织信息'">
            <zuzhi :active.sync="active" :stepObj="stepObj" @stepObj="getStepObj" ref="zuzhi"></zuzhi>
        </div>
        <div v-if="stepArr[active].title==='csr'">
            <csr :active.sync="active" :stepObj="stepObj" @stepObj="getStepObj" ref="csr"></csr>
        </div>
        <div v-if="stepArr[active].title==='域名验证'">
            <yuming :active.sync="active" :stepObj="stepObj" @stepObj="getStepObj" ref="yuming"></yuming>
        </div>
        <div v-if="stepArr[active].title==='联系人信息'">
            <ren :active.sync="active" :stepObj="stepObj" @stepObj="getStepObj" ref="ren"></ren>
        </div>
        <div v-if="stepArr[active].title==='认证资料'">
            <ziliao :active.sync="active" :stepObj="stepObj" @stepObj="getStepObj" ref="ziliao"></ziliao>
        </div>
        <div v-if="stepArr[active].title==='确认订单'">
            <order :active.sync="active" :stepObj="stepObj" @stepObj="getStepObj" ref="order"></order>
        </div>
    </div>
</template>
<script>
    import zuzhi from "./index1.vue"
    import csr from "./index2.vue"
    import yuming from "./index3.vue"
    import ren from "./index4.vue"
    import ziliao from "./index5.vue"
    import order from "./index6.vue"
    export default{
        components:{
            zuzhi,
            csr,
            yuming,
            ren,
            ziliao,
            order
        },
        watch:{
            active(a,b){
                console.log('watch active')
                console.log(a, b);
            },
            // 同步更新的 只能监控 不能在修改数据 死循环
            stepObj:{
                handler(a,b){
                    console.log('watch stepObj')
                    console.log(a, b);
                },
                deep:true
            }
        },
        methods:{
            // 非同步更新检测 不但可以查看数据还可以 修改数据
            getStepObj(data){
                console.log(data);
                this.stepObj = data
            }
        },
        data(){
            return{
                active:0,
                stepArr:[
                    {
                        title:'组织信息',
                        icon:'el-icon-refresh'
                    },
                    {
                        title:'csr',
                        icon:'el-icon-edit'
                    },
                    {
                        title:'域名验证',
                        icon:'el-icon-picture'
                    },
                    {
                        title:'联系人信息',
                        icon:'el-icon-delete'
                    },
                    {
                        title:'认证资料',
                        icon:'el-icon-upload'
                    },
                    {
                        title:'确认订单',
                        icon:'el-icon-edit'
                    }
                ],
                stepObj:{}
            }
        }
    }
</script>
<style>

</style>
