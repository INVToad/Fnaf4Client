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
  SendChatServerMessage("User Connected")
});
socket.on('disconnected', function() {
  SendChatServerMessage("User Disconnected")
});
socket.on('receiveMessage', function(arg) {
  console.log(arg)
});

function SendChatMsg() {
  if (ChatInput.value != '') {
    socket.emit('SentMsg', ChatInput.value)
    ChatInput.value = ''
  } else {
    console.log("Error: no input text")
  }
}

function SendChatServerMessage(msg) {
  socket.emit('SentMsg', msg)
}

ChatSubmitButton.onclick = SendChatMsg
