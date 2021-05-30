// const fs = require("fs");
let board = document.getElementById("board");

let color_red = document.querySelector(".color.red");
let color_blue = document.querySelector(".color.blue");
let color_green= document.querySelector(".color.green");
let color_yellow= document.querySelector(".color.yellow");
let color_eraser= document.querySelector(".eraser");
let newpage= document.querySelector(".newpage");
let slider = document.getElementById("pensize");
let downpdf = document.querySelector(".downpdf");

// const imgToPDF = require('image-to-pdf');
let pages = [];
let color_black= document.querySelector(".color.black");
let parent = document.querySelector(".parent");
let isMouseDown = false;

board.height = window.innerHeight;
board.width = window.innerWidth;
// 2d 
let tool = board.getContext("2d");
tool.strokeStyle="black";
tool.lineWidth = 5;
tool.lineWidth = slider.value;
slider.oninput = function() {
    tool.lineWidth = this.value;
  }
color_eraser.addEventListener("click",function(e){
    slider.value = 40;
    tool.lineWidth = slider.value;
    tool.strokeStyle="white";
    });  
color_black.addEventListener("click",function(e){
    slider.value = 5;
    tool.lineWidth = slider.value;
    tool.strokeStyle="black";
    });  
color_red.addEventListener("click",function(e){
    slider.value = 5;
    tool.lineWidth = slider.value;
tool.strokeStyle="red";
});   
color_blue.addEventListener("click",function(e){
    slider.value = 5;
    tool.lineWidth = slider.value;
tool.strokeStyle="blue";
}); 
  color_green.addEventListener("click",function(e){
    slider.value = 5;
    tool.lineWidth = slider.value;
tool.strokeStyle="green";
});
color_yellow.addEventListener("click",function(e){
    slider.value = 5;
    tool.lineWidth = slider.value;
tool.strokeStyle="yellow";
});



document.body.addEventListener("mousedown",function(e){
    let x = e.clientX;
    let y = e.clientY;
    y = getCoordinates(y);
    tool.beginPath();
    tool.moveTo(x,y);
    isMouseDown = true;
});
document.body.addEventListener("mousemove",function(e){
    let x = e.clientX;
    let y = e.clientY;
    y = getCoordinates(y);
    x = x-2;
    if(isMouseDown){
        tool.lineTo(x,y);
        tool.stroke();
    }
});
function getCoordinates(initialY) {
    let obj = parent.getBoundingClientRect();
    return initialY - obj.height-20;

}

document.body.addEventListener("mouseup",function(e){

    tool.stroke();
    isMouseDown = false;;

});
newpage.addEventListener("click",function(){
    let canvas = document.createElement("canvas");
    
    canvas.width = board.width;
    canvas.height = board.height;
    let tool1 = canvas.getContext("2d");
    tool1.fillStyle= "white";
    tool1.fillRect(0, 0, canvas.width, canvas.height);
    tool1.drawImage(board,0,0);
    let link = canvas.toDataURL();
    let anchor = document.createElement("a");
    anchor.href = link;
    pages.push(link);
    anchor.download= "file.png";
console.log(pages);
    anchor.click();
    tool = replaceCanvas(board);
    tool.strokeStyle="black";
    tool.lineWidth = 5;
    tool.lineWidth = slider.value;
    board = document.getElementById("board");
   
})
function replaceCanvas(elem) {
    let newcanvas = document.createElement("canvas");
    newcanvas.setAttribute('id',"board");
    
    newcanvas.width = board.width;
    newcanvas.height = board.height;
    tool = newcanvas.getContext('2d');
    // Insert the new canvas after the old one
    elem.parentNode.insertBefore(newcanvas, elem.nextSibling);
    // Remove old canvas. Now the new canvas has its position.
    elem.parentNode.removeChild(elem);
    return tool;
}
// downpdf.addEventListener("click",function(){
//     imgToPDF(link, 'A4')
//     .pipe(fs.createWriteStream('output.pdf'));
   
// })