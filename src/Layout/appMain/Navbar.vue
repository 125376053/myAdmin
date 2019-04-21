<template>
    <el-menu class="navbar" mode="horizontal">
        <div>
            <!--<breadcrumb></breadcrumb>-->
            <topBar></topBar>
        </div>
    </el-menu>
</template>

<script>
    // import Breadcrumb from '@/components/Breadcrumb'
    import topBar from '@/components/topBar'
    export default {
        components: {
            topBar,
            //Breadcrumb,
        }
    }
</script>

<style scoped>
    .navbar {
        height: 50px;
        line-height: 50px;
        border-radius: 0px !important;
    }
</style>
