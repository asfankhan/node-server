var path = require('path');
require('dotenv').config({path: __dirname + '/.env'})

const net = require('net');
const readline = require('readline');

const port = 33333;
const host = '127.0.0.1';
const awsHost = '54.237.223.142';

so_reuseaddr = true;

// const client = new net.Socket();
let server;

connectedSocket  = null;

let client = net.createConnection({host : host, port : port}, () => {

    console.log('>Connected to Aws server via local endpoint:', client.localAddress + ':' + client.localPort);

    data = { address: client.localAddress, port: client.localPort, isServer: true };
    console.log(data)
    client.write(JSON.stringify(data))



    // do not end the connection, keep it open to the public server
    // and start a tcp server listening on the ip/port used to connected to server.js
    server = net.createServer( (socket) => {
        connectedSocket = socket

        console.log('>(ClientServer) someone connected, it\s:', socket.remoteAddress, socket.remotePort);
        socket.write("Hello there NAT traversal man, this is a message from a client behind a NAT!");
        socket.on('data', function (data) {
            console.log(">(Received) "+data.toString());
        });
    }).listen(client.localPort, client.localAddress, function (err) {
        if(err) return console.log(err);
        console.log('>(Client Server) listening on:', server.address().address + ':' + server.address().port);
    });

});

var c;
client.on('data', function(data) {

    console.log(">(Client Server) " + data.toString());
    data = JSON.parse(data)

    // c = require('net').createConnection({host : data.address, port : data.port},function () {
    //     console.log('> (Client Server) connected to clientS!');
    
    //     c.on('data', function (data) {
    //         console.log(data.toString());
    //     });
    // });
});

client.on('close', function() {
    console.log('Connection closed');
});

client.on("error", (err) =>{
    console.log("Caught flash policy server socket error: ")
    console.log(err.stack)

});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    input.trim()
    
    if(input == "exit")
        rl.close();
    
    console.log("Input: " +input);
    connectedSocket.write( input + "- Server:" + server.address().address+":"+server.address().port);    

}).on('close', () => {
    console.log('Program Ended');
    process.exit(0);
});
