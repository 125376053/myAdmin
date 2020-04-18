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
            <zuzhi :stepArrLength="stepArr.length" ref="zuzhi"></zuzhi>
        </div>
        <div v-if="stepArr[active].title==='csr'">
            <csr :stepArrLength="stepArr.length" ref="csr"></csr>
        </div>
        <div v-if="stepArr[active].title==='域名验证'">
            <yuming :stepArrLength="stepArr.length" ref="yuming"></yuming>
        </div>
        <div v-if="stepArr[active].title==='联系人信息'">
            <ren :stepArrLength="stepArr.length" ref="ren"></ren>
        </div>
        <div v-if="stepArr[active].title==='认证资料'">
            <ziliao :stepArrLength="stepArr.length" ref="ziliao"></ziliao>
        </div>
        <div v-if="stepArr[active].title==='确认订单'">
            <order :stepArrLength="stepArr.length" ref="order"></order>
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
        computed:{
            active(){
                return this.$store.getters.active
            }
        },
        data(){
            return{
                //active:0,
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
                ],
                detail:{}
            }
        },
        // 离开页面---清楚缓存 刷新不是离开
        beforeRouteLeave (to, from, next) {
            //window.localStorage.removeItem('step')
            this.$store.dispatch('active',0)
            next()
        }
    }
</script>
<style>

</style>
