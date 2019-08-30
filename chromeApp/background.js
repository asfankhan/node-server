/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */

serverId = null;
clientServerId = null;
currentWindow = null;
const port = 33333;
const host = '127.0.0.1';
const awsHost = '54.237.223.142';

///////////////////////////////On Start: Create Window///////////////////////////////
chrome.app.runtime.onLaunched.addListener(() => {
    chrome.app.window.create('index.html', {
      id: 'main',
      minWidth: 400,
      minHeight: 400,
      bounds: { width: 620, height: 500 }
    },(myWindow)=>{
        console.log('>(Window) ',myWindow)
        currentWindow  = myWindow.contentWindow;
        myWindow.contentWindow.addEventListener('load', (e) => {
            console.log('>(Window Content) ',myWindow.contentWindow)
            currentWindow.getServerRooms();
        });
    });
});

///////////////////////////////On Message Recieved///////////////////////////////
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(">(Data Received): ", message);
    if(message.type == "serverSelected"){
        
        console.log(">Address - ", message.data.address+ ':' + message.data.port);
        chrome.sockets.tcp.create({}, (createInfo) => {
            clientServerId = createInfo.socketId
            console.log(">(Socket"+createInfo.socketId+"): Created")

            chrome.sockets.tcp.connect(createInfo.socketId, message.data.address, parseInt(message.data.port), ()=> { 
                console.log(">(Socket"+createInfo.socketId+"): Connected to "+ message.data.address+":"+ message.data.port)
                chrome.sockets.tcp.getSockets((e)=>{console.log('Sockets',e)})
            });

            chrome.sockets.tcp.disconnect(createInfo.socketId, ()=> { 
                console.log(">(Socket"+createInfo.socketId+"): Disconnected from "+ message.data.address+":"+ message.data.port)
            });
        });
    }
});

///////////////////////////////Socket: Connects to Aws Server///////////////////////////////
chrome.sockets.tcp.create({}, (createInfo) => {
    serverId = createInfo.socketId
    console.log(">(Socket"+createInfo.socketId+"): Created")
    chrome.sockets.tcp.connect(createInfo.socketId, host, parseInt(port), ()=> { 
        console.log(">(Socket"+createInfo.socketId+"): Connected to "+ host+":"+ port)
    });
    chrome.sockets.tcp.disconnect(createInfo.socketId, ()=> { 
        console.log(">(Socket"+createInfo.socketId+"): Disconnected from "+ host+":"+ port)
    });
});

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
