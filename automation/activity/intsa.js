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
        let logintab = newTab.goto("https://www.instagram.com/");
        gtab = newTab;
        return logintab;
    }).then(function(){
      let sam=  setTimeout(() => {
            email()
            .then(function(){return password();})
            .then(function(){return click(); })
            .then(function(){return ritik(); })
            .then(function(){return gtab.goto("https://www.instagram.com/daredevil_ritik/",{delay:500}); })
            .then(function(){return gtab.click(".eLAPa",{delay:1000}) })
            .then(function(){return ritik(); })
            .then(function(){return likes(); })
            .then(function(){return ritik(); })
            .then(function(){return likes(); })
            .then(function(){return ritik(); })
            .then(function(){return likes(); })
            .then(function(){return ritik(); })
            .then(function(){return likes(); })
            .then(function(){return ritik(); })
            .then(function(){return likes(); })
            .then(function(){return ritik(); })
            .then(function(){return likes(); })
            .then(function(){return ritik(); })
            .then(function(){return likes(); })
            .then(function(){return ritik(); })
            .then(function(){return likes(); })
            .then(function(){return ritik(); })
            .then(function(){return likes(); })
 
        }, 1000);
        return sam;
    })
    
        .catch(function(err){
            console.log(err);
        })


function email(){
    let emailtype = gtab.type("input[name='username']" , "vking.0",{delay:300})
            return emailtype;
}
function password(){
    let password = gtab.type("input[name='password']" , "Hello@Sanyam",{delay:300})
    return password;
}
function click(){
    let loginclick = gtab.click(".sqdOP.L3NKy.y3zKF");
    return loginclick;
}
let ritik = async ()=>{
        await gtab.waitFor(3000);}

let ritiklike = setTimeout(() => {async ()=>{
await gtab.click("svg[aria-label='Like']",{delay:1000});
await gtab.click("._65Bje.coreSpriteRightPaginationArrow",{delay:500});}} ,1000)

let likes = function(){
        
    gtab.click("svg[aria-label='Like']",{delay:500})
    .then(function(){return gtab.click("._65Bje.coreSpriteRightPaginationArrow",{delay:500}); })
}