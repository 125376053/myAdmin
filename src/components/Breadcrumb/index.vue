<template>
    <div style="height: 50px;">
        <el-breadcrumb class="app-breadcrumb" separator="/">
            <transition-group name="breadcrumb">
                <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title">
                    <!--最后一级没有跳转  有可能的条件item.redirect==='noredirect'||-->
                    <span v-if="index==levelList.length-1" class="no-redirect">
                    {{item.meta.title}}
                </span>
                    <router-link v-else :to="item.redirect||item.path">
                        {{item.meta.title}}
                    </router-link>
                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        created() {
            this.getBreadcrumb()
        },
        data() {
            return {
                levelList: null
            }
        },
        watch: {
            $route() {
                this.getBreadcrumb()
            }
        },
        methods: {
            getBreadcrumb() {
                let matched = this.$route.matched.filter(item=>{
                    //console.log(item);
                    return item.name
                })
                //console.log(this.$route.matched)
                //console.log(matched);
                /*const first = matched[0]
                  if (first && first.name !== 'dashboard') {
                    matched = [{
                        path: '/dashboard',
                        meta: {
                            title: 'Dashboard'
                        }
                    }].concat(matched)
                  }*/
                this.levelList = matched
                //console.log(this.levelList)
            }
        }
    }
</script>

<style rel="stylesheet/scss" scoped>
    .app-breadcrumb.el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        line-height: 50px;
        margin-left: 10px;
    }

    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
</style>
