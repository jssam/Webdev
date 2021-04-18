const puppeteer = require("puppeteer");
let fs = require("fs");
const cheerio = require("cheerio");
const request = require("request");
let topics = process.argv.slice(2);
let linkcode = [];
let codeforce = "https://codeforces.com/problemset/page/";
var count =0;
let link = `https://noteshub.co.in/`;
if(!fs.existsSync("./Questions")){
    fs.mkdirSync("./Questions");
    fs.mkdirSync("./Questions/notes");
    fs.mkdirSync("./Questions/leetcode");
    fs.mkdirSync("./Questions/youtube");
    fs.mkdirSync("./Questions/entertainment");
    fs.mkdirSync("./Questions/codeforces");
    fs.mkdirSync("./Questions/freebootcamp");
    
}
// studybuddy "Computer-Networks" "Database-Management-Systems"

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
    await freebootcampextractor(browser, `https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/`) ;
    await browser.close();
    await getcontent(cheerio);
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
    await newTab.waitForTimeout(5000);
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

///freebootcamp extractor
async function freebootcampextractor(browser, linkl) {
    let newTab = await browser.newPage();
            await newTab.goto(linkl);
            await newTab.waitForSelector(".map-challenge-title.map-challenge-wrap>a", { visible: true });
                let value = await newTab.evaluate(datafunction,".map-challenge-title.map-challenge-wrap>a");
             if(!fs.existsSync(`./Questions/freebootcamp/javascript.json`)){
                    fs.writeFileSync(`./Questions/freebootcamp/javascript.json`, JSON.stringify(value));
                }   
            
            //close the tab
            newTab.close();
            ///////finding array of quesion by selector
             function datafunction(quesion) {
                let pricearray = document.querySelectorAll(quesion);
                let details = [];
                for (let i = 0; i < pricearray.length; i++) {
                    let name = pricearray[i].textContent.trim().split("Not PassedNot Passed")[1]
                    let url = "https://www.freecodecamp.org/" + pricearray[i].getAttribute('href');
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
await newtab.waitForTimeout(1000);
await newtab.waitForSelector('[id="video-title-link"]',{delay:1000});

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




function promisifiedrequest(codeforce) {
    //  pending state promise
    return new Promise(function (resolve, reject) {
        request(codeforce, function cb(err, sada, data) {
            if (err) {
                // reject -> work fail
                reject(err);
            } else {
                // resolve -> work complete
                resolve(data)
                count--;
                if(count==0){
                    htmlmaker();
               }
                // console.log("data->" + );
            }
        });
    });
}

// let getcontent = async function () {
    let getcontent = async function (cheerio) {
        //  pending state promise
        return new Promise(function (resolve, reject) {
            try{
    for (let i = 1; i <= 69; i++) {
        count++;
        console.log("hello"+i)
        let requestPromise = promisifiedrequest(codeforce + i);
        requestPromise
            .then(function (html) {
                let $ = cheerio.load(html + "");
                // console.log($.html());
                let prblmlinktag = $('.problems');
                let prblmlink = $(prblmlinktag).find('tr > td > div:nth-child(1) > a');
                // console.log(prblmlink);

                for (let j = 0; j < prblmlink.length; j++) {
                    let nameis = 'https://codeforces.com' + $(prblmlink[j]).attr('href');
                    // link.push(nameis);
                    let name = $(prblmlink[j]).text().trim();
                    // name=name.substr(2);
                    // console.log(name)
                    let ch1 = nameis.substr(42);
                    let ch = nameis.charAt(nameis.length - 1);
                    if (!linkcode.includes(ch1)) {
                        linkcode.push(ch1);
                        if (ch == 'A') {
                            if (!fs.existsSync("./Questions/codeforces/A.json")) {
                                fs.writeFileSync("./Questions/codeforces/A.json", JSON.stringify([`<td><a target="_blank" href=${nameis}>${name}</a></td>`]));


                            }
                            else {
                                let issues = JSON.parse(fs.readFileSync("./Questions/codeforces/A.json"));
                                let newIssue = `<td><a target="_blank" href=${nameis}>${name}</a></td>`
                                issues.push(newIssue);

                                fs.writeFileSync("./Questions/codeforces/A.json", JSON.stringify(issues));
                            }
                        }
                        else if (ch == 'B') {
                            if (!fs.existsSync("./Questions/codeforces/B.json")) {
                                fs.writeFileSync("./Questions/codeforces/B.json", JSON.stringify([`<td><a target="_blank" href=${nameis}>${name}</a></td>`]));

                            }
                            else {
                                let issues = JSON.parse(fs.readFileSync("./Questions/codeforces/B.json"));
                                let newIssue = `<td><a target="_blank" href=${nameis}>${name}</a></td>`
                                issues.push(newIssue);
                                fs.writeFileSync("./Questions/codeforces/B.json", JSON.stringify(issues));
                            }
                        }
                        else if (ch == 'C') {
                            if (!fs.existsSync("./Questions/codeforces/C.json")) {
                                fs.writeFileSync("./Questions/codeforces/C.json", JSON.stringify([`<td><a target="_blank" href=${nameis}>${name}</a></td>`]));

                            }
                            else {
                                let issues = JSON.parse(fs.readFileSync("./Questions/codeforces/C.json"));
                                let newIssue = `<td><a target="_blank" href=${nameis}>${name}</a></td>`
                                issues.push(newIssue);
                                fs.writeFileSync("./Questions/codeforces/C.json", JSON.stringify(issues));
                            }
                        }
                        else if (ch == 'D') {
                            if (!fs.existsSync("./Questions/codeforces/D.json")) {
                                fs.writeFileSync("./Questions/codeforces/D.json", JSON.stringify([`<td><a target="_blank" href=${nameis}>${name}</a></td>`]));

                            }
                            else {
                                let issues = JSON.parse(fs.readFileSync("./Questions/codeforces/D.json"));
                                let newIssue = `<td><a target="_blank" href=${nameis}>${name}</a></td>`
                                issues.push(newIssue);
                                fs.writeFileSync("./Questions/codeforces/D.json", JSON.stringify(issues));
                            }
                        }
                        else if (ch == 'E') {
                            if (!fs.existsSync("./Questions/codeforces/E.json")) {
                                fs.writeFileSync("./Questions/codeforces/E.json", JSON.stringify([`<td><a target="_blank" href=${nameis}>${name}</a></td>`]));

                            }
                            else {
                                let issues = JSON.parse(fs.readFileSync("./Questions/codeforces/E.json"));
                                let newIssue = `<td><a target="_blank" href=${nameis}>${name}</a></td>`
                                issues.push(newIssue);
                                fs.writeFileSync("./Questions/codeforces/E.json", JSON.stringify(issues));
                            }
                        }
                        else if (ch == 'F') {
                            if (!fs.existsSync("./Questions/codeforces/F.json")) {
                                fs.writeFileSync("./Questions/codeforces/F.json", JSON.stringify([`<td><a target="_blank" href=${nameis}>${name}</a></td>`]));

                            }
                            else {
                                let issues = JSON.parse(fs.readFileSync("./Questions/codeforces/F.json"));
                                let newIssue = `<td><a target="_blank" href=${nameis}>${name}</a></td>`
                                issues.push(newIssue);
                                fs.writeFileSync("./Questions/codeforces/F.json", JSON.stringify(issues));
                            }
                        }
                        else if (ch == 'G') {
                            if (!fs.existsSync("./Questions/codeforces/G.json")) {
                                fs.writeFileSync("./Questions/codeforces/G.json", JSON.stringify([`<td><a target="_blank" href=${nameis}>${name}</a></td>`]));

                            }
                            else {
                                let issues = JSON.parse(fs.readFileSync("./Questions/codeforces/G.json"));
                                let newIssue = `<td><a target="_blank" href=${nameis}>${name}</a></td>`
                                issues.push(newIssue);
                                fs.writeFileSync("./Questions/codeforces/G.json", JSON.stringify(issues));
                            }
                        }
                        else if (ch == 'H') {
                            if (!fs.existsSync("./Questions/codeforces/H.json")) {
                                fs.writeFileSync("./Questions/codeforces/H.json", JSON.stringify([`<td><a target="_blank" href=${nameis}>${name}</a></td>`]));

                            }
                            else {
                                let issues = JSON.parse(fs.readFileSync("./Questions/codeforces/H.json"));
                                let newIssue = `<td><a target="_blank" href=${nameis}>${name}</a></td>`
                                issues.push(newIssue);
                                fs.writeFileSync("./Questions/codeforces/H.json", JSON.stringify(issues));
                            }
                        }
                        else if (ch == 'I') {
                            if (!fs.existsSync("./Questions/codeforces/I.json")) {
                                fs.writeFileSync("./Questions/codeforces/I.json", JSON.stringify([`<td><a target="_blank" href=${nameis}>${name}</a></td>`]));

                            }
                            else {
                                let issues = JSON.parse(fs.readFileSync("./Questions/codeforces/I.json"));
                                let newIssue = `<td><a target="_blank" href=${nameis}>${name}</a></td>`
                                issues.push(newIssue);
                                fs.writeFileSync("./Questions/codeforces/I.json", JSON.stringify(issues));
                            }
                        }
                        else if (ch == 'J') {
                            if (!fs.existsSync("./Questions/codeforces/J.json")) {
                                fs.writeFileSync("./Questions/codeforces/J.json", JSON.stringify([`<td><a target="_blank" href=${nameis}>${name}</a></td>`]));

                            }
                            else {
                                let issues = JSON.parse(fs.readFileSync("./Questions/codeforces/J.json"));
                                let newIssue = `<td><a target="_blank" href=${nameis}>${name}</a></td>`
                                issues.push(newIssue);
                                fs.writeFileSync("./Questions/codeforces/J.json", JSON.stringify(issues));
                            }
                        }
                        else if (ch == 'K') {
                            if (!fs.existsSync("./Questions/codeforces/K.json")) {
                                fs.writeFileSync("./Questions/codeforces/K.json", JSON.stringify([`<td><a target="_blank" href=${nameis}>${name}</a></td>`]));

                            }
                            else {
                                let issues = JSON.parse(fs.readFileSync("./Questions/codeforces/K.json"));
                                let newIssue = `<td><a target="_blank" href=${nameis}>${name}</a></td>`
                                issues.push(newIssue);
                                fs.writeFileSync("./Questions/codeforces/K.json", JSON.stringify(issues));
                            }
                        }
                    }
                }
            })
    }}catch(err){console.log(err);}})}

    
    let htmlmaker =  function(){

    
        if(!fs.existsSync("./public")){
            fs.mkdirSync("./public");
        }
        if(!fs.existsSync("./public/allpages")){
            fs.mkdirSync("./public/allpages");
        }
        let htmlend = "</table></body></html>";
        let yu = "";
        let note = "";
        function htmlmaker1(folder,atrribute){
            let data = `<!DOCTYPE html>
            <html >
            <head></head>
            </head>
            <style>
                table, th, td {
                  border: 1px solid black;
                  border-collapse: collapse;
                }
                th, td {
                  padding: 5px;
                  text-align: center;
                }
            </style>
            <body>
            <h1 style="text-align: center;font-size: 10ex;">${atrribute} - Tag </h1>
                <table style="margin-left: auto; margin-right: auto;">
                    <tr>
                      <th style="text-align: left;">S.No</th>
                      <th>Problem Name</th>
                    </tr>`;
                    if(folder=="youtube"){
                        yu = yu+`<button onclick="location.href='./allpages/${folder}_${atrribute}.html'" style="height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px; background-color: rgb(205, 248, 104); font-weight: bold;">${atrribute}</button>`;
                    }
                    if(folder=="notes"){
                        note = note+`<button onclick="location.href='./allpages/${folder}_${atrribute}.html'" style="height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px; background-color: aquamarine; font-weight: bold;">${atrribute}</button>`;
                    }
            let arr = require(`./Questions/${folder}/${atrribute}.json`);
        for(let i = 0;i<arr.length;i++){
            data = data+`<tr><td>${i}</td>`+arr[i];
        }
         let htmla = data+htmlend;
        // console.log(htmla);
        fs.writeFileSync(`./public/allpages/${folder}_${atrribute}.html`,htmla);}
        htmlmaker1("entertainment","Comedies");
        htmlmaker1("entertainment","Music");
        htmlmaker1("codeforces","A");
        htmlmaker1("codeforces","B");
        htmlmaker1("codeforces","C");
        htmlmaker1("codeforces","D");
        htmlmaker1("codeforces",'E');
        htmlmaker1("codeforces",'F');
        htmlmaker1("codeforces",'G');
        htmlmaker1("codeforces",'H');
        htmlmaker1("codeforces",'I');
        htmlmaker1("codeforces",'J');
        htmlmaker1("codeforces",'K');
        for(let a =0;a<topics.length;a++){
            htmlmaker1(`youtube`,`${topics[a]}`);
            htmlmaker1(`notes`,`${topics[a]}`);
        }
        htmlmaker1("leetcode","array");
        htmlmaker1("leetcode","bitmanupulation");
        htmlmaker1("leetcode","Easy");
        htmlmaker1("leetcode","graph");
        htmlmaker1("leetcode",'Hard');
        htmlmaker1("leetcode",'Medium');
        htmlmaker1("leetcode",'recurrsion');
        htmlmaker1("leetcode",'trees');
        htmlmaker1("freebootcamp",'javascript');
        console.log(topics);
        let index = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body style="background-color: rgb(247, 228, 206);">
            <div style="background-color: black; width: 100%; margin: 0; padding: 0;">
                <h1 style="text-align: center; font-size: 12ex; margin-top: 5px; color: aliceblue; margin-bottom: 0;">STUDY BUDDY</h1>
            </div>
        
            <div style="padding: 0;">
                <div style="background-color: rgb(148, 186, 241);">
                <h2 style="margin: 0.5em; font-size: 5ex;">STUDY MATERIAL ZONE</h2>
            </div>
                <div style="margin-left:10px ;">
                    <div>
                        <h3> Notes
                        </h3>
                        ${note}
                    </div>
                    <div style="margin-bottom:0px;">
                        <h3 style="margin-top:0px;"> Preferred Subject Playlist
                        </h3>
                        ${yu}
                    </div>
                </div>
            </div>
            <div style="padding: 0;">
            <div style="background-color: rgb(148, 186, 241);">
            <h2 style="margin: 0.5em; font-size: 5ex;">CODING</h2>
        </div>
            <div style="margin-left:10px ;">
                <div>
                    <h3> LeetCode
                    </h3>
                    <button onclick="location.href='./allpages/leetcode_array.html'" style="width: 10em;height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px; font-weight: bold;background-color: darkseagreen;">Array</button>
                    <button onclick="location.href='./allpages/leetcode_bitmanupulation.html'" style="width: 10em;height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px; font-weight: bold;background-color: darkseagreen;">Bitmanupulation</button>
                    <button onclick="location.href='./allpages/leetcode_Easy.html'" style="width: 10em;height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px; font-weight: bold;background-color: darkseagreen;">Easy</button>
                    <button onclick="location.href='./allpages/leetcode_graph.html'" style="width: 10em;height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px; font-weight: bold;background-color: darkseagreen;">Graph</button>
                    <button onclick="location.href='./allpages/leetcode_Hard.html'" style="width: 10em;height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px; font-weight: bold;background-color: darkseagreen;">Hard</button>
                    <button onclick="location.href='./allpages/leetcode_Medium.html'" style="width: 10em;height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px; font-weight: bold;background-color: darkseagreen;">Medium</button>
                    <button onclick="location.href='./allpages/leetcode_recurrsion.html'" style="width: 10em;height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px; font-weight: bold;background-color: darkseagreen;">Recursion</button>
                    <button onclick="location.href='./allpages/leetcode_trees.html'" style="width: 10em;height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px; font-weight: bold;background-color: darkseagreen;">Trees</button>
                </div>
                <div style="margin-bottom:0px;">
                    <h3 style="margin-top:0px;"> Codeforces
                    </h3>
                    <button onclick="location.href='./allpages/codeforces_A.html'" style="width: 10em;height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px;font-weight: bold;background-color:lightpink">A</button>
                    <button onclick="location.href='./allpages/codeforces_B.html'" style="width: 10em;height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px;font-weight: bold;background-color:lightpink">B</button>
                    <button onclick="location.href='./allpages/codeforces_C.html'" style="width: 10em;height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px;font-weight: bold;background-color:lightpink">C</button>
                    <button onclick="location.href='./allpages/codeforces_D.html'" style="width: 10em;height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px;font-weight: bold;background-color:lightpink">D</button>
                    <button onclick="location.href='./allpages/codeforces_E.html'" style="width: 10em;height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px;font-weight: bold;background-color:lightpink">E</button>
                    <button onclick="location.href='./allpages/codeforces_F.html'" style="width: 10em;height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px;font-weight: bold;background-color:lightpink">F</button>
                    <button onclick="location.href='./allpages/codeforces_G.html'" style="width: 10em;height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px;font-weight: bold;background-color:lightpink">G</button>
                    <button onclick="location.href='./allpages/codeforces_H.html'" style="width: 10em;height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px;font-weight: bold;background-color:lightpink">H</button>
                    <button onclick="location.href='./allpages/codeforces_I.html'" style="width: 10em;height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px;font-weight: bold;background-color:lightpink">I</button>
                    <button onclick="location.href='./allpages/codeforces_J.html'" style="width: 10em;height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px;font-weight: bold;background-color:lightpink">J</button>
                    <button onclick="location.href='./allpages/codeforces_K.html'" style="width: 10em;height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px;font-weight: bold;background-color:lightpink">K</button>
                </div>
                <div>
                    <h3> FreeCodeCamp
                    </h3>
                    <button onclick="location.href='./allpages/freebootcamp_javascript.html'" style="width: 10em;height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px;font-weight: bold;background-color:lightyellow">Javascript</button>
                </div>
            </div>
        </div>
        <div style="padding: 0;">
            <div style="background-color: rgb(148, 186, 241);">
            <h2 style="margin: 0.5em; font-size: 5ex;">Entertainment</h2>
        </div>
            <div style="margin-left:10px ;">
                <div>
                    <button onclick="location.href='./allpages/entertainment_Comedies.html'" style="width: 10em;height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px; font-weight: bold;background-color: aquamarine;">Standups</button>
                    <button onclick="location.href='./allpages/entertainment_Music.html'" style="width: 10em;height: 3em;margin-left: 20px;margin-bottom: 30px; border-radius: 5px;font-weight: bold;background-color:aquamarine">Music</button>
                </div>
            </div>
        </div>
    </body>
    </html>`
        fs.writeFileSync(`./public/index.html`,index);
    
    }
