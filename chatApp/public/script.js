let chatinput = document.querySelector(".chats");
let chatwindow = document.querySelector(".chat-window");
let username = prompt(" Enter Your Name");
chatinput.addEventListener("keypress",function(e){
if(e.key=="Enter"&& chatinput.value){
    let chatDiv = document.createElement("div");
    chatDiv.classList.add("chat");
    chatDiv.classList.add("right");
    chatDiv.textContent = username +" : "+chatinput.value;
    chatwindow.append(chatDiv);
    socket.emit("chat" , {chat:chatinput.value})
    chatinput.value="";
}
})
socket.on("chatLeft" , function(chatObj){
    let chatDiv = document.createElement("div");
    chatDiv.classList.add("chat");
    chatDiv.classList.add("left");
    chatDiv.textContent = chatObj.chat;
    chatwindow.append(chatDiv);
})