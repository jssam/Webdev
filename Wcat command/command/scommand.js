var fs = require('fs');
function scommand(path){
    let con = [];
fs.readFile(path, 'utf8', function(err, data) {
    if (err) console.log("File not found");
    else{
    let data1 = data.split("\n");
    for(let i = 0;i<data1.length;i++){
        if(data1[i]!='\r'){
           con.push(data1[i]);
            // data1.splice(i, i);
        }
    }
    }
    // let d;
    // for(let i = 0;i<data1.length;i++){
    //     d = d+data1[i];
    // }
    let d = con.join('\n');
    fs.writeFile(path, d, function (err) {
        if (err) console.log("File not found");
      });
});
}

function scommand1(files){

    for(let i =0;i<files.length;i++){
        scommand(files[i]);
    }
}

module.exports = {
    scommand: scommand1
}