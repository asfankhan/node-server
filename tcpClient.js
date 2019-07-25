const net = require('net');
const readline = require('readline');

const client = new net.Socket();
const port = 33333;
const host = '127.0.0.1';

client.connect(port, host, function() {
    console.log('Connected'+"My address "+ client.address().address +":"+ client.address().port);
    client.write("Hello From Client " + client.address().address);
});

client.on('data', function(data) {
    console.log('Server: ' + data);
    data = JSON.parse(data)
    console.log('Address: ' + data.address);
    console.log('Port: ' + data.port);

});

client.on('close', function() {
    console.log('Connection closed');
});

client.on("error", (err) =>{
    console.log("Caught flash policy server socket error: ")
    console.log(err.stack)

});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    input.trim()
    
    if(input == "exit")
        rl.close();
    
    console.log("Input: " +input);
    client.write( input + " " + client.address().address);    

}).on('close', () => {
    console.log('Program Ended');
    process.exit(0);
});
