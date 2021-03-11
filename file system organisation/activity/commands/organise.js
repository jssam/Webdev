let fs = require("fs");
let p = require("path");

function isFileornot(dirpath){
    return fs.lstatSync(dirpath).isFile();
}
function getcontnent(dirpath){
    return fs.readdirSync(dirpath);
}
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function organise(dirpath){
dir = p.join(dirpath,"organise");
fs.mkdir(dir,(err) => {if (err) {console.log("file already exist");}});
fs.mkdir(dir+"/media",(err) => {});
fs.mkdir(dir+"/archives",(err) => {});
fs.mkdir(dir+"/documents",(err) => {});
fs.mkdir(dir+"/app",(err) => {});
fs.mkdir(dir+"/others",(err) => {});
find(dirpath,dir);
}
function fileis(ext){
    for(let i = 0;i<types.media.length;i++){
    if(types.media[i]==ext){return "media";}
    }
    for(let i = 0;i<types.archives.length;i++){
        if(types.archives[i]==ext){return "archives";}
        }
    for(let i = 0;i<types.documents.length;i++){
            if(types.documents[i]==ext){return "documents";}
            }
    for(let i = 0;i<types.app.length;i++){
                if(types.app[i]==ext){return "app";}
                }
    return "others";
}
function find(dirpath,dir){
    let isfile = isFileornot(dirpath);
    if(isfile == true){
      let file = p.basename(dirpath);
      let ext = file.split(".").pop();
      let fileisthe = fileis(ext);
      let dest = p.join(dir,fileisthe,file);
      fs.copyFileSync(dirpath, dest);
    }else{
        let content = getcontnent(dirpath);
        for(let i=0;i<content.length;i++){
            // let childpath = dirpath+"/"+content[i];
            let childpath = p.join(dirpath,content[i]);
            find(childpath,dir);
        }
    }
}

module.exports = {
    organisefun:organise
}