var app = require('express')(); //引入express库
var http = require('http').Server(app); //将express注册到http中
//引入websocket
var io = require('socket.io')(http);
//redis 操作
var Cache =require('./redis');
//当访问根目录时，返回游戏大厅
app.get('/', function(req, res){
    res.sendFile(__dirname + '/homes.html');
});
app.get()
//链接
io.on('connection', function(socket){
    console.log('a user connected');
});

//启动监听，监听3000端口
http.listen(3000, function(){
  console.log('listening on localhost:3000');
});