<template>
	<div class="orderCertificate">
		<VuePageVisibility 
			@documentInactive="documentInactive" 
			@documentActive="documentActive" >
		</VuePageVisibility>
    <!-- <div class="personal-title"> <img src="../../../assets/userCenter.png">个人中心</div> -->
    <div class="orderSteps-conatin">
      <el-steps :active="active" finish-status="success" simple style="padding: 15px;border-bottom:1px solid #ddd;">
        <el-step v-for="item in stepNameList" :key="item" :title="item">{{item}}</el-step>
      </el-steps>
      <div style="width:880px;margin: 20px;">
        <!--csrLmain-->
        <div class="csr clear" v-if="active===0">
          <!--CSR左侧-->
          <div class="csrL fl">
            <el-radio-group v-model="csr.radio">
              <el-radio :label="2">系统生成</el-radio>
              <el-radio :label="1">粘贴CSR文件文本</el-radio>
            </el-radio-group>
            <div v-if="csr.radio===1" class="csrLmain">
              <p class="tips">请使用纯文本编辑器打开您的CSR文件，复制所有文件内容，并将其粘贴到以下输入框中。</p>
              <el-input type="textarea" :rows="10" placeholder="请粘贴CSR" v-model="csr.textarea"  class="mb20">
              </el-input>             
            </div>
            <div v-if="csr.radio===2" class="csrLmain">
              <p class="tips">请选择需要保存该证书私钥的位置。</p>
              <el-form ref="csrForm" :model="csr" :rules="csrRules" label-width="80px" label-position="left" class="mb20">
                <!-- <el-form-item label="区域选择" >
                  <el-select v-model="csr.region" placeholder="区域选择" class="conditionInput">
                    <el-option label="区域选择" value=""></el-option>
                  </el-select>
                </el-form-item> -->
                <el-form-item label="密钥算法" prop="algorithm">
                  <el-select v-model="csr.algorithm" placeholder="密钥算法" class="conditionInput" @change="selectAlog">
                    <el-option label="ECC" value="ECC">ECC</el-option>
                    <el-option label="RSA" value="RSA">RSA</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="主域名" prop="domainName">
                  <el-input v-model="csr.domainName" placeholder="主域名" class="conditionInput"></el-input>
                </el-form-item>
              </el-form>
              <p class="tips">当您选定上述区域后，该区域下的CIM客户端将自动为您创建CSR，并为您保管证书对应的私钥。</p>
              <!-- <p class="tC">
                <el-button type="primary" @click="onNext">下一步</el-button>
              </p> -->
            </div>
          </div>
          <!--CSR右侧-->
          <div class="csrR fr">
            <div v-if="csr.radio===1">
              <h1 class="mb10">温馨提示</h1>
              <p class="mb10">CSR（Certificate Signing Request）是您在向证书颁发机构订购证书时必须提供的证书签名请求文件。在您生成CSR文件的同时，还会生成与之配对的私钥文件。</p>
              <p class="mb10">如果您需要自行在服务器上生成CSR，可参考我们的相关
                <a href="javascript:;">指导文档</a>。</p>
              <p class="mb10">除非您绝对信任服务商提供的在线服务，否则请避免使用网页在线生成CSR的方式创建证书请求。涉及高安全级别要求的网络应用，通常应禁止使用任何第三方服务商提供的 在线CSR生成工具，以避免可能存在的私钥泄露风险。
              </p>
              <p class="mb10">如需在线生成CSR，可选择
                <a href="javascript:;"> CSR在线生成工具</a>。我们确保不会在服务器上保存您的私钥备份。</p>
              <p class="mb10">
                <a href="javascript:;">隐私保护</a>
                <a href="javascript:;">服务协议</a>
              </p>
            </div>
            <div v-if="csr.radio===2">
              <h1 class="mb10">温馨提示</h1>
              <p class="mb10">当您管理多个相互隔离的数据中心时，可通过选择不同区域中的CIM客户端来帮助您自动生成CSR文件，从而省去繁琐的CSR生成步骤。CIM客户端在为您创建CSR文件的同时，还会为您本地加密保存证书私钥，确保私钥安全。</p>
              <p class="mb10">仅当CIM客户端处于在线状态时，才可被选择为您自动创建证书CSR。如果您无法选择期望保存证书的区域，请检查相应区域中的CIM客户端是否已启动，并处于已登录状态。</p>
              <p class="mb10">证书完成签发后，将自动下载并存储到您当前选定的区域中。并由当前区域下的CIM客户端保存证书密钥对。</p>

            </div>
          </div>
        </div>
        <div v-if="active===0">
           <p v-if="csr.radio===1" class="tC">
            <el-button type="primary" class="orderBtn" @click="pasteCsrNext">下一步</el-button>
          </p>
          <p v-if="csr.radio===2" class="tC">
            <el-button type="primary" class="orderBtn"  @click="systemCsrNext">下一步</el-button>
          </p>
        </div>
        <!--域名验证-->
        <div class="domainVerification clear" v-if="active===1">
          <div style="width: 880px; margin: 20px">
            <div class="default">
              <span >
                主域名：	
                <el-input class="conditionInput" placeholder="主域名" v-model="domainVerification.domainName" :disabled="true"></el-input>
              </span>
              <span style="margin-left:60px;">
                密钥算法：
                <el-input class="conditionInput" placeholder="密钥算法" v-model="domainVerification.algorithm" :disabled="true"></el-input>
              </span>
            </div>
            <p class="tips ml50">主域名将显示在证书的“颁发给"位置。</p>
            <div class="domainShow overflow">
              <div class="fl" v-show="showDW || showD">
                <div class="condition clear" v-show="routeParams.dCount !== 0 && routeParams.funType === '多域名通配符'">
                  <el-form ref="dForm" label-width="120px" :model="domianForm">
                    <span  class="fl" style="line-height: 40px;">
                      附加完整域名：								
                    </span>
                    <el-form-item  :prop="'dCount1List.' + index + '.name'" v-if="routeParams.funType === '多域名'"  v-for="(item,index) in domianForm.dCount1List" :key="index"
                    :rules="{required: true, message: '域名不能为空', trigger: 'blur'}"
                    >
                      <el-input  placeholder="请输入附加完整域名" v-model="item.name" class="conditionInput" style="display: block;width:240px;"></el-input>
                    </el-form-item>
                    <el-form-item  :prop="'dCountList.' + index + '.name'" v-if="routeParams.funType === '多域名通配符'" v-for="(item,index) in domianForm.dCountList" :key="index"
                    :rules="{required: true, message: '域名不能为空', trigger: 'blur'}"
                    >
                      <el-input  placeholder="请输入附加完整域名" v-model="item.name" class="conditionInput" style="display: block;width:240px;"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="condition clear" v-show="domianForm.dCount1List && routeParams.funType === '多域名'">
                  <el-form ref="dForm" label-width="120px" :model="domianForm">
                    <span  class="fl" style="line-height: 40px;">
                      附加完整域名：
                    </span>
                    <el-form-item  :prop="'dCount1List.' + index + '.name'" v-if="routeParams.funType === '多域名'"  v-for="(item,index) in domianForm.dCount1List" :key="index"
                    :rules="{required: true, message: '域名不能为空', trigger: 'blur'}"
                    >
                      <el-input  placeholder="请输入附加完整域名" v-model="item.name" class="conditionInput" style="display: block;width:320px;"></el-input>
                    </el-form-item>
                    <el-form-item  :prop="'dCountList.' + index + '.name'" v-if="routeParams.funType === '多域名通配符'" v-for="(item,index) in domianForm.dCountList" :key="index"
                    :rules="{required: true, message: '域名不能为空', trigger: 'blur'}"
                    >
                      <el-input  placeholder="请输入附加完整域名" v-model="item.name" class="conditionInput" style="display: block;width:320px;"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
              <div :class="routeParams.dCount !== 0 ?'ml50 fl':'fl'" v-show="showDW">
                <div class="condition mr20 clear" v-show="routeParams.dWCount !== 0 ">
                  <el-form ref="dWForm" label-width="120px" :model="domianForm">
                    <span class="fl" style="line-height: 40px;">
                      附加通配符域名：								
                    </span>
                    <el-form-item  :prop="'dWCountList.' + index + '.name'" v-for="(item,index) in domianForm.dWCountList" :key="index"
                    :rules="{required: true, message: '域名不能为空', trigger: 'blur'}"
                    >
                      <el-input placeholder="请输入附加通配符域名" v-model="item.name" class="conditionInput" style="display: block;width:270px;"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
            <div class="mb10">
              域名所有权验证方式:
              <el-radio-group v-model="domainVerification.radio" class="mr20">
                <el-radio label="DNS">DNS验证</el-radio>
                <el-radio label="FILE">文件验证</el-radio>
                <el-radio v-show="routeParams.type !== 'DV'" label="EMAIL">邮件验证</el-radio>
              </el-radio-group>
              <div class="prompt">
                <el-popover placement="right" width="400" trigger="hover">
                  <div class="what">
                    <h1>什么是域名所有权验证</h1>
                    <p>为确认您是域名所有者，或被授权使用这些域名申请证书，证书颁发机构需通过特定验证策略验证域名所有权。</p>
                    <h1>我该选择哪种验证方式？</h1>
                    <p>OV/EV订单支持下单后联系鉴证客服修改域名验证方式。DV订单如需修改验证方式，请取消订单后重新下单。</p>
                    <p style="color:#666;line-height:24px;">DNS验证：</p>
                    <p>下单后需要在您的域名管理控制台中添加一条指定的 TXT 解析记录，等待证书颁发机构验证域名解析记录。</p>
                    <p style="color:#666;line-height:24px;">文件验证：</p>
                    <p>下单后需要在您的网站根目录下创建指定文件夹，并在文件夹中放置指定文本内容的 fileauth.htm 文件。等待证书颁发机构验证文件信息。</p>
                    <p style="color:#666;line-height:24px;">邮件验证：</p>
                    <p>下单后系统将自动发送邮件到admin@domain.com、administrator@domain.com、webmaster@domain.com、postmaster@domain.com、hostmaster@domain.com，及Whois可查询到的域名管理员邮箱。通过邮件中的指导完成验证。</p>
                  </div>
                  <a href="javascript:;" style="font-size:12px" slot="reference">什么是域名所有权验证?我该选择哪种验证方式？</a>
                </el-popover>
              </div>
            </div>
            
            <p class="tC mt60">
              <el-button type="primary" class="orderBtn preBtn" :disabled="this.routeParams.from==='edit'" @click="onPre">上一步</el-button>
              <el-button type="primary" class="orderBtn"  @click="domainVerifyNext">下一步</el-button>
            </p>
          </div>
        </div>
        <!--组织信息-->
        <div class="organizationalInfo clear" v-if="routeParams.type === 'DV'?false:active===2">
          <div class="overflow">
            <el-radio-group v-model="nOrganiz">
              <el-radio label="0" :disabled="userType === 'PERSONAL' ? true : false">已验证的企业</el-radio>
              <el-radio label="1">我的常用组织</el-radio>
            </el-radio-group>
          </div>
          <div class="clear mt20 overflow">
            <div class="fl" style="width: 390px;background-color:#f8f8f8">
              <div class="borderS p20 borderR">
                <div>
                  <div style="height: 195px;">
                    <el-scrollbar style="height: 100%">
                      <el-radio-group v-show="nOrganiz==='0'" v-model="nVerification">
                        <p v-if="verificationList.length > 0" v-for="(item,index) in verificationList" :key="index" :class="index<verificationList.length-1?'mb10':''">
                          <el-radio :label="index" style=" width: 335px; margin-right: 10px;" :key='item.subOrgID' :title="item.subOrgName">
                            {{item.subOrgName | Slice(24)}}
                          </el-radio>
                        </p>
                        <p v-if="verificationList.length === 0" style="font-size:16px;">暂无已验证企业消息!</p>
                      </el-radio-group>
                      <el-radio-group v-if="nOrganiz==='1' && usedList.length>0" v-model="nUsed">
                        <p v-if="usedList.length>0" v-for="(item,index) in usedList" :key="index" :class="index<usedList.length-1?'mb10':''">
                          <el-radio :label="index" style=" width: 335px; margin-right: 10px;" :key='item.favoriteOrgID' :title="item.favoriteOrgName">
                            {{item.favoriteOrgName | Slice(24)}}
                          </el-radio>
                          </p>
                          <p v-if="usedList.length === 0">暂无常用组织消息!</p>
                      </el-radio-group>
                    </el-scrollbar>
                  </div>
                  <p class="tR">
                    <!-- <a href="#/enterpriseCenter/enterpriseManage" v-if="nOrganiz === '0'" target="_blank">管理已验证企业</a>
                    <a @click="toClientPersonal" v-else target="_blank">管理我的常用组织</a> -->
                    <a href="javascript:volid(0)" v-if="nOrganiz === '0'"></a>
                    <a @click="toClientPersonal" v-else target="_blank">管理我的常用组织</a>
                  </p>
                  <div class="tR tips" v-show="nOrganiz === '0'">仅企业管理员可对已验证企业信息进行管理</div>
                </div>
              </div>

            </div>
            <div v-if="nOrganiz==='1' && usedList.length > 0" class="organizationalR fr" style="width: 430px;">		
              <p>组织名称：<span>{{nUsedListInfo.favoriteOrgName}}</span></p>
              <p>部门名称：<span>{{nUsedListInfo.favoriteOrgDepartment}}</span></p>
              <p>座机号码：<span>{{nUsedListInfo.phone}}</span></p>
              <p>国家代码：<span>{{nUsedListInfo.country}}</span></p>
              <p>省市名称：<span>{{nUsedListInfo.state}}</span></p>
              <p>市或区名：<span>{{nUsedListInfo.location}}</span></p>
              <p>邮政编码：<span>{{nUsedListInfo.zipCode}}</span></p>
              <p>地&nbsp;&nbsp;&nbsp;&nbsp; 址：<span>{{nUsedListInfo.address}}</span></p>
            </div>
            <div v-if="routeParams.from === 'edit' && nOrganiz==='2'" class="organizationalR fr" style="width: 430px;">		
              <p>组织名称：<span>{{nUsedListInfo.favoriteOrgName}}</span></p>
              <p>部门名称：<span>{{nUsedListInfo.favoriteOrgDepartment}}</span></p>
              <p>座机号码：<span>{{nUsedListInfo.phone}}</span></p>
              <p>国家代码：<span>{{nUsedListInfo.country}}</span></p>
              <p>省市名称：<span>{{nUsedListInfo.state}}</span></p>
              <p>市或区名：<span>{{nUsedListInfo.location}}</span></p>
              <p>邮政编码：<span>{{nUsedListInfo.zipCode}}</span></p>
              <p>地&nbsp;&nbsp;&nbsp;&nbsp; 址：<span>{{nUsedListInfo.address}}</span></p>
            </div>
            <div v-if="nOrganiz==='0' && verificationList.length > 0" class="organizationalR fr" style="width: 430px;">		
              <p>企业名称：<span>{{nVerifyListInfo.subOrgName}}</span></p>
              <p>部门名称：<span>{{nVerifyListInfo.subOrgUnitName}}</span></p>
              <p>企业电话：<span>{{nVerifyListInfo.subOrgPhone}}</span></p>
              <p>国家代码：<span>{{nVerifyListInfo.country}}</span></p>
              <p>省市名称：<span>{{nVerifyListInfo.state}}</span></p>
              <p>市或区名：<span>{{nVerifyListInfo.location}}</span></p>
              <p>邮政编码：<span>{{nVerifyListInfo.zipCode}}</span></p>
              <p>地&nbsp;&nbsp;&nbsp;&nbsp; 址：<span>{{nVerifyListInfo.address}}</span></p>
            </div>
          </div>
          <p class="tC mt50">
            <el-button type="primary" class="orderBtn preBtn"  @click="onPre">上一步</el-button>
            <el-button type="primary"  class="orderBtn" @click="organInfoNext">下一步</el-button>
          </p> 
        </div>
        <!--联系人信息-->
        <div class="contactsInfo clear" v-if="routeParams.type === 'DV'?active===2:active===3">
          <a @click="toClientPersonal"><el-button type="text" style="padding:0;padding-bottom:5px;">管理常用联系人</el-button></a>
          <div class="overflow">
            <div class="leftContact fl">
              <div class="tit">
                <span>公司联系人</span>
                <el-button style="padding:0;margin-bottom:5px;" type="text" @click="selectContacts('contactsForm')">选择常用联系人</el-button>
              </div>
              <el-form :model="contactsForm" :rules="contactsRules" status-icon  ref="contactsForm" label-width="60px" >
                <el-form-item label="姓氏" prop="favoriteContactLastName">
                  <el-input  v-model="contactsForm.favoriteContactLastName" disabled></el-input>
                </el-form-item>
                <el-form-item label="名字" prop="favoriteContactFirstName">
                  <el-input v-model="contactsForm.favoriteContactFirstName" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="favoriteContactEmail">
                  <el-input v-model="contactsForm.favoriteContactEmail" disabled></el-input>
                </el-form-item>
                <el-form-item label="座机" prop="favoriteContactOrgPhone">
                  <el-input v-model="contactsForm.favoriteContactOrgPhone" disabled></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="favoriteContactPhone">
                  <el-input v-model="contactsForm.favoriteContactPhone" disabled></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="favoriteContactTitle">
                  <el-input v-model="contactsForm.favoriteContactDepartment" disabled></el-input>
                </el-form-item>
                <el-form-item label="职务" prop="favoriteContactTitle">
                  <el-input v-model="contactsForm.favoriteContactTitle" disabled></el-input>
                </el-form-item>
              </el-form>
              <div style="text-align:right;font-size:12px;color:#388be7;cursor:pointer;" @click="syncToContactsTect"><img style="vertical-align:middle;" src="/static/sync1.png"/>同步到技术联系人</div>
            </div>
            <div class="centerContact fl" style="width:140px;visibility:hidden">
              <div class="centerWrap">
                <el-button type="text" @click="syncToContactsTect" style="font-size:12px;position:relative;top:16px;left:10px">同步到技术联系人</el-button>
                <div class="arrow"><img src="/static/arrow.png" alt="" width="120px"></div>
                <div class="roateArrow"><img src="/static/arrow.png" alt="" width="120px"></div>
                <el-button type="text" @click="syncToContacts" style="font-size:12px;position:relative;top:-16px;left:10px">同步到公司联系人</el-button>
              </div>
            </div>
            <div class="rightContact fl">
              <div class="tit">
                <span>技术联系人</span>
                <el-button type="text" @click="selectContacts('contactsTectForm')">选择常用联系人</el-button>
              </div>
              <el-form :model="contactsTectForm" :rules="contactsRules" status-icon  ref="contactsTectForm" label-width="60px" >
                <el-form-item label="姓氏"  prop="favoriteContactLastName">
                  <el-input v-model="contactsTectForm.favoriteContactLastName" disabled></el-input>
                </el-form-item>
                <el-form-item label="名字"  prop="favoriteContactFirstName">
                  <el-input v-model="contactsTectForm.favoriteContactFirstName" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="favoriteContactEmail">
                  <el-input v-model="contactsTectForm.favoriteContactEmail" disabled></el-input>
                </el-form-item>
                <el-form-item label="座机" prop="favoriteContactOrgPhone">
                  <el-input v-model="contactsTectForm.favoriteContactOrgPhone" disabled></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="favoriteContactPhone" >
                  <el-input v-model="contactsTectForm.favoriteContactPhone" disabled></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="favoriteContactDepartment" >
                  <el-input v-model="contactsTectForm.favoriteContactDepartment" disabled></el-input>
                </el-form-item>
                <el-form-item label="职务" prop="favoriteContactTitle">
                  <el-input v-model="contactsTectForm.favoriteContactTitle" disabled></el-input>
                </el-form-item>
              </el-form>
              <div style="text-align:right;font-size:12px;color:#388be7;cursor:pointer" @click="syncToContacts"><img style="vertical-align:middle;" src="/static/sync2.png"/>同步到公司联系人</div>
            </div>
          </div>
          <p class="tC" style="margin:0px;margin-top:20px;">
            <el-button type="primary" class="orderBtn preBtn" @click="onPre">上一步</el-button>
            <el-button  class="orderBtn" v-if="routeParams.type === 'DV'" type="primary" @click="submitOrder">提交订单</el-button>
            <el-button v-else type="primary" class="orderBtn" @click="selectContactsNext">下一步</el-button>
          </p>
        </div>
        <!--认证资料-->
        <div class="authenticationData mt50 clear" v-if="routeParams.type === 'DV'?false:active===4">
          <div class="condition">
            企业营业执照：
            <el-input class="conditionInput" placeholder="请上传企业营业执照" v-model="enterpriseFile['name']"></el-input>
            <input ref="fileInput" type="file" style="display:none" @change="checkFile">	
            <el-button type="primary" style="height:30px;line-height:30px;padding:0 20px;font-size:12px;" @click="uploadFile('enterprise')">点击上传</el-button>
          </div>
          <div class="mb20">
            <span class="condition">
              银行开户许可：
              <el-input class="conditionInput" placeholder="请上传银行开户许可" v-model="bankFile['name']"></el-input>
              <el-button type="primary" style="height:30px;line-height:30px;padding:0 20px;font-size:12px;" @click="uploadFile('bank')">点击上传</el-button>
            </span>
          </div>
          <div class="tips">
            <div class="mb10">您使用的是已验证企业信息，系统中已留存您的企业营业执照。</div>
            <div class="mb10">如果您的企业营业执照近期进行过年检，推荐您重新上传最新年检过的执照。</div>
            <div class="mb10">如果您不清楚系统留存的执照信息是否是最新，并且没有上传新的执照信息，我们后续在验证信息过程中，可能会通过邮件向您索取最新的执照信息。</div>
            <div class="tC mt50">
              <el-button type="primary" class="orderBtn preBtn" @click="onPre">上一步</el-button>
              <el-button type="primary" class="orderBtn" @click="submitOrder">提交订单</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
		<el-dialog title="选择常用联系人" :visible.sync="selectContactsDialog" width="500px">
			<!-- <el-scrollbar style="height: 100%"> -->
				<el-radio-group v-model="nContacts" v-if="contactsList.length">
					<p v-for="(item,index) in contactsList" :key="index" :class="index<contactsList.length-1?'mb10':''">
						<el-radio :label="index" style=" width: 335px; margin-right: 10px;" :key='item.favoriteContactID' @change="selectRadio">
							{{item.favoriteContactLastName}}{{item.favoriteContactFirstName}}({{item.favoriteContactEmail}})
						</el-radio>
					</p>
				</el-radio-group>
			<!-- </el-scrollbar> -->
			<div slot="footer" class="dialog-footer">
				<el-button @click="selectContactsDialog = false">取 消</el-button>
				<el-button type="primary" @click="sureSelect">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import VuePageVisibility from "vue-page-visibility-awesome";
