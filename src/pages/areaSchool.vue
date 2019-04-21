<template>
    <div>
        <p style="height:50px;line-height: 50px;">区域学校管理</p>
        <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
            <el-tab-pane label="学校列表" name="0" area="1"></el-tab-pane>
            <el-tab-pane label="区域列表" name="1" area="44"></el-tab-pane>
        </el-tabs>

        <div class="top" v-if="!addFlag && !addFlag2">
            <select v-model="sheng" name="" style="width:150px;height:38px;border:1px solid #ddd;">
                <option>北京市</option>
                <option>天津市</option>
                <option>长沙市</option>
            </select>

            <select v-model="city" name="" style="width:150px;height:38px;border:1px solid #ddd;">
                <option>海淀区</option>
                <option>和平区</option>
                <option>岳麓区</option>
            </select>

            <select v-model="block" name="" style="width:150px;height:38px;border:1px solid #ddd;">
                <option>上地</option>
                <option>南开</option>
                <option>雷锋镇</option>
            </select>

            <el-input style="width:400px" placeholder="请输入关键字查询"></el-input>

            <el-button ref="search1" @click="search">查询</el-button>
        </div>

        <div style="text-align: right;margin:20px 0 10px;">
            <el-button v-if="tab<=0" @click="addFlag=true">添加学校</el-button>
            <el-button v-if="tab<=0">批量导入学校</el-button>
            <el-button v-if="tab>0" @click="addFlag2=true">添加区域</el-button>
        </div>

        <div class="footer" v-if="!addFlag && !addFlag2">
            <el-table :data="tabList" stripe height="350" style="overflow: auto;">
                <el-table-column prop="product_name" label="名称"></el-table-column>
                <el-table-column prop="id" label="类型"></el-table-column>
                <el-table-column prop="id" label="学校标识吗"></el-table-column>
                <el-table-column prop="id" label="所属区域"></el-table-column>
                <el-table-column prop="id" label="添加时间"></el-table-column>
                <el-table-column prop="id" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="look(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small" @click="edite(scope.$index)">编辑</el-button>
                        <el-button type="text" size="small" @click="remove(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination style="margin-top:10px;" :current-page.sync="pageNo" layout="prev, pager, next" :total="500"
                           @current-change="changePage">

            </el-pagination>
        </div>


        <el-dialog title="删除" :visible.sync="removeDialog" width="30%">
            <span>是否确认删除?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="removeDialog = false">取 消</el-button>
                <el-button type="primary" @click="remove2">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="编辑" :visible.sync="editeDialog" width="30%">
            <span>
                输入名称：
                <el-input v-model="editeText"></el-input>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editeDialog = false">取 消</el-button>
                <el-button type="primary" @click="edite2">确 定</el-button>
            </span>
        </el-dialog>


        <el-dialog title="查看" :visible.sync="lookDialog" width="30%">
            <span>
                {{obj}}
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="lookDialog = false">取 消</el-button>
                <el-button type="primary" @click="look2">确 定</el-button>
            </span>
        </el-dialog>

        <div class="addSchool" v-if="addFlag">
            <p style="line-height: 100px;">添加学校</p>

            <el-form ref="form" label-width="100px">
                <span style="float:left;margin-top:10px;">*</span>
                <el-form-item label="所属类型">
                    <span style="margin-top:10px;">学校</span>
                </el-form-item>
                <span style="float:left;margin-top:10px;">*</span>
                <el-form-item label="选择区域" style="display: inline-block;">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学校名称">
                    <el-input v-model="schoolName" style="width:500px;"></el-input>
                </el-form-item>
                <el-form-item label="学校标识码">
                    <el-input v-model="schoolMa" style="width:500px;"></el-input>
                </el-form-item>
                <el-form-item label="学校电话">
                    <el-input v-model="schoolTel" style="width:500px;"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="save">保存</el-button>
                </el-form-item>
            </el-form>

        </div>


        <div class="addSchool" v-if="addFlag2">
            <p style="line-height: 100px;">添加区域</p>

            <el-form ref="form" label-width="100px">
                <span style="float:left;margin-top:10px;">*</span>
                <el-form-item label="所属类型">
                    <span style="margin-top:10px;">学校</span>
                </el-form-item>
                <span style="float:left;margin-top:10px;">*</span>
                <el-form-item label="选择区域" style="display: inline-block;">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学校名称">
                    <el-input v-model="schoolName" style="width:500px;"></el-input>
                </el-form-item>
                <el-form-item label="学校标识码">
                    <el-input v-model="schoolMa" style="width:500px;"></el-input>
                </el-form-item>
                <el-form-item label="学校电话">
                    <el-input v-model="schoolTel" style="width:500px;"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="save2">保存</el-button>
                </el-form-item>
            </el-form>

        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeName: 0,
                cityInfo: '',
                tabList: [],
                pageNo: 1,
                tab: this.$route.query.tab || 0,
                page: this.$route.query.page || 1,
                page0: 1,
                page1: 1,
                area_id: this.$route.query.area_id || 1,
                sheng: this.$route.query.sheng || '',
                city: this.$route.query.city || '',
                block: this.$route.query.block || '',
                removeDialog: false,
                removeIndex: 0,
                editeDialog: false,
                editeText: '',
                lookDialog: false,
                obj: '',
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
                addFlag: false,
                addFlag2: false,
                schoolName: '',
                schoolMa: '',
                schoolTel: '',
                selected: '',
            }
        },
        methods: {
            search(){
                this.page = 1;
                this.pageNo = parseInt(this.page);
                //查询的时候 永远查询的是第一页 不应该从分页 的第四页开始查询
                console.log('page-----------' + this.page);
                console.log('tab-----------' + this.tab);
                console.log('sheng----------' + this.sheng);
                console.log('shi------------' + this.city);
                console.log('block----------' + this.block);

                this.$router.push({
                    path: '/areaSchool',
                    query: {
                        page: this.page,
                        tab: this.tab,
                        sheng: this.sheng,
                        city: this.city,
                        block: this.block
                    }
                })
            },
            handleClick(tab, event){

                this.addFlag = false;

                //省市县清空
                this.sheng = "";
                this.city = "";
                this.block = "";

                if (tab.index == 0) {
                    this.area_id = 1;
                    this.tab = 0;
                    this.page = this.page0;
                    this.pageNo = this.page0; //修改分页样式 标记当前第几页
                    this.activeName = '0';//修改tab样式 标记是哪个选中
                } else {
                    this.area_id = 44;
                    this.tab = 1;
                    this.page = this.page1;
                    this.pageNo = this.page1;
                    this.activeName = '1';
                }

                console.log('page================' + this.page)
                console.log('page0================' + this.page0)
                console.log('page1================' + this.page1)

                this.tableView({
                    area_id: this.area_id,
                    tab: this.tab,
                    //page:this.page,//这里为啥不传page1,page2
                    page: this.tab > 0 ? this.page2 : this.page1,
                    brand_id: '',
                    category_id: ''
                })

                this.$router.push({
                    path: '/areaSchool',
                    query: {
                        page: this.page,
                        tab: this.tab,
                        sheng: this.sheng,
                        city: this.city,
                        block: this.block
                        //area_id:this.area_id
                    }
                })

            },
            //请求数据 渲染表格
            tableView(obj){
                this.$http.get(this.baseUrl + '/api/production/list', {
                    //this.$http.get('/api/production/list', {
                    params: {
                        area_id: obj.area_id,
                        tab: obj.tab,
                        page: obj.page,
                        brand_id: '',
                        category_id: ''
                    }
                }).then((d) => {
                    this.tabList = d.data.data.data;

                    //不要设置路由 会执行2次

                })
            },

            changePage(page){

                //tab之间共享分页 要记录各自的分页 用this.tab表示tab索引来区别page是哪个
                this['page' + this.tab] = page;//===this.page0,this.page1

                console.log('page0:' + this.page0, 'page1:' + this.page1)

                this.tableView({
                    area_id: this.area_id,
                    tab: this.tab,
                    page: this['page' + this.tab],//tab=0 page0=1 ; tab=1 page1=1
                    brand_id: '',
                    category_id: ''
                })

                this.$router.replace({
                    path: '/areaSchool',
                    query: {
                        page: this['page' + this.tab],
                        tab: this.tab,
                        sheng: this.sheng,
                        city: this.city,
                        block: this.block
                        //area_id:this.area_id
                    }
                })
            },
            remove(index){
                this.removeIndex = index;
                this.removeDialog = true;
            },
            remove2(){
                this.tabList.splice(this.removeIndex, 1);
                this.removeDialog = false;
            },
            edite(index){
                this.removeIndex = index;
                this.editeText = this.tabList[index].product_name;
                this.editeDialog = true;
            },
            edite2(){
                console.log(this.editeText)
                this.tabList[this.removeIndex].product_name = this.editeText;
                this.editeDialog = false;
            },
            look(row){
                this.obj = row;
                this.lookDialog = true;
            },
            look2(){
                console.log(this.obj)
                this.lookDialog = false;
            },
            save(){
                let createSchool = {
                    product_name: this.value,
                    id: this.schoolName,
                    id: this.schoolTel,
                    id: this.schoolMa
                };
                this.addFlag = !this.addFlag;
                console.log(createSchool)
                this.tabList.unshift(createSchool);
            },
            save2(){
                let createSchool = {
                    product_name: this.value,
                    id: this.schoolName,
                    id: this.schoolTel,
                    id: this.schoolMa
                };
                this.addFlag2 = !this.addFlag2;
                console.log(createSchool)
                this.tabList.unshift(createSchool);
            }
        },
        mounted(){


        }
    }
</script>
<style>

</style>
