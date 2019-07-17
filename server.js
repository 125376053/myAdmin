var express = require('express');
var path=require('path');
var util=require('util');
var app=express();
// 开启zgip压缩
var compression = require('compression');
app.use(compression());

app.listen(8082);

app.set('view engine','html');
app.engine('.html',require('ejs').__express);
app.use(express.static('./dist'));

app.get('/', function(req, res, next) {
    res.render('./dist/index.html')
});
