config = {
    address: '127.0.0.1',
    port: 33333,
}
$( document ).ready(function() {

    console.log( ">Host Page Ready" );
    setOnClick();
// /var connection = new WebSocket('ws://IPAddress:Port');

    // var connection = new WebSocket('ws://127.0.0.1:33334');

    // connection.onopen = function () {
    //   connection.send('Ping'); // Send the message 'Ping' to the server
    // };
    // // Log errors
    // connection.onerror = function (error) {
    //     console.log('WebSocket Error ' + error);
    // };
    
    // // Log messages from the server
    // connection.onmessage = function (e) {
    //     console.log('Server: ' + e.data);
    // };
    chrome.sockets.tcp.create({}, (createInfo) => {
        serverId = createInfo.socketId
        console.log(">(Socket"+createInfo.socketId+"): Created")
        chrome.sockets.tcp.connect(createInfo.socketId, config.address, parseInt(config.port), ()=> { 
            console.log(">(Socket"+createInfo.socketId+"): Connected to "+ config.address+":"+ config.port)
            chrome.sockets.tcp.send(createInfo.socketId, stringToArrayBuffer("hello"), (sendInfo)=>{console.log('sendInfo: ',sendInfo)})

        });
        chrome.sockets.tcp.disconnect(createInfo.socketId, ()=> { 
            console.log(">(Socket"+createInfo.socketId+"): Disconnected from "+ config.address+":"+ config.port)
        });
    });

});
function setOnClick(){
    // $( "#startClientServer" ).click(() => { sendData({type: 'start' , serverType:'clientServer'}) });
    $( "#startClientServer" ).click(() => { startServer() });

    console.log( ">Buttons Binded" );
}
function sendData(data){
    // chrome.runtime.sendMessage(data);
}
function stringToArrayBuffer(string) {
    var arrayBuffer = new ArrayBuffer(string.length * 2);
    var buffer = new Uint8Array(arrayBuffer);
    for (var i = 0, stringLength = string.length; i < stringLength; i++) {
        buffer[i] = string.charCodeAt(i);
        // Was: buffer = string.charCodeAt(i);
    }
    return buffer;
}
function startServer(){
//     chrome.sockets.tcpServer.create({}, (createInfo) => {
//         clientServerId = createInfo.socketId
//         console.log(">(Socket "+createInfo.socketId+"): Created")
//         console.log('Socket: ',createInfo)
//         chrome.sockets.tcpServer.listen(createInfo.socketId, '127.0.0.1', 33333, 5, (result)=>{
//             console.log(result)
//         })
//         // chrome.sockets.tcpServer.connect(createInfo.socketId, message.data.address, parseInt(message.data.port), ()=> { 
//         //     console.log(">(Socket"+createInfo.socketId+"): Connected to "+ message.data.address+":"+ message.data.port)
//         //     chrome.sockets.tcp.getSockets((e)=>{console.log('Sockets',e)})
//         // });

//         // chrome.sockets.tcpServer.disconnect(createInfo.socketId, ()=> { 
//         //     console.log(">(Socket"+createInfo.socketId+"): Disconnected from "+ message.data.address+":"+ message.data.port)
//         // });
//     });
}