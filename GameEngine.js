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
}

//Pauses Game
function GamePause() {
  
}

//Ends all Game engine functions
function GameEnd() {
  clearInterval(Gametime)
  theOffice.hidden = true
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