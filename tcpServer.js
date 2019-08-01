const net = require('net');
const port = 33333;
const host = '0.0.0.0';

const server = net.createServer();
server.listen(port, host, () => {
    console.log('TCP Aws Server is running on port ' + port + '.');
});

let sockets = [];
let serverSocket;

server.on('connection', function(sock) {

    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);
    console.log('sockets connected: ' + sockets.length);

    sock.on('data', function(data) {
        console.log('>(Server Recieved) '+ data)
        data = JSON.parse(data)
        if(data.isServer){
            serverSocket = data
            console.log('>(Server Recieved) Recieved Server Socket')
        }else{
            sock.write(JSON.stringify(serverSocket))
        }
    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        let index = sockets.findIndex(function(o) {
            return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);
        console.log('Closed: ' + sock.remoteAddress + ' ' + sock.remotePort);
        console.log('Sockets Remaining: ' + sockets.length + '\n');

    });

    sock.on("error", (err) =>{
        console.log("Caught flash policy server socket error: ")
        console.log(err.stack)
    
    });
});
