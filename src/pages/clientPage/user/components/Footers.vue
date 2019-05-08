<template>
    <div :class="$store.state.other.pageStyle=='login'?'footer':'registerFooter'">
        <div style="cursor:pointer">
            <span>使用条款 | </span>
            <a href="https://www.itrus.cn/product.html"><span>产品  | </span></a>
            <a href="https://www.itrus.cn/news.html"><span>新闻中心 |</span></a>
            <a href="https://www.itrus.cn/cooperation.html"> <span>商务合作  |  </span></a>
            <a href="javascript:volid(0)"><span>反馈建议  | </span></a>
            <a href="https://www.itrus.cn/about.html#004"><span>联系我们</span></a>
        </div>
        <div style="margin-top:14px;">2018 ©yunssl.com</div>
    </div>
</template>

<script>
export default {
    data(){
        return {}
    }
}
</script>

<style lang="scss" scoped>
.footer{
    padding-top: 30px;
    height: 200px;
    text-align: center;
    font-size: 14px;
    color:#aaa;
    width: 100%;
    // position: fixed;
    // bottom: 0;
    background: #ffffff;
}
.registerFooter{
    padding-top: 30px;
    height: 100px;
    text-align: center;
    font-size: 14px;
    color:#aaa;
    width: 100%;
    // position: fixed;
    // bottom: 0;
    background: #ffffff;
}
</style>

