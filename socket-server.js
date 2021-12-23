'use strict';

var socketIO = require('socket.io');
var ot = require('ot');
var roomList = {};



module.exports = function(server) {
  //this is the default string for the editor
var str = 'This is a Markdown heading \n\n' +
          'var i = i + 1;';

  // Create SocketIO instance, connect
  var io = socketIO(server);
  // Add a connect listener
  io.on('connection', function(socket) {
    socket.on('joinRoom',function(data){
      //passing the room id to roomList
      if(!roomList[data.room]){
        var socketIOServer = new ot.EditorSocketIOServer(str, [], data.room, function(socket, cb){
          var self = this;
          //find by id and update the task
      
          Task.findByIdAndUpdate(data.room, {content: self.document}, function(err) {
            if (err) return cb(false);
            cb(true);
          });
        });
        roomList[data.room] = socketIOServer;
      }
      roomList[data.room].addClient(socket);
      roomList[data.room].setName(socket, data.username);


      // dynamic property of the room
      socket.room = data.room;
      socket.join(data.room);
    });

    socket.on('chatMessage', function(data) {
      io.to(socket.room).emit('chatMessage', data);
    });
    // Add a disconnect listener
    socket.on('disconnect', function() {
      socket.leave(socket.room);
    });
  });
}

