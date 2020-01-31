const express = require("express");
const home = require("./homesMange");

const router = express.Router();
//大厅
router.get("/",function (req,res) {
   
    res.sendFile(__dirname + '/homes.html');
});
//创建房间
router.get("/add",function (req,res) {
  
    res.send(home.add());
});
//根据key获取房间信息
router.get("/get/:id",function (req,res) {
    let key = req.params.id;
    console.log("key",key);
    let  re =  home.get(key,(a)=>{
        res.send(a);
    });
   
});
//获取所有房间
router.get("/homeList/:index",function (req,res) {
    let index = req.params.index;

    let  re =  home.getHomeList(index,10,(a)=>{
        res.send(a);
    });
   
});


module.exports = router;