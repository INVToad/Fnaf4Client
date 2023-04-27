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
    let p = Math.round(Power/10)
    PowerPercent.firstChild.data = p + '%'
    PowerPercent.style.fontSize = '30px'
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
  LeftDoorTrigger.onclick = DoorLight
  RightDoorTrigger.onclick = DoorLight
  //reveals/Creates basic values for each office
  let i = Offices[Office]
  if (i.HasCameras) {
    currentcam = 'none'
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
    let img2 = document.createElement('img')
    img2.src = ''
    img2.style.position = 'absolute'
    img2.style.left = '0px'
    img2.style.top = '0px'
    img2.style.width = '0px'
    img2.hidden = true
    img2.id = 'Animatronic1'
    DivTrigger.prepend(img2)
    Deletables.push(img2)
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
    Animatronic1 = document.getElementById('Animatronic1')
    CamSuitTrig.onmouseenter = BasicFlipOut
  }
  if (i.HasDoors) {
    let img = document.createElement("img")
    img.src = 'Assests/LeftDoor.png'
    img.style.height = '647px'
    img.id = 'DOOR_L'
    img.style.position = 'absolute'
    img.hidden = true
    LeftDoorDiv.prepend(img)
    LeftDoor = document.getElementById('DOOR_L')
    Deletables.push(img)
    let img1 = document.createElement("img")
    img1.src = 'Assests/RightDoor.png'
    img1.style.height = '647px'
    img1.style.position = 'absolute'
    img1.id = 'DOOR_R'
    img1.hidden = true
    RightDoorDiv.prepend(img1)
    RightDoor = document.getElementById('DOOR_R')
    Deletables.push(img1)
  } else {
    let img = document.createElement("img")
    img.src = 'Assests/DoorLight.png'
    img.style.height = '647px'
    img.style.position = 'absolute'
    img.id = 'Light_L'
    img.hidden = true
    LeftDoorDiv.prepend(img)
    LeftLight = document.getElementById('Light_L')
    Deletables.push(img)
    let img1 = document.createElement("img")
    img1.src = 'Assests/DoorLight.png'
    img1.style.height = '647px'
    img1.style.position = 'absolute'
    img1.id = 'Light_R'
    img1.hidden = true
    RightDoorDiv.prepend(img1)
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
    Office2VentSelected = 0
    Office2ShockActive = true
    Office2FlashActive = true
    Functions.push(Office2ShockActive)
    Functions.push(Office2FlashActive)
    MothMove = setInterval(() => {
      MoveAnimatronic(MothAnamtronic)
    }, 10000)
    EyeMove = setInterval(() => {
      MoveAnimatronic(EyeScanAnamtronic)
    }, 15600)
    AllTimers.push(EyeMove)
    map.style.left = '-410px'
    map.style.top = '-405px'
    let setup = document.createElement('img')
    setup.src = 'Assests/Office2Setup.png'
    setup.style.position = 'absolute'
    setup.style.left = '10px'
    setup.style.width = '750px'
    setup.id = 'SetUp'
    CreateContain.append(setup)
    SetUp = document.getElementById('SetUp')
    Deletables.push(SetUp)
    Office2RoomSelected = 0
    let ShockButtons = document.createElement('img')
    ShockButtons.src = 'Assests/Shock2Button.png'
    ShockButtons.style.position = 'absolute'
    ShockButtons.style.top = '0px'
    ShockButtons.style.left = '0px'
    ShockButtons.style.width = '300px'
    ShockButtons.id = 'Shock2'
    CreateContain.append(ShockButtons)
    Shock2 = document.getElementById('Shock2')
    Shock2.onclick = ShockSelect
    Deletables.push(Shock2)
    ShockButtons = document.createElement('img')
    ShockButtons.src = 'Assests/Shock7Button.png'
    ShockButtons.style.position = 'absolute'
    ShockButtons.style.top = '0px'
    ShockButtons.style.left = '0px'
    ShockButtons.style.width = '300px'
    ShockButtons.id = 'Shock7'
    CreateContain.append(ShockButtons)
    Shock7 = document.getElementById('Shock7')
    Shock7.onclick = ShockSelect
    Deletables.push(Shock7)
    ShockButtons = document.createElement('img')
    ShockButtons.src = 'Assests/Shock9Button.png'
    ShockButtons.style.position = 'absolute'
    ShockButtons.style.top = '0px'
    ShockButtons.style.left = '0px'
    ShockButtons.style.width = '300px'
    ShockButtons.id = 'Shock9'
    CreateContain.append(ShockButtons)
    Shock9 = document.getElementById('Shock9')
    Shock9.onclick = ShockSelect
    Deletables.push(Shock9)
    ShockButtons = document.createElement('img')
    ShockButtons.src = 'Assests/Shock11Button.png'
    ShockButtons.style.position = 'absolute'
    ShockButtons.style.top = '0px'
    ShockButtons.style.left = '0px'
    ShockButtons.style.width = '300px'
    ShockButtons.id = 'Shock11'
    CreateContain.append(ShockButtons)
    Shock11 = document.getElementById('Shock11')
    Shock11.onclick = ShockSelect
    Deletables.push(Shock11)
    let ventbutton = document.createElement('img')
    ventbutton.src = 'Assests/Vent2Button-04.png'
    ventbutton.style.position = 'absolute'
    ventbutton.style.top = '570px'
    ventbutton.style.left = '195px'
    ventbutton.style.width = '40px'
    ventbutton.id = 'Vent2'
    CreateContain.append(ventbutton)
    Vent2 = document.getElementById('Vent2')
    Vent2.onclick = VentSelect
    Deletables.push(Vent2)
    ventbutton = document.createElement('img')
    ventbutton.src = 'Assests/Vent3Button-04.png'
    ventbutton.style.position = 'absolute'
    ventbutton.style.top = '566px'
    ventbutton.style.left = '110px'
    ventbutton.style.width = '40px'
    ventbutton.id = 'Vent3'
    CreateContain.append(ventbutton)
    Vent3 = document.getElementById('Vent3')
    Vent3.onclick = VentSelect
    Deletables.push(Vent3)
    ventbutton = document.createElement('img')
    ventbutton.src = 'Assests/Vent4Button-04.png'
    ventbutton.style.position = 'absolute'
    ventbutton.style.top = '465px'
    ventbutton.style.left = '87px'
    ventbutton.style.width = '40px'
    ventbutton.id = 'Vent4'
    CreateContain.append(ventbutton)
    Vent4 = document.getElementById('Vent4')
    Vent4.onclick = VentSelect
    Deletables.push(Vent4)
    //Might move power images in the order of creation
    let context = document.createTextNode('100%')
    let Text = document.createElement('p')
    Text.append(context)
    Text.style.position = 'absolute'
    Text.style.top = '385px'
    Text.style.left = '460px'
    Text.style.color = 'white'
    Text.id = 'PowerPercent'
    CreateContain.append(Text)
    PowerPercent = document.getElementById('PowerPercent')
    PowerPercent.style.fontsize = '30px'
    Deletables.push(PowerPercent)
    context = document.createTextNode('12:00')
    Text = document.createElement('p')
    Text.append(context)
    Text.style.position = 'absolute'
    Text.style.top = '350px'
    Text.style.left = '600px'
    Text.style.color = 'white'
    Text.id = 'Time'
    CreateContain.append(Text)
    Time = document.getElementById('Time')
    Deletables.push(Time)
    let PowerContain = document.createElement('div')
    PowerContain.style.position = 'absolute'
    PowerContain.style.left = '59px'
    PowerContain.style.top = '45px'
    PowerContain.style.width = '17px'
    PowerContain.style.height = '24px'
    PowerContain.style.overflow = 'hidden'
    PowerContain.id = 'PowerContain'
    CreateContain.append(PowerContain)
    Powercontain = document.getElementById('PowerContain')
    Deletables.push(PowerContain)
    let Powerbor = document.createElement('img')
    Powerbor.style.position = 'absolute'
    Powerbor.style.width = '17px'
    Powerbor.style.top = '0px'
    Powerbor.style.left = '0px'
    Powerbor.src = 'Assests/PowerBar-03.png'
    Powerbor.id = 'PowerBar'
    Powercontain.append(Powerbor)
    PowerBar = document.getElementById('PowerBar')
    let Lever = document.createElement('img')
    Lever.src = 'Assests/Frame-1-Lever-01.png'
    Lever.style.position = 'absolute'
    Lever.style.left = '300px'
    Lever.style.top = '450px'
    Lever.style.width = '80px'
    Lever.id = 'LightLever'
    CreateContain.append(Lever)
    LightLever = document.getElementById('LightLever')
    LightLever.onclick = leverInfo
    Deletables.push(LightLever)
    Lever = document.createElement('img')
    Lever.src = 'Assests/Frame-1-Lever-01.png'
    Lever.style.position = 'absolute'
    Lever.style.left = '615px'
    Lever.style.top = '450px'
    Lever.style.width = '80px'
    Lever.id = 'ShockLever'
    CreateContain.append(Lever)
    ShockLever = document.getElementById('ShockLever')
    ShockLever.onclick = leverInfo
    Deletables.push(ShockLever)
    let Light = document.createElement('img')
    Light.src = 'Assests/LightOn-02.png'
    Light.style.position = 'absolute'
    Light.style.left = '398px'
    Light.style.top = '503px'
    Light.style.width = '40px'
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
  if(e == 'Shock' || e == 'Light') {
    if (e == 'Shock') {
      ShockLever.src = 'Assests/LeverUp.gif'
      setTimeout(() => {
        ShockLever.src = 'Assests/Frame-1-Lever-01.png'
        if (ElectricianAnamtronic.Room == Office2RoomSelected) {
          PlaceAnimatronic(ElectricianAnamtronic, ElectricianAnamtronic.OriginRoom)
          SendData('moveAnimatronic', ElectricianAnamtronic, ElectricianAnamtronic.OriginRoom)
        }
      }, 780)
    } else {
      LightLever.src = 'Assests/LeverUp.gif'
      setTimeout(() => {
        if (EyeScanAnamtronic.Room.includes(Office2VentSelected)) {
          if (EyeScanAnamtronic.Stage = 1) {
            EyeScanAnamtronic.LightAmount += 2
          } else if (EyeScanAnamtronic.Stage = 2) {
            EyeScanAnamtronic.LightAmount += 1
          } 
          if (EyeScaneAnamtronc.LightLimitor != 0 && EyeScaneAnamtronc.LightAmount >= EyeScaneAnamtronc.LightLimitor) {
            GameEnd('Loss')
          }
          EyeScanAnamtronic.Room = 'middle'
        }
        LightLever.src = 'Assests/Frame-1-Lever-01.png'
        ShockLight.hidden = false
      }, 780)
    }
  } else {
    e.target.src = 'Assests/LeverDown.gif'
    setTimeout(() => {
      e.target.src = 'Assests/Frame-16-Lever-01.png'
      if (e.target.id.includes('LightLever')) {
        ShockLight.hidden = true
        setTimeout(() => {
          leverInfo('Light')
        }, 10000)
      } else {
        setTimeout(() => {
          leverInfo('Shock')
        }, 12000)
      }
    }, 780)
  }
}

