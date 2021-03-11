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

viewTree(path,"");