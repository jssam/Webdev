let puppeteer = require("puppeteer");
let fs = require("fs");
let links = ["https://www.amazon.in", "https://www.flipkart.com", "https://paytmmall.com/"];
let pName = process.argv[2];

console.log("Before");
(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        await getListingFromAmazon(links[0], browserInstance,pName);
        await getListingFromFlipkart(links[1], browserInstance,pName);
        await getListingFromPaytm(links[2], browserInstance,pName);
    } catch (err) {
        console.log(err);
    }
})();

//  product Name,url of amazon home page
// output-> top 5 matching product -> price Name print 
async function getListingFromAmazon(link, browserInstance, pName) {
    let newTab = await browserInstance.newPage();
    await newTab.goto(link);
    await newTab.type("#twotabsearchtextbox",pName, { delay: 10 });
    await newTab.click("#nav-search-submit-button");
    await newTab.waitForSelector('.a-size-medium.a-color-base.a-text-normal',{visible:true});
    await newTab.waitForSelector('.a-price-whole',{visible:true});
  
    function datafunction(price,Name){
        let pricearray = document.querySelectorAll(price);
        let namearray = document.querySelectorAll(Name);
        let details = [];
        for(let i =0;i<5;i++){
            let pr  = pricearray[i].innerText;
            let na  = namearray[i].innerText;
            console.log(pr);
            details.push({
                name : na,
                price : pr
            })
        }
        return details;
    } 

let value = await newTab.evaluate(datafunction,'.a-price-whole','.a-size-medium.a-color-base.a-text-normal')
console.log("````````````````amazon``````````")
console.table(value);

}
async function getListingFromFlipkart(link, browserInstance, pName) {
    let newTab = await browserInstance.newPage();

    await newTab.goto(link);
    await newTab.click("._2KpZ6l._2doB4z")
    await newTab.type("._3704LK",pName,{delay:10});
    await newTab.click(".L0Z3Pu");
    await newTab.waitForSelector("._4rR01T",{visible:true});
    await newTab.waitForSelector("._30jeq3._1_WHN1",{visible:true});
    function datafunction(price,Name){
        let pricearray = document.querySelectorAll(price);
        let namearray = document.querySelectorAll(Name);
        let details = [];
        for(let i =0;i<5;i++){
            let pr  = pricearray[i].innerText;
            let na  = namearray[i].innerText;
            console.log(pr);
            details.push({
                name : na,
                price : pr
            })
        }
        return details;
    } 

let value = await newTab.evaluate(datafunction,'._30jeq3._1_WHN1','._4rR01T')
console.log("````````````````flipkart``````````")
console.table(value);
}
async function getListingFromPaytm(link, browserInstance, pName) {
    let newTab = await browserInstance.newPage();
    await newTab.goto(link);
    await newTab.type('#searchInput',pName,{delay:10})
    await newTab.keyboard.press("Enter");
    await newTab.keyboard.press("Enter");
    await newTab.waitForSelector("div>.UGUy",{visible:true});
    await newTab.waitForSelector("div>._1kMS",{visible:true});
    function datafunction(price,Name){
        let pricearray = document.querySelectorAll(price);
        let namearray = document.querySelectorAll(Name);
        let details = [];
        for(let i =0;i<5;i++){
            let pr  = pricearray[i].innerText;
            let na  = namearray[i].innerText;
            console.log(pr);
            details.push({
                name : na,
                price : pr
            })
        }
        return details;
    } 

let value = await newTab.evaluate(datafunction,'div>._1kMS','div>.UGUy')
console.log("````````````````paytm``````````")
console.table(value);

}