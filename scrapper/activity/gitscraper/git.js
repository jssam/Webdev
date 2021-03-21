let request = require("request");
let fs = require("fs");
let p = require("path");
let cheerio = require("cheerio");
const PDFDocument = require('pdfkit');
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
    fs.mkdir(".\\node" ,(err) => {});
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
        // console.log(name);
        let name1 = name.trim() 
        dirmaker(name1);
        for(let i = 0;i<8;i++){
        repolink[i] =$(repo[i]).attr("href");
        // console.log(repolink[i]);
        let repname = repolink[i].split("/").pop();
        repname = repname.trim();
        // console.log(repname)
        makefile(name1,repname)
        requestissue(repolink[i],name1);
        }
        // console.log("````````````````````````````````");
    }

function requestissue(link,name1){
        let fulllink="https://github.com"+link+"/issues"
        request(fulllink,call1);
        function call1(err,response,html){
            if(err){
                if(response.statusCode==404){
                    console.log("no issues")
                }
            }
            issues(html,link,name1);
            } 
}
function issues(html,link,name1){
    let $ = cheerio.load(html);
    // let issueare = $("a[data-hovercard-type="issue"]")
    let issueare = $("a.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title")
    let arr = []
    for(let i =0;i<issueare.length;i++){
       let name = $(issueare[i]).text();
        let issue=$(issueare[i]).attr("href");
        issue = "https://github.com" +issue
        arr.push(
            {
                name:name,
                link:issue
            }
        )
    }
    let repname = link.split("/").pop();
    repname = repname.trim();
    let pathfile = p.join(__dirname,"node",name1,repname+".json")
    fs.writeFileSync(pathfile,JSON.stringify(arr))
    // console.log(name1);
    // console.table(arr);
    /////////pdf makker
    ////ye code copy paste hai dario mat
let pdfDoc = new PDFDocument;
let pdffile = p.join(__dirname,"node",name1,repname+".pdf")
pdfDoc.pipe(fs.createWriteStream(pdffile));

let myArrayOfItems =JSON.stringify(arr);
pdfDoc.text(myArrayOfItems);
pdfDoc.end();

}

function dirmaker(name){
    let pathoffol1 = p.join(__dirname, "node")
    let pathoffol = p.join(pathoffol1, name)
    if(fs.existsSync(pathoffol)==false){
        fs.mkdirSync(pathoffol);
    }
}
function makefile(name,repname){
    let pathfile = p.join(__dirname,"node",name,repname+".json")
    if(fs.existsSync(pathfile)==false){
        // console.log(pathfile);
        let create = fs.createWriteStream(pathfile);
        create.end();
    }
}