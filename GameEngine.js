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
  OfficePowerDrain = setInterval(() => {
    Power -= PowerUsage
    if (Power <= 0) {
      GameEnd('Loss')
    }
  }, 1000)
  AllTimers.push(OfficePowerDrain)
  socket.emit('NightSettings', NightShift)
  theOffice.hidden = false
  Invis1.hidden = false
  Invis2.hidden = false
  LeftDoorDiv.hidden = false
  RightDoorDiv.hidden = false
  //reveals/Creates basic values for each office
  let i = Offices[Office]
  if (i.HasCameras) {
    let img1 = document.createElement("img")
    img1.src = ''
    img1.style.position = 'fixed'
    img1.style.left = '0px'
    img1.style.top = '0px'
    img1.style.height = '791px'
    img1.style.width = '1424px'
    img1.hidden = true
    img1.id = 'CameraView'
    DivTrigger.prepend(img1)
    let img = document.createElement("img")
    img.src = 'Assests/fnaf_static_gif_by_supermariojustin4_d9r0qpv.gif'
    img.style.position = 'fixed'
    img.style.left = '0px'
    img.style.top = '0px'
    img.style.height = '791px'
    img.style.width = '1424px'
    img.hidden = true
    img.id = 'CameraStaticGIF'
    DivTrigger.prepend(img)
    let Mapdiv = document.createElement("div")
    Mapdiv.style.position = 'fixed'
    Mapdiv.style.right = '0px'
    Mapdiv.style.bottom = '0px'
    Mapdiv.style.overflow = 'hidden'
    Mapdiv.style.width = '400px'
    Mapdiv.style.height = '400px'
    Mapdiv.id = 'MapContainer'
    DivTrigger.append(Mapdiv)
    MapDiv = document.getElementById("MapContainer")
    let Map = document.createElement('img')
    Map.src = 'Assests/Map.png'
    Map.style.position = 'fixed'
    Map.style.left = '0px'
    Map.style.top = '0px'
    Map.style.height = '800px'
    Map.hidden = true
    Map.id = 'CamMap'
    MapDiv.append(Map)
    Map = document.getElementById('CamMap')
    CameraView = document.getElementById('CameraView')
    CameraStatic = document.getElementById('CameraStaticGIF')
    CamSuitTrig.onmouseenter = BasicCameraFlipOut
  }
  if (i.HasDoors) {
    let img = document.createElement("img")
    img.src = 'Assests/LeftDoor.png'
    img.style.height = '647px'
    LeftDoorDiv.appendChild(img)
    let img1 = document.createElement("img")
    img1.src = 'Assests/RightDoor.png'
    img1.style.height = '647px'
    RightDoorDiv.appendChild(img1)
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
  //The next part gives the offices their specifc values needed for their functions
  if (Office == 'Office1') {
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
    Functions.push(Office2ShockActive)
    Functions.push(Office2FlashActive)
    MothMove = setInterval(() => {
      MoveAnimatronic(MothAnamtronic)
    }, 10000)
    AllTimers.push(MothMove)
    Map.style.left = '-410px'
    Map.style.top = '-405px'
  }
  if (Office == 'Office3') {
    Office3DoorsActive = true
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
    Functions.push(Office3HeatActive)
    Functions.push(Office3DoorsActive)
    FreeRoamMove = setInterval(() => {
      MoveAnimatronic(FreeRoamAnamtronic)
    }, 5600)
    AllTimers.push(FreeRoamMove)
    PowerDrainMove = setInterval(() => {
      MoveAnimatronic(PowerDrainAnamtronic)
    }, 7800)
    AllTimers.push(PowerDrainMove)
    Map.style.top = '-405px'
  }
  if (Office == 'Office4') {
    Power = 3000
    Office1Power = 1000
    Office1Recieving = false
    Office2Power = 1000
    Office2Recieving = false
    Office3Power = 1000
    Office3Recieving = false
    ElectrianMove = setInterval(() => {
      MoveAnimatronic(ElectricianAnamtronic)
    }, 6400)
    AllTimers.push(ElectrianMove)
  }
}

//Pauses Game
function GamePause() {

}

//Ends all Game engine functions
function GameEnd(condition) {
  Power = 1000
  if (!leftDoor) {
    ControlDoor('left')
  }
  if (!rightDoor) {
    ControlDoor('right')
  }
  PowerUsage = 1
  theOffice.hidden = true
  Invis1.hidden = true
  Invis2.hidden = true
  LeftDoorDiv.hidden = true
  RightDoorDiv.hidden = true
  CamSuitTrig.hidden = true
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
  if (!GameMute) {

  }
}

//Changes Camera View
function CamChange(e) {
  CameraStatic.style.opacity = 0
  setTimeout(() => {
    CameraStatic.style.opacity = 50
  }, 100)
}

