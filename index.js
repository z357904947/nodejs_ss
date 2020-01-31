var app = require('express')(); //引入express库
var http = require('http').Server(app); //将express注册到http中
//引入websocket
var io = require('socket.io')(http);

//动态路由
let home = require('./adminrouter.js');



app.use("/home",home);





//链接
io.on('connection', function(socket){
    console.log('a user connected');
});

//启动监听，监听3000端口
http.listen(3000, function(){
  console.log('listening on localhost:3000');
});