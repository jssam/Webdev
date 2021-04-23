let input = document.querySelector(".input_box");
let ul = document.querySelector(".task-list");
input.addEventListener("keydown",function(e){
    ///e object -> describe ->event
    //console.log("some key was pressed")

    console.log("event object",e)
    if(input.value!=""){
    if(e.key=="Enter"){
        //console.log("user want to enter an task")
        let task = input.value;
        console.log(task);
        let li = document.createElement("li");
        li.innerText = task;
        li.addEventListener("dblclick",function(e){
            li.remove();
        })
        //isme hm koi bhi attribute dal sakte hai
        li.setAttribute("class","task");
        ul.appendChild(li);
        input.value = "";
    }
}
})