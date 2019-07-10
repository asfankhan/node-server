// var http = require('http');
// var express = require("express")
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// }).listen(80, '127.0.0.1');
// console.log('Server running at http://127.0.0.1:80/');

var express = require('express');
var app = express();
let port = 3000;

var server = app.listen(port, ()=>  {
  console.log('listening on Port:' + port );
});

var io = require('socket.io')(server);

var favicon = require('serve-favicon')

var path = require('path');

var log = require('./server/testExport.js');



app.use(favicon(path.join(__dirname, 'public/assets', 'fox_logo_pcg_icon.ico')))
app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/',(req,res)=>  {
    res.sendFile(path.join(__dirname + '/public/index.html'));
    // res.send('hi');
});

// log.log.info('Node.js started');
log.print();

setInterval(sendTime, 3000);
function sendTime() {
  io.sockets.emit('time', { time: new Date().toJSON() });
}
io.sockets.on('connection', function (socket) {
  console.log('A client is connected!');
});
io.on('connection', function (socket) {
  console.log('Connected to socket')

  socket.emit('welcome', { message: 'Welcome!' });

  socket.on('i am client', function() {
    console.log('received a message from the client.');
  });

});
