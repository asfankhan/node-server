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

    console.log('> Connected to public server via local endpoint:', client.localAddress + ':' + client.localPort);

    data = { address: client.localAddress, port: client.localPort, isServer: false };
    console.log(data)
    client.write(JSON.stringify(data))

});

var c;
client.on('data', function(data) {
    console.log(">(ClientB) " + data.toString());

    data = JSON.parse(data)

    c = require('net').createConnection({host : data.address, port : data.port},function () {
        console.log('>(ClientB) connected to clientA!');
    
        c.on('data', function (data) {
            console.log(data.toString());
        });
        c.on('close', function() {
            console.log('Connection closed');
        });
        
        c.on("error", (err) =>{
            console.log("Caught flash policy server socket error: ")
            console.log(err.stack)
        });
    });

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
    // client.write( input + " " + client.address().address);    
    c.write( input + "- Client:" + client.address().address+":"+client.address().port);    

}).on('close', () => {
    console.log('Program Ended');
    process.exit(0);
});
