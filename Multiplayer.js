const socket = io("https://FnafServer.jarethcochrane.repl.co", {
  reconnection: false,
});

var ChatInput = document.getElementById('Input')
var ChatSubmitButton = document.getElementById('SubmitButton')

socket.on('connect', function() {
  socket.emit("connection", socket.id)
});
socket.on('disconnect', function() {
  socket.emit("disconnection", socket.id)
});
socket.on('connected', function() {
  console.log("User Connected")
  SendMsg('test')
});
socket.on('disconnected', function() {
  console.log("User Disconnected")
});
socket.on('receiveMessage', function(arg) {
  console.log(arg)
});

function SendMsg(msg) {
  socket.emit('SentMsg', msg)
}
