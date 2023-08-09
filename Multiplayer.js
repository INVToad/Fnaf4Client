const socket = io("https://FnafServer.jarethcochrane.repl.co", {
  reconnection: false,
});

//These are the variables used
var ChatInput = document.getElementById('Input')
var ChatSubmitButton = document.getElementById('SubmitButton')
var RoomInput = document.getElementById('RoomInput')
var RoomSubmitButton = document.getElementById('RoomSubmitButton')
var refreshLobbiesButton = document.getElementById('refreshLobbiesButton')

var Username = 'Admin'//prompt('Username')
var ChatBox = document.getElementById("ChatBox")
var Lobbylist = document.getElementById("lobbies")

var ChatMsgs = new Array()
var Room = 'null'

//Connection socket to tell when the player connects
socket.on('connect', function() {
  socket.emit("connection")
  if (Username != null) {
    socket.emit("connected", Username, socket.id, window.location, AdminPassword)
  }
});
socket.on('Forcedisonnection', function() {
  socket.disconnect()
});
socket.on('user', function(data, name) {
  if (data == 'Taken') {
    var Username = prompt('Username', name + 'was Taken')
    socket.emit("connected", Username, socket.id, window.location, AdminPassword)
  }
})
socket.on('connectedUserName', function(data) {
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
  let allow = true
  for (p in ProfanityFilter) {
    if ((arg.toLowerCase()).includes(ProfanityFilter[p])) {
      allow = false
      break
    };
  };
  if (allow) {
    if (document.getElementById(Messages[0]) != null && Number((document.getElementById(Messages[0]).style.bottom).replace('px', '')) + document.getElementById(Messages[0]).clientHeight >= 700) {
      ChatMsgs.shift()
      deleteChatMsg()
    }
    createChatMsg(arg)
    ChatMsgs.push(arg)
  };
});
socket.on('RoomConnection', function(data) {
  if (ChatMsgs.length >= 10) {
    ChatMsgs.shift()
    deleteChatMsg()
  }
  createChatMsg('You have Joined ' + data)
  ChatMsgs.push('You have Joined ' + data)
  Room = data
  while (Lobbylist.firstChild != null) {
    Lobbylist.removeChild(Lobbylist.lastChild)
  }
  refreshLobbiesButton.hidden = true
  LobbyStuff('Joined')
});
socket.on('ConsoleLog', function(data) {
  console.log(data)
});
socket.on('refreshTransmit', function(data) {
  while (Lobbylist.firstChild != null) {
    Lobbylist.removeChild(Lobbylist.lastChild)
  }
  var ypos = 100
  var keys = Object.keys(data)
  for (let i = 0; i < Object.keys(data).length; i++) {
    var e = keys[i] + ': ' + String(data[keys[i]]) + '/4'
    var newLobby = document.createElement("p")
    var LobbyStuff = document.createTextNode(e)
    newLobby.appendChild(LobbyStuff)
    newLobby.style.position = 'absolute'
    newLobby.style.left = '400px'
    newLobby.style.top = ypos + 'px'
    newLobby.style.maxWidth = '500px'
    Lobbylist.appendChild(newLobby)
    ypos += 20
  }
})

