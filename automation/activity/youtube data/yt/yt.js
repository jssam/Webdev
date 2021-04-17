const puppeteer=require("puppeteer");
let topics = process.argv.slice(2);
// let topics=["Haan Hogyi Galti"];

(async function(){
let browser=await puppeteer.launch({headless:false,
    defaultViewport: null,
    args: ["--start-maximized"]});
    let allpages=await browser.pages();
    let tab=allpages[0];
    await tab.goto("https://www.youtube.com/");
    await tab.waitForTimeout(2000);
    await tab.waitForSelector('[title="Comedies"]');
        //search topic
    await tab.click('[title="Comedies"]');
    await tab.waitForSelector('[id="video-title-link"]');
    let vidtags= await tab.$$('[id="video-title-link"]');
    for(let i=0;i<5;i++){
        let link=await tab.evaluate(function(elem){
            return elem.getAttribute('href');
        },vidtags[i]);
        let name =await tab.evaluate(function(elem){
            return elem.getAttribute('title');
        },vidtags[i]);
        link="https://www.youtube.com"+link;
        console.log(link);
        console.log(name);
    }
    // for(let i=0;i<topics.length;i++){
    //     await searchPlaylist(browser,topics[i]);
    // }
    // browser.close();
})().then(function(){
    console.log("done!");
}).catch(function(error){
console.log(error);
});