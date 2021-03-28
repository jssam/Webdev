
let puppeteer = require("puppeteer");
let gtab;
let browserpromise = puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args:["--size-maximized"]
})
browserpromise
    .then(function(browserInstance){
        let newTabpromise = browserInstance.newPage();
        return newTabpromise;
    })
    .then(function(newTab){
        let logintab = newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
        gtab = newTab;
        return logintab;
    })
    .then(function(){
        ///open page tyoe
        let emailtype = gtab.type("#input-1" , "hehot44857@irahada.com",{delay:100})
        return emailtype;
    })
    .then(function(){
        let password = gtab.type("#input-2" , "1234567890",{delay:100})
        return password;
    })
    .then(function(){
        let loginclickbutton = gtab.click(".clearfix > .ui-btn > .ui-content > .ui-text");
        let waitfornext = gtab.waitForSelector(".card-content h3[title= 'Interview Preparation Kit']",{visible : true});
        let comcilepromice = Promise.all([loginclickbutton,gtab.waitForNavigation({waitUntil:"networkidle0"}),waitfornext]);
        return comcilepromice;
    })
    // .then(function(){
    //     return gtab.waitForSelector(".card-content h3[title= 'Interview Preparation Kit']",{visible : true});
    // })
    .then(function(){
        let clickprommise = gtab.click(".card-content h3[title= 'Interview Preparation Kit']");
        let waitforwarm = gtab.waitForSelector("#base-card-6-link",{ visible : true});
        let combinepr = Promise.all([clickprommise,gtab.waitForNavigation({waitUntil:"networkidle0"}),waitforwarm]);
        return combinepr;
    })
    // .then(function(){
    //     return gtab.waitForSelector(".ui-card.ui-layer-3.active-card",{visible : true});
    // })
    .then(function(){
        let warmupclick = gtab.click("#base-card-6-link");
        let waitforques = gtab.waitForSelector(".challenge-submit-btn",{ visible : true});
        let comcilepromice1 = Promise.all([warmupclick,gtab.waitForNavigation({waitUntil:"networkidle0"}),waitforques ]);
        return comcilepromice1 ;
    })
    .then(function(){
        let ques = gtab.click(".challenge-submit-btn");

        let comcilepromice1 = Promise.all([ques,gtab.waitForNavigation({waitUntil:"networkidle0"}) ]);
        return comcilepromice1 ;
    }).catch(function(err){
        console.log(err);
    })