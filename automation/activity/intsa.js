let puppeteer = require("puppeteer");

(async function () {
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
    });
    let allpages = await browser.pages();
    let tab = allpages[0];
    await tab.goto("https://www.instagram.com/");
    await tab.waitForSelector("input[name='password']", { visible: true });
    await tab.type("input[name='username']", "name", "name", { delay: 300 })
    await tab.type("input[name='password']", "password", { delay: 300 })
    await tab.click(".sqdOP.L3NKy.y3zKF");
    await tab.waitForTimeout(3000);
    await tab.goto("https://www.instagram.com/jsam002/", { delay: 500 });
    let a = await tab.$$(".eLAPa");
    console.log(a.length);
    let s = true;
    await tab.click(".eLAPa", { delay: 1000 });
    while (s!=false){
        let a = await tab.$('._65Bje.coreSpriteRightPaginationArrow')
        if (a!=null) { 
        await Sam(tab);
        await likes(tab);
    }else{ s = false;}
        }
})()




let Sam = async (tab) => {
    await tab.waitForTimeout(3000);
}


let likes = async function (tab) {
    let a = await tab.$("svg[aria-label='Unlike']")
  if(a==null){
    tab.click("svg[aria-label='Like']", { delay: 500 })
    .then(function () { return tab.click("._65Bje.coreSpriteRightPaginationArrow", { delay: 500 })}); 

  }else{
    return tab.click("._65Bje.coreSpriteRightPaginationArrow", { delay: 500 });  }
}