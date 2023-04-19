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
  LeftDoorDiv.onmousedown = DoorLight
  LeftDoorDiv.onmouseup = DoorLight
  RightDoorDiv.onmousedown = DoorLight
  RightDoorDiv.onmouseup = DoorLight
  //reveals/Creates basic values for each office
  let i = Offices[Office]
  if (i.HasCameras) {
    let img1 = document.createElement("img")
    img1.src = ''
    img1.style.position = 'absolute'
    img1.style.left = '0px'
    img1.style.top = '0px'
    img1.style.height = '791px'
    img1.style.width = '1424px'
    img1.hidden = true
    img1.id = 'CameraView'
    DivTrigger.prepend(img1)
    Deletables.push(img1)
    let img = document.createElement("img")
    img.src = 'Assests/fnaf_static_gif_by_supermariojustin4_d9r0qpv.gif'
    img.style.position = 'absolute'
    img.style.left = '0px'
    img.style.top = '0px'
    img.style.height = '791px'
    img.style.width = '1424px'
    img.hidden = true
    img.id = 'CameraStaticGIF'
    DivTrigger.prepend(img)
    Deletables.push(img)
    let Mapdiv = document.createElement("div")
    Mapdiv.style.position = 'absolute'
    Mapdiv.style.right = '0px'
    Mapdiv.style.bottom = '0px'
    Mapdiv.style.overflow = 'hidden'
    Mapdiv.style.width = '400px'
    Mapdiv.style.height = '400px'
    Mapdiv.id = 'MapContainer'
    Mapdiv.hidden = true
    DivTrigger.append(Mapdiv)
    MapDiv = document.getElementById("MapContainer")
    Deletables.push(MapDiv)
    let Map = document.createElement('img')
    Map.src = 'Assests/Map.png'
    Map.style.position = 'absolute'
    Map.style.left = '0px'
    Map.style.top = '0px'
    Map.style.height = '800px'
    Map.hidden = true
    Map.id = 'CamMap'
    MapDiv.append(Map)
    map = document.getElementById('CamMap')
    CameraView = document.getElementById('CameraView')
    CameraStatic = document.getElementById('CameraStaticGIF')
    CamSuitTrig.onmouseenter = BasicFlipOut
  }
  if (i.HasDoors) {
    let img = document.createElement("img")
    img.src = 'Assests/LeftDoor.png'
    img.style.height = '647px'
    img.id = 'DOOR_L'
    LeftDoorDiv.appendChild(img)
    LeftDoor = document.getElementById('DOOR_L')
    Deletables.push(img)
    let img1 = document.createElement("img")
    img1.src = 'Assests/RightDoor.png'
    img1.style.height = '647px'
    img1.id = 'DOOR_R'
    RightDoorDiv.appendChild(img1)
    RightDoor = document.getElementById('DOOR_R')
    Deletables.push(img1)
  } else {
    let img = document.createElement("img")
    img.src = 'Assests/LeftLight.png'
    img.style.height = '647px'
    img.id = 'Light_L'
    LeftDoorDiv.appendChild(img)
    LeftLight = document.getElementById('Light_L')
    Deletables.push(img)
    let img1 = document.createElement("img")
    img1.src = 'Assests/RightLight.png'
    img1.style.height = '647px'
    img1.id = 'Light_R'
    RightDoorDiv.appendChild(img1)
    RightLight = document.getElementById('Light_R')
    Deletables.push(img1)
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
    map.style.left = '-410px'
    map.style.top = '-405px'
    let setup = document.createElement('img')
    setup.src = 'Assests/Office2Setup.png'
    setup.style.position = 'absolute'
    setup.style.left = 'px'
    setup.style.top = 'px'
    setup.style.width = 'px'
    setup.id = 'SetUp'
    CreateContain.append(setup)
    SetUp = document.getElementById('SetUp')
    Deletables.push(SetUp)
    let Powerbor = document.createElement('img')
    Powerbor.src = 'Assests/PowerBar-03.png'
    Powerbor.style.position = 'absolute'
    Powerbor.style.left = 'px'
    Powerbor.style.top = 'px'
    Powerbor.style.width = 'px'
    Powerbor.style.height = 'px'
    Powerbor.id = 'PowerBar'
    CreateContain.append(Powerbor)
    PowerBar = document.getElementById('PowerBar')
    Deletables.push(PowerBar)
    let Lever = document.createElement('img')
    Lever.src = 'Assests/Frame-1-Lever-01.png'
    Lever.style.position = 'absolute'
    Lever.style.left = 'px'
    Lever.style.top = 'px'
    Lever.style.width = 'px'
    Lever.id = 'LightLever'
    CreateContain.append(Lever)
    LightLever = document.getElementById('LightLever')
    Deletables.push(LightLever)
    Lever = document.createElement('img')
    Lever.src = 'Assests/Frame-1-Lever-01.png'
    Lever.style.position = 'absolute'
    Lever.style.left = 'px'
    Lever.style.top = 'px'
    Lever.style.width = 'px'
    Lever.id = 'ShockLever'
    CreateContain.append(Lever)
    ShockLever = document.getElementById('ShockLever')
    Deletables.push(ShockLever)
    let Light = document.createElement('img')
    Light.src = 'Assests/LightOn-02.png'
    Light.style.position = 'absolute'
    Light.style.left = 'px'
    Light.style.top = 'px'
    Light.style.width = 'px'
    Light.id = 'ShockLight'
    CreateContain.append(Light)
    ShockLight = document.getElementById('ShockLight')
    Deletables.push(ShockLight)
    cam = document.createElement('img')
    cam.style.position = 'absolute'
    cam.style.left = '15px'
    cam.style.top = '110px'
    cam.style.width = '58px'
    cam.id = 'Cam3'
    cam.src = 'Assests/Cam3Button.png'
    MapDiv.append(cam)
    cam = document.createElement('img')
    cam.style.position = 'absolute'
    cam.style.left = '158px'
    cam.style.top = '110px'
    cam.style.width = '58px'
    cam.id = 'Cam5'
    cam.src = 'Assests/Cam5Button.png'
    MapDiv.append(cam)
    cam = document.createElement('img')
    cam.style.position = 'absolute'
    cam.style.left = '0px'
    cam.style.top = '343px'
    cam.style.width = '58px'
    cam.id = 'Cam15'
    cam.src = 'Assests/Cam15Button.png'
    MapDiv.append(cam)
    cam = document.createElement('img')
    cam.style.position = 'absolute'
    cam.style.left = '205px'
    cam.style.top = '190px'
    cam.style.width = '58px'
    cam.id = 'Cam6'
    cam.src = 'Assests/Cam6Button.png'
    MapDiv.append(cam)
    cam = document.createElement('img')
    cam.style.position = 'absolute'
    cam.style.left = '18px'
    cam.style.top = '0px'
    cam.style.width = '58px'
    cam.id = 'Cam11'
    cam.src = 'Assests/Cam11Button.png'
    MapDiv.append(cam)
    cam = document.createElement('img')
    cam.style.position = 'absolute'
    cam.style.left = '315px'
    cam.style.top = '0px'
    cam.style.width = '58px'
    cam.id = 'Cam14'
    cam.src = 'Assests/Cam14Button.png'
    MapDiv.append(cam)
    cam3 = document.getElementById('Cam3')
    cam5 = document.getElementById('Cam5')
    cam15 = document.getElementById('Cam15')
    cam6 = document.getElementById('Cam6')
    cam11 = document.getElementById('Cam11')
    cam14 = document.getElementById('Cam14')
    cam3.onclick = CamChange
    cam5.onclick = CamChange
    cam15.onclick = CamChange
    cam6.onclick = CamChange
    cam11.onclick = CamChange
    cam14.onclick = CamChange
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
    cam = document.createElement('img')
    cam.style.position = 'absolute'
    cam.style.left = '0px'
    cam.style.top = '0px'
    cam.style.width = '58px'
    cam.id = 'Cam13'
    cam.src = 'Assests/Cam13Button.png'
    MapDiv.append(cam)
    cam = document.createElement('img')
    cam.style.position = 'absolute'
    cam.style.left = '0px'
    cam.style.top = '0px'
    cam.style.width = '58px'
    cam.id = 'Cam4'
    cam.src = 'Assests/Cam4Button.png'
    MapDiv.append(cam)
    cam = document.createElement('img')
    cam.style.position = 'absolute'
    cam.style.left = '0px'
    cam.style.top = '0px'
    cam.style.width = '58px'
    cam.id = 'Cam10'
    cam.src = 'Assests/Cam10Button.png'
    MapDiv.append(cam)
    cam = document.createElement('img')
    cam.style.position = 'absolute'
    cam.style.left = '0px'
    cam.style.top = '0px'
    cam.style.width = '58px'
    cam.id = 'Cam12'
    cam.src = 'Assests/Cam12Button.png'
    MapDiv.append(cam)
    cam13 = document.getElementById('Cam13')
    cam4 = document.getElementById('Cam4')
    cam10 = document.getElementById('Cam10')
    cam12 = document.getElementById('Cam12')
    cam13.onclick = CamChange
    cam4.onclick = CamChange
    cam10.onclick = CamChange
    cam12.onclick = CamChange
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
    cam = document.createElement('img')
    cam.style.position = 'absolute'
    cam.style.left = '0px'
    cam.style.top = '0px'
    cam.style.width = '58px'
    cam.id = 'Cam1'
    cam.src = 'Assests/Cam1Button.png'
    MapDiv.append(cam)
    cam = document.createElement('img')
    cam.style.position = 'absolute'
    cam.style.left = '0px'
    cam.style.top = '0px'
    cam.style.width = '58px'
    cam.id = 'Cam2'
    cam.src = 'Assests/Cam2Button.png'
    MapDiv.append(cam)
    cam = document.createElement('img')
    cam.style.position = 'absolute'
    cam.style.left = '0px'
    cam.style.top = '0px'
    cam.style.width = '58px'
    cam.id = 'Cam7'
    cam.src = 'Assests/Cam7Button.png'
    MapDiv.append(cam)
    cam = document.createElement('img')
    cam.style.position = 'absolute'
    cam.style.left = '0px'
    cam.style.top = '0px'
    cam.style.width = '58px'
    cam.id = 'Cam8'
    cam.src = 'Assests/Cam8Button.png'
    MapDiv.append(cam)
    cam = document.createElement('img')
    cam.style.position = 'absolute'
    cam.style.left = '0px'
    cam.style.top = '0px'
    cam.style.width = '58px'
    cam.id = 'Cam9'
    cam.src = 'Assests/Cam9Button.png'
    MapDiv.append(cam)
    cam1 = document.getElementById('Cam1')
    cam2 = document.getElementById('Cam2')
    cam7 = document.getElementById('Cam7')
    cam8 = document.getElementById('Cam8')
    cam9 = document.getElementById('Cam9')
    cam1.onclick = CamChange
    cam2.onclick = CamChange
    cam7.onclick = CamChange
    cam8.onclick = CamChange
    cam9.onclick = CamChange
  }
}

