let puppeteer = require("puppeteer");
let fs = require("fs");
let gtab;

let x = ["https://sf.fesal80900.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/150%20Interview%20Problems/Tandem%20Bicycle.mp4%20from%20Cl%C3%A9ment%20Mihailescu.mp4", " https://sf.fesal80900.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/150%20Interview%20Problems/Task%20Assignment%20from%20Cl%C3%A9ment%20Mihailescu.mp4", " https://sf.fesal80900.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/150%20Interview%20Problems/Three%20Number%20Sort%20from%20Cl%C3%A9ment%20Mihailescu.mp4"
, " https://sf.fesal80900.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/150%20Interview%20Problems/Three%20Number%20Sum%20from%20Cl%C3%A9ment%20Mihailescu.mp4"
, " https://sf.fesal80900.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/150%20Interview%20Problems/Topological%20Sort%20from%20Cl%C3%A9ment%20Mihailescu.mp4"
, " https://sf.fesal80900.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/150%20Interview%20Problems/Tournament%20Winner%20from%20Cl%C3%A9ment%20Mihailescu.mp4"
, " https://sf.fesal80900.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/150%20Interview%20Problems/Two%20Number%20Sum%20from%20Cl%C3%A9ment%20Mihailescu.mp4"
, " https://sf.fesal80900.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/150%20Interview%20Problems/Underscorify%20Substring%20from%20Cl%C3%A9ment%20Mihailescu.mp4"
, " https://sf.fesal80900.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/150%20Interview%20Problems/Valid%20IP%20Addresses%20from%20Cl%C3%A9ment%20Mihailescu.mp4"
, " https://sf.fesal80900.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/150%20Interview%20Problems/Valid%20Starting%20City%20from%20Cl%C3%A9ment%20Mihailescu.mp4"
, " https://sf.fesal80900.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/150%20Interview%20Problems/Validate%20BST%20from%20Cl%C3%A9ment%20Mihailescu.mp4"
, " https://sf.fesal80900.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/150%20Interview%20Problems/Validate%20Subsequence%20from%20Cl%C3%A9ment%20Mihailescu.mp4"
, " https://sf.fesal80900.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/150%20Interview%20Problems/Validate%20Three%20Nodes.mp4%20from%20Cl%C3%A9ment%20Mihailescu.mp4"
, " https://sf.fesal80900.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/150%20Interview%20Problems/Water%20Area%20from%20Cl%C3%A9ment%20Mihailescu.mp4"
, " https://sf.fesal80900.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/150%20Interview%20Problems/Waterfall%20Streams%20from%20Cl%C3%A9ment%20Mihailescu.mp4"
, " https://sf.fesal80900.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/150%20Interview%20Problems/Youngest%20Common%20Ancestor%20from%20Cl%C3%A9ment%20Mihailescu.mp4"
, " https://sf.fesal80900.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/150%20Interview%20Problems/Zigzag%20Traverse%20from%20Cl%C3%A9ment%20Mihailescu.mp4"
, " https://sf.fesal80900.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/150%20Interview%20Problems/Zip%20Linked%20List%20from%20Cl%C3%A9ment%20Mihailescu.mp4"]
   
   
let browserPromise = puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized",]
    })


browserPromise
    .then(function (browserInstance) {
        let newTabPromise = browserInstance.newPage();
        return newTabPromise;
    })
    .then(function (newTab) {
        // console.log(newTab);
        let loginPageWillBeopenedPromise = newTab.goto(x[0]);
        gtab = newTab;
        return loginPageWillBeopenedPromise;
    })
    // .then(function(){ return wait();})
    // .then()


    // let wait = async ()=>{
    //     await gtab.waitFor(3000);}

    //     function click(){
    //         let loginclick = gtab.click(".card-text > .btn");
    //         return loginclick;
    //     }