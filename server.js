var express = require('express');
var app = express();

var path = require('path');
require('dotenv').config({path: __dirname + '/.env'})

var io = require('socket.io')(server);
var favicon = require('serve-favicon')
var log = require('./server/testExport.js');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;


var server = app.listen(PORT, ()=>  {
  console.log('listening on ' +HOST + ":" + PORT );
});





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
