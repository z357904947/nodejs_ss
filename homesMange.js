/**
 * 房间管理
 */
//引入uuid 模块
const UUID = require('uuid');
//引入redis 模块
//redis 操作
const Cache =require('./redis');


var home ={};

 //创建一个房间
 home.add=()=>{
    let ID = UUID.v1();

    Cache.addHome(ID,{id:ID,name:"游戏王22"});
    return ID;

}
//得到房间信息
home.get=(key,call)=>{
    console.log("key是",key);
   Cache.get1(key,call);
  
}
//得到房间列表
home.getHomeList=(index,size,call)=>{
    let start = (index-1)*10;
    let end =index*10-1;
    console.log(index,start,end);
   Cache.getHomeList("wuziqi",start,end,call);
  
}

module.exports = home;