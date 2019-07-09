// var http = require('http');
// var express = require("express")
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// }).listen(80, '127.0.0.1');
// console.log('Server running at http://127.0.0.1:80/');

var express = require('express');
var app = express();

app.listen(3000, ()=>  {
    console.log('listening');
});

app.get('/',(req,res)=>  {
    res.send('hi');
});
