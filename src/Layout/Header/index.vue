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
    var workwinQuickOder = null
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
        },
        methods:{
            loginMessage(){
                ixindev.winMessage({
                    name:"HomeWin",
                    param:"hello frome work",
                    onSuccess: function(response) {},
                    onFailure: function(error_code, error_message) {
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
