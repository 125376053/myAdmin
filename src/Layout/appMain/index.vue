<template>
    <section
        class="app-main"
        v-loading="$store.state.global.loadingStatus"
        style="height:calc(100% - 40px)"
    >
        <NavBar></NavBar>
        <!--<transition name="fade" mode="out-in">
            <el-scrollbar style="height:calc(100% - 20px)"></el-scrollbar>
        </transition>-->
        <!--keep-alive 只缓存从别的页面进来的数据 刷新的不会缓存-->
       <!--<keep-alive></keep-alive>-->
        <router-view></router-view>

    </section>
</template>
<script>
    import NavBar from "./Navbar.vue"
    export default{
        components:{
            NavBar
        }
    }
</script>
<style>

</style>
