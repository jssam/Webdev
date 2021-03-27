///npm install puppeteer
let puppeteer = require('puppeteer');
let browserwillelaunchedpromise = puppeteer.launch({
    headless: false
})
////here is chaining so it cause call back hell
// browserwillelaunchedpromise.then(
//     function(browserInstance){
//         //new tab
//         let newpagepromise = browserInstance.newPage();
//         newpagepromise
//         .then(function(newPage){
//             console.log("NEW TAB OPEND ")
//             //go to pepcoding 
//             let pagewillbeopendpromise = newPage.goto("https://www.pepcoding.com");
//             pagewillbeopendpromise
//             .then(function(){
//                 console.log("page is opened");
//             })
//         }

//         )
//     }
// )
///upar vali nesting se bachne ke liye hm ye karte hai
browserwillelaunchedpromise.then(
    function (browserInstance) {
        //new tab
        let newpagepromise = browserInstance.newPage();
        return newpagepromise
    })
    .then(function (newPage) {
        console.log("NEW TAB OPEND ")
        //go to pepcoding 
        let pagewillbeopendpromise = newPage.goto("https://www.pepcoding.com");
        return pagewillbeopendpromise
    })
    .then(function () {
        console.log("page is opened");
    })
///hm har then kar sakte hai bas upar vale me return lga dete hai take upar vale return hone ka wait kare vo
///this is called chaining