<template>
    <el-scrollbar wrapClass="scrollbar-wrapper" style="height: 100%">
        <el-menu
            mode="vertical"
            :show-timeout="300"
            :default-active="currentRoute"
            background-color="#222333"
            text-color="rgba(255,255,255,0.6)"
            :unique-opened="true"
            active-text-color="#e9524b"
            :collapse="collapse"
            @open="handleOpen"
            @close="handleClose"
            menu-trigger="click"
            @select="handSelect"
        >
            <sidebar-item :collapse="collapse" :routes="permission_routers"></sidebar-item>
        </el-menu>
    </el-scrollbar>
</template>

<script>
    import SidebarItem from "./SidebarItem";
    export default {
        data () {
            return {
                effectiveRouteArr: [],
                collapse: false //水平浮动子菜单true  下拉子菜单false
            };
        },
        components: {
            SidebarItem
        },
        computed: {
            permission_routers(){
                return this.$router.options.routes
            },
            currentRoute() {
                const matchedRouteArr = this.$route.matched
                for (let i = matchedRouteArr.length - 1; i >= 0; i--) {
                    const matchedRoutePath = this.effectiveRouteArr.filter(el => el === this.$route.path)[0]
                    //  && !this.$route.query.serverPointer
                    if (matchedRouteArr[i].meta.sidebarPointer) {
                        return matchedRouteArr[i].meta.sidebarPointer
                    } else if (matchedRoutePath) {
                        return matchedRoutePath
                    } else{
                        // 特殊情况路由对应处理----多个子路由共用一个页面的时候
                        // console.log(this.$route.query.serverPointer)
                        //return this.$route.query.serverPointer
                    }
                }
            }
        },
        mounted () {
            this.effectiveRouteArr = this.initRouteArr()
        },
        methods: {
            initRouteArr() {
                const routerArr = []
                for (const route of this.$router.options.routes) {
                    if (route.hidden === true) {
                        continue
                    } else if (route.children && route.children.length > 0) {
                        route.children.forEach(child => {
                            child.hidden ? null : routerArr.push(`${route.path}/${child.path}`)
                        })
                    }
                }
                return routerArr
            },
            handleOpen () {
                console.log('收起')
            },
            handleClose () {
                console.log('关闭')
            },
            handSelect(key, keyPath){
                console.log('选中')
            }
        }
    };
</script>
<style>

</style>
