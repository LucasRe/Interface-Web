'use strict'

// node modules
let
  express = require('express'),
  app = express(),
  http = require('http').Server(app),
  socketio = require('socket.io')(http);

// others
const port = 3001,
  dirRoot = {
    'root': '../client/dist/'
  };

// Static files
app.use(express.static('/home/lucas/Codigos/Interface-Web/client/dist/public'));

// Home route
app.get('/', function(req, res) {
  //res.send('Home Page');
  res.sendFile('index.html', dirRoot);
  console.log(Date() + ': Server Request');
});

// 404 error
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

// socketio response for connections
socketio.on('connection', function(socket) {
  console.log('a user connected');
});

// Listening for connections
http.listen(port, function() {
  console.log('listening on *:' + port);
});