//Changes Camera View
function CamChange(e) {
  if (Offices[Office].HasCameras) {
    Animatronic1.hidden = true
    CameraStatic.style.opacity = '100%'
    let p;
    if (e.target.src.includes('1')) {
      p = 1
    } else if (e.target.src.includes('2')) {
      p = 2
    } else if (e.target.src.includes('3')) {
      p = 3
    } else if (e.target.src.includes('4')) {
      p = 4
    } else if (e.target.src.includes('5')) {
      p = 5
    } else if (e.target.src.includes('6')) {
      p = 6
    } else if (e.target.src.includes('7')) {
      p = 7
    } else if (e.target.src.includes('8')) {
      p = 8
    } else if (e.target.src.includes('9')) {
      p = 9
    }
    if (e.target.src.includes('10')) {
      p = 10
    } else if (e.target.src.includes('11')) {
      p = 11
    } else if (e.target.src.includes('12')) {
      p = 12
    } else if (e.target.src.includes('13')) {
      p = 13
    } else if (e.target.src.includes('14')) {
      p = 14
    } else if (e.target.src.includes('15')) {
      p = 15
    }
    currentcam = p
    CameraView.src = 'Assests/Cam' + p + 'View.png'
    if (RoomPlacement['Cam' + p].includes('MothAnamtronic')) {
      Animatronic1.hidden = false
      Animatronic1.src = MothPresets['Cam' + p].Source
      Animatronic1.style.left = MothPresets['Cam' + p].Left
      Animatronic1.style.top = MothPresets['Cam' + p].Top
      Animatronic1.style.width = MothPresets['Cam' + p].Width
    }
    setTimeout(() => {
      CameraStatic.style.opacity = '50%'
    }, 100)
  }
}

