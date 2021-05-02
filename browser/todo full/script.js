let colorbtn = document.querySelectorAll(".filter");
let maincontainer1 = document.querySelector(".maincontainer");
let deletec=false;
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
let cross = document.querySelectorAll(".icon");
cross[1].addEventListener("click",changedel);
let newbox = document.querySelector(".icon");
let body = document.body;
newbox.addEventListener("click",function(e){
    console.log("das");
    let box = document.querySelector(".hell");
    let modal_container = document.createElement("div");
    if(box==null){
    modal_container.setAttribute("class", "maincontainer");
    modal_container.innerHTML =`  <textarea class="writeparent" placeholder="Enter Your text"></textarea>
    <div class="hell"></div>
    <div class="colorselector">
        <div class="filtercolor pink"></div>
        <div class="filtercolor green"></div>
        <div class="filtercolor blue"></div>
        <div class="filtercolor black"></div>
    </div>`
    body.appendChild(modal_container);
}
let textarea = modal_container.querySelector(".writeparent");
textarea.value = "";

let colorbtan = document.querySelectorAll(".filtercolor");
let cclor = "black";
for(let i =0;i<colorbtan.length;i++){
    colorbtan[i].addEventListener("click",function(e){
    ////purane se remove kar dete hai
        colorbtan.forEach((filter)=>
    {filter.classList.remove("border");})
    colorbtan[i].classList.add("border");
    ///color set kar dega
    cclor = colorbtan[i].classList[1];
    console.log(cclor);
    })}
    let textArea = document.querySelector(".writeparent");
    textArea.addEventListener("keydown",function(e){
        if(e.key == "Enter"&& textarea.value != ""){
            console.log("task",textarea.value,cclor);
            modal_container.remove();
            createtask(cclor,textArea.value);
        }
    })
})
function createtask(color,task){
    let taskContainer = document.createElement("div");

    let uifn = new ShortUniqueId();
    let uid = uifn();
    taskContainer.setAttribute("class", "task_container");
    taskContainer.innerHTML = `<div class="task_filter ${color}"></div>
    <div class="task_desc_container">
        <h3 class="uid">#${uid}</h3>
        <div class="task_desc" contenteditable="true" >${task}</div>
    </div>
</div >`;
    maincontainer1.appendChild(taskContainer);
    let taskFilter = taskContainer.querySelector(".task_filter");
    taskFilter.addEventListener("click", changeColor);
    taskContainer.addEventListener("click", deleteTask);
}

function changeColor(e) {
    //  add event listener 
    // console.log(e.currentTarget);
    // /event occur 
    // console.log(e.target);
    let taskFilter = e.currentTarget;
    let colors = ["pink", "blue", "green", "black"];
    let cColor = taskFilter.classList[1];
    let idx = colors.indexOf(cColor);
    let newColorIdx = (idx + 1) % 4;
    ///purane vala htana padega taki stack overflow nahi aye
    taskFilter.classList.remove(cColor);
    taskFilter.classList.add(colors[newColorIdx]);
}

        // colorbtn[i].style.backgroundColor = "rgb(36, 34, 34)";
        // for(let a =0;a<colorbtn.length;a++){
        //     if(colorbtn[a]!=colorbtn[i]){
        //         colorbtn[a].style.backgroundColor = "rgb(64, 63, 65)";  
        //     }
        // }

function changedel(e){
    deletec = !deletec;
    console.log(deletec);
}
function deleteTask(e){
if(deletec){
    let taskContainer = e.currentTarget;
    taskContainer.remove();
}
}