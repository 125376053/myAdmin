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
            sendData(obj,cb) {
                var txt = JSON.stringify(obj);
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
                }
            },
            allSelection(){
//                this.table.forEach((item)=>{
//                    this.$refs.multipleTable.toggleAllSelection(item.isSelected,0);
//                })
            },
            selectCheck(selection,row){
                console.log(selection);
                console.log(row);
//                if ($(this).is(':checked')) {
//                    sendJson["method"] = "checked";
//                } else {
//                    sendJson["method"] = "unChecked";
//                }
//                alert(JSON.stringify(sendJson))
                this.sendData({
                    "cmd":"scanConfig",
                    "ids":selection.id,
                    "method":"checked"
                })
            },
            selectCheckAll(selection){
                var allData={
                    "cmd":"scanConfig",
                    "ids":'',
                    "method":selection.length>0?"checked":"unChecked"
                }
                alert(JSON.stringify(allData))
                this.sendData(allData)
            },
            currentChange(val){
                this.size=val
                console.log(this.size)
                this.showData()
            },
        }
    }
</script>
<style>

</style>
