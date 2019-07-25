// server.js
var server = require('net').createServer(function (socket) {
  console.log('> Connect to this public endpoint with clientB:', socket.remoteAddress + ':' + socket.remotePort);
}).listen(4434, function (err) {
  if(err) return console.log(err);
  console.log('> (server) listening on:', server.address().address + ':' + server.address().port)
});


// var express = require('express');
// var app = express();

// var path = require('path');
// require('dotenv').config({path: __dirname + '/.env'})

// var favicon = require('serve-favicon')
// var log = require('./server/testExport.js');

// const HOST = process.env.HOST || 'localhost';
// const PORT = Math.floor(Math.random() * 1000) + 8000;


// var server = app.listen( PORT, (req, res)=>  {
//   console.log('listening on ' +HOST + ":" + PORT );
// });
// var io = require('socket.io')(server);





// app.use(favicon(path.join(__dirname, 'public/assets', 'fox_logo_pcg_icon.ico')))
// app.use('/', express.static(path.join(__dirname, 'public')))

// app.get('/',(req,res)=>  {
//   res.sendFile(path.join(__dirname + '/public/index.html'));
//   // res.send('hi');
// });
// app.post('/',(req,res)=>  {
//   console.log('Posted')
//   // res.send('hi');
// });

// // log.log.info('Node.js started');
// // log.print();

// setInterval(sendTime, 3000);
// function sendTime() {
//   io.sockets.emit('time', { time: new Date().toJSON() });
// }
// io.sockets.on('connection', function (socket) {
//   console.log('A client is connected!');
// });

// socketServer = null
// socketClient = null
// const spawn = require("child_process").spawn;
// arg1 = 'asfan'
// arg2 = 'Khan'

// const pyProcess = spawn('python',["./scripts/test.py", arg1,arg2]);

// pyProcess.stdout.setEncoding("utf8");
// pyProcess.stdout.on('data', (data) => {
//     // Do something with the data returned from python script
//     console.log(data.toString())
// });
// pyProcess.stdout.on("end", data => {
//   console.log("Token closing connection.");
// });

// io.on('connection', function (socket) {

//   // io.sockets.emit('sockets', io.sockets);

//   if(socketServer == null){
//     console.log('Connected to socket as Server')
//   }else {
//     console.log('Connected to socket as Client')
//     arg1 = 't'
//     const pyProcess = spawn('python',["path/to/script.py", arg1]);

//   }

//   socket.emit('welcome', { message: 'Welcome!' });

//   socket.on('i am client', function() {
//     console.log('received a message from the client.');
//   });

// });
