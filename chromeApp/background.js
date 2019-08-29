/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */
console.log('Started')
chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
      id: 'main',
      bounds: { width: 620, height: 500 }
    });
});
chrome.sockets.tcp.create({}, (createInfo) => {
  chrome.sockets.tcp.connect(createInfo.socketId, '127.0.0.1', 33333, ()=>{ 
      console.log('connected')
  });
});

chrome.sockets.tcp.onReceive.addListener(function(info) {
  if (info.socketId != socketId)
    return;
});