//Pauses Game
function GamePause() {
  alert('work in progress and stop using inspect')
}

//Ends all Game engine functions
function GameEnd(condition) {
  Power = 1000
  for (let i = 0; i < Deletables.length; i++) {
    let temp = Deletables[i]
    temp.remove()
  }
  Deletables = []
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

//This is where all lever actvite is activated
function leverInfo(e) {
  if (e.target.src.includes('-1-')) {
    e.target.src = 'LeverDown.gif'
    setTimeout(() => {
      e.target.src = 'Frame-16-Lever-01.png'
      if (e.target.id.includes('ShockLever')) {
        ShockLight.hidden = true
      }
    }, 80)
  } else {
    e.target.src = 'LeverUp.gif'
    setTimeout(() => {
      e.target.src = 'Frame-1-Lever-01.png'
      if (e.target.id.includes('ShockLever')) {
        ShockLight.hidden = false
      }
    }, 80)
  }
}

//Changes Camera View
function CamChange(e) {
  if (Offices[Office].HasCameras) {
    CameraStatic.style.opacity = '100%'
    setTimeout(() => {
      CameraStatic.style.opacity = '50%'
    }, 100)
  }
}

//Controls the door lights
function DoorLight(e) {
  let i = Offices[Office]
  var t;
  if (i.HasDoors) {
    if (e.target.id.includes('Left') && !LeftDoor) {
      if (e.type == 'mousedown') {
        DoorLeft.src = 'Assests/LeftLight.png'
      } else {
        DoorLeft.src = 'Assests/LeftDoor.png'
      }
    } else if (!RightDoor) {
      if (e.type == 'mousedown') {
        DoorRigh.src = 'Assests/RightLight.png'
      } else {
        DoorRight.src = 'Assests/RightDoor.png'
      }
    }
  } else {
    if (e.target.id.includes('Left')) {
      if (e.type == 'mousedown') {
        LeftLight.hidden = false
      } else {
        LeftLight.hidden = true
      }
    } else {
      if (e.type == 'mousedown') {
        RightLight.hidden = false
      } else {
        RightLight.hidden = true
      }
    }
  }
}

//Function for trigger
function BasicFlipOut() {
  if (Offices[Office].HasCameras) {
    if (CameraView.hidden) {
      CameraView.hidden = false
      CameraStatic.hidden = false
      MapDiv.hidden = false
      Map.hidden = false
      Invis1.hidden = true
      Invis2.hidden = true
    } else if (!CameraView.hidden) {
      CameraView.hidden = true
      CameraStatic.hidden = true
      MapDiv.hidden = true
      Map.hidden = true
      Invis1.hidden = false
      Invis2.hidden = false
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
  if (direction.target.id == 'ivisObeject2') {
    movescreen = -10
  }
  if (direction.target.id == 'ivisObeject1') {
    CamSuitTrig.hidden = true
    movescreen = 10
  }
  checkScreen()
}
function checkScreen() {
  if (((theOffice.style.right.replace('px', '')) - '') >= 0 && movescreen > 0) {
    movescreen = 0
    theOffice.style.right = '0px'
    CreateContain.style.right = '0px'
  }
  if (((theOffice.style.right.replace('px', '')) - '') <= -2490 && movescreen < 0) {
    movescreen = 0
    theOffice.style.right = '-2490px'
    CreateContain.style.right = '-2490px'
    CamSuitTrig.hidden = false
  }
  LeftDoorDiv.style.left = (((LeftDoorDiv.style.left.replace('px', '')) - '') - movescreen) + 'px'
  RightDoorDiv.style.right = (((RightDoorDiv.style.right.replace('px', '')) - '') + movescreen) + 'px'
  theOffice.style.right = (((theOffice.style.right.replace('px', '')) - '') + movescreen) + 'px'
  CreateContain.style.right = (((CreateContain.style.right.replace('px', '')) - '') - movescreen) + 'px'
  if (movescreen != 0) {
    movementScreen = setTimeout(() => {
      checkScreen()
      AllTimers.pop()
    }, 1)
    AllTimers.push(movementScreen)
  }
};

Invis1.onmouseenter = TurnScreen
Invis2.onmouseenter = TurnScreen
//it ends at this point

//This opens and closes the doors
function ControlDoor(Door) {
  if (Door == 'left') {
    if (LeftDoor.hidden) {
      LeftDoor.hidden = false
      leftDoor = false
      PowerUsage -= 1
    } else {
      LeftDoor.hidden = true
      leftDoor = true
      PowerUsage += 1
    }
  }
  if (Door == 'right') {
    if (RightDoor.hidden) {
      RightDoor.hidden = false
      rightDoor = false
      PowerUsage -= 1
    } else {
      RightDoor.hidden = true
      rightDoor = true
      PowerUsage += 1
    }
  }
}