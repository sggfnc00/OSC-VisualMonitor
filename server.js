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
    default:
  }
})
 
//==========================================================
//server listening on port:3000
//==========================================================
server.listen(3000, () => {
  console.log('listening on port:3000');
});
