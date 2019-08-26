const net = require('net');
var path = require('path');
const express = require('express');
const app = express();

const port = 33333;
const host = '0.0.0.0';

const server = net.createServer();

let serverSocket;
let sockets= [];

let serverSockets ={};
let clientSockets = [];

server.listen(port, host, () => {
    console.log('>(Server) TCP Aws Server is running on port ' + port + '.');
});

//////////////////////////////////////////on External Socekt Connect//////////////////////////////////////////
server.on('connection', (socket) => {

    if(!socket.id)
        socket.id = Math.floor(Math.random() * 1000000000);

    socket.ip = socket.remoteAddress
    socket.port = socket.remotePort

    console.log('Open: ' + socket.remoteAddress + ' ' + socket.remotePort);
    sockets.push(socket);

    ///////////On Data Recieved///////////
    socket.on('data', function(data) {
        console.log('>(Server) Recieved '+ data)
        data = JSON.parse(data)
        if(data.isServer){
            serverSocket = data
            serverSockets[socket.id] = socket;

            console.log('>(Server) Recieved Client-Server Socket')
        }else{

            clientSockets[socket.id] = socket;
            console.log('>(Server) Total clientSockets Connected: ' + Object.keys(clientSockets).length);

            socket.write(JSON.stringify(serverSocket))
            // console.log('>(Server) Sent Client-Server data to Client')
        }
    });

    // Add a 'close' event handler to this instance of socket
    socket.on('close', function(data) {

        delete clientSockets[socket.id];

        let index = sockets.findIndex(function(o) {
            return o.remoteAddress === socket.remoteAddress && o.remotePort === socket.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);

        console.log('>(Server) Sockets Remaining: ' + sockets.length + '\n');
        console.log('Closed: ' + socket.remoteAddress + ' ' + socket.remotePort);

    });

    socket.on("error", (err) =>{
        console.log(">(Server) Caught flash policy server socket error: ")
        console.log(err.stack)
    
    });
});


app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + './public/index.html'));
});


app.get('/server', function(req, res, next) {
    res.json(serverSockets);
});

app.get('/data', function(req, res, next) {
    res.json(serverSockets);
});
app.get('/test', function(req, res, next) {
    res.json(serverSockets);
});

app.listen(33334, host, () => {
    console.log('>(Server) Website on : 33334');
});
