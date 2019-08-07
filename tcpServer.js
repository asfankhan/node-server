const net = require('net');
const port = 33333;
const host = '0.0.0.0';

const server = net.createServer();
server.listen(port, host, () => {
    console.log('>(Server) TCP Aws Server is running on port ' + port + '.');
});

let sockets = [];
let serverSocket;

server.on('connection', function(sock) {

    console.log('>(Server) Socket Connected: ' + sockets.length);
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);

    sock.on('data', function(data) {
        console.log('>(Server) Recieved '+ data)
        data = JSON.parse(data)
        if(data.isServer){
            serverSocket = data
            console.log('>(Server) Recieved Client-Server Socket')
        }else{
            console.log('>(Server) Sent Client-Server data to Client')
            sock.write(JSON.stringify(serverSocket))
        }
    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        let index = sockets.findIndex(function(o) {
            return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);

        console.log('>(Server) Sockets Remaining: ' + sockets.length + '\n');
        console.log('Closed: ' + sock.remoteAddress + ' ' + sock.remotePort);

    });

    sock.on("error", (err) =>{
        console.log(">(Server) Caught flash policy server socket error: ")
        console.log(err.stack)
    
    });
});
