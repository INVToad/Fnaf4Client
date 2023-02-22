const socket = io("https://FnafServer.jarethcochrane.repl.co", {
  reconnection: false,
});

var ChatInput = document.getElementById('Input')
var ChatSubmitButton = document.getElementById('SubmitButton')

var Username = prompt('Username')

socket.on('connect', function() {
  socket.emit("connection")
  socket.emit("connected", Username, socket.id)
});
socket.on('user', function(data, name) {
  if (data == 'Taken') {
    var Username = prompt('Username', name + 'was Taken')
    socket.emit("connected", Username, socket.id)
  }
})
socket.on('disconnect', function() {
  socket.emit("disconnection", socket.id)
});
socket.on('connected', function(data) {
  SendChatServerMessage(data + " Connected")
});
socket.on('disconnected', function() {
  SendChatServerMessage("User Disconnected")
});
socket.on('receiveMessage', function(arg) {
  console.log(arg)
});

function SendChatMsg() {
  if (ChatInput.value != '') {
    socket.emit('SentMsg', ChatInput.value, socket.id)
    ChatInput.value = ''
  } else {
    console.log("Error: no input text")
  }
}

function SendChatServerMessage(msg) {
  socket.emit('SentMsg', msg, socket.id)
}

ChatSubmitButton.onclick = SendChatMsg
