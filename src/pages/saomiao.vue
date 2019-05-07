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
                scount:0,
                fcount:0
            }
        },
        mounted(){
            alert(123)
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
                alert('能不能进来')
                console.log(res);
                console.log(typeof res);
                console.log(res.cmd, res.method,res.totalNum);
                var count = 0;
                var fail = 0;
                if(res.cmd == "scanTask"){
                    if (res.method == "start") {
                        alert(JSON.stringify(res))
                        if (res.retCode == 0) {
                            this.totalNum = parseInt(JSON.parse(res.totalNum));
                        }
                    }else if (res.method == "scan") {
                        count = count+1;
//                        $(".progress span").css("width",count/$(".scanNum").val()*100+"%");
//                        $(".alreadyNum").text(count);
                        this.step = count/this.totalNum*100
                        this.scount= count
                        if (res.retCode != 0) {
                            fail++;
                            if (fail) {
                                this.fcount = fail
                            }else{
                                this.fcount = 0
                            }

                        }
                    }else if (res.method == "complete") {
                        if (res.retCode == 0) {
                            //cancelAnimationFrame(timeControl);
//                            $(".scanText").text("扫描完成！");
//                            $(".cancelScan").hide();
//                            $(".checkReport").show();
//                            $(".layerTime img").addClass("pause");
                        }
                    }
                }
            },
        }
    }
</script>
<style>

</style>
