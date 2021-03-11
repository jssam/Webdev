let fs = require("fs");
let path = require("path");

let types = {
  media: ["mp4", "mkv", "mp3"],
  archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
  documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
  app: ['exe', 'dmg', 'pkg', "deb"]
}

function dirCreator(dirpath){
  if(fs.existsSync(dirpath)==false){
    fs.mkdirSync(dirpath);
  }
}

let input=process.argv.slice(2);

let dirpath=input[0];                                     // path of folder to be organized
let orgFilePath=path.join(dirpath,"organized_files");     //organized file path
dirCreator(orgFilePath);                                  // create a folder which contains organized folder

// making diff folders inside organized_folder base on type of files
for(let key in types){
  let innerPath=path.join(orgFilePath,key); 
  dirCreator(innerPath);
} 

let otherPath=path.join(orgFilePath,"others");    // if the file doesnt belong to any type of files
dirCreator(otherPath);


function isFileChecker(dirPath) {
  return fs.lstatSync(dirPath).isFile(); //checks whether a File exists in curr path 
}

function readContent(dirPath) {
  return fs.readdirSync(dirPath); //returns an array of contents,which exists in the dirPath
}

function copyFileToFolder(dirpath,destFolder){
  let orgFileName= path.basename(dirpath);
  let destFilePath=path.join(destFolder,orgFileName);
  fs.copyFileSync(dirpath,destFilePath);
}

function getDirectoryName(dirpath){
  let ext=dirpath.split('.').pop();
  
  for(let key in types){

    // looping through each array for the keys
    for(let i=0;i< types[key].length;i++){
      if(types[key][i]==ext){
        return key;
      }
    }
  }

  // if file doesnt belong to any types that we defined
  return "others";
}


function OrganizeDir(dirpath){
  let isFile= isFileChecker(dirpath);

  if(isFile){
    // getting destination directory, to where ,file is to be copied

    let foldername= getDirectoryName(dirpath);
    
    // set destination path
    let destPath=path.join(orgFilePath,foldername);
    copyFileToFolder(dirpath,destPath);

  }else{
   
    let children=readContent(dirpath);
    
    // recursive call for Children in Current Directory
    for(let i=0;i<children.length;i++){
      OrganizeDir(path.join(dirpath,children[i]));    
    }

  }
}

OrganizeDir(dirpath); // calling organize function to organise Folder