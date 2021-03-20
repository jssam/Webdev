let request = require("request");
let cheerio = require("cheerio");
let url = "https://github.com/topics";
request(url,cb)

function cb(err,response,html){
if(err){
    console.log(err);
}
etracthtml(html);
} 
function etracthtml(html){
    let $ = cheerio.load(html);
    let threebox = $(".topic-box.position-relative.hover-grow.height-full.text-center.border.color-border-secondary.rounded.color-bg-primary.p-5>a");
    let nameis = $(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1")
    let fulllink=[];
    for(let i = 0;i<threebox.length;i++){
    let name =$(nameis[i]).text();
    fulllink[i] ="https://github.com"+ $(threebox[i]).attr("href");
    requestingrepo(fulllink[i],name);
}
    
}
function requestingrepo(link,name){
    request(link,call);
    function call(err,response,html){
        if(err){
            console.log(err);
        }
        repository(html,name);
        } 
}


    
function repository(html,name){
        let $ = cheerio.load(html);
        let repo = $(".f3.color-text-secondary.text-normal.lh-condensed>a.text-bold");
        let repolink=[];
        console.log(name);
        for(let i = 0;i<8;i++){
        repolink[i] =$(repo[i]).attr("href");
        console.log(repolink[i]);
        }
        console.log("````````````````````````````````");
    }