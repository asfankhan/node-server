
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


var video = document.querySelector('video');
var h1 = document.querySelector('h1');
var blobs = [];
var audioBlobs = [];
let stream;


var mediaConstraints = {
  audio: true,
  video: true
};
var context;
function init() {
try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
    console.log(context)

}
catch(e) {
    alert('Web Audio API is not supported in this browser');
}
}
$("#Check-Audio").on("click", () =>{
    // MediaStream.getAudioTracks()
    // init()

    navigator.mediaDevices.getUserMedia({ audio: true }).then(s => {
        this.stream = s;
        console.log(s.getTracks() )
        console.log(MediaStream)

        // this.record();
    }).catch(error => {
        this._recordingFailed.next();
    });

})



$("#StartBothRecoding").on("click", () =>{
  console.log('s')
  navigator.getUserMedia(constraints, successCallback, errorCallback);
})

const constraints = {
    audio: true, // mandatory.
    video: {'mandatory': {'chromeMediaSource':'screen'}}
};

const successCallback = (stream) => {
  // Set up the recorder
  let blobs = [];
  let recorder = new MediaRecorder(stream, {mimeType: 'video/webm; codecs=vp9'});

  recorder.ondataavailable = e => { 
    console.log(e)
    if (e.data && e.data.size > 0) 
      blobs.push(e.data)
    };
  recorder.onstop = (e) => console.log(new Blob(blobs, {type: 'video/webm'}));

  // Record for 10 seconds.
  setTimeout(()=> recorder.stop(), 2000);

  // Start recording.
  recorder.start(10); // collect 10ms chunks of data
};

const errorCallback = (err) => {
  // We don't have access to the API
  console.log(err)
};



if(!navigator.getDisplayMedia && !navigator.mediaDevices.getDisplayMedia) {
  var error = 'Your browser does NOT support the getDisplayMedia API.';
  document.querySelector('h1').innerHTML = error;
  document.querySelector('video').style.display = 'none';
  document.getElementById('btn-start-recording').style.display = 'none';
  document.getElementById('btn-stop-recording').style.display = 'none';
  throw new Error(error);
}

function invokeGetDisplayMedia(success, error) {
  var displaymediastreamconstraints = {
      video: {
          displaySurface: 'monitor', // monitor, window, application, browser
          logicalSurface: true,
          cursor: 'always' // never, always, motion
      }
  };
  // above constraints are NOT supported YET
  // that's why overridnig them
  displaymediastreamconstraints = {
      video: true
  };
  if(navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices.getDisplayMedia(displaymediastreamconstraints).then(success).catch(error);
  }
  else {
      navigator.getDisplayMedia(displaymediastreamconstraints).then(success).catch(error);
  }
}

function captureScreen(callback) {
  invokeGetDisplayMedia(function(screen) {
      addStreamStopListener(screen, function() {
          document.getElementById('btn-stop-recording').click();
      });
      callback(screen);
  }, function(error) {
      console.error(error);
      alert('Unable to capture your screen. Please check console logs.\n' + error);
  });
}

function stopRecordingCallback() {
  video.src = video.srcObject = null;
  video.src = URL.createObjectURL(recorder.getBlob());
  
  recorder.screen.stop();
  recorder.destroy();
  recorder = null;
  document.getElementById('btn-start-recording').disabled = false;
}


var recorder; // globally accessible
document.getElementById('btn-start-recording').onclick = function() {
  this.disabled = true;
  captureScreen(function(screen) {
      video.srcObject = screen;
      recorder = RecordRTC(screen, {
          type: 'audio',
          timeSlice: 1000,
          ondataavailable: function(blob) {
              blobs.push(blob);
              var size = 0;
              blobs.forEach(function(b) {
                  size += b.size;
              });
              h1.innerHTML = 'Total blobs: ' + blobs.length + ' (Total size: ' + bytesToSize(size) + ')';
          }
      });
      recorder.startRecording();
      // release screen on stopRecording
      recorder.screen = screen;
      document.getElementById('btn-stop-recording').disabled = false;
  });
};
document.getElementById('btn-stop-recording').onclick = function() {
  this.disabled = true;
  recorder.stopRecording(stopRecordingCallback);
};
function addStreamStopListener(stream, callback) {
  stream.addEventListener('ended', function() {
      callback();
      callback = function() {};
  }, false);
  stream.addEventListener('inactive', function() {
      callback();
      callback = function() {};
  }, false);
  stream.getTracks().forEach(function(track) {
      track.addEventListener('ended', function() {
          callback();
          callback = function() {};
      }, false);
      track.addEventListener('inactive', function() {
          callback();
          callback = function() {};
      }, false);
  });
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
