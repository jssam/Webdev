let videoelem = document.querySelector("video");
let audioelem = document.querySelector("audio");
let mediaRecorder;
let videorecorder = document.querySelector("#record-video");
let imagepic= document.querySelector("#click-pick");
let timming= document.querySelector(".timmer");
let filter = document.querySelectorAll(".filter");
let plus = document.querySelector(".plus");
let minus = document.querySelector(".minus");
let zoomlevel =1;
let filter_ui = document.querySelector(".filter_ui");
////data buffer me ata hai to hm ek array me data girate jaynge 
let buffer = [];
let clearObj;
let constrains = {
    video: true,
    audio: true
}
let filtercolor = "";
navigator.mediaDevices.getUserMedia(constrains)
    .then(function (mediaStream) {
        videoelem.srcObject = mediaStream;
        audioelem.srcObject = mediaStream;
        ///recording ke liye media recorder
        mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorder.addEventListener("dataavailable", function (e) {
            buffer.push(e.data);
        })
        mediaRecorder.addEventListener("stop", function () {
            ///buffer se fata utha ke blob me rakha 
            ///it convert that data in mine type  menans hmari file ke type me 
            let blob = new Blob(buffer, { type: "video/mp4" });
            const url = window.URL.createObjectURL(blob);
            ///download ke liye ek ankor tag bnana hai
            let a = document.createElement("a");
            //download
            a.download = "file.mp4";
            a.href = url;
            a.click();
            buffer = [];
        });

    }).catch(function (err) {
        console.log(err);
    });

let recordState = false;
videorecorder.addEventListener("click", function () {
    if (!recordState) {
        videorecorder.classList.add("record-animation");
        mediaRecorder.start();
        ontimmer();
        videorecorder.classList.add("record-animation");

        // videorecorder.innerHTML = "recording";
        recordState = true;
    } else {
        mediaRecorder.stop();
        offtimmer();
        videorecorder.classList.remove("record-animation");
        videorecorder.classList.remove("record-animation");

        // videorecorder.innerHTML = "record";
        recordState = false;
    }

})
imagepic.addEventListener("click",function(){
    imagepic.classList.add("capture-animation");
    let canvas = document.createElement("canvas");
    canvas.height = videoelem.videoHeight;
    canvas.width = videoelem.videoWidth;
    let tool = canvas.getContext("2d");
    // tool.translate(canvas.width/2,canvas.height/2);
    // tool.scale(zoomlevel,zoomlevel);
    tool.scale(zoomlevel,zoomlevel);
    let x = (tool.canvas.width/zoomlevel - canvas.width)/2;
    let y= (tool.canvas.height/zoomlevel - canvas.height)/2;
    tool.drawImage(videoelem, x, y);
    if(filtercolor!=""){
    tool.fillStyle= filtercolor;
    tool.fillRect(0, 0,canvas.width,canvas.height);
    }
    let url = canvas.toDataURL();
    let a = document.createElement("a");
    a.download = "file.png";
    a.href = url;
    a.click();
    a.remove();
  
})
function ontimmer(){
    timming.classList.add("timming-active");
    let timmercount = 0;
    clearObj= setInterval(function(){

timmercount++;
let sec = (timmercount%60>=10)?`${timmercount%60}`:`0${timmercount%60}`;
let min = (Number.parseInt(timmercount/60)>=10)?`${Number.parseInt(timmercount/60)}`:`0${Number.parseInt(timmercount/60)}`;
let hr = (Number.parseInt(timmercount/3600)>=10)?`${Number.parseInt(timmercount/3600)}`:`0${Number.parseInt(timmercount/3600)}`;
timming.innerText = `${hr}:${min}:${sec}`;


    },1000)
}
function offtimmer(){
    timming.classList.remove("timming-active");
    timming.innerText = "00:00:00";
    clearInterval(clearObj);
}

for(let i =0;i<filter.length;i++){
filter[i].addEventListener("click",function(){
    let color = filter[i].style.backgroundColor;
    if(color){
        filter_ui.classList.add("filterActive");
        filter_ui.style.backgroundColor=color;
        filtercolor = color;
        console.log(filtercolor);


    }else{
        filter_ui.classList.remove("filterActive");
        // filter_ui.style.backgroundColor=none;
        filtercolor = "";
        console.log(filtercolor);
    }
})
    
}
plus.addEventListener("click",function(){
    if(zoomlevel<2.5){
        zoomlevel +=0.2;
        videoelem.style.transform = `scale(${zoomlevel})`;
    }
})
minus.addEventListener("click",function(){
    if(zoomlevel>1){
        zoomlevel -=0.2;
        videoelem.style.transform = `scale(${zoomlevel})`;
    }
})