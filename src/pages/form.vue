<template>
    <div>
        <el-radio @change.native="changeRadio(1,$event)" v-model="radio" label="1">111</el-radio>
        <el-radio @change.native="changeRadio(2,$event)" v-model="radio" label="2">2222</el-radio>
        <el-radio @change.native="changeRadio(3,$event)" :disabled="radio==1?true:false" v-model="radio" label="3">333</el-radio>

        <el-progress type="circle" :percentage="man" :show-text="true" :width="200" :stroke-width="10"></el-progress>

        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="请输入金额" prop="price">
                <el-input type="text" v-model="filterPrice" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    let maxPrice=500;
    let minPrice=100;
    let i = "<i class='el-icon-delete'></i>"
    let priceFn = (rule, value, callback) => {
        console.log( value);
        if (value === '') {
            callback(new Error('输入金额不能为空'));
        }else if(value>maxPrice){
            callback(new Error(`输入金额不能大于${maxPrice}`));
        } else if(value<minPrice){
            callback(new Error(`输入金额不能小于${minPrice}`));
        }else {
            callback();
        }
    };
    export default{
        data(){
            return{
                radio:'1',
                man:100,

                ruleForm2: {
                    price:''
                },
                rules2: {
                    price: [
                        { validator: priceFn, trigger: 'blur' }
                    ]
                }
            }
        },
        computed:{

            filterPrice:{
                get: function () {
                    return this.ruleForm2.price; //获取的时候直接获取值
                },
                set: function (value) {
                    var pattern = /(?=((?!\b)\d{3})+$)/g;
                    this.ruleForm2.price= value.replace(pattern, ',');
                }
            }
        },
        methods:{
            changeRadio(e,event){
                console.log(e,event);
            },
            jianjian(){
                setInterval(()=>{
                    if(this.man>0){
                        this.man--
                    }
                    this.man=this.man;
                },30)
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        this.$nextTick(()=>{
                            let err=document.querySelector('.el-form-item__error');
                            let html=err.innerHTML;
                            err.innerHTML=i+html;
                            i='';
                        })

                        return false;
                    }
                });
            },
        },
        mounted(){
            this.jianjian()
        }
    }
</script>
<style>
    .el-form-item__error{

    }
</style>
