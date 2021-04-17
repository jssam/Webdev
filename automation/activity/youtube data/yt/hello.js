let puppeteer = require("puppeteer");
let fs = require("fs");
let pName = process.argv.slice(2);
console.log(pName.length);
let link = `https://noteshub.co.in/`;
let linkl = `https://leetcode.com/problemset/`;
if(!fs.existsSync("./Questions")){
    fs.mkdirSync("./Questions");
}

console.log("Before");
(async function () {
    try {
        let browser = await puppeteer.launch({
            executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', 
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
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
         if(!fs.existsSync(`./Questions/${chance}.json`)){
                fs.writeFileSync(`./Questions/${chance}.json`, JSON.stringify(value));
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
        //notes hub 
        for(let j = 0;j<=pName.length-1;j++){
            let urls = [];
            let newTab = await browser.newPage();
            let u = `${link}${pName[j]}`;
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
            await newTab.waitForTimeout(3000);
            await lastpage.close();
        }
        if(!fs.existsSync(`./Questions/${pName[j]}.json`)){
            fs.writeFileSync(`./Questions/${pName[j]}.json`, JSON.stringify(urls));
        }  
        await newTab.close();
    }




    } catch (err) {
        console.log(err);
    }
})();