//Begins all Game engine functions
function GameStart() {
  console.log('work in progress')
  if (IsHost) {
    var GameTime = setInterval(() => {
      ShiftTime += 1
      socket.emit('SendGameData', 'ShiftTime', ShiftTime)
    }, 60000)
  }
  theOffice.hidden = false
  Invis1.hidden = false
  Invis2.hidden = false
  //The next part gives the office var for each office type
  if (Office == 'Office1') {
    alert('Have fun with this office')
    var Office2ShockActive = true
    var Office2FlashActive = true
    var Office3DoorsActive = true
    var Office3HeatActive = true
  }
  if (Office == 'Office2') {
    var Office2ShockActive = true
    var Office2FlashActive = true
    var ShockCharge = false
    var ShockTimer = 5000
    var FlashCharge = false
    var FlashTimer = 5000
  }
  if (Office == 'Office3') {
    var Office3DoorsActive = true
    var Office3HeatActive = true
    var Office2LeftDoor = false
    var Office2RightDoor = false
    var Office3LeftDoor = false
    var Office3RightDoor = false
    var Office4LeftDoor = false
    var Office4RightDoor = false
    var Office1Heat = 20
    var Office1Fan = false
    var Office2Heat = 20
    var Office2Fan = false
    var Office3Heat = 20
    var Office3Fan = false
    var Office4Heat = 20
    var Office4Fan = false
  }
  if (Office == 'Office4') {
    Power = 3000
    var Office1Power = 1000
    var Office1Recieving = false
    var Office2Power = 1000
    var Office2Recieving = false
    var Office3Power = 1000
    var Office3Recieving = false
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
function GameEnd() {
  clearInterval(Gametime)
  theOffice.hidden = true
  Invis1.hidden = true
  Invis2.hidden = true
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
    SendData('moveAnimatronic', Animatronic.Room)
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