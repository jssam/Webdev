let request = require("request");
let cheerio = require("cheerio");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
request(url,cd);
function cd(err,response,html){
    if(err){
console.log(err);
    }
    extractor(html);
}
function extractor(html){
    let settool = cheerio.load(html)
    let teamnametable = settool(".Collapsible h5");
    // let batsmantable = settool(".table.batsman");
    let teamnameis= [];
    for(let i = 0;i<teamnametable.length;i++){
        let teamname = settool(teamnametable[i]).text();
        teamname = teamname.split("INNINGS")[0];
        teamname = teamname.trim();
        teamnameis.push(teamname);
    }
    let batsmantable = settool(".table.batsman");
    for(let i = 0 ;i<batsmantable.length;i++){
        let batsmanname = settool(batsmantable[i]).find("tbody tr .batsman-cell a");
        for(let j = 0 ;j<batsmanname.length;j++){
            let bname = settool(batsmanname[j]).text();
            let link = settool(batsmanname[j]).attr("href");
            printbirthday(link,bname,teamnameis[i])
            // console.log(bname +" is of " +teamnameis[i]);
        }
        console.log("``````````````````````````````");
    }
}
function printbirthday(link,bname,team){
    request(link,cb);
    function cb(err,response,html){
        if(err){
            console.log(err);
        }
        extractbirthday(html,bname,team);
    }
}
function extractbirthday(html,bname,team){
    let settool = cheerio.load(html);
    let birth = settool(".ciPlayerinformationtxt span");
    let birth1 = settool(birth[1]).text();
    console.log(bname+" " + birth1+ " "+ team)
}