const net = require('net');
const port = 33333;
const host = '0.0.0.0';

const server = net.createServer();
server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port + '.');
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
        // if(sockets.length==2){
        //     console.log('==----==Two Sockets Connected==----==');
        //     var obj1 = { address: sockets[1].remoteAddress, port: sockets[1].remotePort };
        //     sockets[0].write(JSON.stringify(obj1))

        //     var obj2 = { address: sockets[0].remoteAddress, port: sockets[0].remotePort };
        //     sockets[1].write(JSON.stringify(obj2))
        //     return;
        // }


        // console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // // Write the data back to all the connected, the client will receive it as data from the server
        // sockets.forEach(function(socket, index, array) {
        //     socket.write(sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n');
        // });
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
