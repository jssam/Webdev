let puppeteer = require("puppeteer");
let fs = require("fs");
let link = `https://noteshub.co.in/Computer-Networks`;
if(!fs.existsSync("./Questions")){
    fs.mkdirSync("./Questions");
}
// let pName = process.argv[2];

console.log("Before");
(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', 
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        let newTab = await browserInstance.newPage();
        await newTab.goto(link);
    await newTab.waitForSelector('.study-material-card.ng-star-inserted', { visible: true });

  let page = await newTab.click('.study-material-card.ng-star-inserted')
        await page._client.send(' page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: './Questions',
        });
    const downloadPDFButton = await page.$('#download-button');
    await downloadPDFButton.click();
    
    await page.waitForTimeout(1000)

}
        catch(err){console.log;}
    })();