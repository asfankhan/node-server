
$( document ).ready(function() {
  console.log( "Page Ready!" );

  $( "#target" ).click(() => {
    getServerRooms();
  });
  // getServerRooms();
  chrome.runtime.sendMessage("test");

});
function printWorking(var1){
  console.log(" : ")
}
function getServerRooms(){
  $.ajax({
    url: 'http://localhost:33334/data',
    complete: function(data) {
      console.log('Get Data from /data');
      console.log(data)
      obj = JSON.parse(data.responseText);
      console.log(obj);

      document.getElementById('servers').innerHTML = "";
      Object.keys(obj).forEach((el)=>{

        var div = document.createElement("div");
        div.className = "col-12";
        div.addEventListener("click", function(){

          chrome.runtime.sendMessage({
            type:'serverSelected',
            data:obj[el]
          });

          console.log(obj[el].address+" : "+obj[el].port)
        });
        div.innerHTML ="Server " + obj[el].address+ ' ' + obj[el].port;
        document.getElementById("servers").appendChild(div);

      })

    }
  });
}

function transferData(data){
  // obj = JSON.parse(data.responseText);
  console.log(data);

  var div = document.createElement("div");
  div.className = "col-12";
  div.innerHTML =data

  div.addEventListener("click", function(){

    chrome.runtime.sendMessage({
      type:null,
      data:data
    });

  });
  document.getElementById("messages").appendChild(div);

}


// var socket = io.connect('http://localhost:8000');


// socket.on('welcome', function(data) {
//     $('#messages').append('<li>' + data.message + '</li>');
//     socket.emit('i am client', {data: 'foo!'});
// });
// socket.on('time', function(data) {
//     console.log(data);
//     $('#messages').append('<li>' + data.time + '</li>');
// });
// socket.on('error', function() { console.error(arguments) });
// socket.on('message', function() { console.log(arguments) });

// var http = new XMLHttpRequest();
// var url = '\\';
// var params = 'orem=ipsum&name=binny';
// http.open('POST', url, true);

// //Send the proper header information along with the request
// http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

// http.onreadystatechange = function() {//Call a function when the state changes.
//     if(http.readyState == 4 && http.status == 200) {
//         alert(http.responseText);
//     }
// }
// http.send(params);
