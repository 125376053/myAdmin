<template>
    <div class="editPrsonalInfoPri-wrapper">
       <p>您的账户已注册为企业用户，但尚未完成企业验证。当您使用该企业信息完成OV/EV类型证书首单签发后，即可完成企业验证，启用更多企业用户高级功能。</p>
       <p>您的账户已注册为个人用户，适合批量申请和管理DV证书产品。注册成为企业用户可极速签发OV/EV类型证书，并启用更多企业用户高级功能。</p>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item>
                <el-row :gutter="8">
                  <el-col :span="8">
                    <el-input placeholder="请输入姓氏" v-model="form.surname">
                        <template slot="prepend">姓：</template>
                    </el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-input placeholder="请输入名字" v-model="form.name">
                            <template slot="prepend">名：</template>
                        </el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-col :span="16">
                    <el-input placeholder="请输入邮箱" v-model="form.emial">
                        <template slot="prepend">邮箱：</template>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-col :span="16" >
                    <el-input placeholder="请输入企业名称" v-model="form.company">
                        <template slot="prepend">企业名称：</template>
                    </el-input>
                </el-col>
                <el-col :span="8" style="padding-left:8px;">
                    <el-tooltip class="item" effect="dark" content="转换为企业用户" placement="right">
                        <el-button type="success" icon="el-icon-check" circle></el-button>
                    </el-tooltip>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-row :gutter="8">
                    <el-col :span="8">
                        <el-input placeholder="请输入职务" v-model="form.job">
                            <template slot="prepend">职务：</template>
                        </el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-input placeholder="请输入手机号" v-model="form.moible">
                            <template slot="prepend">手机：</template>
                        </el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-tooltip class="item" effect="dark" content="修改号码" placement="right">
                            <el-button type="success" icon="el-icon-check" circle></el-button>
                        </el-tooltip>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-col :span="16">
                    <el-input placeholder="请输入部门名称" v-model="form.department">
                        <template slot="prepend">部门名称</template>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-row :gutter="8">
                    <el-col :span="8">
                        <el-input placeholder="请输入组织电话" v-model="form.organ">
                            <template slot="prepend">组织电话</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <div class="el-input-tit">国家</div>
                        <el-select class="select-country" v-model="select" placeholder="请选择国家">
                            <el-option label="中国" value="1"></el-option>
                            <el-option label="美国" value="2"></el-option>
                            <el-option label="英国" value="3"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-row :gutter="8">
                    <el-col :span="8">
                        <el-input placeholder="请输入省份" v-model="form.prpvince">
                            <template slot="prepend">省份：</template>
                        </el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-input placeholder="请输入城市" v-model="form.city">
                            <template slot="prepend">城市：</template>
                        </el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-col :span="16">
                    <el-input placeholder="请输入地址" v-model="form.address">
                        <template slot="prepend">地址：</template>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
                <el-button>跳过</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  name: "editPrsonalInfoPri",
  data() {
    return {
      select: "",
      form: {
        surname: "",
        name: "",
        emial: "",
        company: "",
        job: "",
        moible: "",
        department: "",
        organ: "",
        country: "",
        prpvince: "",
        city: "",
        address: ""
      }
    };
  },
  mounted() {

  },
  computed: {},
  methods: {
    onSubmit() {
        throw new Error("system is reset");
    }
  }
};
</script>
<style lang="scss" scoped>
.editPrsonalInfoPri-wrapper {
  .personal-content {
    .col {
      height: 36px;
    }
  }
}
.el-input-tit {
  background-color: #f5f7fa;
  color: #909399;
  vertical-align: middle;
  display: table-cell;
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0 20px;
  width: 1px;
  white-space: nowrap;
  line-height: 34px;
  left: 2px;
}
.select-country {
  display: table-cell;
}
</style>
<style>
.select-country .el-input--medium .el-input__inner {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>

