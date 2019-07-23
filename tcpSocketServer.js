var express = require('express');
var app = express();

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;

var server = app.listen( PORT,(req, res)=>  {
    console.log('listening on ' + HOST + ":" + PORT );
});

var io = require('socket.io')(server);

// Add a connect listener
io.sockets.on('connection', function(socket) { 

    console.log('Client connected.');

    // Disconnect listener
    socket.on('disconnect', function() {
        console.log('Client disconnected.');
    });
});
