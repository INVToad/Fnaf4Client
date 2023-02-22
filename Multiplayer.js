const socket = io("https://FnafServer.jarethcochrane.repl.co", {
  reconnection: false,
});

var ChatInput = document.getElementById('Input')
var ChatSubmitButton = document.getElementById('SubmitButton')

var Username = prompt('Username')

var ChatMsgs = new Array()

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
socket.on('disconnected', function(data) {
  console.log('yeaa')
  SendChatServerMessage(data + " Disconnected")
});
socket.on('receiveMessage', function(arg) {
  if (ChatMsgs.length >= 10) {
    ChatMsgs.shift()
  }
  ChatMsgs.push(arg)
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
  socket.emit('SentConnectMsg', msg)
}

ChatSubmitButton.onclick = SendChatMsg
