// const options = {
//     port: 33333,
//     hostname: 'http://localhost',
//     method: 'CONNECT',
//     path: '/test'
//   };
  const http = require('http');
// const req = http.request(options);
http.get({
    hostname: 'localhost',
    port: 33334,
    path: '/test',
    agent: false  // Create a new agent just for this one request
  }, (res) => {
    console.log('g')
  });
// const http = require('http');
// http.get('http://localhost:33333/test', (resp) => {
//     let data = '';
//     console.log('s')
//     // A chunk of data has been recieved.
//     resp.on('data', (chunk) => {
//         data += chunk;
//     });

//     // The whole response has been received. Print out the result.
//     resp.on('end', () => {
//         console.log(data);
//         // this.servers = JSON.parse(data)
//     });

//     }).on("error", (err) => {
//     console.log("Error: " + err.message);
//     });