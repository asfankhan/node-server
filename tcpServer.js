const net = require('net');
var path = require('path');
const express = require('express');
const app = express();

const port = 33333;
const host = '0.0.0.0';

const server = net.createServer();

let serverSocket;
let sockets= {};

let serverSockets ={};
let clientSockets = [];

server.listen(port, host, () => {
    console.log('>(Server) TCP Aws Server is running on port ' + port + '.');
});

//////////////////////////////////////////on External Socekt Connect//////////////////////////////////////////
server.on('connection', (socket) => {

    console.log('>(Server) Open connection with ' + socket.remoteAddress + ' ' + socket.remotePort);

    if(!socket.id)
        socket.id = Math.floor(Math.random() * 1000000000);

    socket.address = socket.remoteAddress
    socket.port = socket.remotePort

    sockets[socket.id] = socket;

    ///////////On Data Recieved///////////
    socket.on('data', function(data) {

        console.log('>(Server) Recieved Data '+ data)
        data = JSON.parse(data)

        if(data.isServer){

            serverSockets[socket.id] = { id:socket.id, address:socket.address, port:socket.port, server:true };
            console.log('>(Server) Total Client-Server Sockets Connected: ' + Object.keys(serverSockets).length);

        }else{

            clientSockets[socket.id] = { id:socket.id, address:socket.address, port:socket.port, server:false };;
            console.log('>(Server) Total Client Sockets Connected: ' + Object.keys(clientSockets).length);

        }
    });

    ///////////On Close Event///////////
    socket.on('close', function(data) {

        delete sockets[socket.id]

        if(serverSockets[socket.id]){
            delete serverSockets[socket.id]
        }else{
            delete clientSockets[socket.id]
        }
        console.log('>(Server) Sockets Remaining: ' + sockets.length + '\n');
        console.log('Closed: ' + socket.address + ' ' + socket.port);

    });
    ///////////On Error Event///////////
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
    console.log(serverSockets)
    res.json(serverSockets);
});
app.get('/test', function(req, res, next) {
    res.json(serverSockets);
});
app.listen(33334, host, () => {
    console.log('>(Server) Website on : 33334');
});
