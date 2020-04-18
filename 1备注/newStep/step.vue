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
            <zuzhi :active.sync="active" :stepObj.sync="stepObj" ref="zuzhi"></zuzhi>
        </div>
        <div v-if="stepArr[active].title==='csr'">
            <csr :active.sync="active" :stepObj.sync="stepObj" ref="csr"></csr>
        </div>
        <div v-if="stepArr[active].title==='域名验证'">
            <yuming :active.sync="active" :stepObj.sync="stepObj" ref="yuming"></yuming>
        </div>
        <div v-if="stepArr[active].title==='联系人信息'">
            <ren :active.sync="active" :stepObj.sync="stepObj" ref="ren"></ren>
        </div>
        <div v-if="stepArr[active].title==='认证资料'">
            <ziliao :active.sync="active" :stepObj.sync="stepObj" ref="ziliao"></ziliao>
        </div>
        <div v-if="stepArr[active].title==='确认订单'">
            <order :active.sync="active" :stepObj.sync="stepObj" ref="order"></order>
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
        // 能捕捉到数据改变 但是不能修改数据 死循环
        /*updated(){
            console.log('更新生命周期');
            console.log(this.active, this.stepObj);
        },*/
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
        },
        mounted(){
            // 有可能是创建 从下单页来 a,b
            // 有可能是更新 从下单页来 a,b
            // 有可能是替换 从订单列表页来 e,f
            // 本页面数据c,d
            // 全部数据合并打包成一个对象 不同属性名字新增 相同属性名字替换新值
            // 不要query 就要本地缓存 获取a,b,e,f 从本地缓存拿
            // 刷新保留数据 点击导航清空缓存
            this.stepObj = this.$route.query

            // 合并ajax
            var ajax = {
                html:'vue',
                css:'sass',
                js:'webpack'
            }
            this.stepObj = {...this.stepObj,...ajax}
        }
    }
</script>
<style>

</style>
