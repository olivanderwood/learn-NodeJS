var express = require("express")
var app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");


var server = require("http").Server(app)
var io = require("socket.io")(server);
server.listen(3000);


var userArray = [];



io.on("connection", function(socket){
    console.log(socket.id + " is connected");

    socket.on("client-send-Username", function(data){
        if(userArray.indexOf(data)>=0){
            socket.emit("server-send-fail");
        }
        else{
            userArray.push(data);
            socket.Username = data ;
            socket.emit("server-send-complete", data);
            io.sockets.emit("server-send-list-Users", userArray);
        }
    });


    socket.on("disconnect", function(){
        userArray.splice(
            userArray.indexOf(socket.Username),1
        );
        
        socket.broadcast.emit("server-send-list-Users", userArray);
    });

    socket.on("client-send-logout", function(){
        userArray.splice(
            userArray.indexOf(socket.Username),1
        );
        
        socket.broadcast.emit("server-send-list-Users", userArray);

    })


    socket.on("client-send-message", function(data){
        io.sockets.emit("server-send-message",  {us: socket.Username , ct:data})
    })

})

app.get("/", function(req, res){
    res.render("home")
})