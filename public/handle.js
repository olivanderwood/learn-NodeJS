var socket = io("http://localhost:3000");

socket.on("server-send-fail", function(){
    alert("Username is already used")
})


socket.on("server-send-complete", function(data){
    $("#currentUser").html(data);
    $(".loginForm").hide(2000);
    $(".chatForm").show(1000);
})


socket.on("server-send-list-Users", function(data){
    $("#boxContend").html("");
    data.forEach(i => {
        $("#boxContend").append("<div class='user'>" + i + "</div>");
    });
})


socket.on("server-send-message",function(data){
    $("#listMessage").append("<div class='mess'>"+ data.us +": "+ data.ct +"</div>");
    $("#txtMessage").val("");
})


$(document).ready(function(){
    $(".loginForm").show();
    $(".chatForm").hide();


    $("#btnLogin").click(function () { 
        socket.emit("client-send-Username", $("#txtUsername").val());
        
    });


    $("#btnSendMessage").click(function () { 
        
        socket.emit("client-send-message", $("#txtMessage").val())
        
    });


    $("#btnLogout").click(function () { 
        $("#txtUsername").html("");
        socket.emit("client-send-logout");
        $("#txtUsername").val("");
        $(".loginForm").show(1000);
        $(".chatForm").hide(500);
    });

});