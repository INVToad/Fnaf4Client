//Begins all Game engine functions
function GameStart() {
  console.log('uhhhhhhhh')
  if (IsHost) {
    var GameTime = setInterval(function() => {
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
  console.log('Did you do that?')
}

//This will help control what audio plays and stops when
function AudioContoll(e) {
  
}