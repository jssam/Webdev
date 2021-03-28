let fs = require("fs");
function promiseifreadfile(fileath){
    return new Promise(function(resolve,reject){
        fs.readFile(fileath,function cb(err,data){
        if(err){
            reject(err);
        }else{
            resolve(data);
        }
    })
    })
}let fReadPromise = promiseifreadfile("f1.txt");
console.log(fReadPromise);
fReadPromise.then(function(data){
    console.log("content->"+data);
})
fReadPromise.catch(function (err){
    console.log(err)
})