var ws = require("nodejs-websocket");
console.log("开始建立连接...")

var game1 = null,game2 = null , game1Ready = false , game2Ready = false;
var server = ws.createServer(connection =>{


        connection.on('text', function(result) {
            console.log("收到消息",result);
          
          })
          connection.on('connect', function(code) {
            console.log('开启连接', code)
          })
          connection.on('close', function(code) {
            console.log('关闭连接', code)
          })
          connection.on('error', function(code) {
            console.log('异常关闭', code)
          })
}).listen(8002)
console.log("WebSocket建立完毕")