//Important, this socket is constantly used for game data across clients
socket.on('receiveGameData', function(type, data, data1, data2) {
  if (type == 'Deactivate' && Office == data) {
    if (data1 != 'Cams') {
      FunctionControls[FunctionList[data1]].Active = false
    } else {
      Offices[Office].HasCameras = false
    }
  }
  if (type == 'Reactivate' && Office == data) {
    if (data1 != 'Cams') {
      FunctionControls[FunctionList[data1]].Active = true
    } else {
      Offices[Office].HasCameras = true
    }
  }
  if (type == 'PowerCheck') {
    SendData('PowerLevelRecieve', Office, Power)
  }
  if (type == 'Energy_Check' && Office == 'Office3') {
    SendData('ConsoleData', 'Energy_Levels', ElectricianAnamtronic.EnergyLevels)
  }
  if (type == 'ConsoleData' && Office == 'Office1') {
    if (data == 'Energy_Levels') {
      EnergyLevels = data1
    }
    DataReceived = true
  }
  if (type == 'PowerLevelRecieve' && Office == 'Office4') {
    if (data == 'Office1') {
      Office1Power = Math.floor(Power / 100)
    }
    if (data == 'Office2') {
      Office2Power = Math.floor(Power / 100)
    }
    if (data == 'Office3') {
      Office3Power = Math.floor(Power / 100)
    }
  }
  if (type == 'PowerDown') {
    if(data == Office) {
      PowerDown(data1)
    }
  }
  if (type == 'GameInitiate') {
    Ingame = true
    GameStart()
  }
  if (type == 'LobbyLoad') {
    Office = 'Office' + data
    if (data == 1) {
      IsHost = true
    }
  }
  if (type == 'ShiftTime') {
    ShiftTime = data
    ShiftTime = data
  }
  if (type == 'Difficulty') {
    PowerDrainAnamtronic.AILevel = data.PowerDraintronic
    EyeScanAnamtronic.AILevel = data.Eyescantronic
    ElectricianAnamtronic.AILevel = data.Electriciantronic
    FreeRoamAnamtronic.AILevel = data.FreeRoamtronic
    PhantomAnamtronic.AILevel = data.Phantomtronic
    MothAnamtronic.AILevel = data.Mothtronic
  }
  if (type == 'Night') {
    NightShift = data
  }
  if (type == 'Door') {
    if (data[0] == Office) {
      ControlDoor(data[1])
    }
  }
  if (type == 'moveAnimatronic') {
    if (data == EyeScanAnamtronic) {
      EyeScanAnamtronic.Room = data1
    } else if (data == PhantomAnamtronic) {
      PlaceAnimatronic(PhantomAnamtronic, data1)
    } else {
      if (data == PowerDrainAnamtronic) {
        PlaceAnimatronic(PowerDrainAnamtronic, data1)
      } else if (data == ElectricianAnamtronic) {
        PlaceAnimatronic(ElectricianAnamtronic, data1)
      } else if (data == FreeRoamAnamtronic) {
        PlaceAnimatronic(FreeRoamAnamtronic, data1)
      } else {
        PlaceAnimatronic(MothAnamtronic, data1, data2)
      }
    }
  }
})

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
  NewPara.style.position = 'absolute'
  NewPara.style.left = ChatSettings.Left
  NewPara.style.bottom = '100px'
  NewPara.style.maxWidth = '200px'
  NewPara.style.color = ChatSettings.Colour
  ChatBox.appendChild(NewPara)
  for (let i = 0; i < Messages.length; i++) {
    var TempMsg = document.getElementById(Messages[i])
    var CurrentUp = (TempMsg.style.bottom.replace('px', '')) - ''
    if (i == Messages.length - 1) {
      TempMsg.style.bottom = (CurrentUp + 19) + 'px'
    } else {
      TempMsg.style.bottom = (CurrentUp + document.getElementById('ChatMsg' + (number - 1)).offsetHeight) + 'px'
    }
  }
}

function refreshLobbies() {
  socket.emit('refreshRequest', 'yes')
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
  let Password = prompt('Password: ')
  if (RoomInput.value != '') {
    socket.emit('JoinRoom', RoomInput.value, Password)
    RoomInput.value = ''
    RoomInput.hidden = true
    RoomSubmitButton.hidden = true
  }
}

function CreateRoom() {
  socket.emit('CreateRoom', RoomInput.value,  NightShift, RooomPassword)
}

function SendData(type, data, data1) {
  socket.emit('SendGameData', Room, type, data, data1)
}

ChatSubmitButton.onclick = SendChatMsg
ChatInput.onkeydown = Checkkey

RoomSubmitButton.onclick = sendRoomRequest
refreshLobbiesButton.onclick = refreshLobbies