//Controls the door lights
function DoorLight(e) {
  let i = Offices[Office]
  if (i.HasDoors) {
    if (e.target.id.includes('Left') && !leftDoor) {
      if (!LeftDoor.src.includes('DoorLight') && !RightDoor.src.includes('DoorLight')) {
        LeftDoor.src = 'Assests/DoorLight.png'
        LeftDoor.style.left = '-100px'
        LeftDoor.hidden = false
      } else {
        LeftDoor.src = 'Assests/LeftDoor.png'
        LeftDoor.style.left = '0px'
        if(!leftDoor) {
          LeftDoor.hidden = true
        }
      }
    } else if (!rightDoor) {
      if (!RightDoor.src.includes('DoorLight') && !LeftDoor.src.includes('DoorLight')) {
        RightDoor.src = 'Assests/DoorLight.png'
        RightDoor.style.right = '-110px'
        RightDoor.hidden = false
      } else {
        RightDoor.src = 'Assests/RightDoor.png'
        RightDoor.style.right = '0px'
        if(!rightDoor) {
          RightDoor.hidden = true
        }
      }
    }
  } else {
    if (e.target.id.includes('Left')) {
      if (LeftLight.hidden) {
        LeftLight.hidden = false
      } else {
        LeftLight.hidden = true
      }
    } else {
      if (RightLight.hidden) {
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
      PowerUpdate(1)
      CameraView.hidden = false
      CameraStatic.hidden = false
      MapDiv.hidden = false
      map.hidden = false
      Invis1.hidden = true
      Invis2.hidden = true
      if (RoomPlacement['Cam' + currentcam].includes('MothAnamtronic') && currentcam != 'none') {
        Animatronic1.hidden = false
        Animatronic1.src = MothPresets['Cam' + currentcam].Source
        Animatronic1.style.left = MothPresets['Cam' + currentcam].Left
        Animatronic1.style.top = MothPresets['Cam' + currentcam].Top
        Animatronic1.style.width = MothPresets['Cam' + currentcam].Width
      }
    } else if (!CameraView.hidden) {
      CameraView.hidden = true
      CameraStatic.hidden = true
      Animatronic1.hidden = true
      MapDiv.hidden = true
      map.hidden = true
      Invis1.hidden = false
      Invis2.hidden = false
      PowerUpdate(-1)
    }
  }
}
//For telling other offices where things move to
function PlaceAnimatronic(Animatronic, Room) {
  let e = RoomPlacement['Cam' + Animatronic.Room].indexOf(Animatronic.Name)
  RoomPlacement['Cam' + Animatronic.Room].splice(e)
  Animatronic.Room = Room
  RoomPlacement['Cam' + Animatronic.Room].push(Animatronic.Name)
}

//Will move the corresponding animatronic
function MoveAnimatronic(Animatronic) {
  let Ran = Math.floor(Math.random() * 20) + 1
  if (Ran <= Animatronic.AILevel) {
    if (Animatronic == EyeScanAnamtronic) {
      if (Animatronic.Room == 'middle') {
        let rando = Math.floor(Math.random() * 4) + 1
        Animatronic.Room = 'Office' + rando
        Animatronic.Stage += 1
      } else  if (Animatronic.Stage <= 3) {
        Animatronic.Stage += 1
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
    } else if (Animatronic.Room in Animatronic.Path) {
      //Will remove animatronic name from room placement list
      let e = RoomPlacement['Cam' + Animatronic.Room].indexOf(Animatronic.Name)
      RoomPlacement['Cam' + Animatronic.Room].splice(e)
      if (Animatronic.Path[Animatronic.Room].length == undefined) {
        Animatronic.Room = Animatronic.Path[Animatronic.Room]
      } else if(Animatronic == MothAnamtronic) {
        if (Animatronic.Target == 0) {
          Animatronic.Target = Math.floor(Math.random() * 3)
        }
        Animatronic.Room = Animatronic.Path[Animatronic.Room][Animatronic.Target]
      } else if(Animatronic == ElectricianAnamtronic && Animatronic.Room == 20) {
        Animatronic.Room = 9
        Animatronic.EnergyLevels = 100
      } else {
        let i = Math.floor(Math.random() * Animatronic.Path[Animatronic.Room].length)
        Animatronic.Room = Animatronic.Path[Animatronic.Room][i]
      }
      // adds animatronic to room placement list
      if (Animatronic.Room == undefined) {
        Animatronic.Room = Animatronic.OriginRoom
        MoveAnimatronic(Animatronic)
      } else {
        RoomPlacement['Cam' + Animatronic.Room].push(Animatronic.Name)
        SendData('moveAnimatronic', Animatronic, Animatronic.Room)
      }
    }
  }
}
//Selects which room should be shocked
function ShockSelect(e) {
  if (e.target.src.includes('Shock2')) {
    Office2RoomSelected = 2
    e.target.src = 'Assests/Shock2Press.png'
    Shock7.src = 'Assests/Shock7Button.png'
    Shock9.src = 'Assests/Shock9Button.png'
    Shock11.src = 'Assests/Shock11Button.png'
  }
  if (e.target.src.includes('Shock7')) {
    Office2RoomSelected = 7
    e.target.src = 'Assests/Shock7Press.png'
    Shock2.src = 'Assests/Shock2Button.png'
    Shock9.src = 'Assests/Shock9Button.png'
    Shock11.src = 'Assests/Shock11Button.png'
  }
  if (e.target.src.includes('Shock9')) {
    Office2RoomSelected = 9
    e.target.src = 'Assests/Shock9Press.png'
    Shock2.src = 'Assests/Shock2Button.png'
    Shock7.src = 'Assests/Shock7Button.png'
    Shock11.src = 'Assests/Shock11Button.png'
  }
  if (e.target.src.includes('Shock11')) {
    Office2RoomSelected = 11
    e.target.src = 'Assests/Shock11Press.png'
    Shock2.src = 'Assests/Shock2Button.png'
    Shock7.src = 'Assests/Shock7Button.png'
    Shock9.src = 'Assests/Shock9Button.png'
  }
}

//Selects which vent should be flashed
function VentSelect(e) {
  if (e.target.src.includes('Vent2')) {
    Office2VentSelected = 2
    e.target.src = 'Assests/Vent2Sellect-04.png'
    Vent3.src = 'Assests/Vent3Button-04.png'
    Vent4.src = 'Assests/Vent4Button-04.png'
  }
  if (e.target.src.includes('Vent3')) {
    Office2VentSelected = 3
    e.target.src = 'Assests/Vent3Sellect-04.png'
    Vent2.src = 'Assests/Vent2Button-04.png'
    Vent4.src = 'Assests/Vent4Button-04.png'
  }
  if (e.target.src.includes('Vent4')) {
    Office2VentSelected = 4
    e.target.src = 'Assests/Vent4Sellect-04.png'
    Vent2.src = 'Assests/Vent2Button-04.png'
    Vent3.src = 'Assests/Vent3Button-04.png'
  }
}

//Updates PowerUsage Bar
function PowerUpdate(num) {
  let e = 24 * num
  PowerUsage += num
  Powercontain.style.height = (((Powercontain.style.height.replace('px', '')) - '') + e) + 'px'
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
  }
  if (((theOffice.style.right.replace('px', '')) - '') <= -2490 && movescreen < 0) {
    movescreen = 0
    theOffice.style.right = '-2490px'
    CamSuitTrig.hidden = false
  }
  LeftDoorDiv.style.left = (((LeftDoorDiv.style.left.replace('px', '')) - '') - movescreen) + 'px'
  RightDoorDiv.style.right = (((RightDoorDiv.style.right.replace('px', '')) - '') + movescreen) + 'px'
  theOffice.style.right = (((theOffice.style.right.replace('px', '')) - '') + movescreen) + 'px'
  CreateContain.style.right = (((CreateContain.style.right.replace('px', '')) - '') + movescreen) + 'px'
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
      PowerUpdate(-1)
    } else {
      LeftDoor.hidden = true
      leftDoor = true
      PowerUpdate(1)
    }
  }
  if (Door == 'right') {
    if (RightDoor.hidden) {
      RightDoor.hidden = false
      rightDoor = false
      PowerUpdate(-1)
    } else {
      RightDoor.hidden = true
      rightDoor = true
      PowerUpdate(1)
    }
  }
}