let puppeteer = require("puppeteer");
let fs = require("fs");
let link = `https://leetcode.com/problemset/`;
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
        await newTab.waitForSelector('.row-selector >.form-control', { visible: true });
        await newTab.click('.row-selector >.form-control');
        await newTab.keyboard.press("ArrowDown");
        await newTab.keyboard.press("ArrowDown");
        await newTab.keyboard.press("ArrowDown");
        await newTab.keyboard.press("Enter");
        let links = ["all/?difficulty=Easy", "all/?difficulty=Medium", "all/?difficulty=Hard","all/?search=array","all/?search=bitmanupulation","all/?search=trees","all/?search=graph","all/?search=recurrsion"]
        for (let i = 0; i < links.length; i++) {
            let newlink = await browserInstance.newPage();
            let url = links[i];
            await newlink.goto(link+url);
            let chance = url.split('=')[1];
            console.log(chance);
            await newlink.waitForSelector('td[label="Title"]>div>a', { visible: true });
            let value = await newlink.evaluate(datafunction,'td[label="Title"]>div>a');
            await newlink.close();
         if(!fs.existsSync(`./Questions/${chance}.json`)){
                fs.writeFileSync(`./Questions/${chance}.json`, JSON.stringify(value));

            }
           
        }
        newTab.close();




         function datafunction(quesion) {
            let pricearray = document.querySelectorAll(quesion);
            let details = [];
            for (let i = 0; i < pricearray.length; i++) {
                let name = pricearray[i].textContent.trim()
                let url = "https://leetcode.com" + pricearray[i].getAttribute('href');
              details.push(`${name}+${url}`)
            }
           
            return details;
        }
    } catch (err) {
        console.log(err);
    }
})();