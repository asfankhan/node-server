var express = require('express');
var app = express();

var path = require('path');
require('dotenv').config({path: __dirname + '/.env'})

var favicon = require('serve-favicon')
var log = require('./server/testExport.js');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;


var server = app.listen( PORT, (req, res)=>  {
  console.log('listening on ' +HOST + ":" + PORT );
});

var io = require('socket.io')(server);


app.use(favicon(path.join(__dirname, 'public/assets', 'fox_logo_pcg_icon.ico')))
// app.use('/', express.static(path.join(__dirname, 'public')))
app.get('/',(req,res)=>  {
  res.sendFile(path.join(__dirname + '/server/server.html'));
  // res.send('hi');
});

Client1 = {}
Client2 = {}
Clients = {}
io.on('connection', (socket) => {

  console.log("User has connected")
  console.log(socket)
  // if(Object.keys(Clients).length == 0){
  //   Clients.socket = socket
  //   console.log('Recieved Socket from client one')
  // }else if(Object.keys(Clients).length == 1) {
  //   Clients.socket = socket
  //   console.log('Recieved Socket from client two')
  // }else{
  //   console.log('Error during Storing')
  //   Client1 = {}
  //   Client2 = {}
  // }

  if( Object.keys(Client1).length != 0 && Object.keys(Client2).length != 0){
    console.log("Both those are connected")
    // Client1.socket.emit('Connect', Client2)
    // Client2.socket.emit('Connect', Client1)
  }

  // socket.emit('welcome', { message: 'Welcome!' });

  // socket.on('i am client', function() {
  //   console.log('received a message from the client.');
  // });

});
  