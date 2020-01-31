let redis = require("redis");
const redis_client = redis.createClient({host:'127.0.0.1',port:'6379',ttl:5*60*1000});


redis_client.on("error",function(err){
    console.log(err);

});
 redis = {};
 //set一个缓存
redis.set = function(key,value){
  value = JSON.stringify(value);
  return redis_client.set(key,value,function(err,data){
        console.log("11",err);
        console.log("22",data);
    });
};

//创建一个房间
redis.addHome = function(key,value){
    value = JSON.stringify(value);
    //存入一个list里
    redis_client.lpush("wuziqi",key,function(err,data){
        console.log("11",err);
        console.log("22",data);
        //成功后再把对象存入hash里
        redis_client.hmset("wuziqihm",key,value,function(err,data){

            console.log("33",data);
        })
    });
    
  };
text = async(key)=>{
     doc = await new Promise((resolve)=>{
        redis_client.get(key,function(err,res){
            return resolve(res);
        });
    });
    doc = JSON.parse(doc);
    
    console.log("获取到了缓存数据",doc);
    return doc;
}
//经过测试这样子仍然不会同步返回，只会在异步方法里同步返回
redis.get = async(key)=>{
    console.log("这个方法执行了",key)
    const ret  = await text(key);
    console.log("异步执行结果",ret);
    return ret;
};

//所以改写了个方法,用来获取房间，
redis.get1 = async(key,call)=>{
    console.log("这个方法执行了",key)
    const ret  = await text(key);
    //执行回调，返回结果给前端
    call(ret);
    
};
//模糊查询,尽量不要使用会造成redis阻塞
redis.keys=(key,call)=>{

    redis_client.keys(key,function(err,v) {
        console.log(v);
        call(v);
      });

}

//向一个列表中添加数据
//向名为homeList中添加房间数据

redis.lpush=(key,home)=>{

    redis_client.lpush(key,home,function(err,data){
        console.log("11",err);
        console.log("22",data);
    });

}
//分页获取房间列表

redis.getHomeList=(key,start,end,call)=>{

    redis_client.lrange(key,start,end,function(err,data){
       
        redis_client.hmget(key+"hm",data,function(err,data){

            console.log("查询到数据",data);
            call(data);
        }) 
       
    });

}
module.exports = redis;