<template>
    <div class="myCert-wrapper">
        <div class="head">
          <div class="head-item">
             <el-button type="danger" @click="showAddPop">添加用户</el-button>
          </div>
          <div class="head-item">
              <el-input placeholder="请输入搜索关键字" prefix-icon="el-icon-search" v-model="searchKey" @keyup.enter.native="search(searchKey)"></el-input>
          </div>
        </div>
        <div class="data-table">
          <el-checkbox v-model="checked" style="margin-bottom:15px;" @change="filterUser(checked)">仅显示已启用用户</el-checkbox>
          <el-table
            :data="datalist"
            border
            @sort-change="sort"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="姓名"
              width="150"
              sortable="custom">
              <template slot-scope="scope">{{ scope.row.userLastName }} {{scope.row.userFirstName}}</template>
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱"
              width=""
              sortable="custom">
              <template slot-scope="scope">{{ scope.row.email }}</template>
            </el-table-column>
            <el-table-column
              prop="groupName"
              label="用户组"
              width=""
              sortable="custom">
              <template slot-scope="scope">{{ scope.row.groupName }}</template>
            </el-table-column>
            <el-table-column
              prop="role"
              label="角色"
              width=""
              sortable="custom">
              <template slot-scope="scope">{{ oprateList[scope.row.role] }}</template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              width="120"
              sortable="custom">
              <template slot-scope="scope">{{statusList[scope.row.status]}}</template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="150">
              <template slot-scope="scope" class="oprateBtn">
                <el-button @click="editUser(scope.row.userID)" type="text" size="small" v-show="scope.row.status != 'TIMEOUT'">编辑</el-button>
                <el-button @click="sendEmial(scope.row.userID)" type="text" size="small" :disabled="isSend?true:false" v-show="scope.row.status == 'TIMEOUT'">邮件提醒</el-button>
                <el-button type="text" size="small" :disabled="scope.row.userID === userID?true:false" @click="remove(scope.row.userID)">移除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page-wrapper">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" 
            :current-page="currentpage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalcount">
          </el-pagination>
        </div>
        <div class="editDialog">
            <el-dialog title="编辑用户" width="600px" :visible.sync="dialogFormVisible" >
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="name">
                  <el-input size="medium" v-model="fullName" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input size="samll" v-model="ruleForm.email" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户组" prop="groupName">
                  <el-select v-model="ruleForm.groupName" placeholder="请选择所在用户组"  @change="clearItem">
                    <el-option label="" value=""></el-option>
                    <el-option v-for="item in gourpList" :key="item.groupID" :label="item.groupName" :value="item.groupID"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="用户角色" prop="resource">
                  <el-radio-group v-model="ruleForm.role">
                    <el-radio label="ADMIN">企业管理员</el-radio>
                    <el-radio label="OPERATOR">企业用户</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="用户已禁用" prop="isDisabled" >
                  <el-switch v-model="isDisabled" :disabled="(ruleForm.status === 'SUSPEND' || ruleForm.status === 'NORMAL') &&  ruleForm.userID !== userID? false : true"></el-switch>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureModify">确定</el-button>
              </div>
          </el-dialog>
        </div>
        <div class="addUserDialog">
            <el-dialog title="添加用户" width="600px" :visible.sync="addUserDialog" >
              <el-form :model="addUserForm" :rules="rules" ref="addUserForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户邮箱" prop="email">
                  <el-input size="samll" v-model="addUserForm.email" placeholder="请输入用户邮箱" ></el-input>
                </el-form-item>
                 <el-form-item label="确认邮箱" prop="checkEmail">
                  <el-input size="samll" v-model="addUserForm.checkEmail"  placeholder="请再次输入用户邮箱" ></el-input>
                </el-form-item>
                <el-form-item label="用户角色" prop="role">
                  <el-radio-group v-model="addUserForm.role">
                    <el-radio label="ADMIN">企业管理员</el-radio>
                    <el-radio label="OPERATOR">企业用户</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="用户组" prop="groupName">
                  <el-select v-model="addUserForm.groupName" :disabled="addUserForm.role === 'ADMIN'?true:false" placeholder="请选择所在用户组" @change="clearItem">
                    <el-option label="" value=""></el-option>
                    <el-option v-for="item in gourpList" :key="item.groupID" :label="item.groupName" :value="item.groupID"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div class="tips">
                <div>温馨提示</div>
                <div>1.完成用户添加后，系统将给您添加的用户发送验证邮件。新用户完成邮件验证后，即可成功加入企业，协同管理企业下的证书。</div>
                <div>2.用户验证邮件有效期为7天，您可联系添加的用户，提醒其尽快完成验证。如果您添加的用户未能在7天内成功验证，您需要尝试重新添加该用户。</div>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addUserDialog = false">取 消</el-button>
                <el-button type="primary" @click="addUser('addUserForm')">确定</el-button>
              </div>
          </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
  name: "accountManage",
  data: function() {
    var validateEmail2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入用户邮箱"));
      } else if (value !== this.addUserForm.email) {
        callback(new Error("两次输入邮箱不一致!"));
      } else {
        callback();
      }
    };
    return {
      currentpage: 1,
      pagesize: 5,
      datalist: [],
      totalcount: 0,
      searchKey: "",
      multipleSelection: [],
      activeName: "onlineCert",
      dialogFormVisible: false,
      addUserDialog: false,
      checked: false,
      userID: "",
      isDisabled: false,
      isSend:false,
      gourpList:[],
      ruleForm: {
        userID: "",
        groupID:"",
        userLastName: "",
        userFirstName: "",
        email: "",
        groupName: "",
        role: "",
        status: ""
      },
      addUserForm: {
        email: "",
        checkEmail: "",
        groupName: "",
        role: ""
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱", trigger: "blur" }
        ],
        checkEmail: [
          { validator: validateEmail2, required: true, trigger: "blur" }
        ],
        groupName:[{ message: "请选择用户组", trigger: "blur" }],
        role:[{ required: true, message: "请选择用户角色", trigger: "blur" }]
      },
      formLabelWidth: "120px",
      statusList: {
        'UNKNOWN': "未知",
        'UNACTIVATED': "未激活",
        'INCOMPLETE': "未补全",
        'SUSPEND': "停用",
        'NORMAL': "正常",
        'TIMEOUT': "激活邮件超时"
      },
      oprateList: {
        'ADMIN': "企业管理员",
        'OPERATOR': "企业用户"
      },
    };
  },
  mounted() {
    this.showCharts = false;
    this.userID = localStorage.getItem("userID");
    // alert(this.userID)
    this._getDataList();
  },
  computed: {
    fullName() {
      return this.ruleForm.userLastName + this.ruleForm.userFirstName;
    }
  },
  methods: {
    _getDataList(data = {}) {
      //获取用户数据列表
      this.$axios
        .post("/api/userManage/list", {
          condition: !data.condition?'':data.condition,
          validDisplay: !data.validDisplay?false:data.validDisplay,
          requestPage: this.currentpage,
          pageCount: this.pagesize
        })
        .then(res => {
          let data = res.data;
          if (data.code === 0) {
            // console.log(this.userID);
            // console.log(data);
            this.datalist = data.data.users;
            this.totalcount = data.data.total;
          }else{
            this.$message({
              type:'error',
              message:data.desc
            })
          }
        });
    },
    _getGoupName(){
      this.$axios.get("/api/common/getGroupList").then(res => {
        let data = res.data;
        if (data.code === 0) {
          this.gourpList = data.data;
        }else{
          this.$message({
            type:'danger',
            message:data.desc
          })
        }
      })
    },
    toggleCharts() {
      this.showCharts = !this.showCharts;
    },
    handleSizeChange(val) {
      this.pagesize = val;
       this._getDataList();
    },
    handleCurrentChange(val) {
      this.currentpage = val;
       this._getDataList();
    },
    clearItem(item){
      this.ruleForm.groupID = item
    },
    sort() {},
    search(searchKey) {
      //搜索
      this._getDataList({ condition: searchKey });
    },
    sendEmial(userID){
      this.$axios.post("/api/userManage/sendVerifyEmail",{userID:userID}).then(res => {
        let data = res.data;
        if (data.code === 0) {
          console.log(data)
          this.$message({
            type:'success',
            message:'成功发送，请耐心等待！'
          })
          this.isSend = true
        }else{
          this.$message({
            type:'danger',
            message:'成功失败，请重新发送！'
          })
          this.isSend = true
        }
      })
    },
    remove(userID) {
      this.$confirm("删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/api/userManage/delete", { userID: userID })
            .then(res => {
              let data = res.data;
              if (data.code === 0) {
                this._getDataList({});
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
                this.$message({
                  type: "danger",
                  message: data.desc
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    filterUser(checked) {
      //显示已启用用户
      if (checked) {
        this._getDataList({ validDisplay: true });
      } else {
        this._getDataList({ validDisplay: false });
      }
    },
    toggleOperate(userID, name, index) {
      //用户启用或者禁用
      let url = "";
      if (name === "启用") {
        url = "/api/userManage/start";
      } else {
        url = "/api/userManage/stop";
      }
      this.$axios.post(url, { userID: userID }).then(res => {
        let data = res.data;
        console.log(data);
        if (data.code === 0) {
          if (name === "启用") {
            this.datalist[index].role = "禁用";
          } else {
            this.datalist[index].role = "启用";
          }
        } else {
          this.$notify({
            title: "提示",
            message: data.desc,
            type: "success"
          });
        }
      });
    },
    showAddPop(){
       this._getGoupName();
      this.addUserDialog = true;
    },
    editUser(userID) {
      //编辑用户
      this._getGoupName();
      this.$axios
        .post("/api/userManage/detail", { userID: userID })
        .then(res => {
          let data = res.data;
          if (data.code === 0) {
            this.ruleForm = data.data;
            console.log(this.ruleForm)
            if (this.ruleForm.status === "SUSPEND") {
              this.isDisabled = true;
            } else if (this.ruleForm.status === "NORMAL") {
              this.isDisabled = false;
            } else {
              this.isDisabled = false;
            }
          }
        });
      this.dialogFormVisible = true;
    },
    sureModify() {
      let postJson = {};
      postJson["userID"] = this.ruleForm.userID;
      postJson["groupID"] = this.ruleForm.groupID;
      postJson["role"] = this.ruleForm.role;
      postJson["disabled"] = this.isDisabled;
      console.log("postJson")
      console.log(postJson)
      this.$axios
        .post("/api/userManage/edit", postJson)
        .then(res => {
          console.log(this.ruleForm);
          console.log(res.data);
          let data = res.data;
          if (data.code === 0) {
            this._getDataList();
            this.$message({
              type: "success",
              message: "编辑成功!"
            });
            this.dialogFormVisible = false;
          }
         
        });
    },
    addUser(formName) {
      //添加用户
      this.$refs[formName].validate(valid => {
        let postJson = {};
        postJson["email"] = this.addUserForm.email;
        postJson["groupID"] = this.addUserForm.groupID;
        postJson["role"] = this.addUserForm.role
        console.log(postJson)
        if (valid) {
          this.$axios
            .post("/api/userManage/add", postJson)
            .then(res => {
              let data = res.data;
              if (data.code === 0) {
                this._getDataList({});
                this.addUserDialog = false;
              }else{
                this.$message({
                  type:"error",
                  message:data.desc
                })
              }
            });
        } else {
          return;
        }
      });
    },
    submitUpload() {
      this.$refs.upload.submit();
    }
  }
};
</script>

<style scoped lang="scss">
.myCert-wrapper {
  .head {
    display: flex;
    justify-content: space-between;
    // margin-top: 16px;
    .head-item {
      display: flex;
      padding: 16px;
      .showChartsBtn {
        margin-left: 20px;
      }
    }
    .oprateBtn{
      .el-button+.el-button {
          margin-left: 0px;
      }
    }
  }
  .tips{
    font-size: 12px;
    color: #999;
    padding:0 30px
  }
  .showCharts {
    position: relative;
    .charts {
      display: inline-block;
      width: 33%;
    }
  }
  .addCertDialog {
    .selectFile {
      position: relative;
      top: -24px;
      .upload {
        position: absolute;
        width: 100px;
        height: 36px;
        z-index: 99;
      }
      .selectBtn {
        position: absolute;
      }
    }
  }
}
</style>
<style>
</style>
