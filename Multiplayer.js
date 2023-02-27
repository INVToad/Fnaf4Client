const socket = io("https://FnafServer.jarethcochrane.repl.co", {
  reconnection: false,
});

//These are tehe variables used
var ChatInput = document.getElementById('Input')
var ChatSubmitButton = document.getElementById('SubmitButton')
var RoomInput = document.getElementById('RoomInput')
var RoomSubmitButton = document.getElementById('RoomSubmitButton')

var Username = prompt('Username')
var ChatBox = document.getElementById("ChatBox")

var ChatMsgs = new Array()
var Room = 'null'

//Connection socket to tell when the player connects
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
    deleteChatMsg()
  }
  createChatMsg(data + ' Disconnected')
  ChatMsgs.push(data + ' Disconnected')
});
socket.on('receiveMessage', function(arg) {
  if (ChatMsgs.length >= 10) {
    ChatMsgs.shift()
    deleteChatMsg()
  }
  createChatMsg(arg)
  ChatMsgs.push(arg)
});
socket.on('RoomConnection', function(data) {
  if (ChatMsgs.length >= 10) {
    ChatMsgs.shift()
    deleteChatMsg()
  }
  createChatMsg('You have Joined ' + data)
  ChatMsgs.push('You have Joined ' + data)
  Room = data
});
socket.on('ConsoleLog', function(data) {
  console.log(data)
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
  NewPara.style.maxWidth = '200px'
  ChatBox.appendChild(NewPara)
  for (let i = 0; i < Messages.length; i++) {
    var TempMsg = document.getElementById(Messages[i])
    var CurrentUp = (TempMsg.style.bottom.replace('px', '')) - ''
    if (i == Messages.length - 1) {
      TempMsg.style.bottom = (CurrentUp + 19) + 'px'
    } else {
      TempMsg.style.bottom = (CurrentUp + document.getElementById('ChatMsg' + (number-1)).offsetHeight) + 'px'
    }
  }
}

function deleteChatMsg() {
  var tempdel = document.getElementById(Messages[0])
  tempdel.remove()
  Messages.shift()
}

function SendChatServerMessage(msg) {
  socket.emit('SentConnectMsg', msg)
}

function Checkkey(e) {
  if (e.key == "Enter") {
    SendChatMsg()
  }
}

function sendRoomRequest() {
  if (RoomInput.value != '') {
    socket.emit('JoinRoom', RoomInput.value)
    RoomInput.value = ''
    RoomInput.hidden = true
    RoomSubmitButton.hidden = true
  }
}

function SendData(type, data) {
  socket.emit('SendGameData', Room, type, data)
}

ChatSubmitButton.onclick = SendChatMsg
ChatInput.onkeydown = Checkkey

RoomSubmitButton.onclick = sendRoomRequest