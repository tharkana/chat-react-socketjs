var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

let users = {};

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

http.listen(3006, function() {
  console.log("listening on *:3000");
});

io.on("connection", function(socket) {
  let query = socket.request._query;
  let user = {
    username: query.username,
    // uid: query.uid,
    socket_id: socket.id
  };

  updateUserList(user);
  
  console.log("a user connected");

  socket.on("disconnect", function() {
    console.log("user disconnected");
    if(users[socket.id]){
      delete users[socket.id];
      updateUserList(null);
    }
    
  });

  socket.on("SEND_MESSAGE", (msg) => {
    console.log("message: " + JSON.stringify(msg)  );
    io.to(msg.socket_id).emit("RECEIVE_MESSAGE", msg);
  });
});

updateUserList = user => {

  if(user){
    users[user.socket_id] =  user;
  }
   
  console.log(JSON.stringify(users));

  io.emit("USER_LIST",  Object.values(users) );
};
