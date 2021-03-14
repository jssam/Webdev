let request = require("request");
let cheerio = require("cheerio");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        // console.log(html);
        extractData(html);
    }
}
function extractData(html) {
    let selTool = cheerio.load(html);
    // get the bowling table of both the innings
    let bothBowlerTable = selTool(".table.bowler");
    // console.log(bothBowlerTable.length);
    // let tableHtml = "";
    // for (let i = 0; i < bothBowlerTable.length; i++) {
    //     tableHtml += selTool(bothBowlerTable[i]).html();
    // }
    let hwtname = "";
    let hwkt = 0 ;
    for (let i = 0; i < bothBowlerTable.length; i++) {
        // tableHtml += selTool(bothBowlerTable[i]).html();
        let playersRow = selTool(bothBowlerTable[i]).find("tbody tr");
        for (let j = 0; j < playersRow.length; j++) {
            let allcolOfPlayer = selTool(playersRow[j]).find("td");
            let name = selTool(allcolOfPlayer[0]).text();
            let wicket = selTool(allcolOfPlayer[4]).text();
            // console.log("name", name, "wicket", wicket);
            if(hwkt <Number.parseInt(wicket)){
                hwtname = name;
                hwkt  = wicket;
            }
        }
        // console.log("`````````````````````````````````````");
    }
    console.log("name ->" +hwtname+"hwkt->" + hwkt);
    // console.log(tableHtml);
    // get the names and wickets of every player

}