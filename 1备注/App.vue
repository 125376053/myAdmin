<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    import router from "@/router"
    export default{
        name: "App",
        mounted(){
            if (this.$store.getters.brand && this.$store.getters.brand.length>0) {
                for (const route of router.options.routes) {
                    //console.log(route);
                    if (route.path == '/quickOrderServer') {
                        //console.log(route);
                        route.hidden = false
                        let authData = route.children;
                        //console.log(authData);
                        // var aaa = ['MSSL','MPKI']
                        for (let index = 0; index < authData.length; index++) {
                            if (this.$store.getters.brand.indexOf(authData[index].meta.brandEnName) >= 0) {
                                //console.log(111,authData[index]);
                                authData[index].hidden = false
                            }
                        }
                    }
                }
            }
        },
        watch: {
            $route(a, b){
                var body = document.querySelector('body')
                var ele = document.createElement('script')
                ele.id = "qd28521397290fb697e6fd9534e476da486bbe307324"
                ele.src = "https://wp.qiye.qq.com/qidian/2852139729/0fb697e6fd9534e476da486bbe307324"
                if (a.meta.title == '引导首页') {
                    body.appendChild(ele)
                } else {
                    // 切换路由隐藏界面 刷新不创建
                    var iframe = document.querySelectorAll('iframe')
                    for (var i = 0; i < iframe.length; i++) {
                        iframe[i].style.display = "none"
                    }
                }
            }
        }
    }
</script>
<style>

</style>
