const socket = io("https://FnafServer.jarethcochrane.repl.co", {
  reconnection: false,
});

var ChatInput = document.getElementById('Input')
var ChatSubmitButton = document.getElementById('SubmitButton')

var Username = prompt('Username')
var ChatBox = document.getElementById("ChatBox")

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
socket.on('connected', function(data) {
  SendChatServerMessage(data + " Connected")
});
socket.on('disconnected', function(data) {
  if (ChatMsgs.length >= 10) {
    ChatMsgs.shift()
  }
  ChatMsgs.push(data + ' Disconnected')
  console.log(data + ' Disconnected')
});
socket.on('receiveMessage', function(arg) {
  if (ChatMsgs.length >= 10) {
    ChatMsgs.shift()
  }
  createChatMsg(arg)
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

var number = 0
var Messages = []
function createChatMsg(e) {
  var NewPara = document.createElement("p")
  var Context = document.createTextNode(e)
  NewPara.appendChild(Context)
  NewPara.id = 'ChatMsg' + number
  Messages.push('ChatMsg' + number)
  number += 1
  NewPara.style.position = 'fixed'
  NewPara.style.left = '10px'
  NewPara.style.bottom = '100px'
  ChatBox.appendChild(NewPara)
  for (let i = 0; i < Messages.length; i++) {
    var TempMsg = document.getElementById(Messages[i])
    var CurrentUp = (TempMsg.style.bottom.replace('px', '')) - ''
    TempMsg.style.bottom = (CurrentUp + 13) + 'px'
  }
}

function SendChatServerMessage(msg) {
  socket.emit('SentConnectMsg', msg)
}

ChatSubmitButton.onclick = SendChatMsg
