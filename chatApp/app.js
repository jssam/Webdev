const express = require("express");
const { Server } = require("socket.io");
// server is created !!!
const app = express();
const http = require('http');
const server = http.createServer(app);

const io = new Server(server);

//app.use(express.json());
app.use(express.static("public"));

let userList = []; // for online list

// connection event is attached on io
io.on("connection" , function(socket){
    console.log(socket.id + " connected !!!");
    socket.on("chat" , function(chatObj){
        socket.broadcast.emit("chatLeft" , chatObj);
    })

  
})


// tcp port 5500
server.listen(5500 , function(){
    console.log("Server started at port 5500 !!!");
})