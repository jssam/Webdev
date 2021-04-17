let puppeteer = require("puppeteer");
let fs = require("fs");
let pName = process.argv.slice(2);
console.log(pName.length);
let link = `https://noteshub.co.in/`;
///you can add subjects like "Computer-Networks" "Database-Management-Systems"


console.log("Before");
(async function () {
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
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

console.log(urls);
  }  )();