export default {
  data() {
    return {
      fileFlag: "",
      flag: true,
      userType: "",
      stepNameList: [],
      active: 0, //步骤条
      orderInfo:{},
      contactInfo:[],
      routeParams: {
        dCount1: 2,
        dCount: 1,
        dWCount: 1,
        funType: "",
        type: "",
        productCode: "",
        years: ""
      },
      domianForm: {
        dCountList: [],
        dCount1List: [],
        dWCountList: []
      },
      showDW: false,
      showD: false,
      contactsForm: {
        favoriteContactID: "",
        favoriteContactFirstName: "",
        favoriteContactLastName: "",
        favoriteContactEmail: "",
        favoriteContactPhone: "",
        favoriteContactOrgPhone: "",
        favoriteContactTitle: "",
        favoriteContactDepartment: ""
      },
      contactsTectForm: {
        favoriteContactID: "",
        favoriteContactFirstName: "",
        favoriteContactLastName: "",
        favoriteContactEmail: "",
        favoriteContactPhone: "",
        favoriteContactOrgPhone: "",
        favoriteContactTitle: "",
        favoriteContactDepartment: ""
      },
      csr: {
        radio: 2, //选择
        textarea: "", //文件文本
        region: "", //区域选择
        algorithm: "", //密钥算法
        domainName: "" //主域名
      },
      csrID:"",
      domainVerification: {
        algorithm: "",
        domainName: "",
        radio: "DNS"
      },
      nOrganiz: "0", //组织信息-当前组织
      nUsed: 0, //我常用的组织-默认选中第一个
      nVerification: 0, // 已验证的企业-默认选中第一个
      verificationList: [], //已验证企业信息列表
      usedList: [], //常用组织信息列表
      nVerifyListInfo: {
        //当前已选详情 已验证企业
        subOrgID: "",
        subOrgName: "",
        subOrgUnitName: "",
        subOrgPhone: "",
        country: "",
        state: "",
        location: "",
        zipCode: "",
        address: "",
        status: ""
      },
      nUsedListInfo: {
        //当前已选详情 常用组织
        favoriteOrgID: "",
        favoriteOrgName: "",
        favoriteOrgDepartment: "",
        phone: "",
        country: "",
        state: "",
        location: "",
        zipCode: "",
        address: ""
      },
      nContacts: 0,
      nContactsInfo: [],
      selectContactsDialog: false,
      contactsList: [],
      selectName: "",
      selectLable: 0,
      csrRules:{
        algorithm:[{ required: true, message: "请选择加密算法", trigger: "change" }],
        domainName:[{ required: true, message: "请填写域名", trigger: "change" }]
      },
      contactsRules: {
        //联系人表单验证
        favoriteContactFirstName: [
          { required: true, message: "请选择名字", trigger: "change" }
        ],
        favoriteContactLastName: [
          { required: true, message: "请选择姓氏", trigger: "change" }
        ],
        favoriteContactEmail: [
          { required: true, message: "请选择姓氏", trigger: "change" }
        ],
        favoriteContactPhone: [
          { required: true, message: "请选择邮箱", trigger: "change" }
        ],
        favoriteContactOrgPhone: [
          { required: true, message: "请选择电话", trigger: "change" }
        ],
        favoriteContactTitle: [
          { required: true, message: "请选择职务", trigger: "change" }
        ],
        favoriteContactDepartment: [
          { required: true, message: "请选择部门", trigger: "change" }
        ]
      },
      rules: {},
      authData1: "",
      authData2: "",
      enterpriseFile: {
        name: ""
      },
      bankFile: {
        name: ""
      }
    };
  },
  mounted() {
    window.addEventListener("message",(e)=>{
      if(e.data.jsonRes.type === "DV"){
        this.active = 1;
        this.csr.textarea = e.data.jsonRes.csr;
        this.csrID = e.data.jsonRes.id;
        this.analysisDomianFunc();
      }else{
        // alert(e.data);
        this.active = 3;
        this.csr.textarea = e.data.jsonRes.csr;
        this.csrID = e.data.jsonRes.id;
      }
      
    })
  
    // this.routeParams = this.$route.params; //获取上一个页面传递过来的参数
    if(Object.keys(this.$route.query).length == 0){
      this.routeParams = this.$route.params;
    }
    if (Object.keys(this.$route.params).length == 0) {
      this.routeParams = this.$route.query
    }
    // this.routeParams = this.$route.query || this.$route.params; //获取上一个页面传递过来的参数
    
    // console.log("this.routeParams")
    // console.log(this.routeParams)
    if (this.routeParams.type === "DV") {
      //  DV时只有四个步骤，OV-EV有六个步骤
      this.stepNameList = ["CSR", "域名验证", "联系人信息"];
    } else {
      this.stepNameList = [
        "CSR",
        "域名验证",
        "组织信息",
        "联系人信息",
        "认证资料"
      ];
    }
    this.userType = localStorage.userType;
    // alert(this.userType)
    if (this.userType === "PERSONAL") {
      this.nOrganiz = "1";
    } else {
      this.nOrganiz = "0";
    }
    if (this.routeParams.from === "edit") {
      this.active = 1;
      this.$axios
        .post("/api/orderManage/detail", { orderID: this.routeParams.orderID })
        .then(res => {
          let data = res.data;
          if (data.code === 0) {
            // console.log("data");
            // console.log(data);
            this.orderInfo = data.data.orderInfo;

            this.domainVerification.radio = this.orderInfo.authMethod;
            //获取组织信息
            this.nOrganiz = '2'
            this.nUsedListInfo.favoriteOrgName = this.orderInfo.orgName;
            this.nUsedListInfo.favoriteOrgDepartment = this.orderInfo.orgUnit;
            this.nUsedListInfo.phone = this.orderInfo.phone;
            this.nUsedListInfo.country = this.orderInfo.country;
            this.nUsedListInfo.state = this.orderInfo.state;
            this.nUsedListInfo.location = this.orderInfo.location;
            this.nUsedListInfo.zipCode = this.orderInfo.postcode;
            this.nUsedListInfo.address = this.orderInfo.address;

            //获取联系人信息
            this.contactInfo = data.data.contactInfo;
            this.contactsForm.favoriteContactFirstName = this.contactInfo[0].firstName;
            this.contactsForm.favoriteContactLastName = this.contactInfo[0].lastName;
            this.contactsForm.favoriteContactEmail = this.contactInfo[0].email;
            this.contactsForm.favoriteContactPhone = this.contactInfo[0].firstName;
            this.contactsForm.favoriteContactOrgPhone = this.contactInfo[0].phone;
            this.contactsForm.favoriteContactTitle = this.contactInfo[0].title;
            this.contactsForm.favoriteContactDepartment = this.contactInfo[0].department;

            this.contactsTectForm.favoriteContactFirstName = this.contactInfo[1].firstName;
            this.contactsTectForm.favoriteContactLastName = this.contactInfo[1].lastName;
            this.contactsTectForm.favoriteContactEmail = this.contactInfo[1].email;
            this.contactsTectForm.favoriteContactPhone = this.contactInfo[1].firstName;
            this.contactsTectForm.favoriteContactOrgPhone = this.contactInfo[1].phone;
            this.contactsTectForm.favoriteContactTitle = this.contactInfo[1].title;
            this.contactsTectForm.favoriteContactDepartment = this.contactInfo[1].department;

            this.$nextTick(() => {
              let dCountListArray = this.orderInfo.SANs_Normal;
              let dWCountListArray = this.orderInfo.SANs_WildCard;
              for (let i = 0; i < dCountListArray.length; i++) {
                this.domianForm.dCountList.push({ name: dCountListArray[i] });
                this.domianForm.dCount1List.push({ name: dCountListArray[i] });
              }
              for (let i = 0; i < dWCountListArray.length; i++) {
                this.domianForm.dWCountList.push({ name: dWCountListArray[i] });
              }
            });

            this.routeParams.type = this.orderInfo.productType;
            if (this.routeParams.type === "DV") {
              this.stepNameList = ["CSR", "域名验证", "联系人信息"];
            } else {
              this.stepNameList = ["CSR","域名验证","组织信息","联系人信息","认证资料"]
            }
            this.routeParams.productCode = this.orderInfo.productCode;
            this.routeParams.funType = this.orderInfo.function;
            this.routeParams.dCount1 = this.orderInfo.SANs_Normal_Count;
            this.routeParams.dCount = this.orderInfo.SANs_Normal_Count;
            this.routeParams.dWCount = this.orderInfo.SANs_WildCard_Count;
            this.routeParams.years = this.orderInfo.validDate;
            this.csr.textarea = this.orderInfo.CSR;
            this.pasteCsrNext();
          }
        });
    }
  },
  methods: {
    uploadFile(value) {
      this.fileFlag = value;
      this.$refs.fileInput.value = "";
      this.$refs.fileInput.click();
    },
    selectAlog(e){
      this.csr.algorithm = e;
    },
    checkFile(e) {
      let file = e.target.files[0];
      let fromdata = new FormData();
      fromdata.append("file", file);
      this.$axios
        .post("/api/common/upload", fromdata)
        .then(res => {
          let data = res.data;
          if (data.code === 0) {
            let tempArr = res.data.data.split("/")
            if (this.fileFlag === "enterprise") {
              // this.enterpriseFile.name = res.data.data;
              this.enterpriseFile.name = tempArr[tempArr.length-1];
              this.authData2 = res.data.data;
            } else {
              this.bankFile.name = tempArr[tempArr.length-1];
              this.authData1 = res.data.data;
            }
          }else{
            this.$message({
              type:"error",
              message:data.desc
            })
          }
          
        })
        .catch(err => {
          alert(err);
        });
    },
    //上一步
    onPre() {
      this.flag = false;
      this.active--;
    },
    //下一步
    onNext() {
      this.active++;
    },
    getVerifyFunc() {
      //获取已验证企业列表
      if (this.userType === "ENTERPRISE") {
        this.$axios.post("/api/orgManage/subOrgList", {}).then(res => {
          //获取常用子企业列表
          this.verificationList = [];
          let data = res.data;
          if (data.code === 0) {
            let datalist = data.data.orgs;
            // console.log("datalist");
            // console.log(datalist);
            for (let item of datalist) {
              //过滤已验证的企业列表
              if (item.status === "AUTHED") {
                this.verificationList.push(item);
                this.nVerifyListInfo = this.verificationList[0];
              }
            }
          } else {
            this.$message({
              type: "error",
              message: data.desc
            });
          }
        });
      }
    },
    getUsedFunc() {
      //获取常用组织列表
      this.$axios.post("/api/userManage/favoriteOrgList", {}).then(res => {
        //获取常用组织列表
        let data = res.data;
        if (data.code === 0) {
          this.usedList = data.data.favoriteOrgs;
          this.nUsedListInfo = this.usedList[0];
        }
      });
    },
    analysisDomianFunc(){      
      if (this.routeParams.funType === "多域名") {
        this.domainVerification.domainName = this.csr.domainName;
        this.domainVerification.algorithm = this.csr.algorithm;
        this.showD = true;
        if (this.routeParams.from === "edit") {
        } else {
          this.domianForm.dCount1List = [];
          for (let i = 0; i < this.routeParams.dCount1 - 1; i++) {
            this.domianForm.dCount1List.push({ name: "" });
          }
        }
        
      } else if (this.routeParams.funType === "多域名通配符") {
        if (this.routeParams.dCount === 0) {
          if (this.csr.domainName.indexOf("*") >= 0) {
            this.$message({
              type:"error",
              message:"域名个数为0，CSR不能包含非通配符通用名！"
            })
            return;
          }else{
            this.domainVerification.domainName = this.csr.domainName;
            this.domainVerification.algorithm = this.csr.algorithm;
            if(this.flag){
              this.routeParams.dCount = 1
            }
          }
        }
        this.showD = true;
        this.showDW = true;
      
        if (this.domainVerification.domainName.indexOf("*") < 0) {
          //判断解析出的域名是否是通配符域名
          if (this.flag) {
            this.routeParams.dCount -= 1;
            this.flag = false;
          }
          // alert(this.routeParams.dCount)
        } else {
          this.routeParams.dWCount -= 1;
        }
        
        if (this.routeParams.from === "edit") {
        } else {
          this.domianForm.dCountList = [];
          for (let i = 0; i < this.routeParams.dCount; i++) {
            this.domianForm.dCountList.push({ name: "" });
          }
        }

      
        if (this.routeParams.from === "edit") {
        } else {
          this.domianForm.dWCountList = [];
          for (let i = 0; i < this.routeParams.dWCount; i++) {
            this.domianForm.dWCountList.push({ name: "" });
          }
        }
        // this.domianForm.dWCountList = [];
      }else{
        this.domainVerification.domainName = this.csr.domainName;
        this.domainVerification.algorithm = this.csr.algorithm;

      }
    },
    pasteCsrNext() {
      //csr下一步
      if (this.csr.textarea != "") {
        this.$axios
          .post("api/common/parseCSR", {
            CSR: this.csr.textarea
          })
          .then(res => {
            let data = res.data;
            if (data.code === 0) {
                this.domainVerification.domainName = data.data.commonName;
                // this.domainVerification.algorithm = data.data.signAlg;
                this.domainVerification.algorithm = data.data.keySize;
                if (this.routeParams.funType === "多域名") {
                  this.domainVerification.domainName = data.data.commonName;
                  // this.domainVerification.algorithm = data.data.signAlg;
                  this.domainVerification.algorithm = data.data.keySize;
                  this.showD = true;
                  if (this.routeParams.from === "edit") {
                  } else {
                    this.domianForm.dCount1List = [];
                    for (let i = 0; i < this.routeParams.dCount1 - 1; i++) {
                      this.domianForm.dCount1List.push({ name: "" });
                    }
                  }
                  
                } else if (this.routeParams.funType === "多域名通配符") {
                  if (this.routeParams.dCount === 0) {
                    if (data.data.commonName.indexOf("*") >= 0) {
                      this.$message({
                        type:"error",
                        message:"域名个数为0，CSR不能包含非通配符通用名！"
                      })
                      return;
                    }else{
                      this.domainVerification.domainName = data.data.commonName;
                      // this.domainVerification.algorithm = data.data.signAlg;
                      this.domainVerification.algorithm = data.data.keySize;
                      if(this.flag){
                        this.routeParams.dCount = 1
                      }
                    }
                  }
                  this.showD = true;
                  this.showDW = true;
                
                  if (this.domainVerification.domainName.indexOf("*") < 0) {
                    //判断解析出的域名是否是通配符域名
                    if (this.flag) {
                      this.routeParams.dCount -= 1;
                      this.flag = false;
                    }
                    // alert(this.routeParams.dCount)
                  } else {
                    this.routeParams.dWCount -= 1;
                  }
                  
                  if (this.routeParams.from === "edit") {
                  } else {
                    this.domianForm.dCountList = [];
                    for (let i = 0; i < this.routeParams.dCount; i++) {
                      this.domianForm.dCountList.push({ name: "" });
                    }
                  }

                
                  if (this.routeParams.from === "edit") {
                  } else {
                    this.domianForm.dWCountList = [];
                    for (let i = 0; i < this.routeParams.dWCount; i++) {
                      this.domianForm.dWCountList.push({ name: "" });
                    }
                  }
                  // this.domianForm.dWCountList = [];
                }
                this.active = 1;
              // }
              
            }
            // else if(data.code === 0){
            //   window.parent.parent.postMessage({timeDelay:true},"*");
            // }
            else{
              this.$message({
                type:"error",
                message:data.desc
              })
            }
          });
        
      } else {
        this.$message({
          type: "danger",
          message: "CSR不能为空,请粘贴CSR"
        });
      }
    },
    systemCsrNext(){
      this.$refs["csrForm"].validate(valid => {
        if (valid) {
          if (this.routeParams.type === "DV") {
            var sendJson = {};
            sendJson["cmd"] = "orderConfig";
            sendJson["method"] = "genCSROrder";
            sendJson["algorithm"] = this.csr.algorithm.toLowerCase();
            sendJson["domain"] =  this.csr.domainName;
            sendJson["orgName"] = "";
            sendJson["counCode"] = "CN";
            sendJson["departName"] = "";
            sendJson["province"] = "";
            sendJson["city"] = "";
            sendJson["id"] = 0;
            // sendJson["nonce"] = "nonce..1";
            sendJson["type"] = this.routeParams.type;
            // console.log(sendJson)
            // parent.sendDataDownload(sendJson);
            parent.sendData(sendJson);
          }else{
            this.analysisDomianFunc();
            this.active++;
          }
        }
      })
    },

    domainVerifyNext() {
        this.$refs["dForm"].validate(valid => {
          if (valid) {
            this.$refs["dWForm"].validate(valid => {
              if (valid) {
                // this.getVerifyFunc(); //获取已验证企业列表
                // this.getUsedFunc(); //获取常用组织列表
                // this.active++;
                // this.active++;
                 if (this.routeParams.from === "edit"){
                   this.active++;
                 }else{
                   this.getVerifyFunc(); //获取已验证企业列表
                    this.getUsedFunc(); //获取常用组织列表
                    this.active++;
                  }
               
              }
            });
          }
        });
    },
    sendMessage(organType){
      var sendJson = {};
      sendJson["cmd"] = "orderConfig";
      sendJson["method"] = "genCSROrder";
      sendJson["algorithm"] = this.csr.algorithm.toLowerCase();
      sendJson["domain"] =  this.csr.domainName;
      if(organType === "nUsed"){
        sendJson["orgName"] = this.nUsedListInfo.favoriteOrgName;
        sendJson["counCode"] = this.nUsedListInfo.country;
        sendJson["departName"] = this.nUsedListInfo.favoriteOrgDepartment;
        sendJson["province"] = this.nUsedListInfo.state;
        sendJson["city"] = this.nUsedListInfo.location;
        console.log("this.nUsedListInfo.favoriteOrgName")
        console.log(this.nUsedListInfo.favoriteOrgName)
      }else if(organType === "nVerify") {
        sendJson["orgName"] = this.nVerifyListInfo.subOrgName;
        sendJson["counCode"] = this.nVerifyListInfo.country;
        sendJson["departName"] = this.nVerifyListInfo.subOrgUnitName;
        sendJson["province"] = this.nVerifyListInfo.state;
        sendJson["city"] = this.nVerifyListInfo.location;
        console.log("this.nVerifyListInfo.subOrgName")
        console.log(this.nVerifyListInfo.subOrgName)
      }
     
      sendJson["id"] = 0;
      // sendJson["nonce"] = "nonce..1";
      console.log("sendJson")
      console.log(sendJson)
      parent.sendData(sendJson);
    },
    organInfoNext() {   
      if (this.csr.radio === 2) {     
        if (this.routeParams.type === "DV") {
        
        }else{
          console.log("this.nOrganiz")
          console.log(this.nOrganiz)
          if (this.nOrganiz === "0") {
            if (this.verificationList.length === 0) {
              this.$message({
                type: "error",
                message: "请添加已验证企业!"
              });
              return;
            } else if(this.nVerification === -1){
              this.$message({
                type: "error",
                message: "请选择已验证企业!"
              });
              return;
            } else {
              this.sendMessage("nVerify");
              // this.active++;
            }
          }
          if (this.nOrganiz === "1") {
            if (this.usedList.length === 0) {
              this.$message({
                type: "error",
                message: "请添加常用组织!"
              });
              return;
            }else if(this.nUsed === -1){
              this.$message({
                type: "error",
                message: "请选择常用组织!"
              });
              return;
            } else {
               this.sendMessage("nUsed");
              // this.active++;
            }
          }
          if (this.nOrganiz === "2") {
            this.active++;
          }
        }
      }else{
        if (this.routeParams.type === "DV") {
        
        }else{
          if (this.nOrganiz === "0") {
            if (this.verificationList.length === 0) {
              this.$message({
                type: "error",
                message: "请添加已验证企业!"
              });
              return;
            }else if(this.nVerification === -1){
              this.$message({
                type: "error",
                message: "请选择已验证企业!"
              });
              return;
            } else {
              this.active++;
            }
          }
          if (this.nOrganiz === "1") {
            if (this.usedList.length === 0) {
              this.$message({
                type: "error",
                message: "请添加常用组织!"
              });
              return;
            } else if(this.nUsed === -1){
              this.$message({
                type: "error",
                message: "请选择常用组织!"
              });
              return;
            }else {
              this.active++;
            }
          }
          if (this.nOrganiz === "2") {
            this.active++;
          }
        }
      }  
    },
    selectContactsNext() {
      //联系人下一步
      this.$refs["contactsForm"].validate(vaild => {
        if (vaild) {
          this.$refs["contactsTectForm"].validate(vaild => {
            if (vaild) {
              this.active++;
            }
          });
        }
      });
    },
    submitFunc() {
      let postJson = {};
      let url = "";
      if (this.routeParams.from === "edit") {
        postJson["orderID"] = this.routeParams.orderID;
        url = "/api/orderManage/edit";
      } else {
        url = "/api/orderManage/enroll";
      }
      // alert(JSON.stringify(this.routeParams))
      postJson["productCode"] = this.routeParams.productCode;
      postJson["signatureHashAlgorithm"] = "SHA256";
      postJson["validityPeriod"] = parseInt(this.routeParams.years) * 12;
      postJson["domainName"] = this.domainVerification.domainName;
      let SANs_NormalTemp = [];
      let SANs_WildCardTemp = [];
      if (this.routeParams.funType == "多域名") {
        for (let i = 0; i < this.domianForm.dCount1List.length; i++) {
          SANs_NormalTemp.push(this.domianForm.dCount1List[i].name);
        }
        postJson["SANs_Normal"] = SANs_NormalTemp;
      }
      if (this.routeParams.funType == "多域名通配符") {
        for (let i = 0; i < this.domianForm.dCountList.length; i++) {
          SANs_NormalTemp.push(this.domianForm.dCountList[i].name);
        }
        for (let i = 0; i < this.domianForm.dWCountList.length; i++) {
          SANs_WildCardTemp.push(this.domianForm.dWCountList[i].name);
        }
        postJson["SANs_Normal"] = SANs_NormalTemp;
        postJson["SANs_WildCard"] = SANs_WildCardTemp;
      }
      postJson["authMethod"] = this.domainVerification.radio;
      postJson["CSR"] = this.csr.textarea;

      if (this.nOrganiz === "1" || this.nOrganiz === "2") {
        postJson["organizationName"] = this.nUsedListInfo?this.nUsedListInfo.favoriteOrgName:'';
        postJson["organizationUnit"] =  this.nUsedListInfo?this.nUsedListInfo.favoriteOrgDepartment:'';
        postJson["country"] =  this.nUsedListInfo?this.nUsedListInfo.country:'';
        postJson["state"] =  this.nUsedListInfo?this.nUsedListInfo.state:'';
        postJson["location"] =  this.nUsedListInfo?this.nUsedListInfo.location:'';
        postJson["address"] =  this.nUsedListInfo?this.nUsedListInfo.address:'';
        postJson["phone"] =  this.nUsedListInfo?this.nUsedListInfo.phone:'';
        postJson["postalCode"] =  this.nUsedListInfo?this.nUsedListInfo.zipCode:'';
      } else {
        postJson["organizationName"] = this.nVerifyListInfo.subOrgName;
        postJson["organizationUnit"] = this.nVerifyListInfo.subOrgUnitName;
        postJson["country"] = this.nVerifyListInfo.country;
        postJson["state"] = this.nVerifyListInfo.state;
        postJson["location"] = this.nVerifyListInfo.location;
        postJson["address"] = this.nVerifyListInfo.address;
        postJson["phone"] = this.nVerifyListInfo.subOrgPhone;
        postJson["postalCode"] = this.nVerifyListInfo.zipCode;
      }

      postJson["CC_firstName"] = this.contactsForm.favoriteContactFirstName;
      postJson["CC_lastName"] = this.contactsForm.favoriteContactLastName;
      postJson["CC_orgUnit"] = this.contactsForm.favoriteContactDepartment;
      postJson["CC_phone"] = this.contactsForm.favoriteContactPhone;
      postJson["CC_altPhone"] = this.contactsForm.favoriteContactOrgPhone;
      postJson["CC_email"] = this.contactsForm.favoriteContactEmail;
      postJson["CC_title"] = this.contactsForm.favoriteContactTitle;

      postJson["TC_firstName"] = this.contactsTectForm.favoriteContactFirstName;
      postJson["TC_lastName"] = this.contactsTectForm.favoriteContactLastName;
      postJson["TC_orgUnit"] = this.contactsTectForm.favoriteContactDepartment;
      postJson["TC_phone"] = this.contactsTectForm.favoriteContactPhone;
      postJson["TC_altPhone"] = this.contactsTectForm.favoriteContactOrgPhone;
      postJson["TC_email"] = this.contactsTectForm.favoriteContactEmail;
      postJson["TC_title"] = this.contactsTectForm.favoriteContactTitle;

      postJson["authData1"] = this.authData1;
      postJson["authData2"] = this.authData2;

      postJson["isCimClient"] = true;
      // console.log(postJson);
      this.$axios.post(url, postJson).then(res => {
        let data = res.data;
        if (data.code === 0) {
          // console.log(data)
          this.$message({
            type: "success",
            message: data.desc
          });
          // this.$router.push({ name: "OrderManage" });
          if (this.routeParams.from === "edit") {
            
          }else{
            var sendJson = {};
            sendJson["cmd"] = "orderConfig";
            sendJson["method"] = "saveOrderId"; 
            if (this.routeParams.orderID == "" || this.routeParams.orderID == undefined) {
              sendJson["orderID"] = data.data.orderID;
            }else{
                sendJson["orderID"] = this.routeParams.orderID;
            }     
            if (this.csr.radio === 1) {
              sendJson["id"] = 0;
              sendJson["domain"] = this.csr.domainName;
              // sendJson["keySize"] = this.csr.algorithm;
              sendJson["keySize"] = this.domainVerification.algorithm;
              sendJson["csr"] = this.csr.textarea;
            }else{
              sendJson["id"] = this.csrID;
            }
            // console.log(sendJson)
            // console.log("id:"+data.data.orderID)
            // console.log("routeParamsid:"+this.routeParams.orderID)

            parent.sendData(sendJson);
          }

          window.parent.postMessage({orderSuccess:true},"*");
          // window.parent.close();
        } else {
          this.$message({
            type: "error",
            message: data.desc
          });
            
          if (this.csr.radio === 2) {
            var sendJson = {}; 
            sendJson["cmd"] = "orderConfig";
            sendJson["method"] = "saveOrderId";  
            sendJson["id"] = this.csrID;
            sendJson["orderID"] = "";
            // console.log(sendJson)
            parent.sendData(sendJson);
          }
          
        }
      });
    },
    submitOrder() {
      //提交订单
      if (this.active === 2) {
        this.$refs["contactsForm"].validate(vaild => {
          if (vaild) {
            this.$refs["contactsTectForm"].validate(vaild => {
              if (vaild) {
                this.submitFunc();
              }
            });
          }
        });
      } else {
        this.submitFunc();
      }
    },
    selectContacts(selectName) {
      //选择常用联系人
      this.selectName = selectName;
      this.$axios.post("/api/userManage/favoriteContactList", {}).then(res => {
        let data = res.data;
        if (data.code === 0) {
          this.contactsList = data.data.favoriteContacts;
          if(this.contactsList.length > 0){
            this.selectContactsDialog = true;
          }else{
            this.$message({
              type:"error",
              message:"请添加常用联系人！"
            })
          }
        }
      });
    },
    selectRadio(label) {
      this.selectLable = label;
    },
    sureSelect() {
      //确认选择的联系人
      if (this.selectName === "contactsForm") {
        this.contactsForm = this.contactsList[this.selectLable];
      }
      if (this.selectName === "contactsTectForm") {
        this.contactsTectForm = this.contactsList[this.selectLable];
      }
      this.selectContactsDialog = false;
    },
    syncToContactsTect() {
      //同步到技术联系人
      this.contactsTectForm = this.contactsForm;
    },
    syncToContacts() {
      //同步到公司联系人
      this.contactsForm = this.contactsTectForm;
    },
    clearFiles(uploadName) {
      this.$refs[uploadName].clearFiles();
    },
    documentInactive() {
      //离开当前页面是执行
      // console.log(1)
    },
    documentActive() {
      //进入当前页面时执行
      // console.log(2);
      this.getVerifyFunc();
      this.getUsedFunc();
      this.$axios.post("/api/userManage/favoriteContactList", {}).then(res => {
        let data = res.data;
        if (data.code === 0) {
          this.contactsList = data.data.favoriteContacts;
          // if(this.contactsList.length > 0){
          //   this.selectContactsDialog = true;
          // }
        }else{
            this.$message({
              type:"error",
              message:"请添加常用联系人！"
            })
          }
      })
    },
    toClientPersonal(){
      parent.openPersonalPan();
    }
  },
  computed: {
    nowUsedInfo: function() {}
  },
  filters: {
    Slice: function(value, len) {
      if (value && value.length > len) {
        value = value.substring(0, len) + "...";
      }
      return value;
    }
  },
  components: {
    VuePageVisibility
  },
  watch: {
    /*组织信息切换和选中*/
    nOrganiz: function(newVal, oldVal) {
      
      if (newVal === "0") {
        this.getVerifyFunc(); //获取已验证企业列表
        if (this.verificationList > 0) {
          this.nVerifyListInfo = this.verificationList[0];
          return;
        }
      }
      if (newVal === "1") {
        this.getUsedFunc(); //获取常用组织列表
        if (this.usedList > 0) {
          this.nUsedListInfo = this.usedList[0];
          return;
        }
      }
    },
    nVerification: function(newVal, oldVal) {
      //监听选中已验证企业
      this.nVerifyListInfo = this.verificationList[newVal];
    },
    nUsed: function(newVal, oldVal) {
      //监听选中常用组织
      this.nUsedListInfo = this.usedList[newVal];
    },
    usedList: function(newVal, oldVal) {
      this.nUsedListInfo = newVal[0];
    }
  }
};
</script>
<style lang="scss" scoped>
.overflow {
  overflow: hidden;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.tC {
  text-align: center;
}
.tR {
  text-align: right;
}
.mt10 {
  margin-top: 10px;
}
.mt20 {
  margin-top: 20px;
}
.mt60 {
  margin-top: 60px;
}
.mb20 {
  margin-bottom: 20px;
}
.mb10 {
  margin-bottom: 10px;
}
.ml20 {
  margin-left: 20px;
}
.ml50 {
  margin-left: 50px;
}
.mr20 {
  margin-right: 20px;
}
.mt30 {
  margin-top: 30px;
}
.mt40 {
  margin-top: 40px;
}
.mt50 {
  margin-top: 50px;
}
.pl20 {
  padding-left: 20px;
}
.p20 {
  padding: 20px;
}
.borderS {
  border: 1px solid #dcdfe6;
}
.borderR {
  border-radius: 3px;
}
.gray {
  color: #666;
}
.fn12 {
  font-size: 12px;
}
.leftContact {
  width: 40%;
  .tit {
    span {
      font-weight: 600;
    }
  }
}
.centerWrap {
  padding: 126px 10px;
}
.rightContact {
  width: 40%;
  .tit {
    span {
      font-weight: 600;
    }
  }
}

.roateArrow {
  transform: rotate(180deg);
}
.orderCertificate {
  // width: 100%;
  overflow: hidden;
  margin: 10px 26px 0;
  font-size: 14px;
  color: #333333;
  height: calc(100% - 20px);;
  .personal-title{
    height: 40px;
    line-height: 40px;
    padding-left:24px;
    background: rgba(0, 0, 0, 0.3);
    color:#fff; 
    img{
      padding-right:6px; 
    }
  }
  .orderSteps-conatin{
    background-color:rgba($color: #fff, $alpha: 0.95);
    height:100%;
    // height: 100%;
    padding: 0 12px;
  }
  .tips {
    font-size: 12px;
    color: #999;
    margin-bottom: 20px;
  }
  .label {
    font-weight: 500;
    color: #333333;
  }
}
.orderCertificate a {
  color: #409eff;
}

.orderCertificate .tit {
  color: #333;
}
.orderCertificate h1 {
  font-size: 16px;
  color: #1f2f3d;
  font-weight: 400;
}
.orderCertificate p {
  line-height: 24px;
}
.organizationalR p span {
  color: #777;
}

.prompt {
  display: inline-block;
}
.what h1 {
  font-size: 14px;
  color: #1f2f3d;
  font-weight: 400;
  margin-bottom: 10px;
}
.what p {
  line-height: 16px;
  margin-bottom: 10px;
  font-size: 12px;
  color: #999;
}

.csr {
  overflow: hidden;
}
.csrL {
  width: 50%;
}
.csrR {
  width: 46%;
  border: 1px solid #2c99de;
  padding: 8px;
  font-size: 12px;
  color: #999;
  margin-right: 20px;
  margin-top:30px;
  p{
    line-height: 18px;
    margin:7px;
  }
}

.domainVerification {
  overflow: hidden;
}

.condition {
  font-size: 14px;
  color: #333333;
  text-align: right;
  display: inline-block;
}
.default .conditionInput {
  width: 300px;
}
.csrLmain .conditionInput {
  width: 90%;
}
.authenticationData .conditionInput {
  width: 400px;
  margin-bottom: 20px;
}

.conditionDiv {
  width: 100%;
  padding-top: 5px;
  background-color: white;
}

.conditionInfo {
  width: 33%;
  margin-top: 20px;
  text-align: left;
  padding-right: 35px;
  display: inline-block;
  font-size: 14px;
  box-sizing: border-box;
}
.contactsInfoBox {
  width: 33%;
  box-sizing: border-box;
  padding-right: 35px;
}
.contactsInfoBox p {
  margin-top: 20px;
  text-align: left;
  font-size: 14px;
}
.contactsInfoBox h1 {
  text-align: left;
  font-size: 16px;
  font-weight: bold;
}
.orderBtn{
  height:30px;
  line-height:30px;
  width:120px;
  padding:0;
}
.preBtn{
  background-color: #e7ecf5;
  border:1px solid #2c99de;
  color: #2c99de;
}
.organizationalL {
}
.organizationalR {
  margin-top: -20px;
}
</style>

<style>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-step.is-simple .el-step__title {
  font-size: 14px;
}
.el-step__head.is-success{
  color: #409eff;
  border-color: #409eff;
}
.el-step__title.is-success{
   color: #409eff;
}
.orderCertificate .el-textarea__inner{
  background-color: transparent;
}
.el-step.is-simple .el-step__head{
  /* color: #409eff;
  border-color: #409eff; */
}
.contactsInfo .el-form-item{
  margin-bottom: 12px;
}
.domainVerification .el-form-item{
  margin-bottom: 18px;
}
.contactsInfo .el-form-item--medium .el-form-item__content, .contactsInfo .el-form-item--medium .el-form-item__label{
  line-height: 32px;
}
.contactsInfo .el-form-item__content{
  margin-left: 100px!important;
}
.contactsInfo .el-input--medium .el-input__inner{
  height: 28px;
  line-height: 28px;
}
.csrL label{
  font-weight: normal
}
</style>