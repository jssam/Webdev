////npm init -y
// npm install request

let request = require("request");
////to select selector in html we use cheerio
///npm install cheerio
let cheerio = require("cheerio");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";
/////////task 1 where we have to earch for last ball commentory
request(url,cd);
function cd(err,response,html){
    if(err){
        console.log(err);
    }else{
// console.log(html);
///for extraction of data we cam pass html
extractdata(html);

    }
} 
function extractdata(html){
    let selTool = cheerio.load(html);
    let commentaryarray = selTool(".col-14.col-md-15.col-lg-14 .match-comment-long-text");
let lastballcall = selTool(commentaryarray[0]).text();
console.log(lastballcall);
}

////////////////task 2 - heighest wicket taker
//in hwt.js
