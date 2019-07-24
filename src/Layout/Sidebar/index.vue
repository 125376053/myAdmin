<template>
    <el-scrollbar wrapClass="scrollbar-wrapper" style="height: 100%">
        <el-menu
            mode="vertical"
            :show-timeout="300"
            :default-active="$route.path"
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
                collapse: true //水平浮动子菜单true  下拉子菜单false
            };
        },
        components: {
            SidebarItem
        },
        computed: {
            permission_routers(){
                return this.$router.options.routes
            }
        },
        mounted () {

        },
        methods: {
            handleOpen () {
                console.log('收起')
                console.log(key, keyPath);
            },
            handleClose () {
                console.log('关闭')
                console.log(key, keyPath);
            },
            handSelect(key, keyPath){
                console.log('选中')
                console.log(key, keyPath);
            }
        }
    };
</script>
<style>

</style>