//Flip out for the chamera
function BasicCameraFlipOut() {
  if (Offices[Office].HasCameras) {
    if (CameraView.hidden) {
      CameraView.hidden = false
      CameraStatic.hidden = false
      Map.hidden = false
    } else if (!CameraView.hidden) {
      CameraView.hidden = true
      CameraStatic.hidden = true
      Map.hidden = true
    }
  }
}

//Will move the corresponding animatronic
function MoveAnimatronic(Animatronic) {
  let Ran = Math.floor(Math.random() * 20) + 1
  if (Ran <= Animatronic.AILevel) {
    if (Animatronic.Room in Animatronic.Path) {
      //Will remove animatronic name from room placement list
      let e = RoomPlacement['Cam' + Animatronic.Room].indexOf(Animatronic.Name)
      RoomPlacement['Cam' + Animatronic.Room].splice(e)
      if (Animatronic.Path[Animatronic.Room].length <= 1) {
        Animatronic.Room = Animatronic.Path[Animatronic.Room]
      } else {
        // adds animatronic to room placement list
        let i = Math.floor(Math.random() * Animatronic.Path[Animatronic.Room].length)
        Animatronic.Room = Animatronic.Path[Animatronic.Room][i]
      }
      RoomPlacement['Cam' + Animatronic.Room].push(Animatronic.Name)
      SendData('moveAnimatronic', Animatronic, Animatronic.Room)
    } else if (Animatronic == EyeScanAnamtronic) {
      if (Animatronic.Room == 'middle') {
        let rando = Math.floor(Math.random() * 4) + 1
        Animatronic.Room = 'Office' + rando
      } else {
        GameEnd('Loss')
      }
    } else if (Animatronic == PhantomAnamtronic) {
      if (PhantomAnamtronic.Room == 'none') {
        let rando = Math.floor(Math.random() * 2) + 2
        PhantomAnamtronic.Room = 'Office' + rando
      } else {
        let rando = Math.floor(Math.random() * Functions.length)
        Functions[rando] = false
      }
    }
  }
}

//The things below subject to change
var movescreen = 0
function TurnScreen(direction) {
  if (direction.type == 'mouseleave') {
    movescreen = 0
  }
  if (direction.type == 'mouseenter' && direction.target.id == 'ivisObeject2' && ((theOffice.style.right.replace('px', '')) - '') + 1 >= -2950) {
    movescreen = -1
    LeftDoorDiv.style.left = (((LeftDoorDiv.style.left.replace('px', '')) - '') + 1) + 'px'
    RightDoorDiv.style.right = (((RightDoorDiv.style.right.replace('px', '')) - '') - 1) + 'px'
    theOffice.style.right = (((theOffice.style.right.replace('px', '')) - '') - 1) + 'px'
  }
  if (direction.type == 'mouseenter' && direction.target.id == 'ivisObeject1' && ((theOffice.style.right.replace('px', '')) - '') - 1 <= 0) {
    movescreen = 1
    LeftDoorDiv.style.left = (((LeftDoorDiv.style.left.replace('px', '')) - '') - 1) + 'px'
    RightDoorDiv.style.right = (((RightDoorDiv.style.right.replace('px', '')) - '') + 1) + 'px'
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
  LeftDoorDiv.style.left = (((LeftDoorDiv.style.left.replace('px', '')) - '') - movescreen) + 'px'
  RightDoorDiv.style.right = (((RightDoorDiv.style.right.replace('px', '')) - '') + movescreen) + 'px'
  theOffice.style.right = (((theOffice.style.right.replace('px', '')) - '') + movescreen) + 'px'
  if ((theOffice.style.right.replace('px', '')) - '' <= -1660) {
    CamSuitTrig.hidden = false
  } else {
    CamSuitTrig.hidden = true
  };
};

setInterval(() => {
  checkScreen()
}, 1)

Invis1.onmouseenter = TurnScreen
Invis1.onmouseleave = TurnScreen
Invis2.onmouseenter = TurnScreen
Invis2.onmouseleave = TurnScreen
//it ends at this point

//This opens and closes the doors
function ControlDoor(Door) {
  if (Door == 'left') {
    var move = 0
    LeftValue = (LeftDoorDiv.style.width.replace('px', '')) - ''
    if (LeftValue > 1) {
      move = -209
      leftDoor = false
      PowerUsage -= 1
    } else {
      move = 209
      leftDoor = true
      PowerUsage += 1
    }
    LeftDoorDiv.style.width = (LeftValue + move) + 'px'
  }
  if (Door == 'right') {
    var move = 0
    RightValue = (RightDoorDiv.style.width.replace('px', '')) - ''
    if (RightValue > 1) {
      move = -209
      rightDoor = false
      PowerUsage -= 1
    } else {
      move = 209
      rightDoor = true
      PowerUsage += 1
    }
    RightDoorDiv.style.width = (RightValue + move) + 'px'
  }
}