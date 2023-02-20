const socket = io("https://FnafServer.jarethcochrane.repl.co", {
  reconnection: false,
});

var button = document.getElementById("ButtonJoin")
var Joined = false

function Buttoon() {
  socket.on('connect', function() {
    socket.emit("connection", 'User Connected')
  });
  socket.on('disconnect', function() {
    socket.emit("disconnection", 'User Diconnected')
  });

  socket.on('connected', function() {
    console.log("User Connected")
  })

  socket.on('disconnected', function() {
    console.log("User Disconnected")
  })
}

button.onclick = Buttoon