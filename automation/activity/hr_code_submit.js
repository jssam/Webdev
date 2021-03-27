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
        let emailtype = gtab.type("#input-1" , "hehot44857@irahada.com",{delay:200})
        return emailtype;
    })
    .then(function(){
        let password = gtab.type("#input-2" , "1234567890",{delay:200})
        return password;
    })
    .then(function(){
        let loginclickbutton = gtab.click(".clearfix > .ui-btn > .ui-content > .ui-text");
        return loginclickbutton;
    }).catch(function(err){
        console.log(err);
    })