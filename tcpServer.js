const net = require('net');
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
//////////////////////////////////////////on Socekt Connect//////////////////////////////////////////
server.on('connection', (socket) => {

    socket.id = Math.floor(Math.random() * 1000000000);
    clientSockets[socket.id] = socket;

    console.log('>(Server) Connected: ' + socket.remoteAddress + ':' + socket.remotePort);
    console.log('>Total Sockets Connected: ' + sockets.length);
    console.log('>Total clientSockets Connected: ' + Object.keys(clientSockets));

    console.log('socket.id ' + socket.id)

    sockets.push(socket);

    
    ///////////On Data Recieved///////////
    socket.on('data', function(data) {
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
    socket.on('close', function(data) {

        delete clientSockets[socket.id];

        let index = sockets.findIndex(function(o) {
            return o.remoteAddress === socket.remoteAddress && o.remotePort === socket.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);

        console.log('>(Server) Sockets Remaining: ' + socket.length + '\n');
        console.log('Closed: ' + socket.remoteAddress + ' ' + socket.remotePort);

    });

    socket.on("error", (err) =>{
        console.log(">(Server) Caught flash policy server socket error: ")
        console.log(err.stack)
    
    });
});
