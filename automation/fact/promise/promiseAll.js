let fs = require("fs");
console.log("before");
let p1 = fs.promises.readFile("f1.txt");
let p2 = fs.promises.readFile("f2.txt");
let p3 = fs.promises.readFile("f3.txt");
let combinedPromise = Promise.all([p1,p2,p3]);
console.log(combinedPromise);
combinedPromise.then(function(combinefilesdata){
for(let i =0;i<combinefilesdata.length;i++){
    console.log("contnt->"+combinefilesdata[i])
}
})
console.log("After");
