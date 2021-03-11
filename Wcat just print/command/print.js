var fs = require('fs');
function print1(path){
fs.readFile(path, 'utf8', function(err, data) {
    if (err) console.log("File not found");
    console.log(data);
});
}

function print(file){
    for(let i =0;i<file.length;i++){
    print1(file[i]);
    }
}

module.exports = {
    print: print
}