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

        <div v-if="stepArr[active].title==='组织信息'">
            <zuzhi></zuzhi>
        </div>
        <div v-if="stepArr[active].title==='csr'">
            <csr></csr>
        </div>
        <div v-if="stepArr[active].title==='域名验证'">
            <yuming></yuming>
        </div>
        <div v-if="stepArr[active].title==='联系人信息'">
            联系人信息
        </div>
        <div v-if="stepArr[active].title==='认证资料'">
            认证资料
        </div>
        <div v-if="stepArr[active].title==='确认订单'">
            确定订单
        </div>
    </div>
</template>
<script>
    import zuzhi from "./stepCom/index1.vue"
    import csr from "./stepCom/index2.vue"
    import yuming from "./stepCom/index3.vue"
    export default{
        components:{
            zuzhi,
            csr,
            yuming
        },
        data(){
            return{
                active:parseInt(window.sessionStorage.getItem('active'))||0,
                // 默认状态6种
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
                ]
            }
        },
        // 离开页面---清楚缓存 刷新不是离开
        beforeRouteLeave (to, from, next) {
            window.sessionStorage.removeItem('active')
            next()
        },
        mounted(){
            // 每次更新stepArr时候 重置active
            this.stepArr=[
                {
                    title:'组织信息',
                    icon:'el-icon-refresh'
                },
                {
                    title:'csr',
                    icon:'el-icon-edit'
                },
            ]
        }
    }
</script>
<style>

</style>
