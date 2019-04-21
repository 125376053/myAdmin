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
