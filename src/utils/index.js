/*检查输入的域名或IP*/
export function check_ipDomian(ipDomian){
    var strRegex = "^((https|http):\/\/)?"
        + "(((([0-9]|1[0-9]{2}|[1-9][0-9]|2[0-4][0-9]|25[0-5])[.]{1}){3}([0-9]|1[0-9]{2}|[1-9][0-9]|2[0-4][0-9]|25[0-5]))" // IP>形式的URL- 199.194.52.184
        + "|"
        + "([0-9a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D-]+[.]{1})+[a-zA-Z-]+)" // DOMAIN（域名）形式的URL
    var re=new RegExp(strRegex);
    if(!re.test(ipDomian)){
        return false;
    }else{
        return true;
    };
}
/*检查输入的域名或IP*/
export function check_ip(ip){
    var regIP = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if(!regIP.test(ip)){
        return false;
    }else{
        return true;
    };
}
/*检查输入对象的值是否符合要求 不能为空，端口号为0~65535 */
export function check_port(port) {
    var re = /^[1-9]$|(^[1-9][0-9]$)|(^[1-9][0-9][0-9]$)|(^[1-9][0-9][0-9][0-9]$)|(^[1-6][0-5][0-5][0-3][0-5]$)/;
    if(!re.test(port)){
        return false;
    }else{
        return true;
    };
}
