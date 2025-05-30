const express = require('express');
const app = express();
const http = require('http'); 
const server = http.createServer(app);
const {
  Server
} = require("socket.io"); 
const io = new Server(server); 

const OSC = require('osc')

var udpPort = new OSC.UDPPort({
  localAddress: "0.0.0.0",
  localPort: 57990,
  metadata: true
});

try {
  udpPort.open();
} catch (e) {
  console.log(e);
}

app.use(express.static('public'));

//==========================================================
//            ROUTE
//==========================================================
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


//==========================================================
//            STOPWATCH
//==========================================================


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

var prevTime, stopwatchInterval, elapsedTime = 0;

var updateTime = function () {
  var tempTime = elapsedTime;
  var milliseconds = tempTime % 1000;
  tempTime = Math.floor(tempTime / 1000);
  var seconds = tempTime % 60;
  tempTime = Math.floor(tempTime / 60);
  var minutes = tempTime % 60;
  tempTime = Math.floor(tempTime / 60);
  var hours = tempTime % 60;

  if (minutes <10){
    minutes = '0' + minutes;
  }
  // if(sec<= 60){
  //   sec = sec % 60;
  // }
  if(seconds<10){
    seconds = '0'+seconds;
  }

  var time =  minutes + " : " + seconds + " : " + milliseconds;
  io.emit('stopwatch', time)
};


//==========================================================
//             OSC
//==========================================================
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


udpPort.on("message", function(oscMsg, timeTag, info){
    // console.log(oscMsg);
    switch (oscMsg.address) {
        case '/beat/str':
            // console.log(oscMsg.args[0].value);
            io.emit('beat', oscMsg.args[0].value)
        break;
        case '/time/str':
            io.emit('time', oscMsg.args[0].value)
        break;
        case '/time':
        break;
        case '/start':
        if (!stopwatchInterval) {
      stopwatchInterval = setInterval(function () {
        if (!prevTime) {
          prevTime = Date.now();
        }

        elapsedTime += Date.now() - prevTime;
        prevTime = Date.now();

        updateTime();
      }, 50);
      }
      break;
      case '/pause':
      if (stopwatchInterval) {
         clearInterval(stopwatchInterval);
         stopwatchInterval = null;
       }
       prevTime = null;
      break;
      case '/reset':
      if (stopwatchInterval) {
         clearInterval(stopwatchInterval);
         stopwatchInterval = null;
       }
       prevTime = null;
       elapsedTime = 0;
       updateTime();
      break;
      case '/set':
      elapsedTime = oscMsg.args[0].value;
      if (!stopwatchInterval) {
    stopwatchInterval = setInterval(function () {
      if (!prevTime) {
        prevTime = Date.now();
      }
      // elapsedTime = oscMsg.args[0].value;
      elapsedTime += Date.now() - prevTime;
      prevTime = Date.now();

      updateTime();
    }, 50);
    }

      break;
    default:
  }
})
 
//==========================================================
//server listening on port:3000
//==========================================================
server.listen(3000, () => {
  console.log('listening on port:3000');
});
