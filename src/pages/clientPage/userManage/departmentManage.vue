<template>
    <div class="departmentManage-wrapper">
        <div class="head">
          <div class="head-item">
             <el-button type="danger" @click="handleClickAdd">添加用户组</el-button>
          </div>
          <div class="head-item">
              <el-input placeholder="请输入搜索关键字" v-model="searchKey" prefix-icon="el-icon-search" @keyup.enter.native="search(searchKey)"></el-input>
          </div>
        </div>
        <div class="data-table">
          <el-table
            :data="datalist"
            border
            style="width: 100%">
            <el-table-column
              prop="groupName"
              label="用户组"
              width="150">
              <template slot-scope="scope">{{ scope.row.groupName }}</template>
            </el-table-column>
            <el-table-column
              prop="email"
              label="OUID"
              width="">
              <template slot-scope="scope">{{ scope.row.OUID }}</template>
            </el-table-column>
            <el-table-column
              prop="groupUserCount"
              label="用户组成员"
              width="125">
              <template slot-scope="scope">{{ scope.row.groupUserCount }}</template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="180">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row.groupID)" type="text" size="small">编辑</el-button>
                <el-button type="text" size="small" @click="remove(scope.row.groupID)">移除</el-button>
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
            <el-dialog title="编辑用户组" width="600px" :visible.sync="dialogFormVisible" >
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户组名称" prop="groupName" >
                  <el-input size="medium" v-model="ruleForm.groupName"></el-input>
                </el-form-item>
                <el-form-item label="OUID" prop="OUIDs">
                  <el-tag
                    class="ouidTags"
                    :key="tag"
                    v-for="tag in ruleForm.OUIDs"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(ruleForm.OUIDs,tag)">
                    {{tag}}
                  </el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(ruleForm.OUIDs)"
                    @blur="handleInputConfirm(ruleForm.OUIDs)"
                  >
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </el-form-item>
                <el-form-item label="用户组成员" prop="users" style="position:relative;">
                  <div class="usersTagsWrap">
                    <el-scrollbar>
                      <el-tag
                      class="usersTags"
                      :key="tag.userID"
                      v-for="tag in ruleForm.users"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(ruleForm.users,tag)">
                      {{tag.userName}}({{tag.email}})
                      </el-tag>
                    </el-scrollbar>
                  </div>
                  
                  <el-button size="mini" style="position:absolute;top:5px;right:0;" @click="addUserDialogShow" type="primary">添加</el-button>
                </el-form-item>
              </el-form>
              <div class="tips">
                <div>温馨提示</div>
                <div>1.当企业账户下管理的证书中，OU信息与您设定的OUID相同时，则该部门所属成员都将获得该证书的管理权限。</div>
                <div>2.用户验证邮件有效期为7天，您可联系新近添加的用户，提醒其尽快完成验证。如果您添加的用户未能在7天内成功验证，您需要尝试重新添加该用户。</div>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureEditGroup(ruleForm.groupID)">确定</el-button>
              </div>
          </el-dialog>
          <el-dialog title="请选择要添加的用户" width="800px" :visible.sync="addUserDialog">
            <el-table :data="userList" @selection-change="selectUser">
              <el-table-column type="selection" width="45"></el-table-column>
              <el-table-column label="姓名">
                <template slot-scope="scope">{{scope.row.userName}}</template>
              </el-table-column>
              <el-table-column property="email" label="邮箱"></el-table-column>
              <el-table-column property="phone" label="手机"></el-table-column>
              <el-table-column property="altPhone" label="座机"></el-table-column>
              <el-table-column property="department" label="部门"></el-table-column>
              <el-table-column property="title" label="职务"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addUserDialog = false">取 消</el-button>
                <el-button type="primary" @click="eidt_addUserDialogFun">确定</el-button>
              </div>
          </el-dialog>
        </div>
        <div class="addDialog">
            <el-dialog title="添加用户组" width="600px" :visible.sync="addDialog" >
              <el-form :model="addGroupForm" :rules="rules" ref="addGroupForm" label-width="100px">
                <el-form-item label="部门名称" prop="groupName">
                  <el-input size="medium" v-model="addGroupForm.groupName"></el-input>
                </el-form-item>
                <el-form-item label="OUID" prop="OUIDs">
                  <el-tag
                    class="ouidTags"
                    :key="tag"
                    v-for="tag in addGroupForm.OUIDs"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(addGroupForm.OUIDs,tag)">
                    {{tag}}
                  </el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(addGroupForm.OUIDs)"
                    @blur="handleInputConfirm(addGroupForm.OUIDs)"
                  >
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </el-form-item>
                <el-form-item label="用户组成员" prop="users" style="position:relative;">
                  <div class="usersTagsWrap">
                    <el-scrollbar>
                    <el-tag
                      class="usersTags"
                      :key="tag.userID"
                      v-for="tag in addGroupForm.users"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(addGroupForm.users,tag)">
                      {{tag.userName}}({{tag.email}})
                    </el-tag>
                    </el-scrollbar>
                  </div>    
                  <el-button size="mini" style="position:absolute;top:5px;right:0;" @click="addUserDialogShow" type="primary">添加</el-button>
                </el-form-item>
              </el-form>
              <div class="tips">
                <div>温馨提示</div>
                <div>1.当企业账户下管理的证书中，OU信息与您设定的OUID相同时，则该部门所属成员都将获得该证书的管理权限。</div>
                <div>2.用户验证邮件有效期为7天，您可联系新近添加的用户，提醒其尽快完成验证。如果您添加的用户未能在7天内成功验证，您需要尝试重新添加该用户。</div>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addDialog = false">取 消</el-button>
                <el-button type="primary" @click="sureAddDialog">确定</el-button>
              </div>
          </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
  name: "departmentManage",
  data: function() {
    return {
      currentpage: 1,
      pagesize: 10,
      totalcount: 0,
      datalist: [],
      searchKey:"",
      userList: [],
      multipleSelection: [],
      activeName: "onlineCert",
      dialogFormVisible: false,
      addUserDialog: false,
      saveUserList: [],
      flag: "",
      addDialog: false,
      ruleForm: {
        groupName: "",
        OUIDs: [],
        groupID: "",
        users: []
      },
      addGroupForm: {
        groupName: "",
        OUIDs: [],
        groupID: "",
        users: []
      },
      userID: "",
      inputVisible: false,
      inputValue: "",
      ouidTags: [],
      ouidTagsE: [],
      memberTags: [],
      memberTagsE: [],
      rules: {
        groupName: [
          { required: true, message: "请输入用户组名称", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.userID = localStorage.getItem("userID");
    this._getGroupList();
    this.showCharts = false;
  },
  computed: {},
  methods: {
    _getGroupList(data = {}) {
      this.$axios.post("/api/userManage/groupList", {
        condition: !data.condition?'':data.condition,
        requestPage:this.currentpage,
        pageCount:this.pagesize,
      }).then(res => {
        let data = res.data;
        if (data.code === 0) {
          // console.log(data);
          this.datalist = data.data.users;
          this.totalcount = data.data.total;
        }
      });
    },
    toggleCharts() {
      this.showCharts = !this.showCharts;
    },
    selectUser(val) {
      this.saveUserList = [];
      this.multipleSelection = val;
      this.saveUserList = val;
      // console.log(this.saveUserList)
    },
    handleClickAdd() {
      this.addDialog = true;
      this.flag = "addGroupForm";
    },
    
    addUserDialogFun(saveUserList, form, users, dialog, userID) {
      if (this[saveUserList].length > 0) {
        let saveArr = [];

        for (let i = 0; i < this[form][users].length; i++) {
          if (saveArr.indexOf((this[form][users][userID]) < 0)) {
            saveArr.push(this[form][users][userID]);
          }
        }
        // for (let item of this[form][users]) {
        //   if (saveArr.indexOf(item[userID]) < 0) {
        //     saveArr.push(item[userID]);
        //   }
        // }
        for (let iterator of this[saveUserList]) {
          if (saveArr.indexOf(iterator[userID]) < 0) {
            this[form][users].push(iterator);
          }
        }
        // console.log(this[form][users]);
        this[dialog] = false;
      }
    },
    eidt_addUserDialogFun() {
      this.addUserDialogFun(
        "saveUserList",
        this.flag,
        "users",
        "addUserDialog",
        "userID"
      );
    },
    sureAddDialog() {
      this.$refs["addGroupForm"].validate(valid => {
        if (valid) {
          // if (this.addGroupForm.users.length > 0) {
            this.$axios
            .post("/api/userManage/groupAdd", {
              groupName: this.addGroupForm.groupName,
              OUID: this.addGroupForm.OUIDs,
              users: this.addGroupForm.users
            })
            .then(res => {
              let data = res.data;
              if (data.code === 0) {
                this._getGroupList();
                this.$message({
                  type: "success",
                  message: data.desc
                });
                this.addDialog = false;
              } else {
                this.$message({
                  type: "error",
                  message: data.desc
                });
              }
            });
          // }else{
          //   this.$message({
          //     type:"error",
          //     message:"请至少添加一个OUID!"
          //   })
          // }
        } else {
          return;
        }
      });
    },
    sureEditGroup(groupID) {
      // console.log(this.ruleForm.OUIDs)
      // console.log(this.ruleForm.users)
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/userManage/groupEdit", {
              groupID: groupID,
              groupName: this.ruleForm.groupName,
              OUID: this.ruleForm.OUIDs,
              users: this.ruleForm.users
            })
            .then(res => {
              let data = res.data;
              if (data.code === 0) {
                this.$message({
                  type: "success",
                  message: data.desc
                });
                this._getGroupList({});
                this.dialogFormVisible = false;
              } else {
                this.$message({
                  type: "error",
                  message: data.desc
                });
              }
            });
        } else {
          return;
        }
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this._getGroupList()
    },
    handleCurrentChange(val) {
      this.currentpage = val;
      this._getGroupList()
    },
    search(searchKey){
      this._getGroupList({condition:searchKey})
    },
    handleClick(groupID) {
      this.$axios
        .post("/api/userManage/groupDetail", { groupID: groupID })
        .then(res => {
          let data = res.data;
          if (data.code === 0) {
            // console.log(data);
            this.ruleForm = data.data;
          }
        });
      this.dialogFormVisible = true;
      this.flag = "ruleForm";
    },
    addUserDialogShow() {
      // alert(this.userID);
      this.$axios
        .post("/api/common/getGroupUserList", { userID: this.userID })
        .then(res => {
          let data = res.data;
          // console.log(data.data);
          if (data.code === 0) {
            this.userList = data.data.users;
          }else{
            this.$message({
              type:'error',
              message:data.desc
            })
          }
        });
      this.addUserDialog = true;
    },
    remove(groupID) {
      this.$confirm("删除该用户组, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/api/userManage/groupDelete", { groupID: groupID })
            .then(res => {
              let data = res.data;
              // console.log(data)
              if (data.code === 0) {
                this._getGroupList();
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
    handleClose(arr, tag) {
      if (arr.length > 1) {
        arr.splice(arr.indexOf(tag), 1);
      }
      // this.ruleForm.OUIDs.splice(this.ruleForm.OUIDs.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm(arr) {
      let inputValue = this.inputValue;
      if (inputValue) {
        if (arr.indexOf(inputValue) < 0) {
          arr.push(inputValue);
        }
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  }
};
</script>

<style scoped lang="scss">
.departmentManage-wrapper {
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
  }
  .el-table .cell {
    font-size: 12px;
  }
  .tips {
    font-size: 12px;
    padding: 10px 30px;
  }
  .usersTagsWrap {
    overflow-x:hidden;
    overflow-y:hidden;
    height: 100px;
    width: 390px;
    .usersTags {
      display: inline-block !important;
      width: 360px;
    }
  }

  .ouidTags.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
<style>
</style>
