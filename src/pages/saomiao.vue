<template>
    <div>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="step"></el-progress>
        有{{totalNum}}个域名
        成功{{scount}}
        失败{{fcount}}
    </div>
</template>
<script>
    var bindid1 = 0
    export default{
        data(){
            return{
                totalNum:0,
                step:0,
                count : 0, //进度条

                failNum : 0, //失败计数器
                suNum:0,
                scount:0, //成功个数
                fcount:0, //失败个数
            }
        },
        mounted(){
            var sendJson = {};
            sendJson["cmd"] = 'scanTask';
            sendJson["method"] = "start";
            this.sendData(sendJson)
        },
        methods:{
            sendData(obj) {
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
                if(res.cmd == "scanTask"){
                    if (res.method == "start") {
                        if (res.retCode == 0) {
                            this.totalNum = parseInt(JSON.parse(res.totalNum));
                        }
                    }else if (res.method == "scan") {
                        this.count = this.count+1;
                        this.step = this.count/this.totalNum*100
                        if (res.retCode != 0) {
                            this.failNum++;
                            if (this.failNum) {
                                this.fcount = this.failNum
                            }else{
                                this.fcount = 0
                            }
                        }else{
                            this.suNum++;
                            if (this.suNum) {
                                this.scount= this.suNum
                            }else{
                                this.scount = 0
                            }
                        }
                    }else if (res.method == "complete") {
                        if (res.retCode == 0) {
                            //alert('扫描完成')
                        }
                    }
                }
            },
        }
    }
</script>
<style>

</style>
