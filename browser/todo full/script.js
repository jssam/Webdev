let colorbtn = document.querySelectorAll(".filter");
let maincontainer1 = document.querySelector(".maincontainer");
for(let i =0;i<colorbtn.length;i++){
    colorbtn[i].addEventListener("click",function(e){
        let color = colorbtn[i].querySelectorAll(".filter_color");
        console.log(color[0].classList[1]);
        let c =color[0].classList[1];
        maincontainer1.style.backgroundColor = c ;
        // colorbtn[i].style.backgroundColor = "rgb(36, 34, 34)";
        // for(let a =0;a<colorbtn.length;a++){
        //     if(colorbtn[a]!=colorbtn[i]){
        //         colorbtn[a].style.backgroundColor = "rgb(64, 63, 65)";  
        //     }
        // }
    })
}

let newbox = document.querySelector(".icon");
let body = document.body;
newbox.addEventListener("click",function(e){
    console.log("das");
    let modal_container = document.createElement("div");
    modal_container.setAttribute("class", "maincontainer");
    modal_container.innerHTML =`  <div class="writeparent" contenteditable="true"></div>
    <div class="colorselector">
        <div class="filtercolor pink"></div>
        <div class="filtercolor green"></div>
        <div class="filtercolor blue"></div>
        <div class="filtercolor black"></div>
    </div>`
    body.appendChild(modal_container);
    
let colorbtan = document.querySelectorAll(".filtercolor");

for(let i =0;i<colorbtan.length;i++){
    colorbtan[i].addEventListener("click",function(e){
    colorbtan[i].style.border = "3px solid black" ;
    })}
})


        // colorbtn[i].style.backgroundColor = "rgb(36, 34, 34)";
        // for(let a =0;a<colorbtn.length;a++){
        //     if(colorbtn[a]!=colorbtn[i]){
        //         colorbtn[a].style.backgroundColor = "rgb(64, 63, 65)";  
        //     }
        // }

