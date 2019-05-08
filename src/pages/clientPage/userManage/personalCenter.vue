<template>
    <div class="personalCenter-wrapper">
        <!-- 主体用户详细信息 -->
        <el-card class="personal-info box-card" style="margin-top:25px;">
            <div slot="header" class="clearfix">
                <span>个人信息</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="handleClick(userType)">修改个人信息</el-button>
            </div>
            <div class="personal-content">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="col">
                            <span>姓名：</span>
                            <span class="tb-content">{{personalUserInfo.userLastName}} {{personalUserInfo.userFirstName}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="col">
                            <span>用户ID：</span>
                            <span class="tb-content">{{personalUserInfo.email}}</span>
                        </div>
                    </el-col>
                    <!-- <el-col :span="8">
                        <div class="col">
                            <span>职务：</span>
                            <span class="tb-content">{{personalUserInfo.title}}</span>
                        </div>
                    </el-col> -->
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="col">                        
                            <span>手机：</span>
                            <span class="tb-content">{{personalUserInfo.phone}}</span>
                        </div>
                    </el-col>
                    <!-- <el-col :span="16">
                        <div class="col">
                            <span>企业名称：</span>
                            <span class="tb-content">{{personalUserInfo.orgName}}</span>
                        </div>
                    </el-col> -->
                </el-row>
                <!-- <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="col">
                            <span>国家：</span>
                            <span class="tb-content">{{personalUserInfo.country}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="col">
                            <span>省份：</span>
                            <span class="tb-content">{{personalUserInfo.state}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="col">                        
                            <span>城市：</span>
                            <span class="tb-content">{{personalUserInfo.location}}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="col">
                            <span>企业电话：</span>
                            <span class="tb-content">{{personalUserInfo.orgPhone}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="col">
                            <span>部门名称：</span>
                            <span class="tb-content">{{personalUserInfo.department}}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="col">
                            <span>地址：</span>
                            <span class="tb-content">{{personalUserInfo.address}}</span>
                        </div>
                    </el-col>
                </el-row> -->
            </div>
        </el-card>
        <!-- 添加常用组织 -->
        <el-card class="contacts-info box-card" style="margin-top:25px;">
            <div slot="header" class="clearfix">
                <span>常用组织信息</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="addContactOrg">添加常用组织</el-button>
            </div>
            <div class="data-table">
                <el-table
                :data="contactOrgList.slice((currentpage-1)*pagesize,currentpage*pagesize)"
                border
                style="width: 100%">
                    <el-table-column
                        prop="favoriteOrgName"
                        label="组织名称"
                        width="150">
                        <template slot-scope="scope">{{ scope.row.favoriteOrgName }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="favoriteOrgDepartment"
                        label="部门名称"
                        width="">
                        <template slot-scope="scope">{{ scope.row.favoriteOrgDepartment }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="座机"
                        width="">
                        <template slot-scope="scope">{{ scope.row.phone }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="country"
                        label="国家代码"
                        width="">
                        <template slot-scope="scope">{{ scope.row.country }}</template>
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label="省市名称"
                        width="">
                        <template slot-scope="scope">{{ scope.row.state }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="location"
                        label="市或区名"
                        width="100">
                        <template slot-scope="scope">{{ scope.row.location }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="zipCode"
                        label="邮编"
                        width="100">
                        <template slot-scope="scope">{{ scope.row.zipCode }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="地址"
                        width="100">
                        <template slot-scope="scope">{{ scope.row.address }}</template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="180">
                        <template slot-scope="scope">
                            <el-button @click="editContactOrg(scope.row.favoriteOrgID)" type="text" size="small">编辑</el-button>
                            <el-button type="text" size="small" @click="deleteContactOrg(scope.row.favoriteOrgID)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <!-- 添加常用联系人 -->
        <el-card class="contacts-info box-card" style="margin-top:25px;">
            <div slot="header" class="clearfix">
                <span>常用联系人信息</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="addContactDialog=true">添加常用联系人</el-button>
            </div>
            <div class="data-table">
                <el-table
                :data="datalist.slice((currentpage-1)*pagesize,currentpage*pagesize)"
                border
                style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="150">
                        <template slot-scope="scope">{{ scope.row.favoriteContactLastName }} {{ scope.row.favoriteContactFirstName }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="email"
                        label="邮箱"
                        width="">
                        <template slot-scope="scope">{{ scope.row.favoriteContactEmail }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        label="手机"
                        width="">
                        <template slot-scope="scope">{{ scope.row.favoriteContactPhone }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="tel"
                        label="座机"
                        width="">
                        <template slot-scope="scope">{{ scope.row.favoriteContactOrgPhone }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="tel"
                        label="部门"
                        width="">
                        <template slot-scope="scope">{{ scope.row.favoriteContactDepartment }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="job"
                        label="职务"
                        width="100">
                        <template slot-scope="scope">{{ scope.row.favoriteContactTitle }}</template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="180">
                        <template slot-scope="scope">
                            <el-button @click="editContactMan(scope.row.favoriteContactID)" type="text" size="small">编辑</el-button>
                            <el-button type="text" size="small" @click="deleteContactMan(scope.row.favoriteContactID)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <!-- 个人信息弹窗 -->
        <div class="editDialog">
            <el-dialog title="编辑个人信息" width="840px" :visible.sync="editPersonalInfoPri" >
                <div class="tips">
                    <p v-show="!form.isRequstOrgUser">您的账户已注册为企业用户，但尚未完成企业验证。当您使用该企业信息完成OV/EV类型证书首单签发后，即可完成企业验证，启用更多企业用户高级功能。</p>
                    <p>您的账户已注册为个人用户，适合批量申请和管理DV证书产品。注册成为企业用户可极速签发OV/EV类型证书，并启用更多企业用户高级功能。</p>
                </div>
               <el-form ref="form" :model="form" :rules="!form.isRequstOrgUser?rules:rulesChangeOrg" label-width="80px">
                 {{form.isRequstOrgUser}}
                    <el-form-item>
                        <el-row :gutter="8">
                        <el-col :span="10">
                            <el-form-item prop="userLastName" >
                                <el-input placeholder="请输入姓氏" v-model="form.userLastName">
                                    <template slot="prepend">姓：</template>
                                </el-input>
                            </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item prop="userFirstName"  >
                                    <el-input placeholder="请输入名字" v-model="form.userFirstName">
                                        <template slot="prepend">名：</template>
                                    </el-input>
                                 </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                      <el-row :gutter="8">
                        <el-col :span="20">
                            <el-form-item prop="email"  >
                                <el-input placeholder="请输入邮箱" v-model="form.email" disabled>
                                    <template slot="prepend">邮箱：</template>
                                </el-input>
                             </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row :gutter="8">
                            <el-col :span="10">
                              <el-form-item prop="title"  >
                                <el-input placeholder="请输入职务" v-model="form.title">
                                    <template slot="prepend">职务：</template>
                                </el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="10">
                               <el-form-item prop="phone"  >
                                <el-input placeholder="请输入手机号" v-model="form.phone" :disabled="form.isBoundPhone?true:false">
                                    <template slot="prepend">手机：</template>
                                </el-input>
                               </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-button type="text" v-show="form.isBoundPhone" @click="changBindPhone(form.phone)">修改号码</el-button>
                                <el-button type="text" v-show="!form.isBoundPhone" @click="bindPhone(form.phone)">绑定此号码</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="20" >
                            <el-form-item prop="orgName" >
                                <el-input placeholder="请输入企业名称" v-model="form.orgName">
                                    <template slot="prepend">企业名称：</template>
                                </el-input>
                             </el-form-item>
                        </el-col>
                        <el-col :span="4" style="padding-left:8px;">
                            <!-- <el-checkbox v-model="form.isRequstOrgUser">转换为企业用户</el-checkbox> -->
                            <el-button type="text" v-show="!form.isRequstOrgUser" @click="changeOrguser">转换为企业用户</el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                      <el-row :gutter="8">
                        <el-col :span="10">
                            <el-form-item prop="department" >
                                <el-input placeholder="请输入部门名称" v-model="form.department">
                                    <template slot="prepend">部门名称</template>
                                </el-input>
                             </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item prop="zipCode"  >
                                <el-input placeholder="请输入邮编" v-model="form.zipCode" >
                                    <template slot="prepend">邮编：</template>
                                </el-input>
                             </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row :gutter="8">
                            <el-col :span="10">
                                <el-form-item prop="orgPhone"  >
                                    <el-input placeholder="请输入组织电话" v-model="form.orgPhone">
                                        <template slot="prepend">组织电话</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="14">
                                <div class="el-input-tit" style="width:84px;margin-top:-29px;display:inline-block">国家</div>
                                <el-form-item prop="country" style="display:inline-block;margin-left:-4px;" >
                                  <el-select class="select-country" filterable  v-model="form.country" placeholder="请选择国家">
                                    <el-option v-for="item in countryList"  :key="item.code" :label="item.name_ZH+'('+item.code+')'" :value="item.code"></el-option>
                                      <!-- <el-option label="美国" value="2"></el-option>
                                      <el-option label="英国" value="3"></el-option> -->
                                  </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row :gutter="8">
                            <el-col :span="10">
                                <el-form-item prop="state" required >
                                    <el-input placeholder="请输入省份" v-model="form.state">
                                        <template slot="prepend">省份：</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item prop="location"  >
                                    <el-input placeholder="请输入城市" v-model="form.location">
                                        <template slot="prepend">城市：</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="20">
                            <el-form-item prop="address" >
                                <el-input placeholder="请输入地址" v-model="form.address">
                                    <template slot="prepend">地址：</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>              
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="editPersonalInfoPri = false">取 消</el-button>
                <el-button type="primary" @click="editPersonalInfo('form')">确定</el-button>
              </div>
          </el-dialog>
        </div>
        <!-- 企业信息弹窗 -->
        <div class="editDialog">
            <el-dialog title="编辑企业信息" width="840px" :visible.sync="editPersonalInfoOrg" >
                <div class="tips">
                    <p>您的账户已注册为企业用户，但尚未完成企业验证。当您使用该企业信息完成OV/EV类型证书首单签发后，即可完成企业验证，启用更多企业用户高级功能。</p>
                    <p>您的账户已注册为个人用户，适合批量申请和管理DV证书产品。注册成为企业用户可极速签发OV/EV类型证书，并启用更多企业用户高级功能。</p>
                </div>
               <el-form ref="orgForm" :model="form" label-width="80px">
                    <el-form-item>
                        <el-row :gutter="8">
                        <el-col :span="10">
                            <el-input placeholder="请输入姓氏" v-model="form.userLastName">
                                <template slot="prepend">姓：</template>
                            </el-input>
                            </el-col>
                            <el-col :span="10">
                                <el-input placeholder="请输入名字" v-model="form.userFirstName">
                                    <template slot="prepend">名：</template>
                                </el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="20">
                            <el-input placeholder="请输入邮箱" v-model="form.email" disabled>
                                <template slot="prepend">邮箱：</template>
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-row :gutter="8">
                            <el-col :span="10">
                                <el-input placeholder="请输入职务" v-model="form.title">
                                    <template slot="prepend">职务：</template>
                                </el-input>
                            </el-col>
                            <el-col :span="10">
                                <el-input placeholder="请输入手机号" v-model="form.phone" :disabled="form.isBoundPhone?true:false">
                                    <template slot="prepend">手机：</template>
                                </el-input>
                            </el-col>
                            <el-col :span="4">
                                <el-button type="text" v-show="form.isBoundPhone" @click="changBindPhone(form.phone)">修改号码</el-button>
                                <el-button type="text" v-show="!form.isBoundPhone" @click="bindPhone(form.phone)">绑定此号码</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="editPersonalInfoOrg = false">取 消</el-button>
                <el-button type="primary" @click="editOrganInfo">确定</el-button>
              </div>
          </el-dialog>
        </div>
        <!-- 常用组织弹窗 -->
        <div class="contactOrgDialog">
            <el-dialog title="添加常用组织" width="650px" :visible.sync="contactOrgDialog" >
              <el-form :model="contactOrgDialogForm" :rules="contactOrgRule" ref="contactOrgDialogForm" label-width="80px">
                  <el-row>
                      <el-col :span="24">
                          <el-form-item label="组织名称" prop="favoriteOrgName">
                            <el-input size="samll" v-model="contactOrgDialogForm.favoriteOrgName"  placeholder="请输入组织名称" ></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="12">
                          <el-form-item label="部门名称" prop="favoriteOrgDepartment">
                            <el-input size="samll" v-model="contactOrgDialogForm.favoriteOrgDepartment" placeholder="请输入部门名称" ></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="12">
                          <el-form-item label="座机号码" prop="phone">
                            <el-input size="samll" v-model="contactOrgDialogForm.phone" placeholder="请输入座机号" ></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="12">
                          <el-form-item label="国家代码" prop="country">
                            <!-- <div class="el-input-tit">国家</div> -->
                            <el-select class="select-country" filterable  v-model="contactOrgDialogForm.country" placeholder="请选择国家">
                                <el-option v-for="item in countryList" :key="item.code" :label="item.name_ZH+'('+item.code+')'" :value="item.code"></el-option>
                            </el-select>
                            <!-- <el-input size="samll" v-model="contactOrgDialogForm.country" placeholder="请输入国家代码" ></el-input> -->
                          </el-form-item>
                      </el-col>
                      <el-col :span="12">
                          <el-form-item label="省市名称" prop="state">
                            <el-input size="samll" v-model="contactOrgDialogForm.state" placeholder="请输入省市名称" ></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="12">
                          <el-form-item label="市或区名" prop="location">
                            <el-input size="samll" v-model="contactOrgDialogForm.location" placeholder="请输入市或区名" ></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="12">
                          <el-form-item label="邮政编码" prop="zipCode">
                            <el-input size="samll" v-model="contactOrgDialogForm.zipCode" placeholder="请输入邮政编码" ></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="24">
                          <el-form-item label="地址" prop="address">
                            <el-input size="samll" v-model="contactOrgDialogForm.address"  placeholder="请输入地址" ></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="contactOrgDialog = false">取 消</el-button>
                <el-button type="primary" @click="sureContactOrg('contactOrgDialogForm')">确定</el-button>
              </div>
          </el-dialog>
        </div>
        <!-- 常用联系人相关弹窗 start -->
        <div class="addContactDialog">
            <el-dialog title="添加常用联系人" width="650px" :visible.sync="addContactDialog" >
              <el-form :model="addContactForm" :rules="contactsRule" ref="addContactForm" label-width="100px">
                  <el-row>
                      <el-col :span="10">
                          <el-form-item label="姓" prop="favoriteContactLastName">
                            <el-input size="samll" v-model="addContactForm.favoriteContactLastName"  placeholder="请输入姓氏" ></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="10">
                          <el-form-item label="名" prop="favoriteContactFirstName">
                            <el-input size="samll" v-model="addContactForm.favoriteContactFirstName"  placeholder="请输入名字" ></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="10">
                          <el-form-item label="手机" prop="favoriteContactPhone">
                            <el-input size="samll" v-model="addContactForm.favoriteContactPhone" placeholder="请输入手机号" ></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="10">
                          <el-form-item label="座机" prop="favoriteContactOrgPhone">
                            <el-input size="samll" v-model="addContactForm.favoriteContactOrgPhone" placeholder="请输入座机号" ></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="10">
                          <el-form-item label="部门" prop="favoriteContactDepartment">
                            <el-input size="samll" v-model="addContactForm.favoriteContactDepartment" placeholder="请输入座机号" ></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="10">
                          <el-form-item label="职务" prop="favoriteContactTitle">
                            <el-input size="samll" v-model="addContactForm.favoriteContactTitle" placeholder="请输入职务" ></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="20">
                          <el-form-item label="邮箱" prop="favoriteContactEmail">
                            <el-input size="samll" v-model="addContactForm.favoriteContactEmail" placeholder="请输入邮箱" ></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addContactDialog = false">取 消</el-button>
                <el-button type="primary" @click="addContact('addContactForm')">确定</el-button>
              </div>
          </el-dialog>
        </div>
        <div class="editContactDialog">
            <el-dialog title="编辑常用联系人" width="650px" :visible.sync="editContactDialog" >
              <el-form :model="editContactForm" :rules="contactsRule" ref="editContactForm" label-width="100px">
                  <el-row>
                      <el-col :span="10">
                          <el-form-item label="姓" prop="favoriteContactLastName">
                            <el-input size="samll" v-model="editContactForm.favoriteContactLastName"  placeholder="请输入姓氏" ></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="10">
                          <el-form-item label="名" prop="favoriteContactFirstName">
                            <el-input size="samll" v-model="editContactForm.favoriteContactFirstName"  placeholder="请再次名字" ></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="10">
                          <el-form-item label="手机" prop="favoriteContactPhone">
                            <el-input size="samll" v-model="editContactForm.favoriteContactPhone" placeholder="请输入手机号" ></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="10">
                          <el-form-item label="座机" prop="favoriteContactOrgPhone">
                            <el-input size="samll" v-model="editContactForm.favoriteContactOrgPhone" placeholder="请输入座机号" ></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="10">
                          <el-form-item label="部门" prop="favoriteContactDepartment">
                            <el-input size="samll" v-model="editContactForm.favoriteContactDepartment" placeholder="请输入座机号" ></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="10">
                          <el-form-item label="职务" prop="favoriteContactTitle">
                            <el-input size="samll" v-model="editContactForm.favoriteContactTitle" placeholder="请输入职务" ></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="20">
                          <el-form-item label="邮箱" prop="favoriteContactEmail">
                            <el-input size="samll" v-model="editContactForm.favoriteContactEmail" placeholder="请输入邮箱" ></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="editContactDialog = false">取 消</el-button>
                <el-button type="primary" @click="editContact('editContactForm')">确定</el-button>
              </div>
          </el-dialog>
        </div>
         <!-- 常用联系人相关弹窗 end -->
    </div>
</template>
<script>
export default {
  name: "personalCenter",
  data() {
    return {
      currentpage: 1,
      pagesize: 10,
      totalcount: 0,
      datalist: [],
      totalcountOrg: 0,
      countryList:[],
      contactOrgList: [],
      userType: "",
      isEdit: "",
      contactOrgDialog: false,
      addContactDialog: false,
      editContactDialog: false,
      personalUserInfo: {},
      editPersonalInfoPri: false,
      editPersonalInfoOrg: false,
      select: "",
      form: {
        userID: "",
        userFirstName: "",
        userLastName: "",
        email: "",
        title: "",
        phone: "",
        orgName: "",
        country: "",
        state: "",
        location: "",
        address: "",
        orgPhone: "",
        role: "",
        department: "",
        isRequstOrgUser: false,
        isBoundPhone: false,
        status:"",
        zipCode:""
      },
      orgForm: {
        userID: "",
        userFirstName: "",
        userLastName: "",
        email: "",
        title: "",
        phone: "",
        orgName: "",
        country: "",
        state: "",
        location: "",
        address: "",
        orgPhone: "",
        role: "",
        department: "",
        isRequstOrgUser: false,
        isBoundPhone: false,
        status:"",
        zipCode:""
      },
      contactOrgDialogForm: {
        favoriteOrgID: "",
        favoriteOrgName: "",
        favoriteOrgDepartment: "",
        country: "",
        state: "",
        location: "",
        phone: "",
        zipCode: "",
        address: ""
      },
      addContactForm: {
        favoriteContactFirstName: "",
        favoriteContactLastName: "",
        favoriteContactEmail: "",
        favoriteContactPhone: "",
        favoriteContactOrgPhone: "",
        favoriteContactTitle: "",
        favoriteContactDepartment: ""
      },
      editContactForm: {
        favoriteContactID: "",
        favoriteContactFirstName: "",
        favoriteContactLastName: "",
        favoriteContactEmail: "",
        favoriteContactPhone: "",
        favoriteContactOrgPhone: "",
        favoriteContactDepartment: "",
        favoriteContactTitle: ""
      },
      contactOrgRule: {
        favoriteOrgName: [
          { required: true, message: "请输入组织名称", trigger: "blur" }
        ],
        favoriteOrgDepartment: [
          { required: true, message: "请输入部门名称", trigger: "blur" }
        ],
        phone:[{ required: true, message: "请输入座机号", trigger: "blur" }],
        country: [{ required: true, message: "请输入国家", trigger: "blur" }],
        state: [{ required: true, message: "请输入省份", trigger: "blur" }],
        location: [{ required: true, message: "请输入城市", trigger: "blur" }],
        zipCode: [{ required: true, message: "请输入邮编", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }]
      },
      contactsRule: {
        favoriteContactFirstName: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        favoriteContactLastName: [
          { required: true, message: "请输入姓氏", trigger: "blur" }
        ],
        favoriteContactOrgPhone:[{ required: true, message: "请输入座机号", trigger: "blur" }],
        favoriteContactEmail: [
          { required: true, message: "请输入邮箱", trigger: "blur" }
        ],
        favoriteContactPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        favoriteContactTitle: [
          { required: true, message: "请输入职务", trigger: "blur" }
        ],
        favoriteContactDepartment: [
          { required: true, message: "请输入部门", trigger: "blur" }
        ]
      },
      rules: {
        userLastName: [
          { required: true, message: "请输入姓氏", trigger: "blur" }
        ],
        userFirstName: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        country: [{ required: true, message: "请输入国家", trigger: "blur" }],
        state: [{ required: true, message: "请输入省份", trigger: "blur" }],
        location: [{ required: true, message: "请输入城市", trigger: "blur" }]
      },
      rulesChangeOrg: {
        userLastName: [
          { required: true, message: "请输入姓氏", trigger: "blur" }
        ],
        userFirstName: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        email: [{type: "email",required: true,message: "请选择邮箱",trigger: "blur"}],
        title: [{ required: true, message: "请选请输入职务", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        orgName: [
          { required: true, message: "请输入企业名称", trigger: "blur" }
        ],
        department: [
          { required: true, message: "请输入部门名称", trigger: "blur" }
        ],
        zipCode:[ { required: true, message: "请输入邮编", trigger: "blur" }],
        country: [{ required: true, message: "请输入国家", trigger: "blur" }],
        state: [{ required: true, message: "请输入省份", trigger: "blur" }],
        location: [{ required: true, message: "请输入城市", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        orgPhone: [
          { required: true, message: "请输入组织电话", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.showCharts = false;
    this.userType = localStorage.getItem("userType");
    this._getPersonalInfo();
    this._getContacOrgList();
    this._getContactList();
  },
  computed: {},
  methods: {
    _getContacOrgList() {
      this.$axios.post("/api/userManage/favoriteOrgList", {}).then(res => {
        //获取常用组织列表
        let data = res.data;
        if (data.code === 0) {
          //   console.log(data);
          this.contactOrgList = data.data.favoriteOrgs;
          this.totalcountOrg = data.data.total;
        }
      });
    },
    _getContactList() {
      this.$axios.post("/api/userManage/favoriteContactList", {}).then(res => {
        //获取常用联系人列表
        let data = res.data;
        if (data.code === 0) {
          //   console.log(data);
          this.datalist = data.data.favoriteContacts;
          this.totalcount = data.data.total;
        }
      });
    },
    _getPersonalInfo() {
      this.$axios
        .post("/api/userManage/detail", {
          userID: localStorage.userID
        })
        .then(res => {
          //获取个人信息
          let data = res.data;
          if (data.code === 0) {
              // console.log(data.data);
            this.personalUserInfo = data.data;
            this.form.userID = data.data.userID;
            this.form.userLastName = data.data.userLastName;
            this.form.userFirstName = data.data.userFirstName;
            this.form.email = data.data.email;
            this.form.orgName = data.data.orgName;
            this.form.title = data.data.title;
            this.form.phone = data.data.phone;
            this.form.department = data.data.department;
            this.form.orgPhone = data.data.orgPhone;
            this.form.role = data.data.role;
            this.form.country = data.data.country;
            this.form.state = data.data.state;
            this.form.location = data.data.location;
            this.form.address = data.data.address;
            this.form.zipCode = data.data.zipCode;
            this.form.isBoundPhone = data.data.isBoundPhone;
            this.form.isRequstOrgUser = data.data.isRequstOrgUser;
          }
        });
    },
    _getCountryList(){
      this.$axios.get("/api/common/getCountryOrAreaCode").then(res => {
        let data = res.data;
        if (data.code === 0) {
          this.countryList = data.data
        }else{
          this.$message({
            type:"error",
            message:data.desc
          })
        }
      })
    },
    changeOrguser() {
      this.form.isRequstOrgUser = true;
    },
    sureContactOrg(formName) {
      let url = "";
      let postData = {
        favoriteOrgName: this.contactOrgDialogForm.favoriteOrgName,
        favoriteOrgDepartment: this.contactOrgDialogForm.favoriteOrgDepartment,
        country: this.contactOrgDialogForm.country,
        state: this.contactOrgDialogForm.state,
        location: this.contactOrgDialogForm.location,
        phone: this.contactOrgDialogForm.phone,
        zipCode: this.contactOrgDialogForm.zipCode,
        address: this.contactOrgDialogForm.address
      };
      if (this.contactOrgDialogForm.favoriteOrgID) {
        postData["favoriteOrgID"] = this.contactOrgDialogForm.favoriteOrgID;
      }
      if (this.isEdit === "edit") {
        url = "/api/userManage/favoriteOrgEdit";
      }
      if (this.isEdit === "add") {
        url = "/api/userManage/favoriteOrgAdd";
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post(url, postData).then(res => {
            let data = res.data;
            if (data.code === 0) {
              this.$message({
                type: "success",
                message: data.desc
              });
              this._getContacOrgList();
              this.contactOrgDialog = false;
            } else {
              this.$message({
                type: "error",
                message: data.desc
              });
            }
          });
        }
      });
    },
    deleteContactOrg(favoriteOrgID) {
      this.$confirm("删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/api/userManage/favoriteOrgDelete", { favoriteOrgID: favoriteOrgID })
            .then(res => {
              let data = res.data;
              if (data.code === 0) {
                this._getContacOrgList();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
                this.$message({
                  type: "error",
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
    addContactOrg() {
      this.isEdit = "add";
      this._getCountryList();
      this.contactOrgDialogForm = {};
      this.contactOrgDialog = true;
    },
    editContactOrg(favoriteOrgID) {
      this.isEdit = "edit";
      this.$axios
        .post("/api/userManage/favoriteOrgDetail", {
          favoriteOrgID: favoriteOrgID
        })
        .then(res => {
          let data = res.data;
          if (data.code === 0) {
            // console.log(data);
            this._getCountryList();
            this.contactOrgDialogForm = data.data;
            this.contactOrgDialog = true;
          } else {
            this.$message({
              type: "danger",
              message: data.desc
            });
          }
        });
    },
    bindPhone(phone) {
      this.$router.push({ name: "register3", params: { phone: phone } });
      // this.$axios
      //   .post("/api/register/sendVerifyCode", { phone: phone })
      //   .then(res => {
      //     let data = res.data;
      //     if (data.code === 0) {
      //       this.$message({
      //         type: "success",
      //         message: "验证码已发送，请注意查收！"
      //       });
      //       this.$router.push({ name: "register3", params: { phone: phone } });
      //     } else {
      //       this.$message({
      //         type: "error",
      //         message: data.desc
      //       });
      //     }
      //   });
    },
    changBindPhone(phone){
      // alert(1)
      this.$router.push({name:"changeBindPhone",params:{phone:phone}})
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentpage = val;
    },
    handleClick(type) {
      // console.log(type);
      if (type === "PERSONAL") {
        this.editPersonalInfoPri = true;
        // this.$router.push('editPri')
      } else if (type == "ENTERPRISE") {
        this.editPersonalInfoOrg = true;
        // this.$router.push('editOrg')
      }
      this._getCountryList();
    },
    editPersonalInfo(formName) {
      //编辑个人信息
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/userManage/priUserEdit", {
              userID: localStorage.userID,
              userFirstName: this.form.userFirstName,
              userLastName: this.form.userLastName,
              email: this.form.emial,
              orgName: this.form.orgName,
              title: this.form.title,
              phone: this.form.phone,
              department: this.form.department,
              country: this.form.country,
              state: this.form.state,
              location: this.form.location,
              orgPhone: this.form.orgPhone,
              address: this.form.address,
              orgRequest: this.form.isRequstOrgUser
            })
            .then(res => {
              let data = res.data;
              if (data.code === 0) {
                this._getPersonalInfo();
                this.$message({
                  message: data.desc,
                  type: "success"
                });
                this.editPersonalInfoPri = false;
              } else {
                this.$message({
                  message: data.desc,
                  type: "error"
                });
              }
            });
        }
      });
    },
    editOrganInfo() {
      //编辑企业信息
      this.$axios
        .post("/api/userManage/orgUserEdit", {
          userID: localStorage.userID,
          userFirstName: this.form.userFirstName,
          userLastName: this.form.userLastName,
          email: this.form.emial,
          title: this.form.title,
          phone: this.form.phone,
          department: this.form.department,
          address: this.form.address
        })
        .then(res => {
          let data = res.data;
          if (data.code === 0) {
            this._getPersonalInfo();
            this.$message({
              message: data.desc,
              type: "success"
            });
            this.editPersonalInfoOrg = false;
          }else{
            this.$message({
              message: data.desc,
              type: "error"
            });
          }
        });
    },
    addContact(formName) {
      //添加常用联系人
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/userManage/favoriteContactAdd", {
              favoriteContactFirstName: this.addContactForm
                .favoriteContactFirstName,
              favoriteContactLastName: this.addContactForm
                .favoriteContactLastName,
              favoriteContactEmail: this.addContactForm.favoriteContactEmail,
              favoriteContactPhone: this.addContactForm.favoriteContactPhone,
              favoriteContactOrgPhone: this.addContactForm
                .favoriteContactOrgPhone,
              favoriteContactTitle: this.addContactForm.favoriteContactTitle,
              favoriteContactDepartment: this.addContactForm
                .favoriteContactDepartment
            })
            .then(res => {
              let data = res.data;
              if (data.code === 0) {
                // console.log(data);
                this.$message({
                  type: "success",
                  message: data.desc
                });
                this._getContactList();
                this.addContactDialog = false;
              } else {
                this.$message({
                  type: "error",
                  message: data.desc
                });
              }
            });
        }
      });
    },
    deleteContactMan(favoriteContactID) {
      this.$confirm("删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/api/userManage/favoriteContactDelete", {
              favoriteContactID: favoriteContactID
            })
            .then(res => {
              let data = res.data;
              if (data.code === 0) {
                this._getContactList();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
                this.$message({
                  type: "error",
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
    editContactMan(favoriteContactID) {
      this.$axios
        .post("/api/userManage/favoriteContactDetail", {
          favoriteContactID: favoriteContactID
        })
        .then(res => {
          let data = res.data;
          if (data.code === 0) {
            this.editContactForm.favoriteContactID =
              data.data.favoriteContactID;
            this.editContactForm.favoriteContactLastName =
              data.data.favoriteContactLastName;
            this.editContactForm.favoriteContactFirstName =
              data.data.favoriteContactFirstName;
            this.editContactForm.favoriteContactEmail =
              data.data.favoriteContactEmail;
            this.editContactForm.favoriteContactPhone =
              data.data.favoriteContactPhone;
            this.editContactForm.favoriteContactOrgPhone =
              data.data.favoriteContactOrgPhone;
            this.editContactForm.favoriteContactTitle =
              data.data.favoriteContactTitle;
            this.editContactForm.favoriteContactDepartment =
              data.data.favoriteContactDepartment;
            this.editContactDialog = true;
          } else {
            this.$message({
              type: "error",
              message: data.desc
            });
          }
        });
    },
    editContact(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/userManage/favoriteContactEdit", {
              favoriteContactID: this.editContactForm.favoriteContactID,
              favoriteContactFirstName: this.editContactForm
                .favoriteContactFirstName,
              favoriteContactLastName: this.editContactForm
                .favoriteContactLastName,
              favoriteContactEmail: this.editContactForm.favoriteContactEmail,
              favoriteContactPhone: this.editContactForm.favoriteContactPhone,
              favoriteContactOrgPhone: this.editContactForm
                .favoriteContactOrgPhone,
              favoriteContactDepartment: this.editContactForm
                .favoriteContactDepartment,
              favoriteContactTitle: this.editContactForm.favoriteContactTitle
            })
            .then(res => {
              let data = res.data;
              if (data.code === 0) {
                //   console.log(data)
                this._getContactList();
                this.$message({
                  type: "success",
                  message: data.desc
                });
                this.editContactDialog = false;
              } else {
                this.$message({
                  type: "error",
                  message: data.desc
                });
              }
            });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.personalCenter-wrapper {
  .personal-content {
    .col {
      height: 36px;
      .tb-content {
        font-size: 12px;
        color: #666;
      }
    }
  }
  .editDialog {
    .tips {
      p {
        font-size: 12px;
        line-height: 20px;
        margin: 0 0 5px;
      }
    }
    .el-form-item--medium .el-form-item__content {
      margin-left: 0 !important;
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
  }
}
</style>
<style>
.select-country .el-input--medium .el-input__inner {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.personalCenter-wrapper .editDialog .el-dialog__body {
  padding-top: 10px;
  padding-bottom: 15px;
}
.personalCenter-wrapper
  .editDialog
  .el-form-item--medium
  .el-form-item__content {
  margin-left: 0 !important;
}
</style>
