<template>
    <div>
        <el-tabs v-model="current" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="1" v-if="show===1 || show===0">
                <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
                    <el-button type="text">1</el-button>
                </el-tooltip>

                <el-popover
                    placement="top-start"
                    title="标题"
                    width="100%"
                    trigger="hover"
                >
                    <el-table :data="gridData">
                        <el-table-column :render-header="viewHeader"  width="150" property="date" label="日期"></el-table-column>
                        <el-table-column width="100" property="name" label="姓名"></el-table-column>
                        <el-table-column width="300" property="address" label="地址"></el-table-column>
                    </el-table>
                    <el-button slot="reference">hover 激活</el-button>
                </el-popover>

            </el-tab-pane>
            <el-tab-pane label="配置管理" name="2" v-if="show===2 || show===0">
                <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
                    <el-button type="text">2</el-button>
                </el-tooltip>

                <el-dropdown @command="handleCommand">
                  <span class="el-dropdown-link">
                        <span>{{command}}</span>
                      <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">黄金糕</el-dropdown-item>
                        <el-dropdown-item command="b">狮子头</el-dropdown-item>
                        <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
                        <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
                        <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-tab-pane>
            <el-tab-pane label="角色管理" name="3" v-if="show===3 || show===0">
                <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
                    <el-button type="text">3</el-button>
                </el-tooltip>
            </el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="4" v-if="show===4 || show===0">
                <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
                    <el-button type="text">4</el-button>
                </el-tooltip>
            </el-tab-pane>
        </el-tabs>
    </div>

</template>
<script type="text/jsx">
    export default{
        data(){
            return {
                current: '1',
                show: 1, //默认显示几个 0全部显示 1显示1 2 2 3 3 4 4

                command:'下拉菜单2222',
                gridData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }]
            }
        },
        methods: {
            handleClick(tab, event){
                console.log(this.current)
            },
            handleCommand(command) {
                this.command=command;
                this.$message('click on item ' + command);
            },
            callBack(n){
                alert(n)
                this.command=n;
            },
            viewHeader(){
                return (
                    <div onClick={this.callBack.bind(this,1)}>
                        {this.command}
                    </div>
                )
            }
        },
        mounted(){
            // ajax数据返回 show=3
            let num = 0;
            this.show = num;
            this.current = num > 0 ? num.toString() : '1'
        },
        render(){
            return (
                <div>123123123</div>
            )
        }
    }
</script>
<style>

</style>
