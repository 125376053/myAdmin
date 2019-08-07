var express = require('express');
var path=require('path');
var util=require('util');
var app=express();

// 开启zgip压缩
var compression = require('compression');
app.use(compression());

// 配置history模式
// 导入数据包
var history = require('connect-history-api-fallback');
// 使用
app.use(history());

app.listen(8082);

app.set('view engine','html');
app.engine('.html',require('ejs').__express);
app.use(express.static(path.join(__dirname,'dist')));

app.get('/', function(req, res, next) {
    res.render('./dist/index.html')
});
