<template>
    <div class="scan">
        <el-input
            placeholder="请输入域名"
            v-model="server"
            clearable>
        </el-input>
        <el-input
            placeholder="请输入端口"
            v-model="port"
            clearable>
        </el-input>
        <el-input
            placeholder="请输入serverName"
            v-model="serverName"
            clearable>
        </el-input>
        <el-button @click="addData">添加</el-button>

        <el-table
            :data="table"
            style="width: 100%"
            ref="multipleTable"
            height="300"
            @select="selectCheck"
            @select-all="selectCheckAll"
            @selection-change="handleSelectionChange"
        >
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>

            <el-table-column
                prop="port"
                label="端口"
                sortable
                width="180">
            </el-table-column>
            <el-table-column
                prop="server"
                label="域名"
                sortable
                width="180">
            </el-table-column>
            <el-table-column
                prop="serverName"
                label="域名name"
                sortable
                width="180">
            </el-table-column>
            <el-table-column
                prop="id"
                label="id"
                sortable
                width="180">
            </el-table-column>
            <el-table-column
                prop=""
                label="操作"
                width="180">
                <template slot-scope="scope">
                    <el-button @click="remove(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            background
            layout="prev, pager, next"
            :total="totleNum"
            :page-size="size"
            @current-change="currentChange"
        >
        </el-pagination>

        <router-link :to="{
                path:'/saomiao'
        }">
            <el-button>扫描</el-button>
        </router-link>
        <el-button @click="readFileText">导入</el-button>
        <el-button @click="exportCsvFile">导出</el-button>
        <router-link :to="{
            path:'/order'
        }">order</router-link>
    </div>
</template>
<script>
    var bindid1 = 0
    export default{
        data(){
            return{
                table: [],
                port: '',
                server: '',
                serverName: '',
                curId:'',
                multipleSelection: [],
                totleNum:0,
                size:10,
                page:1
            }
        },
        mounted(){
            this.showData()
        },
        methods:{
            showData(){
                this.sendData({
                    "cmd":"scanConfig",
                    "method":"show",
                    "targetPage":this.page,
                    "pageSize":this.size
                })
            },
            addData(){
                if(this.check_ipDomian(this.server)){
                    if(this.check_port(this.port)){
                        this.sendData({
                            "cmd": "scanConfig",
                            "method": "add",
                            "server": this.server,
                            "port": parseInt(this.port),
                            "serverName": this.serverName
                        })
                    }else{
                        alert('port不合法')
                    }
                }else{
                    alert('域名不合法')
                }
            },
            remove(id){
                var sendJson = {};
                sendJson["cmd"] = 'scanConfig';
                sendJson["method"] = "delete";
                sendJson["ids"] = ''+id;
                this.sendData(sendJson)
                this.curId = id
            },
            sendData(obj) {
                var txt = JSON.stringify(obj)
                if (bindid1 == 0) {
                    if (bindid1 != 0)
                        return;
                    var d1;
                    try {
                        d1 = JSON.parse(txt);
                    } catch (e) {
                        alert("JSON数据错误!" + txt);
                    }
                    bindid1 = ixindev.itrusApiBind({
                        request: txt,
                        onSuccess: (response) => {
                            var jsonRes = JSON.parse(response);
                            // this 当前组件的this
                            //console.log(JSON.stringify(jsonRes))
                            this.render(jsonRes)
                        },
                        onFailure: function (error_code, error_message) {
                            err(error_code, error_message)
                            //restartItrusssl();
                            bindid1 = 0;
                        }
                    });
                }
                ixindev.itrusApiSend({
                    bindid: bindid1,
                    data: txt,
                    onSuccess: function (response) {
                        //alert(response)
                    },
                    onFailure: function (error_code, error_message) {
                        alert("sendData onFailure:" + error_code + " : " + error_message);
                    }
                });
            },
            render(res){
                if(res.cmd == "scanConfig"){
                    if (res.method == "add") {
                        if(res.retCode==0){
                            this.table.push({
                                id:res.id,
                                port:this.port,
                                server:this.server,
                                serverName:this.serverName
                            })
                            this.allSelection()
                        }else{
                            alert(res.info)
                        }
                    }
                    if (res.method == "delete") {
                        if(res.retCode==0){
                            this.table = this.table.filter(item=>{
                                return item.id!=this.curId
                            })
                        }else{
                            alert(res.info)
                        }
                    }
                    if(res.method == "show"){
                        if(res.retCode==0){
                            this.totleNum = parseInt(JSON.parse(res.totleNum))
                            var data = JSON.parse(res.data)
                            console.log(data);
                            this.table = data
                            this.allSelection()
                        }else{
                            alert(res.info)
                        }
                    }
                    if (res.method == "import") {
                        if (res.retCode == 0) {
                            alert("导入成功" + res.succeedNum + "条，失败" + res.failedNum);
                            this.showData()
                        }else{
                            alert("导入失败，请重新导入！")
                        }
                    } else if (res.method == "export") {
                        if (res.retCode == 0) {

                        }else{
                            alert("导出失败，请重新导出！")
                        }
                    }
                }
            },
            allSelection(){
                this.table.forEach((item)=>{
                    this.$refs.multipleTable.toggleAllSelection(item.isSelected,0);
                })
            },
            selectCheck(selection,row){
                var re = this.multipleSelection.find((item,index,arr)=>{
                    return item.id === row.id
                })
                var isSelect = re?"checked":"unChecked"
                var data ={
                    "cmd":"scanConfig",
                    "ids":''+row.id,
                    "method":isSelect
                }
                this.sendData(data)
            },
            selectCheckAll(selection){
                var allData={
                    "cmd":"scanConfig",
                    "ids":'',
                    "method":selection.length>0?"checked":"unChecked"
                }
                this.sendData(allData)
            },
            handleSelectionChange(val){
                //alert(JSON.stringify(val))
                this.multipleSelection = val
            },
            currentChange(val){
                this.size=val
                console.log(this.size)
                this.showData()
            },
            // 导入文件
            readFileText() {
                ixindev.fileApi({
                    cmd: "read",
                    file: "server",
                    filter: '.cvs',
                    text: "",
                    title: "选择文件",
                    onSuccess:(response) => {
                        var jsonret = JSON.parse(response);
                        if ("{}" == JSON.stringify(jsonret)) {

                        } else {
//                            if (filterStr == ".csv") {
//
//                            } else {
//                                if (jsonret.file){
//                                    alert(jsonret.file);
//                                }
//                                return jsonret.file;
//                            }
                            var sendJson = {};
                            sendJson["method"] = "import";
                            sendJson["text"] = jsonret.text;
                            sendJson["cmd"] = "scanConfig";
                            this.sendData(sendJson);
                        }
                    },
                    onFailure: function(error_code, error_message) {
                        alert(error_code + " : " + error_message);
                    }
                });
            },
            // 到处文件
            exportCsvFile() {
                ixindev.fileApi({
                    cmd: "save",
                    file: "config",
                    filter: '.cvs',
                    text: "",
                    title: "导出文件",
                    onSuccess: (response) => {
                        var jsonret = JSON.parse(response);
                        if ("{}" == JSON.stringify(jsonret)) {

                        } else {
                            var sendJson = {};
                            sendJson["method"] = "export";
                            sendJson["fileName"] = jsonret.file;
                            sendJson["cmd"] = "scanConfig";
                            this.sendData(sendJson);
                        }
                    },
                    onFailure: function(error_code, error_message) {
                        alert(error_code + " : " + error_message);
                    }
                });
            }
        }
    }
</script>
<style>

</style>
