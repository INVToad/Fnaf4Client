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
  if (direction.type == 'mouseleave') {
    movescreen = 0
  }
  if (direction.type == 'mouseenter' && direction.target.id == 'ivisObeject2') {
    movescreen = -1
    theOffice.style.right = (((theOffice.style.right.replace('px', '')) - '') - 1) + 'px'
  }
  if (direction.type == 'mouseenter' && direction.target.id == 'ivisObeject1') {
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

Invis1.onmouseenter = TurnScreen
Invis1.onmouseleave = TurnScreen
Invis2.onmouseenter = TurnScreen
Invis2.onmouseleave = TurnScreen
//it ends at this point