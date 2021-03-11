const { dir } = require("console");
let fs = require("fs");
let p = require("path");
let input = process.argv.slice(2);
let path= input[0];

function isFileornot(dirpath){
    return fs.lstatSync(dirpath).isFile();
}
function getcontnent(dirpath){
    return fs.readdirSync(dirpath);
}

function view(dirpath,mode){
if(mode=="tree"){
    viewTree(dirpath,"");
}else if(mode == "flat"){
    viewFlat(dirpath);
}else{
    console.log("wrong mode");
}
}

module.exports = {
    viewfile :view
}
function viewFlat(dirpath){
    let isfile = isFileornot(dirpath);
    if(isfile == true){
        console.log(dirpath + "*");
    }else{
        console.log(dirpath);
        let content = getcontnent(dirpath);
        for(let i=0;i<content.length;i++){
            // let childpath = dirpath+"/"+content[i];
            let childpath = p.join(dirpath,content[i]);
            viewFlat(childpath);
        }
    }
}
function viewTree(dirpath,indent){
    let isfile = isFileornot(dirpath);
    if(isfile == true){
        let star = dirpath.split("\\");
        let print = star.pop();
        console.log(indent+print + "*");
    }else{
        // let star = dirpath.split("\\");
        // let print = star.pop();
        // console.log(indent+print );
        console.log(indent,p.basename(dirpath));
        let content = getcontnent(dirpath);
        for(let i=0;i<content.length;i++){
            // let childpath = dirpath+"\\"+content[i];
            let childpath = p.join(dirpath,content[i]);
            viewTree(childpath,indent+"\t");
        }
    }
}