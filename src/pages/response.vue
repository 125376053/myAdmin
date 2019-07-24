<template>
    <div>
        <router-link to="/response/responseIndex2/090900511/zhangchaojie">动态路由</router-link>

        <el-row :gutter="20" type="flex" justify="center" align="center">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple"></div></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple"></div></el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light"></div></el-col>
        </el-row>

        <el-row :gutter="20" type="flex" justify="center" align="center" style="margin: 20px 0">
            <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
        </el-row>

        <el-row :gutter="20" style="margin: 20px 0">
            <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="4" :offset="4"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="4" :offset="4"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
        </el-row>

        <el-row :gutter="20" style="margin: 20px 0">
            <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="2" push="1"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="4" offset="4" pull="2"><div class="grid-content bg-purple-light"></div></el-col>
        </el-row>

    </div>
</template>
<script>
    export default{

    }
</script>
<style>
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
</style>
