<template>
    <div class="page_header">
        <div class="data"  style="cursor: pointer;">

            <div class="selecte_data" @click="jilu">
                <i title="设置监控" class="table-icon el-icon-date" style="margin-top: 2px;"></i>
            </div>

            <div class="data_re" style="margin-left: 5px; font-size: 14px!important;">
                <div v-if="time.radio==1">
                    <p style="float:left;margin-right: 5px!important;">每月{{time.mounth}}号</p>
                    <p style="float:left;margin-right: 0!important;">{{time.h}}:{{time.m}}</p>
                </div>
                <div v-if="time.radio==2">

                    <p style="float:left;margin-right: 5px!important;">
                        每周
                        {{time.week}}
                    </p>
                    <p style="float:left;margin-right: 0!important;">{{time.h}}:{{time.m}}</p>
                </div>
                <div v-if="time.radio==3">
                    <p style="float:left;margin-right: 5px!important;">每日</p>
                    <p style="float:left;margin-right: 0!important;">{{time.h}}:{{time.m}}</p>
                </div>
            </div>

            <el-dialog
                style="margin-top: 25vh"
                title="设置时间" :visible.sync="isDataRender" :append-to-body="true" width="500px">

                <div class="content">
                    <el-radio size="mini" v-model="time1.radio" label="1">每月</el-radio>
                    <el-select size="mini" style="width: 100px;" v-model="time1.mounth" placeholder="请选择">
                        <el-option
                            v-for="item in 31"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                    <el-radio size="mini" v-model="time1.radio" label="2">每周</el-radio>
                    <el-select size="mini" style="width: 100px;" v-model="time1.week" placeholder="请选择">
                        <el-option
                            v-for="(item,index) in time1.weekArray"
                            :key="item.key"
                            :label="item.label"
                            :value="item.label">
                        </el-option>
                    </el-select>
                    <el-radio size="mini" v-model="time1.radio" label="3">每日</el-radio>
                    <div class="time" style="margin-top: 20px;">
                        <span>开始时间</span>
                        <el-select size="mini" style="width: 100px;" v-model="time1.h" placeholder="请选择">
                            <el-option
                                v-for="(item,index) in 24"
                                :key="index"
                                :label="index<10?'0'+index:index"
                                :value="index<10?'0'+index:index">
                            </el-option>
                        </el-select>
                        <span>:</span>
                        <el-select size="mini" style="width: 100px;" v-model="time1.m" placeholder="请选择">
                            <el-option
                                v-for="(item,index) in 60"
                                :key="item"
                                :label="index<10?'0'+index:index"
                                :value="index<10?'0'+index:index">
                            </el-option>
                        </el-select>
                    </div>
                </div>

                <div style="text-align: center;margin-top: 10px;">
                    <el-button size="mini" @click="enter">确认</el-button>
                </div>

            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                table: [],
                //设置日期
                isDataRender:false,

                time:{
                    radio: '2', //1 每月 2每周 3每日
                    mounth: '1', // 号
                    week:1, // 周
                    weekArray:[
                        {value:1,label:'一'},
                        {value:2,label:'二'},
                        {value:3,label:'三'},
                        {value:4,label:'四'},
                        {value:5,label:'五'},
                        {value:6,label:'六'},
                        {value:7,label:'日'}
                    ],
                    h:'01',
                    m:'00',
                },
                time1:{
                    xxx:'111111'
                }
            }
        },
        methods:{
            jilu(){
                this.isDataRender = true

                var obj = Object.assign({},this.time1,this.time)

                console.log(this.time1); // 原始对象没有改变 如果合并不传入{} 原始对象改变,输入框就切换不了
                console.log(this.time); // 原始对象没有发生改变
                console.log(obj);
                this.time1 = obj
                console.log(this.time1);

            },
            enter(){
                this.time = this.time1
                console.log(this.time1, this.time);

                this.isDataRender = false

            }
        }
    }
</script>
