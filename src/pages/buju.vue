<template>
    <div>
        <p style="height:50px;line-height: 50px;">区域学校管理</p>
        <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
            <el-tab-pane label="学校列表" name="1" area="1">


                <el-input style="width:400px" placeholder="请输入关键字查询"></el-input>

                <el-button>查询</el-button>

                <div style="text-align: right">
                    <el-button>添加区域</el-button>
                </div>

                <el-table :data="tabList" stripe height="600" style="overflow: auto;">
                    <el-table-column prop="product_name" label="名称"></el-table-column>
                    <el-table-column prop="id" label="类型"></el-table-column>
                    <el-table-column prop="id" label="学校标识吗"></el-table-column>
                    <el-table-column prop="id" label="所属区域"></el-table-column>
                    <el-table-column prop="id" label="添加时间"></el-table-column>
                    <el-table-column prop="id" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small">编辑</el-button>
                            <el-button type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination layout="prev, pager, next" :total="500" @current-change="changePage"></el-pagination>

            </el-tab-pane>

            <el-tab-pane label="区域列表" name="2" area="44">



                <el-input style="width:400px" placeholder="请输入关键字查询"></el-input>

                <el-button>查询</el-button>

                <div style="text-align: right">
                    <el-button>添加区域</el-button>
                </div>

                <el-table :data="tabList" stripe height="600" style="overflow: auto;">
                    <el-table-column prop="product_name" label="名称"></el-table-column>
                    <el-table-column prop="id" label="类型"></el-table-column>
                    <el-table-column prop="id" label="学校标识吗"></el-table-column>
                    <el-table-column prop="id" label="所属区域"></el-table-column>
                    <el-table-column prop="id" label="添加时间"></el-table-column>
                    <el-table-column prop="id" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small">编辑</el-button>
                            <el-button type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination layout="prev, pager, next" :total="100" @current-change="changePage"></el-pagination>

            </el-tab-pane>

        </el-tabs>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeName:'1',
                cityInfo: '',
                tabList:[],
                tab:this.$route.query.tab||1,
                page1:1,
                page2:1,
                area_id:this.$route.query.area_id||1, //默认城市
            }
        },
        methods: {
            handleClick(tab, event){
                if(tab.index==0){
                    this.area_id=1;
                    this.tab=1;
                }else{
                    this.area_id=44;
                    this.tab=2;
                }
                //切换修改城市id和页码
                console.log(this['page'+this.tab])
                this.tableView(this['page'+this.tab],this.area_id,this.tab);
                this.$router.push({
                    path:'/areaSchool',
                    query:{
                        page:this['page'+this.tab],
                        tab:this.tab,
                        area_id:this.area_id
                    }
                })
            },
            //请求数据 渲染表格
            tableView(page,area_id,tab){
                this.$http.get(this.baseUrl + '/api/production/list', {
                    params: {
                        area_id:area_id,
                        tab:tab,
                        page: page,//页码
                        brand_id:'', //品牌id
                        category_id:'' //分类id
                    }
                }).then((d) => {
                    this.tabList=d.data.data.data;
                    console.log(this.tabList)
                })
            },

            changePage(page){
                this['page'+this.tab]=page;
                this.tableView(this['page'+this.tab],this.area_id,this.tab);
                this.$router.push({
                    path:'/areaSchool',
                    query:{
                        page:this['page'+this.tab],
                        tab:this.tab,
                        area_id:this.area_id
                    }
                })
            }

        },
        mounted(){
            this.tableView(this.page,this.area_id,this.tab);
        }
    }
</script>
<style>

</style>
