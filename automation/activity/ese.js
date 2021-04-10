let puppeteer = require("puppeteer");
let fs = require("fs");
let gtab;

let x =["https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/1.%20Design%20Fundamentals%20-%20Introduction%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/10.%20Load%20Balancers%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/11.%20Hashing%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/12.%20Relational%20Databases%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/13.%20Key-Value%20Stores%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/14.%20Specialized%20Storage%20Paradigms%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/15.%20Replication%20And%20Sharding%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/16.%20Leader%20Election%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/17.%20Peer-To-Peer%20Networks%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/18.%20Polling%20And%20Streaming%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/19.%20Configuration%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/2.%20What%20Are%20Design%20Fundamentals%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/20.%20Rate%20Limiting%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/21.%20Logging%20And%20Monitoring%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/22.%20Publish%20-%20Subscribe%20Pattern%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/23.%20MapReduce%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/24.%20Security%20And%20HTTPS%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/25.%20API%20Design%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/3.%20Client-Server%20Model%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/4.%20Network%20Protocols%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/5.%20Storage%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/6.%20Latency%20And%20Throughput%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/7.%20Availability%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/8.%20Caching%20from%20Cl%C3%A9ment%20Mihailescu.mp4",
"https://working01.sf1.workers.dev/0:/%20%F0%9F%92%96%20EXCLUSIVE%20DRIVE%20%F0%9F%92%96/[AlgoExpert.io]%20All%20Courses%20[Updated]/System%20Design%20Fundamentals/9.%20Proxies%20from%20Cl%C3%A9ment%20Mihailescu.mp4"]
let browserPromise = puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized",]
    })


function down(link){browserPromise
    .then(function (browserInstance) {
        let newTabPromise = browserInstance.newPage();
        return newTabPromise;
    })
    .then(function (newTab) {
        // console.log(newTab);
        let loginPageWillBeopenedPromise = newTab.goto(link);
        gtab = newTab;
        return loginPageWillBeopenedPromise;
    })
}


for(let i =0;i<x.length;i++){
down(x[i]);
console.log(x.length);
}
    // .then(function(){ return wait();})
    // .then()


    // let wait = async ()=>{
    //     await gtab.waitFor(3000);}

    //     function click(){
    //         let loginclick = gtab.click(".card-text > .btn");
    //         return loginclick;
    //     }