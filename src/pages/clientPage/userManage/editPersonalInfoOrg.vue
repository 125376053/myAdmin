<template>
    <div class="editPrsonalInfoOrg-wrapper">
        <p>您的账户已注册为企业用户，已认证的企业用户不可自行修改验证的企业信息，且不可变更用户注册类型。如果您需要变更注册类型，您需要首先从企业脱离。</p>
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
  name: "editPrsonalInfoOrg",
  data() {
    return {
      select: "",
      form: {
        surname: "",
        name: "",
        emial: "",
        job: "",
        moible: "",
        department: "",
        address: ""
      }
    };
  },
  mounted() {},
  computed: {},
  methods: {
    onSubmit() {}
  }
};
</script>
<style lang="scss" scoped>
.editPrsonalInfo-wrapper {
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

