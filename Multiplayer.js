const socket = io("https://FnafServer.jarethcochrane.repl.co", {
  reconnection: false,
});


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