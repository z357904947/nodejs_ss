let redis = require("redis");
const redis_client = redis.createClient({host:'127.0.0.1',port:'6379',ttl:5*60*1000});


redis_client.on("error",function(err){
    console.log(err);

});
redis = {};
redis.set = function(key,value){
  value = JSON.stringify(value);
  return redis_client.set(key,value,function(err,data){
        console.log(err);
        console.log(data);
    });
};
text = async(key)=>{
     doc = await new Promise((resolve)=>{
        redis_client.get(key,function(err,res){
            return resolve(res);
        });
    });
    doc = JSON.parse(doc);
    return doc;
}

redis.get = async(key)=>{
    const ret  = await text(key);
    return ret;
}

module.exports = redis;