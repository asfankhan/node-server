/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */

serverId = null;
clientServerId = null;
clientId = null;

currentWindow = null;
hostWindow = null;
viewerWindow = null;

const port = 33333;
const host = '127.0.0.1';
const awsHost = '54.237.223.142';

///////////////////////////////On Start: Create Main Window///////////////////////////////
chrome.app.runtime.onLaunched.addListener(() => {
    chrome.app.window.create('index.html', {
      id: 'main',
      minWidth: 400,
      minHeight: 500,
      bounds: { width: 620, height: 500 }
    },(myWindow)=>{
        console.log('>(Window) ',myWindow)
        currentWindow  = myWindow.contentWindow;
        myWindow.contentWindow.addEventListener('load', (e) => {
            console.log('>(Window Content) ',myWindow.contentWindow)
            currentWindow.getServerRooms();
            // chrome.runtime.sendMessage('datas', ()=>{
            //     console.log('sent')
            // });
        });
    });
});

///////////////////////////////On Message Recieved///////////////////////////////
chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
    console.log(">(Data Received): ", data);
    if(data.type == 'create'){
        if(data.serverType == 'clientServer'){

            chrome.app.window.create('host.html', {
                id: 'host',
                minWidth: 400,
                minHeight: 500,
                bounds: { width: 620, height: 500 }
              },(myWindow)=>{
                  console.log('>(Window) ',myWindow)
                  hostWindow  = myWindow.contentWindow;
                  myWindow.contentWindow.addEventListener('load', (e) => {
                      console.log('>(Window Content) ', myWindow.contentWindow)
                      hostWindow.getServerRooms();
                      // chrome.runtime.sendMessage('datas', ()=>{
                      //     console.log('sent')
                      // });
                  });
              });

        }else if(data.serverType == 'client'){

        }
    }else if(data.type == 'start'){
        if(data.serverType == 'clientServer'){
            // chrome.sockets.tcpServer.create({}, (createInfo) => {
            //     clientServerId = createInfo.socketId
            //     console.log(">(Socket "+createInfo.socketId+"): Created")
            //     console.log('Socket: ',createInfo)
            //     chrome.sockets.tcpServer.listen(createInfo.socketId, '127.0.0.1', port, 5, (result)=>{
            //         console.log(result)
            //     })
            //     // chrome.sockets.tcpServer.connect(createInfo.socketId, message.data.address, parseInt(message.data.port), ()=> { 
            //     //     console.log(">(Socket"+createInfo.socketId+"): Connected to "+ message.data.address+":"+ message.data.port)
            //     //     chrome.sockets.tcp.getSockets((e)=>{console.log('Sockets',e)})
            //     // });

            //     // chrome.sockets.tcpServer.disconnect(createInfo.socketId, ()=> { 
            //     //     console.log(">(Socket"+createInfo.socketId+"): Disconnected from "+ message.data.address+":"+ message.data.port)
            //     // });
            // });
        }
    }
    // if(message.type == "serverSelected"){
        
    //     console.log(">Address - ", message.data.address+ ':' + message.data.port);
    //     chrome.sockets.tcp.create({}, (createInfo) => {
    //         clientServerId = createInfo.socketId
    //         console.log(">(Socket"+createInfo.socketId+"): Created")

    //         chrome.sockets.tcp.connect(createInfo.socketId, message.data.address, parseInt(message.data.port), ()=> { 
    //             console.log(">(Socket"+createInfo.socketId+"): Connected to "+ message.data.address+":"+ message.data.port)
    //             chrome.sockets.tcp.getSockets((e)=>{console.log('Sockets',e)})
    //         });

    //         chrome.sockets.tcp.disconnect(createInfo.socketId, ()=> { 
    //             console.log(">(Socket"+createInfo.socketId+"): Disconnected from "+ message.data.address+":"+ message.data.port)
    //         });
    //     });
    // }
});

///////////////////////////////Socket: Connects to Aws Server///////////////////////////////
// chrome.sockets.tcp.create({}, (createInfo) => {
//     serverId = createInfo.socketId
//     console.log(">(Socket"+createInfo.socketId+"): Created")
//     chrome.sockets.tcp.connect(createInfo.socketId, host, parseInt(port), ()=> { 
//         console.log(">(Socket"+createInfo.socketId+"): Connected to "+ host+":"+ port)
//     });
//     chrome.sockets.tcp.disconnect(createInfo.socketId, ()=> { 
//         console.log(">(Socket"+createInfo.socketId+"): Disconnected from "+ host+":"+ port)
//     });
// });

///////////////////////////////Sockets: on data received ///////////////////////////////
chrome.sockets.tcp.onReceive.addListener( (data) => {
    if (!("TextDecoder" in window))
        console.log("Sorry, this browser does not support TextDecoder...");
    
    var enc = new TextDecoder("utf-8");
    var arr = new Uint8Array(data.data)
    console.log('>(Data recieved) ',data.data)
    console.log(enc.decode(arr));
    currentWindow.transferData(enc.decode(arr));
});
