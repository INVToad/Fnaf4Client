const socket = io("https://FnafServer.jarethcochrane.repl.co", {
  reconnection: false,
});


socket.on('connect', function() {
  socket.emit("connection", 'User Connected')
});
socket.on('disconnect', function() {
  socket.emit("disconnection", 'User Diconnected')
});