<template>
    <!--<el-container style="height: calc(100% - 0px); border: 1px solid red">-->
        <!--<el-header>11111111111111</el-header>-->
        <!--设置100%内滚动 不设置窗口滚动-->
        <el-container style="height: 100%;">
            <!--el-container采用flex布局-->
            <!--aside设置宽度后 左侧自适应-->
            <el-aside width="200px" style="background-color: rgb(238, 241, 246); overflow: auto;">

            </el-aside>
            <el-main style="background: green; overflow: auto;">
                <div style="display: flex;">
                    <el-input :inline="true" placeholder="请输入内容"></el-input>
                    <el-button>123</el-button>
                </div>

                <div style="display: flex;">
                    <el-input placeholder="请输入内容" style="width: 200px;"></el-input>
                    <el-button>123</el-button>
                </div>

                <div style="display:flex;">
                    <el-button>左对齐</el-button>
                    <el-button>右对齐</el-button>
                    <el-button>顶部对齐</el-button>
                </div>

                <!--<el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
                    <el-radio-button label="top">top</el-radio-button>
                    <el-radio-button label="right">right</el-radio-button>
                    <el-radio-button label="bottom">bottom</el-radio-button>
                    <el-radio-button label="left">left</el-radio-button>
                </el-radio-group>-->

                <el-tabs :tab-position="tabPosition" style="height: 200px;">
                    <el-tab-pane label="用户管理">1111111111</el-tab-pane>
                    <el-tab-pane label="配置管理">2222222222</el-tab-pane>
                    <el-tab-pane label="角色管理">33333333333</el-tab-pane>
                    <el-tab-pane label="定时任务补偿">444444444</el-tab-pane>
                </el-tabs>

            </el-main>
        </el-container>
       <!-- <el-footer>
            11111111111111111111111
        </el-footer>-->
    <!--</el-container>-->
</template>
<script>
    export default{
        data(){
            return{
                labelPosition: 'right',
                tabPosition:'top',
                test:0
            }
        },
        methods:{
            /*haha(){
                setTimeout(()=>{
                    this.test=1
                },2000)
            },
            hehe(){
                console.log(this.test);
            }*/
        },
        async mounted(){
            //await this.haha()
            //await this.hehe()

        }
    }
</script>
<style>
    .el-button{ margin: 0!important; border-radius: 0; outline: none; border: 0;}
</style>
