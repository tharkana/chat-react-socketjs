var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
      });

      socket.on('SEND_MESSAGE', function(msg){
        console.log('message: ' + msg ? msg.message : msg);
        io.emit('RECEIVE_MESSAGE', msg);
      });
});