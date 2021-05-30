let request = indexedDB.open("camera",1);
let db;
request.onsuccess = function(e){
    db = request.result;
}
request.error = function(e){
    console.log(e);
}
request.onupgradeneeded = function(e){
db = request.result;
db.createObjectStore("Media",{keyPath:"mid"});
}

function addMediaToDB(mediaSource, mediaType ){
    let txn = db.transaction("Media" , "readwrite");
    let mediaStore = txn.objectStore("Media");
    let mediaFile = {
        mid : Date.now(),
        mediaType ,
        mediaSource
    }
    mediaStore.add(mediaFile);
}

