const socket = io("https://FnafServer.jarethcochrane.repl.co", {
  reconnection: false,
});

socket.on('connect', function() {
  socket.emit("connection", socket.id)
});
socket.on('disconnect', function() {
  socket.emit("disconnection", socket.id)
});
socket.on('connected', function() {
  console.log("User Connected")
});
socket.on('disconnected', function() {
  console.log("User Disconnected")
});
socket.on('receiveMessage', function() {
  console.log('test')
});

function SendMsg(msg) {
  socket.emit('SentMsg', msg)
}

SendMsg('test')
