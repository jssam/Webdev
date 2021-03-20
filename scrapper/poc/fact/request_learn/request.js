////npm init -y
// npm install request
//npm install cheerio
let request = require("request");
////to select selector in html we use cheerio
///npm install cheerio
let cheerio = require("cheerio");
console.log("before");
request("http://www.google.com",cd);
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
    let elem = selTool("#SIvCob");
// console.log(elem);
///print html inside the element
console.log(elem.html());
///print text inside that element
    console.log(elem.text());
}
console.log("after")
console.log("after that")