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
    
  }
}

//The things below are temporary and will be improved and change
var movescreen = 0
function TurnScreen(direction) {
  if (direction == 'stop') {
    movescreen = 0
  }
  if (direction == 'left') {
    movescreen = -1
    theOffice.style.right = (((theOffice.style.right.replace('px', '')) - '') - 1) + 'px'
  }
  if (direction == 'right') {
    movescreen = 1
    theOffice.style.right = (((theOffice.style.right.replace('px', '')) - '') + 1) + 'px'
  }
}
function checkScreen() {
  if (theOffice.style.right == '0px') {
    movescreen = 0
  }
  if (theOffice.style.right == '-2490px') {
    movescreen = 0
  }
  theOffice.style.right = (((theOffice.style.right.replace('px', '')) - '') + movescreen) + 'px'
};

setInterval(() => {
  checkScreen()
}, 500)

Invis1.onmouseover = TurnScreen('right')
Invis1.onmouseout = TurnScreen('stop')
Invis2.onmouseover = TurnScreen('left')
Invis2.onmouseout = TurnScreen('stop')
//it ends at this point