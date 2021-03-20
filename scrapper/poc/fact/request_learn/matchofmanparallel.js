let request = require("request");
let cheerio = require("cheerio");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
request(url,cb);
function cb(err,response,html){
    if(err){
        console.log(err);
            }
            extractor(html);
}

function extractor(html){
    let $ = cheerio.load(html);
    let teamwon = $(".match-cta-container");
    let scoreboard = [];
    let a =0;
    for(let i = 0;i<teamwon.length;i++){
        let score = $(teamwon[i]).find(".btn.btn-sm.btn-outline-dark.match-cta");
        let link = $(score[2]).attr("href");
        let fulllink = "https://www.espncricinfo.com"+link;
        request(fulllink,call);
    }

}

function call(err,response,html){
    if(err){
        console.log(err);
            }
 let $ = cheerio.load(html);
 let player  = $(".best-player-name> a").text();
console.log(player);
}