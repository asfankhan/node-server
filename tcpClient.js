const net = require('net');
const readline = require('readline');

const client = new net.Socket();
const port = 33333;
const host = '127.0.0.1';
const awsHost = '54.237.223.142';

client.connect(port, awsHost, function() {
    console.log('Connected-'+"My address "+ client.address().address +":"+ client.address().port);
    client.write("Hello From Client " + client.address().address);
});

// server.js
var server = require('net').createServer(function (socket) {
    console.log('> Connect to this public endpoint with clientB:', socket.remoteAddress + ':' + socket.remotePort);
}).listen(port, function (err) {
    if(err) return console.log(err);
    console.log('> (server) listening on:', server.address().address + ':' + server.address().port)
});


client.on('data', function(data) {

    if(process.env.SERVER == true){
        console.log('Creating server: ' + data);
    }else{
        console.log('Creating Client: ' + data);
    }
    data = JSON.parse(data)
    console.log('Address: ' + data.address);
    console.log('Port: ' + data.port);


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
    client.write( input + " " + client.address().address);    

}).on('close', () => {
    console.log('Program Ended');
    process.exit(0);
});
