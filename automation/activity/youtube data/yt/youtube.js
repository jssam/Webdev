const puppeteer = require("puppeteer");
let fs = require("fs");
let topics = process.argv.slice(2);


let link = `https://noteshub.co.in/`;
if(!fs.existsSync("./Questions")){
    fs.mkdirSync("./Questions");
    fs.mkdirSync("./Questions/notes");
    fs.mkdirSync("./Questions/leetcode");
    fs.mkdirSync("./Questions/youtube");
    fs.mkdirSync("./Questions/entertainment");
}

(async function () {
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
    });
    let allpages = await browser.pages();
    let tab = allpages[0];
    ////entertainment
    await entertainment(browser,"Comedies");
    await entertainment(browser,"Music");
    ////youtube
    for (let i = 0; i < topics.length; i++) {
        await searchPlaylist(browser, topics[i]);
    }
    ///notes hub
    for (let i = 0; i < topics.length; i++) {
        await noteshubextractor(browser, topics[i]);
    }
    await leetcodeextractor(browser, `https://leetcode.com/problemset/`) ;
    browser.close();
})().then(function () {
    console.log("done!");
}).catch(function (error) {
    console.log(error);
});

///search for playlist
async function searchPlaylist(browser, topic) {
    //new page for each topic search
    let urls = [];
    let newtab = await browser.newPage();
    await newtab.goto(`https://www.youtube.com/`)
        await newtab.waitForSelector('div#search-container');
    //search topic
    await newtab.click('div#search-container');
    await newtab.type('div#search-container', topic);
    await newtab.click('button#search-icon-legacy');
    await newtab.waitForTimeout(5000);
    //gets all videos on opage for topic search
    let allVideosatag = await newtab.$$('div#contents .style-scope.ytd-item-section-renderer[prominent-thumb-style="DEFAULT"] a#thumbnail');
    //info array to store max likes and links for those 
    for (let i = 0; i < 5; i++) {
        //for first 5 i.e. top 5 recommendations find link and call getMostLiked function
        let link = await newtab.evaluate(function (elem) {
            return elem.getAttribute('href');
        }, allVideosatag[i]);
        link = `https://www.youtube.com/${link}`;
        urls.push(`<td><a target="_blank" href=${link}>notes${topic}</a></td>`);
    }
    if(!fs.existsSync(`./Questions/youtube/${topic}.json`)){
        fs.writeFileSync(`./Questions/youtube/${topic}.json`, JSON.stringify(urls));
    } 
    // redirect this tab to most liked playlist
    // await newtab.goto(info['maxlink']);
    console.log("############################");
    await newtab.close();
}


///notes hub extractor
async function noteshubextractor(browser, pName) {
    let urls = [];
    let newTab = await browser.newPage();
    let u = `${link}${pName}`;
    console.log(u);
    await newTab.goto(u);
await newTab.waitForSelector('.col-lg-4.col-md-4.col-sm-6.col-xs-12.ng-star-inserted', { visible: true });
const pdflink = await newTab.$$('.col-lg-4.col-md-4.col-sm-6.col-xs-12.ng-star-inserted');
for(let i =0;i<5;i++){
    await pdflink[i].click();
    await newTab.waitForTimeout(5000);
    let pages = await browser.pages();
    let lastpage = await pages[pages.length-1];
    let url = await lastpage.url();
    urls.push(`<td><a target="_blank" href=${url}>notes${i}</a></td>`);
    await newTab.waitForTimeout(4000);
    await lastpage.close();
}
if(!fs.existsSync(`./Questions/notes/${pName}.json`)){
    fs.writeFileSync(`./Questions/notes/${pName}.json`, JSON.stringify(urls));
}  
await newTab.close();

}


///leetcode extractor
async function leetcodeextractor(browser, linkl) {
let newTab = await browser.newPage();
        await newTab.goto(linkl);
        await newTab.waitForSelector('.row-selector >.form-control', { visible: true });
        await newTab.click('.row-selector >.form-control');
        await newTab.keyboard.press("ArrowDown");
        await newTab.keyboard.press("ArrowDown");
        await newTab.keyboard.press("ArrowDown");
        await newTab.keyboard.press("Enter");
        ///different types of ques
        let links = ["all/?difficulty=Easy", "all/?difficulty=Medium", "all/?difficulty=Hard","all/?search=array","all/?search=bitmanupulation","all/?search=trees","all/?search=graph","all/?search=recurrsion"]
        for (let i = 0; i < links.length; i++) {
            let newlink = await browser.newPage();
            let url = links[i];
            await newlink.goto(linkl+url);
            let chance = url.split('=')[1];
            console.log(chance);
            await newlink.waitForSelector('td[label="Title"]>div>a', { visible: true });
            let value = await newlink.evaluate(datafunction,'td[label="Title"]>div>a');
            await newlink.close();
         if(!fs.existsSync(`./Questions/leetcode/${chance}.json`)){
                fs.writeFileSync(`./Questions/leetcode/${chance}.json`, JSON.stringify(value));
            }   
        }
        //close the tab
        newTab.close();
        ///////finding array of quesion by selector
         function datafunction(quesion) {
            let pricearray = document.querySelectorAll(quesion);
            let details = [];
            for (let i = 0; i < pricearray.length; i++) {
                let name = pricearray[i].textContent.trim()
                let url = "https://leetcode.com" + pricearray[i].getAttribute('href');
              details.push(`<td><a target="_blank" href=${url}>${name}</a></td>`)
            }
           
            return details;
        }
    }
    
async function entertainment(browser,refral) {
    let newtab = await browser.newPage();
    await newtab.goto(`https://www.youtube.com/`)
    await newtab.waitForSelector(`[title=${refral}]`);
    let details = [];
    //search topic
await newtab.click(`[title=${refral}]`);
await newtab.waitForSelector('[id="video-title-link"]');
let vidtags= await newtab.$$('[id="video-title-link"]');
for(let i=0;i<5;i++){
    let link=await newtab.evaluate(function(elem){
        return elem.getAttribute('href');
    },vidtags[i]);
    let name =await newtab.evaluate(function(elem){
        return elem.getAttribute('title');
    },vidtags[i]);
    link="https://www.youtube.com"+link;
    console.log(link);
    console.log(name);
    details.push(`<td><a target="_blank" href=${link}>${name}</a></td>`);
}  
if(!fs.existsSync(`./Questions/entertainment/${refral}.json`)){
    fs.writeFileSync(`./Questions/entertainment/${refral}.json`, JSON.stringify(details));
}   

}