let addbtnContainer = document.querySelector(".add-sheet_container");
let sheetList = document.querySelector(".sheets-list");
let firstSheet = document.querySelector(".sheet");
let left = document.querySelector(".left");
let center = document.querySelector(".center");
let right = document.querySelector(".right");
let Allcell = document.querySelectorAll(".grid .col");
let leftbtn = document.querySelector(".left");
let rightbtn = document.querySelector(".right");
let centerbtn = document.querySelector(".center");
let fontbtn = document.querySelector("#font-family");
let fontsizebtn = document.querySelector("#font-size");
let boldbtn = document.querySelector(".bold");
let italicbtn = document.querySelector(".italic");
let underlinebtn = document.querySelector(".underline");
let textcolor = document.querySelector("#color");
let cellcolor = document.querySelector("#bg-color");
let adressbar = document.querySelector(".adress-box");


firstSheet.addEventListener("click", handleActiveSheet);
addbtnContainer.addEventListener("click", function () {
    let sheetsArr = document.querySelectorAll(".sheet");
    let lastSheetElem = sheetsArr[sheetsArr.length - 1];
    let idx = lastSheetElem.getAttribute("sheetIdx");
    idx = Number(idx);
    let NewSheet = document.createElement("div");
    NewSheet.setAttribute("class", "sheet");
    NewSheet.setAttribute("sheetIdx", idx + 1);
    NewSheet.innerText = `sheet ${idx + 1}`;
    sheetList.appendChild(NewSheet);
    NewSheet.addEventListener("click", handleActiveSheet);
})

function handleActiveSheet(e) {
    let MySheet = e.currentTarget;
    let sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr.forEach(function (sheet) {
        sheet.classList.remove("active-sheet");
    })
    if (!MySheet.classList[1]) {
        MySheet.classList.add("active-sheet");
    }

}

//////////all grid par loop
for (let i = 0; i < Allcell.length; i++) {
    Allcell[i].addEventListener("click", function handlecell() {
        let rid = Number(Allcell[i].getAttribute("rid")) + 1;
        let cid = Number(Allcell[i].getAttribute("cid"));
        let colAdd = String.fromCharCode(cid + 65);
        let adress = colAdd + rid;

        adressbar.value = adress;
        ///////CHECK FOR BOLDNESS   
        let cellObject = sheetDB[rid-1][cid];
        if (cellObject.bold == true) {
            boldbtn.classList.add("active-btn");
        } else {
            boldbtn.classList.remove("active-btn");
        }
console.log("this is one"+cellObject);

    });
}

leftbtn.addEventListener("click", function () {
    let address = document.querySelector(".adress-box");
    let value = address.value;
    let { rid, cid } = adresscalculaor(value);
    let thecol = document.querySelector(`.col[cid="${cid}"][rid="${rid}"]`)

    thecol.style.textAlign = "left";
})
rightbtn.addEventListener("click", function () {
    let address = document.querySelector(".adress-box");
    let value = address.value;
    let { rid, cid } = adresscalculaor(value);
    let thecol = document.querySelector(`.col[cid="${cid}"][rid="${rid}"]`)

    thecol.style.textAlign = "right";
})
centerbtn.addEventListener("click", function () {
    let address = document.querySelector(".adress-box");
    let value = address.value;
    let { rid, cid } = adresscalculaor(value);
    let thecol = document.querySelector(`.col[cid="${cid}"][rid="${rid}"]`)

    thecol.style.textAlign = "center";
})

fontbtn.addEventListener("change", function () {
    let address = document.querySelector(".adress-box");
    let value = address.value;
    let { rid, cid } = adresscalculaor(value);
    let thecol = document.querySelector(`.col[cid="${cid}"][rid="${rid}"]`)
    let fontstyle = fontbtn.value;

    thecol.style.fontFamily = fontstyle;
})

////bold ke liye
boldbtn.addEventListener("click", function () {
    // boldbtn.classList.add("active-btn");
    let address = document.querySelector(".adress-box");
    let isActive = boldbtn.classList.contains("active-btn");
    let value = address.value;
    let { rid, cid } = adresscalculaor(value);
    let thecol = document.querySelector(`.col[cid="${cid}"][rid="${rid}"]`)
    // consol.log(thecol)
 
    let cellObject = sheetDB[rid][cid];
    if ( cellObject.bold  == false) {
        // cell text bold
        thecol.style.fontWeight = "bold";
        boldbtn.classList.add("active-btn");
        cellObject.bold = true
    } else {
        // cell text normal
        thecol.style.fontWeight = "normal";
        boldbtn.classList.remove("active-btn");
        cellObject.bold = false;
    }
    console.log(sheetDB);
})

///italics ke liye
italicbtn.addEventListener("click", function () {
    let address = document.querySelector(".adress-box");
    let value = address.value;
    let { rid, cid } = adresscalculaor(value);
    let thecol = document.querySelector(`.col[cid="${cid}"][rid="${rid}"]`)
    // consol.log(thecol)
    if (thecol.style.fontStyle == "italic") {
        thecol.style.fontStyle = "normal";
    } else {
        thecol.style.fontStyle = "italic";
    }
})

///////underline ke liye
underlinebtn.addEventListener("click", function () {
    let address = document.querySelector(".adress-box");
    let value = address.value;
    let { rid, cid } = adresscalculaor(value);
    let thecol = document.querySelector(`.col[cid="${cid}"][rid="${rid}"]`)
    // consol.log(thecol)
    if (thecol.style.textDecoration == "underline") {
        thecol.style.textDecoration = "none";
    } else {
        thecol.style.textDecoration = "underline";
    }
})

fontsizebtn.addEventListener("change", function () {
    let address = document.querySelector(".adress-box");
    let value = address.value;
    let { rid, cid } = adresscalculaor(value);
    let thecol = document.querySelector(`.col[cid="${cid}"][rid="${rid}"]`)
    let fontsize = fontsizebtn.value;

    thecol.style.fontSize = fontsize + "px";
})

textcolor.addEventListener("change", function () {
    let address = document.querySelector(".adress-box");
    let value = address.value;
    let { rid, cid } = adresscalculaor(value);
    let thecol = document.querySelector(`.col[cid="${cid}"][rid="${rid}"]`)
    let fontcolor = textcolor.value;

    thecol.style.color = fontcolor;
    textcolor.value = "black";

})
cellcolor.addEventListener("change", function () {
    let address = document.querySelector(".adress-box");
    let value = address.value;
    let { rid, cid } = adresscalculaor(value);
    let thecol = document.querySelector(`.col[cid="${cid}"][rid="${rid}"]`)
    let fontcolor = cellcolor.value;

    thecol.style.backgroundColor = fontcolor;
})

Allcell[0].click();

function adresscalculaor(value) {
    let cid = value.charCodeAt(0) - 65;
    let rid = value.slice(1) - 1;
    return { cid, rid }
}