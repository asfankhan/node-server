var path = require('path');
const http = require('http');

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
this.serverData = {}
client.on('data', (data) => {
    console.log(">(Client) " + data.toString());
    data = JSON.parse(data)
    this.serverData = data
    // c = require('net').createConnection({host : data.address, port : data.port},function () {
    //     console.log('> (clientB) connected to clientA!');
    
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

getServers=null;
rl.on('line', (input) => {
    input.trim()
    console.log("Input: " +input);

    regex = /pick ([0-9])/
    if(input == "exit"){rl.close();}
    else if(input == 'find'){
        http.get('http://localhost:33334/data', (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log('Rooms: ',Object.keys(JSON.parse(data)));
            this.getServers = JSON.parse(data)
        });

        }).on("error", (err) => {
        console.log("Error: " + err.message);
        });
    } else if(input.match(regex)){
        if(this.getServers){
            console.log('Picked number ip - ', this.getServers[Object.keys(this.getServers)[input.match(regex)[1]]].ip )
            console.log('Picked number port - ', this.getServers[Object.keys(this.getServers)[input.match(regex)[1]]].port )
        }else{
            console.log("Try find first!")
        }
    }
    
  
    // if(c){
    //     c.write( input + "- Client:" + client.address().address+":"+client.address().port);    
    // }else{
    //     c = require('net').createConnection({host : this.serverData.address, port : this.serverData.port},function () {
    //         console.log('> (clientB) connected to clientA!');
        
    //         c.on('data', function (data) {
    //             console.log(data.toString());
    //         });
    //     });
    // }

}).on('close', () => {
    console.log('Program Ended');
    process.exit(0);
});
