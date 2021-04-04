let fs = require("fs");
let print = require("./command/print");
let scommand = require("./command/scommand");
let bcommand = require("./command/bcommand");
let ncommand = require("./command/ncommand");


// module.exports = wcatcommand;
// function  wcatcommand(){
    let arr = process.argv.slice(2);
let files=[];
let input=[];

for(let i=0;i<arr.length;i++){
    if(arr[i].startsWith('-') ){
        input.push(arr[i]);
    }
    else{
        files.push(arr[i]);
    }
}

for(let i = 0 ;i<input.length;i++ ){
    if(input[i]=='-n'||(input[i]=='-s'&&input[i+1]=='-b')){

        ncommand.ncommand(files);
        break;
    }
    else if(input[i]=='-s'){
        scommand.scommand(files);
    }

    else if(input[i]=='-b'){
        bcommand.bcommand(files);
        break;
        // else{console.log("Wrong command")};
        
    }else{console.log("Wrong command");}
}
if(input.length==0){
print.print(files);
}
