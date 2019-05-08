<template>
    <div class="header draggable">
        <el-row>
            <el-col>
                <span class="nondraggable">用户管理系统</span>
                <span v-if="!infor" id="loginName" class="nondraggable" @click="loginMessage">未登录123</span>
                <span class="nondraggable" v-if="infor">
                    {{infor.name}}{{infor.adress}}
                </span>
                <span class="nondraggable" v-if="infor" @click="tuichu">退出</span>
                <!--退出 或者关闭时清空用户信息-->

            </el-col>
        </el-row>
    </div>
</template>
<script>
    window.workwinQuickOder = null
    export default{
        data(){
            return{
                infor:JSON.parse(window.localStorage.getItem('infor'))||''
            }
        },
        mounted(){
            // storage监听 既然监听就必须有调用 就算缓存有变动 不调用依然执行不了
            // infor数据驱动 打开页面自动查找缓存 缓存如果从没有变成有 就触发了 监听函数
            window.addEventListener("storage", (e) =>{
                alert('缓存有变动'+e.newValue);
                this.infor = JSON.parse(window.localStorage.getItem('infor'))
            });

            //跨域缓存
            // 子窗口 postMessage 发送登录infor, 父窗口message监听 infor 存入localstore

        },
        // 可以访问和修改数据 不会触发死循环
        beforeUpdate(){
            // this.infor =
            console.log(window.localStorage.getItem('infor'))
            console.log('333333333333333333');
            console.log('444444444444444444');
        },
        // 只有数据进行渲染后才会触发 不能修改数据(死循环) 可以操作dom
        updated(){
            // 也就是数据绑定后才能触发
            console.log('))))))))))');
            console.log(this.infor);
            console.log('))))))))))');
        },
        methods:{
            loginMessage(){
                ixindev.winMessage({
                    name:"HomeWin",
                    param:"hello frome work",
                    onSuccess: function(response) {},
                    onFailure: function(error_code, error_message) {
                        alert(workwinQuickOder)
                        if(error_code==2120){
                            if(workwinQuickOder == null){
                                workwinQuickOder =  ixindev.open('#/login',"","resizable=1, dialog=no,left=20,top=20,width=960,height=600");
                            }else{
                                if (!workwinQuickOder || workwinQuickOder.closed) {
                                    workwinQuickOder = null;
                                    return;
                                }
                                workwinQuickOder.postMessage({ name: "pass" }, "*");
                            }
                        }else{
                            alert(error_code+" : "+error_message);
                        }
                    }
                });
            },
            tuichu(){
                this.infor = ''
                window.localStorage.removeItem('infor')
            }
        }
    }
</script>
<style>

</style>
