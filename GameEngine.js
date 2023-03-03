//Begins all Game engine functions
function GameStart() {
  console.log('work in progress')
  if (IsHost) {
    var GameTime = setInterval(() => {
      ShiftTime += 1
      socket.emit('SendGameData', 'ShiftTime', ShiftTime)
    }, 60000)
  }
}

//Pauses Game
function GamePause() {
  
}

//Ends all Game engine functions
function GameEnd() {
  clearInterval(Gametime)
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