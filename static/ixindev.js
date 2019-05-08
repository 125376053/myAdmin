
var ixindev;
if(!ixindev)
	ixindev = {};

(function(){
	ixindev.winRegister = function(p){
		if(!window.ixinQuery){
			p.onFailure(1,"window.ixinQuery 没有定义");
			return 0;
		}
		var winMessageReq = JSON.stringify({cmd:"reg",name:p.name});		
		var request = JSON.stringify({method:"WinMessage",data:winMessageReq});
		
		var request_id = window.ixinQuery({
			request: request,
			persistent: true,
			onSuccess: p.onSuccess,
			onFailure: p.onFailure
		});
		
		return request_id;
	};
	ixindev.winMessage = function(p){
		if(!window.ixinQuery){
			p.onFailure(1,"window.ixinQuery 没有定义");
			return 0;
		}
		p.cmd = "msg";
		var winMessageReq = JSON.stringify(p);		
		var request = JSON.stringify({method:"WinMessage",data:winMessageReq});
		
		var request_id = window.ixinQuery({
			request: request,
			persistent: false,
			onSuccess: p.onSuccess,
			onFailure: p.onFailure
		});
		
		return request_id;
	};
	ixindev.showWindow = function(p){
		if(!window.ixinQuery){
			p.onFailure(1,"window.ixinQuery 没有定义");
			return 0;
		}
		p.cmd = "showWindow";
		var winMessageReq = JSON.stringify(p);		
		var request = JSON.stringify({method:"WinMessage",data:winMessageReq});
		
		var request_id = window.ixinQuery({
			request: request,
			persistent: false,
			onSuccess: p.onSuccess,
			onFailure: p.onFailure
		});
		
		return request_id;
	};

	ixindev.itrusApiEvent = function(p){
		if(!window.ixinQuery){
			p.onFailure(1,"window.ixinQuery 没有定义");
			return 0;
		}
		var apiReq = JSON.stringify({cmd:"event"});		
		var request = JSON.stringify({method:"ItrusApi",data:apiReq});
		
		var request_id = window.ixinQuery({
			request: request,
			persistent: true,
			onSuccess: p.onSuccess,
			onFailure: p.onFailure
		});
		
		return request_id;
	};
	ixindev.itrusApiQuery = function(p){
		if(!window.ixinQuery){
			p.onFailure(1,"window.ixinQuery 没有定义");
			return 0;
		}
		p.cmd = "query";
		var apiReq = JSON.stringify(p);		
		var request = JSON.stringify({method:"ItrusApi",data:apiReq});
		
		var request_id = window.ixinQuery({
			request: request,
			persistent: false,
			onSuccess: p.onSuccess,
			onFailure: p.onFailure
		});
		
		return request_id;
	};
	ixindev.itrusApiBind = function(p){
		if(!window.ixinQuery){
			p.onFailure(1,"window.ixinQuery 没有定义");
			return 0;
		}
		p.cmd = "bind";
		var apiReq = JSON.stringify(p);		
		var request = JSON.stringify({method:"ItrusApi",data:apiReq});
		
		var request_id = window.ixinQuery({
			request: request,
			persistent: true,
			onSuccess: p.onSuccess,
			onFailure: p.onFailure
		});
		
		return request_id;
	};
	ixindev.itrusApiSend = function(p){
		if(!window.ixinQuery){
			p.onFailure(1,"window.ixinQuery 没有定义");
			return 0;
		}
		p.cmd = "send";
		var apiReq = JSON.stringify(p);		
		var request = JSON.stringify({method:"ItrusApi",data:apiReq});
		
		var request_id = window.ixinQuery({
			request: request,
			persistent: false,
			onSuccess: p.onSuccess,
			onFailure: p.onFailure
		});
		
		return request_id;
	};
	ixindev.serviceurl = window.location.href.split("/__itrus5").shift();
	ixindev.open = function(URL,name,features,replace){
		alert(URL)
		alert(name)
		alert(features)
		alert(replace)
		if(1&&!!features){
			features = features.replace(/(^\s*)|(\s*$)/g,"");
			var arr = features.split(",");
			
			var sleft="";
			var resizable = "";
			var sdialog="";
			
			features = "";
			for(var i = 0 ; i < arr.length; i++){
				var stmp = arr[i].replace(/(^\s*)|(\s*$)/g,"");
				if(stmp.indexOf("left=")==0){
					sleft = stmp.split("=")[1];
				}
				else if(stmp.indexOf("resizable=")==0){
					sresizable = stmp.split("=")[1];
				}
				else if(stmp.indexOf("dialog=")==0){
					sdialog = stmp.split("=")[1];
				}
				else{
					if(features.length>0)
						features += ",";
					features += stmp;
				}
			}
			if(sresizable!="yes"&&sresizable!="1"){
				var ileft = parseInt(sleft,10);
				if(!ileft)
					ileft = 0;
				ileft += 0x10000
				sleft = "" + ileft;
			}
			if(sdialog=="yes"||sdialog=="1"){
				var ileft = parseInt(sleft,10);
				if(!ileft)
					ileft = 0;
				ileft += 0x20000
				sleft = "" + ileft;
			}
			if(sleft!=""){
					if(features.length>0)
						features += ",";
					features += "left="+sleft;
			}
			//alert(features);
		}
		return window.open(URL,name,features,replace);
	};

	var __fileApi_persistent;
	ixindev.fileApi = function(p){
		var persistent = false;
		if(!__fileApi_persistent){
			persistent = true;
			__fileApi_persistent = true;
		}
		
		if(!window.ixinQuery){
			p.onFailure(1,"window.ixinQuery 没有定义");
			return 0;
		}
		var apiReq = JSON.stringify(p);
		var request = JSON.stringify({method:"FileApi",data:apiReq});
		
		var request_id = window.ixinQuery({
			request: request,
			persistent: persistent,
			onSuccess: function(response) {
				p.onSuccess(response);
			},
			onFailure: function(error_code, error_message) {
				if(persistent)
					__fileApi_persistent = false;
				p.onFailure(error_code,error_message);
			}
		});
		
		return request_id;
	};

	function __certapi_certtob64(cert){
		if(!cert)
			return cert;
		
		cert = cert.replace(/\r/g,"");
		cert = cert.replace(/\n/g,"");
		cert = cert.replace("-----BEGIN CERTIFICATE-----","");
		cert = cert.replace("-----END CERTIFICATE-----","");
		cert = cert.replace(/\s/g,"");
		
		return cert;
	}
	
	ixindev.certApi = function(p){		
		if(!window.ixinQuery){
			p.onFailure(1,"window.ixinQuery 没有定义");
			return 0;
		}
		
		p.cert = __certapi_certtob64(p.cert);
		
		var apiReq = JSON.stringify(p);
		var request = JSON.stringify({method:"CertApi",data:apiReq});
		
		var request_id = window.ixinQuery({
			request: request,
			persistent: false,
			onSuccess: function(response) {
				p.onSuccess(response);
			},
			onFailure: function(error_code, error_message) {
				p.onFailure(error_code,error_message);
			}
		});
		
		return request_id;
	};

})();