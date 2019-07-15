var express = require('express');
var app = express();

var path = require('path');
require('dotenv').config({path: __dirname + '/.env'})

var favicon = require('serve-favicon')
var log = require('./server/testExport.js');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;


var server = app.listen( 3000, (req, res)=>  {
  console.log('listening on ' +HOST + ":" + PORT );
});

var io = require('socket.io')(server);





app.use(favicon(path.join(__dirname, 'public/assets', 'fox_logo_pcg_icon.ico')))
app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/',(req,res)=>  {
  res.sendFile(path.join(__dirname + '/public/server.html'));
  // res.send('hi');
});

Client1 = null
Client2 = null

io.on('connection', (socket) => {

    console.log("User has connected")
    
    if(Client1 == null || ( Client1 && Client1.socket  == socket) ){
        Client1.socket = socket
        console.log('Recieved Socket from client one')
    }else if(Client2 == null || ( Client2 && Client2.socket  == socket )) {
        Client2.socket = socket
        console.log('Recieved Socket from client two')
    }else{
        console.log('Error during Storing')
    }
  
    if(Client1 && Client2){
        Client1.socket.emit('Connect', Client2)
        Client2.socket.emit('Connect', Client1)
    }

    socket.emit('welcome', { message: 'Welcome!' });
  
    socket.on('i am client', function() {
      console.log('received a message from the client.');
    });
  
  });
  