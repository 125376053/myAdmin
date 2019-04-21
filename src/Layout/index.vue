<template>
    <el-container>
        <el-header height="50px" class="headerTop">
            <HeaderTop></HeaderTop>
        </el-header>

        <el-aside width="200px" class="leftNav">
            <Slidebar></Slidebar>
        </el-aside>

        <el-main class="contentMain">
            <appMain></appMain>
        </el-main>
    </el-container>
</template>
<script>
    import HeaderTop  from "./Header/index.vue"
    import Slidebar  from "./Sidebar/index.vue"
    import appMain from "./appMain/index.vue"
    export default{
        data() {
            return {}
        },
        components: {
            HeaderTop,
            Slidebar,
            appMain
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }

</script>
<style scoped>

</style>
