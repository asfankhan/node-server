// var http = require('http');
// var express = require("express")
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// }).listen(80, '127.0.0.1');
// console.log('Server running at http://127.0.0.1:80/');

var express = require('express');

var app = express();
var favicon = require('serve-favicon')

var path = require('path');

var {log, print} = require('./server/testExport.js');

let port = 3000;


app.use(favicon(path.join(__dirname, 'public/assets', 'fox_logo_pcg_icon.ico')))
app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/',(req,res)=>  {
    res.sendFile(path.join(__dirname + '/public/index.html'));
    // res.send('hi');
});

log.info('Node.js started');
console.log(print)
app.listen(port, ()=>  {
  console.log('listening on Port:' + port );
});