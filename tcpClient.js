var path = require('path');
require('dotenv').config({path: __dirname + '/.env'})

const net = require('net');
const readline = require('readline');

const port = 33333;
const host = '127.0.0.1';
const awsHost = '54.237.223.142';

// const client = new net.Socket();
let server;


let client = net.createConnection({host : awsHost, port : port}, () => {

    console.log('> connected to public server via local endpoint:', client.localAddress + ':' + client.localPort);

    if(process.env.SERVER == 'true'){
        data = { address: client.localAddress, port: client.localPort, isServer: process.env.SERVER };
        console.log(data)
        client.write(JSON.stringify(data))
    }else{
        data = { address: client.localAddress, port: client.localPort, isServer: false };
        console.log(data)
        client.write(JSON.stringify(data))
    }


    // do not end the connection, keep it open to the public server
    // and start a tcp server listening on the ip/port used to connected to server.js
    if(process.env.SERVER == 'true'){
        server = net.createServer( (socket) => {
            console.log('> (clientA) someone connected, it\s:', socket.remoteAddress, socket.remotePort);
            socket.write("Hello there NAT traversal man, this is a message from a client behind a NAT!");
        }).listen(client.localPort, client.localAddress, function (err) {
            if(err) return console.log(err);
            console.log('> (clientA) listening on:', client.localAddress + ':' + client.localPort);
        });
    }else{

    }

});
var c;
client.on('data', function(data) {
    console.log(">(Client) " + data.toString());
    data = JSON.parse(data)
    c = require('net').createConnection({host : data.address, port : data.port},function () {
        console.log('> (clientB) connected to clientA!');
    
        c.on('data', function (data) {
            console.log(data.toString());
        });
    });
});
// client.connect(port, awsHost, function() {

//     console.log(">(AWS-Connection) "+ client.address().address +":"+ client.address().port);
//     client.write("Hello From Client " + client.address().address);

//     if(process.env.SERVER == 'true'){

//     }
// });


// let c;
// client.on('data', function(data) {

//     data = JSON.parse(data)
//     console.log(process.env.SERVER)

//     if(process.env.SERVER == 'true'){
        
//         console.log('Creating server: ' + data.address +":"+data.port);   

//         // do not end the connection, keep it open to the public server
//         // and start a tcp server listening on the ip/port used to connected to server.js
//         server = require('net').createServer(function (socket) {
//             console.log('> (clientA) someone connected, it\s:', socket.remoteAddress, socket.remotePort);
//             socket.write("Hello there NAT traversal man, this is a message from a client behind a NAT!");
//         }).listen(client.address().port, client.address().address, function (err) {
//             if(err) return console.log(err);
//             console.log('> (clientA) listening on:', client.address().address + ':' + client.address().port);
//         });
    
//     }else{
        
//         console.log('Creating Client: ' + data.address +":"+data.port);
//         client = require('net').createConnection({host : data.address, port : data.port},function () {
//             console.log('> (clientB) connected to clientA!');
        
//             client.on('data', function (data) {
//                 console.log(data.toString());
//             });
//         });
//     }


// });

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
    client.write( input + " " + client.address().address);    

}).on('close', () => {
    console.log('Program Ended');
    process.exit(0);
});
