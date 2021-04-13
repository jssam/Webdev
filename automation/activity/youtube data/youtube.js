let puppeteer = require("puppeteer");
let fs = require("fs");
// no of videos 
// views 
// watch time -> get 
// list of videos -> [name, duration]
// initial page data get 
// handle -> loader

console.log("Before");
// let arr=document.querySelectorAll("#stats  .style-scope.ytd-playlist-sidebar-primary-info-renderer")
// let newarr=[]
// newarr.push(arr[0].innerText,arr[1].innerText)


///// for time of each video 
let arr = document.querySelectorAll(".style-scope.ytd-thumbnail-overlay-time-status-renderer")
let final = []
for(let i = 1;i<arr.length;i=i+2){final.push(arr[i].innerText.trim())}
console.log(final);

//////////video name
let video = document.querySelectorAll("a#video-title");
let videofin = []
for(let i =0;i<video.length;i++){videofin.push(video[i].innerText.trim())}

(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        let newPage = await browserInstance.newPage();
        await newPage.goto("https://www.youtube.com/playlist?list=PLRBp0Fe2GpgnIh0AiYKh7o7HnYAej-5ph");
        // evaluate
       

    } catch (err) {
        console.log(err);
    }

})();