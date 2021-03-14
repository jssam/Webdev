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
            console.log(bname +" is of " +teamnameis[i] );
        }
        console.log("``````````````````````````````");
    }


    // for(let i = 0;i<batsmantable.length;i++){
    //     let table = settool(batsmantable[i].find("tbody tr"));
    //     for (let j = 0; j < playersRow.length; j++) {
    //         let allcolOfPlayer = selTool(playersRow[j]).find("td");
    //         let name = selTool(allcolOfPlayer[0]).text();

    // }

}