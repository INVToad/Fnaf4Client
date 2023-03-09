//Begins all Game engine functions
function GameStart() {
  console.log('work in progress')
  if (IsHost) {
    socket.emit('SendGameData', 'Night', NightShift)
    GameTime = setInterval(() => {
      ShiftTime += 1
      socket.emit('SendGameData', 'ShiftTime', ShiftTime)
      if (ShiftTime == 6) {
        GameEnd('Win')
      }
    }, 60000)
    AllTimers.push(GameTime)
  }
  socket.emit('NightSettings', NightShift)
  theOffice.hidden = false
  Invis1.hidden = false
  Invis2.hidden = false
  //The next part gives the offices their specifc values needed for their functions
  if (Office == 'Office1') {
    alert('Have fun with this office')
    Office2ShockActive = true
    Office2FlashActive = true
    Office3DoorsActive = true
    Office3HeatActive = true
    BoxTime = 10
    BoxTimer = setInterval(() => {
      BoxTime -= 1
      if (BoxTime <= 0) {
        GameEnd('Loss')
      }
    }, 7000)
    AllTimers.push(BoxTimer)
  }
  if (Office == 'Office2') {
    Office2ShockActive = true
    Office2FlashActive = true
    ShockCharge = false
    ShockTimer = 5000
    FlashCharge = false
    FlashTimer = 5000
  }
  if (Office == 'Office3') {
    var Office3DoorsActive = true
    Office3HeatActive = true
    Office2LeftDoor = false
    Office2RightDoor = false
    Office3LeftDoor = false
    Office3RightDoor = false
    Office4LeftDoor = false
    Office4RightDoor = false
    Office1Heat = 20
    Office1Fan = false
    Office2Heat = 20
    Office2Fan = false
    Office3Heat = 20
    Office3Fan = false
    Office4Heat = 20
    Office4Fan = false
  }
  if (Office == 'Office4') {
    Power = 3000
    Office1Power = 1000
    Office1Recieving = false
    Office2Power = 1000
    Office2Recieving = false
    Office3Power = 1000
    Office3Recieving = false
  }
  //reveals and sets up rest of stuff for the office
  let i = Offices[Office]
  if (i.HasCameras) {
    
  }
  if (i.HasDoors) {
    
  }
  if (i.suit) {
    
  }
  if (i.BoxAnimatronic) {
    
  }
  if (i.SystemReset) {
    
  }
  if (i.DoorControl) {
    
  }
  if (i.PowerControl) {
    
  }
  if (i.HeatControl) {
    
  }
  if (i.LightControl) {
    
  }
  if (i.ShockControl) {
    
  }
}

//Pauses Game
function GamePause() {
  
}

//Ends all Game engine functions
function GameEnd(condition) {
  theOffice.hidden = true
  Invis1.hidden = true
  Invis2.hidden = true
  for (i in AllTimers) {
    clearInterval(AllTimers[i])
  }
  //next determines what the condition for the game ending was
  if (condition == 'Loss') {
    alert('Congratulations, Your a loser')
  }
  if (condition == 'Win') {
    alert('Congratulations, you won')
  }
  console.log('Are you the one that ruined it for everyone?')
}

//This will help control what audio plays and stops when
function AudioContoll(e) {
  
}

//Will move the corresponding animatronic
function MoveAnimatronic(Animatronic) {
  if (Animatronic.Room in Animatronic.Path) {
    if (Animatronic.Path[Animatronic.Room].length <= 1) {
      Animatronic.Room = Animatronic.Path[Animatronic.Room]
    } else {
      let i = Math.floor(Math.random() * Animatronic.Path[Animatronic.Room].length)
      Animatronic.Room = Animatronic.Path[Animatronic.Room][i]
    }
    SendData('moveAnimatronic', Animatronic, Animatronic.Room)
  }
}

//The things below are temporary and will be improved and change
var movescreen = 0
function TurnScreen(direction) {
  if (direction.type == 'mouseleave') {
    movescreen = 0
  }
  if (direction.type == 'mouseenter' && direction.target.id == 'ivisObeject2' && ((theOffice.style.right.replace('px', '')) - '') + 1 >= -2950) {
    movescreen = -1
    theOffice.style.right = (((theOffice.style.right.replace('px', '')) - '') - 1) + 'px'
  }
  if (direction.type == 'mouseenter' && direction.target.id == 'ivisObeject1' && ((theOffice.style.right.replace('px', '')) - '') - 1 <= 0) {
    movescreen = 1
    theOffice.style.right = (((theOffice.style.right.replace('px', '')) - '') + 1) + 'px'
  }
}
function checkScreen() {
  if (((theOffice.style.right.replace('px', '')) - '') >= 0) {
    movescreen = 0
  }
  if (((theOffice.style.right.replace('px', '')) - '') <= -2490) {
    movescreen = 0
  }
  theOffice.style.right = (((theOffice.style.right.replace('px', '')) - '') + movescreen) + 'px'
};

setInterval(() => {
  checkScreen()
}, 1)

Invis1.onmouseenter = TurnScreen
Invis1.onmouseleave = TurnScreen
Invis2.onmouseenter = TurnScreen
Invis2.onmouseleave = TurnScreen
//it ends at this point