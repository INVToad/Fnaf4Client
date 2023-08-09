//Begins all Game engine functions
function GameStart() {
  MouseCollisions = []
  MouseCollisions.push('LookLeftTrigger', 'LookRightTrigger', 'DoorLeft', 'DoorRight', 'ScreenTrigger')
  Ingame = true
  AudioControl('Mechanised', 'Play')
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
  OfficeFlicker = setInterval(() => {
    let m = Math.floor(Math.random() * 25) + 1
    let o = OfficesRender.ScreenCover
    if (m <= 1 && o.Alpha != 0.7) {
      o.Alpha = 0.5
      setTimeout(() => {
        if (o.Alpha != 0.7) {
          o.Alpha = 0.2 + (Math.floor(Math.random() * 2) - 1) / 10
        }
      }, 20)
    }
  }, 100)
  AllTimers.push(OfficeFlicker)
  PowerUpdate('reset')
  OfficePowerDrain = setInterval(() => {
    if (Office == 'Office4') {
      let k = 1
      if (PowerOffices.Office1) {
        k += 1
        SendData('PowerOffice', 'Office1')
      }
      if (PowerOffices.Office2) {
        k += 1
        SendData('PowerOffice', 'Office2')
      }
      if (PowerOffices.Office3) {
        k += 1
        SendData('PowerOffice', 'Office3')
      }
      PowerChange -= PowerUsage * k
    } else {
      PowerChange -= PowerUsage
    }
    if (PowerUsage > 5) {
      if ((Math.floor(Math.random() * 20) + 1) <= 3) {
        let h = Math.floor(Math.random() * Functions.length)
        FunctionControls[Functions[h]].Active = false
        let o = OfficesRender[FunctionControls[Functions[h]].Connections]
        for (j in o) {
          if (o[j].Reverse == true)  {
            o[j].FreezeFrame = false
          }
        }
      }
    }
    if (Power <= 0) {
      PowerDown('Down')
    }
  }, 1000)
  OfficeDraining = setInterval(() => {
    Power = lerp(Power, PowerChange, 0.1)
  }, 100)
  AllTimers.push(OfficePowerDrain)
  AllTimers.push(OfficeDraining)
  socket.emit('NightSettings', NightShift)
  //reveals/Creates basic values for each office
  let i = Offices[Office]
  //The next part gives the offices their specifc values needed for their functions
  if (Office == 'Office1') {
    Reset = undefined
    ConnectedOffice = undefined
    FlickCodes = {Office2: [1, 4, 6, 7], Office3: [3, 6, 10, 1], Office4: [5, 3, 11, 4]}
    FlickCurrent = [false, false, false, false, false, false, false, false, false, false, false, false]
    OfficesRender.ConsoleObjects.ConsoleText.Colour = 'green'
    EnergyLevels = undefined
    MotherlyRage = undefined
    ConsoleWorking = false
    ConsoleActive = false
    DataReceived = true
    Office2ShockActive = true
    Office2FlashActive = true
    Office3DoorsActive = true
    Office3HeatActive = true
    BoxTime = 10
    BoxTimer = setInterval(() => {
      //BoxTime -= 1
      if (BoxTime <= 0) {
        GameEnd('Loss')
      }
    }, 7000)
    AllTimers.push(BoxTimer)
  }
  if (Office == 'Office2') {
    TimeSpotX = 830
    TimeSpotY = 555
    Office2VentSelected = 0
    Office2ShockActive = true
    Office2FlashActive = true
    StoppedShockReset = false
    StoppedFlashReset = false
    FunctionControls['Office2ShockActive'] = true
    FunctionControls['Office2FlashActive'] = true
    Functions.push('Office2ShockActive')
    Functions.push('Office2FlashActive')
    MothMove = setInterval(() => {
      MoveAnimatronic(MothAnamtronic)
    }, 10000)
    EyeMove = setInterval(() => {
      MoveAnimatronic(EyeScanAnamtronic)
    }, 15600)
    AllTimers.push(EyeMove)
    AllTimers.push(MothMove)
    MouseCollisionsValues.MapChangeButton.Effect.CameraMapChange = 'ShockMap'
    for (let i = 0; i < Images.length; i++) {
      if (Images[i].alt == OfficesRender.CameraObjects.MapChangeButton.UIN) {
        Images[i].src = 'Assests/ShockMapChange.png'
      }
    }
  }
  if (Office == 'Office3') {
    TimeSpotX = 928
    TimeSpotY = 570
    OfficesDoors = {Office2LeftDoor: false,
      Office2RightDoor: false,
      Office3LeftDoor: false,
      Office3RightDoor: false,
      Office4LeftDoor: false,
      Office4RightDoor: false}
    Office1Heat = 20
    OfficesRender.FanControll.Office1SwitchText.Text = '20˚C'
    let Office1heatTimer = setInterval(() => {
      if (Office1Fan) {
        Office1Heat -= 1
      }
      if (Math.floor(Math.random() * 30) <= 1) {
        Office1Heat += 1
        if (Office1Heat >= 50 || Office1Heat <= 10) {
          GameEnd('Loss')
        }
      }
      OfficesRender.FanControll.Office1SwitchText.Text = Office1Heat + '˚C'
    }, 1000)
    AllTimers.push(Office1heatTimer)
    Office1Fan = false
    Office2Heat = 20
    OfficesRender.FanControll.Office2SwitchText.Text = '20˚C'
    let Office2heatTimer = setInterval(() => {
      if (Office2Fan) {
        Office2Heat -= 1
      }
      if (Math.floor(Math.random() * 30) <= 1) {
        Office2Heat += 1
        if (Office2Heat >= 50 || Office2Heat <= 10) {
          GameEnd('Loss')
        }
      }
      OfficesRender.FanControll.Office2SwitchText.Text = Office2Heat + '˚C'
    }, 1000)
    AllTimers.push(Office2heatTimer)
    Office2Fan = false
    Office3Heat = 20
    OfficesRender.FanControll.Office3SwitchText.Text = '20˚C'
    let Office3heatTimer = setInterval(() => {
      if (Office3Fan) {
        Office3Heat -= 1
      }
      if (Math.floor(Math.random() * 30) <= 1) {
        Office3Heat += 1
        if (Office3Heat >= 50 || Office3Heat <= 10) {
          GameEnd('Loss')
        }
      }
      OfficesRender.FanControll.Office3SwitchText.Text = Office3Heat + '˚C'
    }, 1000)
    AllTimers.push(Office3heatTimer)
    Office3Fan = false
    Office4Heat = 20
    OfficesRender.FanControll.Office4SwitchText.Text = '20˚C'
    let Office4heatTimer = setInterval(() => {
      if (Office4Fan) {
        Office4Heat -= 1
      }
      if (Math.floor(Math.random() * 30) <= 1) {
        Office4Heat += 1
        if (Office4Heat >= 50 || Office4Heat <= 10) {
          GameEnd('Loss')
        }
      }
      OfficesRender.FanControll.Office4SwitchText.Text = Office4Heat + '˚C'
    }, 1000)
    AllTimers.push(Office4heatTimer)
    Office4Fan = false
    Functions.push('Office3HeatActive')
    Functions.push('Office3DoorsActive')
    FunctionControls['Office3HeatActive'] = {Active: true, Connections: 'FanControll'}
    FunctionControls['Office3DoorsActive'] = {Active: true, Connections: 'DoorControllObjects'}
    FunctionList['Heat'] = 'Office3HeatActive'
    FunctionList['Door'] = 'Office3DoorActive'
    FreeRoamMove = setInterval(() => {
      MoveAnimatronic(FreeRoamAnamtronic)
    }, 5600)
    AllTimers.push(FreeRoamMove)
    PowerDrainMove = setInterval(() => {
      MoveAnimatronic(PowerDrainAnamtronic)
    }, 7800)
    AllTimers.push(PowerDrainMove)
    ElectricianMove = setInterval(() => {
      if (ElectricianAnamtronic.EnergyLevels <= 0) {
        MoveAnimatronic(ElectricianAnamtronic)
      } else {
        ElectricianAnamtronic.EnergyLevels -= 1
      }
    }, 1000)
  }
  if (Office == 'Office4') {
    OfficesRender.ConsoleObjects.OfficePowerConsole.EndEffect = 'BigRedButtonPowerCheck'
    TimeSpotX = 960
    TimeSpotY = 568
    Power = 10000
    PowerChange = Power
    ConsoleActive = false
    ConsoleWorking = false
    Office1Power = 100
    Office2Power = 100
    Office3Power = 100
    Office4Power = 100
    PowerOffices = {Office1: false, Office2: false, Office3: false}
    DigitialCommandPrompt = false
    FunctionControls['Office4PowerCheck'] = {Active: true, Connections: 'PowerObjects'}
    FunctionList['Power'] = 'Office4PowerCheck'
    MouseCollisionsValues.MapChangeButton.Effect.CameraMapChange = 'PowerMap'
    for (let i = 0; i < Images.length; i++) {
      if (Images[i].alt == OfficesRender.CameraObjects.MapChangeButton.UIN) {
        Images[i].src = 'Assests/MaPChangePower.png'
      }
    }
  }
  CreateObjects('All')
}

function JunctionConnect() {
  for (i in FlickCodes) {
    let ConnectPossible = true
    for (let m = 0; m < FlickCodes[i].length; m++) {
      if (!FlickCurrent[FlickCodes[i][m] - 1]) {
        ConnectPossible = false
      }
    }
    for (let m = 1; m < 13; m++) {
      if (FlickCodes[i].indexOf[m] == -1 && FlickCurrent[m]) {
        ConnectPossible = false
      }
    }
    if (ConnectPossible) {
      if (ConsoleWorking && ConsoleActive) {
        ConnectedOffice = i
      }
      DisplayUpdate('OfficeConnect')
      break
    }
  }
}

//Controls Game Events
function EventControl() {
  
}

//Ends all Game engine functions
function GameEnd(condition) {
  Ingame = false
  Power = 1000
  TimerControl('Stop')
  CreateObjects('HomeScreen')
}

function TimerControl(e) {
  if (e == 'Stop') {
    for (let i = 0; i < AllTimers.length; i++) {
      clearInterval(AllTimers[i])
    }
    AllTimers = []
  }
}

//This will help control what audio plays and stops when
function AudioContoll(e) {
  if (!GameMute) {

  }
}

function DisplayUpdate(e) {
  if ((ConsoleActive || (e == 'StartUp' || e == 'PowerCheck')) && !ConsoleWorking) {
    OfficesRender.ConsoleObjects.ConsoleText.Prompt = e
    ConsoleWorking = true
    if (e == 'StartUp') {
      ConsoleActive = true
    }
    //DataReceived = false
    let Speed = 100
    if (Office == 'Office1') {
      Speed = 500
    }
    let k = Math.floor(Math.random()*200) + 1
    if (e == 'PowerCheck') {
      SendData('PowerCheck')
    } else if (e == 'ElectriacianEnergyLevel') {
      SendData('Energy_Check')
    }
    DigitialCommandPrompt = false
    OfficesRender.ConsoleObjects.ConsoleText.Lines = 0
    OfficesRender.ConsoleObjects.ConsoleText.Text = ComputerDialog[e]
    BarTimer = 0
    BarIncrease = 1
    if (Office == 'Office1') {
      BarIncrease = 3
      if (e == 'StartUp') {
        BarIncrease = 2
      }
    }
    let o = setInterval(() => {
      if ((OfficesRender.ConsoleObjects.ConsoleText.Text.split('|'))[OfficesRender.ConsoleObjects.ConsoleText.Lines] == 'RECEIVE DELAY' && !DataReceived) {

      } else if ((OfficesRender.ConsoleObjects.ConsoleText.Text.split('|'))[OfficesRender.ConsoleObjects.ConsoleText.Lines] == 'INPUT' && !InputSubmit) {
        console.log('e')
        DigitialCommandPrompt = true
      } else if ((OfficesRender.ConsoleObjects.ConsoleText.Text.split('|'))[OfficesRender.ConsoleObjects.ConsoleText.Lines - 1] != undefined && (OfficesRender.ConsoleObjects.ConsoleText.Text.split('|'))[OfficesRender.ConsoleObjects.ConsoleText.Lines - 1].includes('—')) {
        if (BarTimer >= BarIncrease) {
          BarTimer = 0
          OfficesRender.ConsoleObjects.ConsoleText.Text = OfficesRender.ConsoleObjects.ConsoleText.Text.replace('—', '▊')
        } else {
          BarTimer += 1
        }
      } else {
        if ((OfficesRender.ConsoleObjects.ConsoleText.Text.split('|'))[OfficesRender.ConsoleObjects.ConsoleText.Lines] == 'RECEIVE DELAY') {
          OfficesRender.ConsoleObjects.ConsoleText.Text = OfficesRender.ConsoleObjects.ConsoleText.Text.replace('|RECEIVE DELAY', '')
          if (e == 'ElectriacianEnergyLevel') {
            OfficesRender.ConsoleObjects.ConsoleText.Text = OfficesRender.ConsoleObjects.ConsoleText.Text.replace('undefined', EnergyLevels)
          } else if (e == 'PowerCheck') {
            OfficesRender.ConsoleObjects.ConsoleText.Text = OfficesRender.ConsoleObjects.ConsoleText.Text.replace('undefined1', Office1Power)
            OfficesRender.ConsoleObjects.ConsoleText.Text = OfficesRender.ConsoleObjects.ConsoleText.Text.replace('undefined2', Office2Power)
            OfficesRender.ConsoleObjects.ConsoleText.Text = OfficesRender.ConsoleObjects.ConsoleText.Text.replace('undefined3', Office3Power)
          } else if (e == 'MotherlyRage') {
            OfficesRender.ConsoleObjects.ConsoleText.Text = OfficesRender.ConsoleObjects.ConsoleText.Text.replace('undefined', MotherlyRage)
          }
        }
        if (OfficesRender.ConsoleObjects.ConsoleText.Text.includes('undefined')) {
          if (e == 'OfficeConnect') {
            OfficesRender.ConsoleObjects.ConsoleText.Text = OfficesRender.ConsoleObjects.ConsoleText.Text.replace('undefined', ConnectedOffice)
          } else if (e == 'OfficeFunctionCheck') {
            OfficesRender.ConsoleObjects.ConsoleText.Text = OfficesRender.ConsoleObjects.ConsoleText.Text.replace('undefined', OfficesFunctions[ConnectedOffice].join('| '))
          } else if (e == 'OfficeReset') {
            OfficesRender.ConsoleObjects.ConsoleText.Text = OfficesRender.ConsoleObjects.ConsoleText.Text.replace('undefined1', ConnectedOffice)
            OfficesRender.ConsoleObjects.ConsoleText.Text = OfficesRender.ConsoleObjects.ConsoleText.Text.replace('undefined2', Reset)
            OfficesRender.ConsoleObjects.ConsoleText.Text = OfficesRender.ConsoleObjects.ConsoleText.Text.replace('undefined3', ConnectedOffice)
            OfficesRender.ConsoleObjects.ConsoleText.Text = OfficesRender.ConsoleObjects.ConsoleText.Text.replace('undefined4', Reset)
          } else if (e == 'FinalRoom') {
            OfficesRender.ConsoleObjects.ConsoleText.Text = OfficesRender.ConsoleObjects.ConsoleText.Text.replace('undefined1', RoomInput.value)
            OfficesRender.ConsoleObjects.ConsoleText.Text = OfficesRender.ConsoleObjects.ConsoleText.Text.replace('undefined2', NightShift)
            OfficesRender.ConsoleObjects.ConsoleText.Text = OfficesRender.ConsoleObjects.ConsoleText.Text.replace('undefined3', RooomPassword)
            InputSubmit = true
            CommandSet = true
          }
        }
        if ((OfficesRender.ConsoleObjects.ConsoleText.Text.split('|'))[OfficesRender.ConsoleObjects.ConsoleText.Lines] != undefined && (OfficesRender.ConsoleObjects.ConsoleText.Text.split('|'))[OfficesRender.ConsoleObjects.ConsoleText.Lines].includes('Send: ')) {
          let p = (OfficesRender.ConsoleObjects.ConsoleText.Text.split('|'))[OfficesRender.ConsoleObjects.ConsoleText.Lines].split(': ')
          let k = p[1].split('/')
          SendData(k[0], k[1], k[2].replace('<', ''))
          BarIncrease = 4
          if (k[2] == 'All') {
            BarIncrease = 6
          }
        }
        if (OfficesRender.ConsoleObjects.ConsoleText.Text.split('|').length >= 16) {
          if (OfficesRender.ConsoleObjects.ConsoleText.Lines <= 17) {
            OfficesRender.ConsoleObjects.ConsoleText.Lines += 1
          } else {
            OfficesRender.ConsoleObjects.ConsoleText.Lines = 0
            let m = OfficesRender.ConsoleObjects.ConsoleText.Text.split('|')
            m.splice(0, 18)
            m = m.join('|')
            OfficesRender.ConsoleObjects.ConsoleText.Text = m
          }
        } else {
          if (k <= 1 && OfficesRender.ConsoleObjects.ConsoleText.Lines < OfficesRender.ConsoleObjects.ConsoleText.Text.split('|').length + 15) {
            if (OfficesRender.ConsoleObjects.ConsoleText.Lines <= 17) {
              OfficesRender.ConsoleObjects.ConsoleText.Lines += 1
            } else {
              OfficesRender.ConsoleObjects.ConsoleText.Lines = 0
              let m = OfficesRender.ConsoleObjects.ConsoleText.Text.split('|')
              m.splice(0, 17)
              m = m.join('|')
              OfficesRender.ConsoleObjects.ConsoleText.Text = m
            }
          } else if (OfficesRender.ConsoleObjects.ConsoleText.Lines < OfficesRender.ConsoleObjects.ConsoleText.Text.split('|').length) {
            OfficesRender.ConsoleObjects.ConsoleText.Lines += 1
          } else {
            if (k <= 1) {
              if (Office == 'Office4') {
                FunctionControls.Office4PowerCheck.Active = false
              }
              OfficesRender.ConsoleObjects.ConsoleText.Text = ''
              OfficesRender.ConsoleObjects.ConsoleText.Lines = 0
            }
            ConsoleWorking = false
            if (DigitialCommandPromptAllowed == true && (Office == 'Office1' || Objects[0].src.includes('TitleScreen')) && CommandSet) {
              DigitialCommandPrompt = true
              OfficesRender.ConsoleObjects.ConsoleText.Text += '||Command: <'
              OfficesRender.ConsoleObjects.ConsoleText.Lines += 2
            } else if (InputSubmit) {
              InputSubmit = false
              DisplayUpdate(OfficesRender.ConsoleObjects.ConsoleText.NextDialog)
            }
            if (Math.floor(Math.random()* 500)+1 <= 1) {
              DisplayUpdate('Threaten')
            } 
            clearInterval(o)
          }
        }
      }
    }, Math.floor(Math.random() * Speed) + 100)
  }
}

function EndFrameEffect(e, Object) { //Preforms an action when called, used with end animations
  if (e == 'LightLever') {
    OfficesRender.LightControl.Lever.FreezeFrame = true
    if (OfficesRender.LightControl.Lever.Reverse) {
      OfficesRender.LightControl.Lever.Reverse = false
      OfficesRender.LightControl.Light.Render = true;
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
    } else {
      PowerChange -= 100
      OfficesRender.LightControl.Lever.Reverse = true
      OfficesRender.LightControl.Light.Render = false;
    }
  } else if (e == 'ShockLever') {
    OfficesRender.ShockControl.Lever.FreezeFrame = true
    if (OfficesRender.ShockControl.Lever.Reverse) {
      OfficesRender.ShockControl.Lever.Reverse = false
    } else {
      PowerChange -= 100
      OfficesRender.ShockControl.Lever.Reverse = true;
    }
  } else if (e == 'DoorLever') {
    Object.FreezeFrame = true
    let k = Object.Name.split(',')
    if (Object.Name.includes('Office3')) {
      ControlDoor(k[1])
    } else {
      SendData('Door', Object.Name.split(','))
    }
    if (Object.Reverse) {
      Object.Reverse = false
      if (!Object.Name.includes('1')) {
        PowerUpdate(-1)
        OfficesDoors[k[0] + k[1] + ['Door']] = false
      }
    } else {
      Object.Reverse = true
      if (!Object.Name.includes('1')) {
        PowerUpdate(1)
        OfficesDoors[k[0] + k[1] + ['Door']] = true
      }
    }
  } else if (e == 'FanLever') {
    Object.FreezeFrame = true
    if (Object.Reverse) {
      Object.Reverse = false
      PowerUpdate(-1)
      if (Object.Name == 'Office1') {
        Office1Fan = false
      } else if (Object.Name == 'Office2') {
        Office2Fan = false
      } else if (Object.Name == 'Office3') {
        Office3Fan = false
      } else if (Object.Name == 'Office4') {
        Office4Fan = false
      }
    } else {
      Object.Reverse = true
      PowerUpdate(1)
      if (Object.Name == 'Office1') {
        Office1Fan = true
      } else if (Object.Name == 'Office2') {
        Office2Fan = true
      } else if (Object.Name == 'Office3') {
        Office3Fan = true
      } else if (Object.Name == 'Office4') {
        Office4Fan = true
      }
    }
  } else if (e == 'BigRedButtonPowerCheck') {
    if (Object.Reverse) {
      if (!ConsoleWorking && FunctionControls.Office4PowerCheck.Active) {
        DisplayUpdate('PowerCheck')
        PowerChange -= 50
      }
      Object.FreezeFrame = true
      Object.Reverse = false
    } else {
      Object.Reverse = true
    }
  } else if (e == 'BigRedButtonPower') {
    if (Object.Reverse) {
      if (!ConsoleWorking && Office == 'Office1') {
        DisplayUpdate('StartUp')
        PowerChange -= 50
      }
      Object.FreezeFrame = true
      Object.Reverse = false
    } else {
      Object.Reverse = true
    }
  } else if (e == 'PowerSwitch' && Powered) {
    if (Object.Reverse) {
      SendData('PowerDown', Object.Name, 'Down')
      Object.FreezeFrame = true
      Object.Reverse = false
    } else {
      SendData('PowerDown', Object.Name, 'Norway')
      Object.FreezeFrame = true
      Object.Reverse = true
    }
  } else if (e == 'FlickSwitch') {
    Object.FreezeFrame = true
    if (Object.Reverse) {
      Object.Reverse = false
      FlickCurrent[Object.Name - 1] = false
    } else {
      Object.Reverse = true
      FlickCurrent[Object.Name - 1] = true
      textshown = true
    }
  } else if (e == 'ConnectDial') {
    Object.FreezeFrame = true
    if (Object.Reverse) {
      JunctionConnect()
      Object.Reverse = false
    } else {
      if (ConnectedOffice != undefined) {
        DisplayUpdate('OfficeDisconnect')
        ConnectedOffice = undefined
      }
      Object.Reverse = true
    }
  } else if (e == 'Stop') {
    Object.FreezeFrame = true
    if (Object.Reverse) {
      Object.Reverse = false
    } else {
      Object.Reverse = true
      textshown = true
    }
  } else if (e == 'CreateLobby') {
    if (Object.Reverse) {
      Object.FreezeFrame = true
      if (DigitialCommandPrompt && OfficesRender.ConsoleObjects.ConsoleText.NextDialog == 'FinalRoom')  {
        OfficesRender.ConsoleObjects.ConsoleText.Font = '10px Arial'
        OfficesRender.ConsoleObjects.ConsoleText.width = 700
        CreateRoom()
        LobbyStuff('Joined')
      } else {
        Object.Reverse = false
      }
    } else {
      Object.Reverse = true
    }
  }
}
//Remove these
Office2VentSelected = 0
Office2ShockActive = true
Office2FlashActive = true
StoppedShockReset = false
StoppedFlashReset = false

//This is where all lever actvite is activated
function leverInfo(e, Value1) {
  if(e.includes('Ready')) {
    if (e == 'ShockReady') {
      if (Office2ShockActive) {
        OfficesRender.ShockControl.Lever.FreezeFrame = false
      } else {
        StoppedShockReset = true
      }
    } else if (e == 'LightReady') {
      if (Office2FlashActive) {
        OfficesRender.LightControl.Lever.FreezeFrame = false
      } else {
        StoppedFlashReset = true
      }
    }
  } else {
    if (e == 'ShockActivate' && Office2ShockActive) {
      OfficesRender.ShockControl.Lever.FreezeFrame = false
      setTimeout(() => {
        leverInfo('ShockReady')
      }, 12000)
    } else if (e == 'LightActivate' && Office2FlashActive && !OfficesRender.LightControl.Lever.Reverse) {
      OfficesRender.LightControl.Lever.FreezeFrame = false
      setTimeout(() => {
        leverInfo('LightReady')
      }, 10000)
    } else if (e == 'DoorActivate' && FunctionControls['Office3DoorsActive'].Active) {
      OfficesRender.DoorControllObjects[Value1.Switch].FreezeFrame = false
    } else if (e == 'FanActivate' && FunctionControls['Office3HeatActive'].Active) {
      OfficesRender.FanControll[Value1.Switch].FreezeFrame = false
    } else if (e == 'BigRedButtonPower') {
      OfficesRender.ConsoleObjects.OfficePowerConsole.FreezeFrame = false
    } else if (e == 'PowerSwitch') {
      OfficesRender.PowerObjects[Value1.Switch].FreezeFrame = false
    } else if (e == 'PowerDial') {
      OfficesRender.JunctionObjects.PowerDial.FreezeFrame = false
    } else if (e == 'Flick') {
      OfficesRender.JunctionObjects[Value1.Name].FreezeFrame = false
    } else if (e == 'CreateLobby') {
      OfficesRender.CreateLobby.FreezeFrame = false
    }
  }
}

//Changes Camera View
function CamChange(e) {
  if (Offices[Office].HasCameras) {
    //Animatronic1.hidden = true
    OfficesRender.CameraObjects.Static.Opacity = 1
    OfficesRender.CameraObjects.CameraView.Render = true
    OfficesRender.CameraObjects.Animatronic_2.Render = false
    OfficesRender.CameraObjects.Animatronic_3.Render = false
    let j = OfficesRender.CameraObjects.Animatronic_1
    j.Render = false
    currentcam = e
    AudioControl('ChangeCam', 'Play')
    for (let l = 0; l < Images.length; l++) {
      if (Images[l].alt == String(OfficesRender.CameraObjects.CameraView.UIN)) {
        Images[l].src = 'Assests/Cam' + e + 'View.png'
      }
    }
    OfficesRender.CameraObjects.CameraView.src = 'Assests/Cam' + e + 'View.png'
    if (RoomPlacement['Cam' + e].includes('MothAnamtronic')) {
      j.Render = true
      j.x = MothPresets['Cam' + e].Left
      j.y = MothPresets['Cam' + e].Top
      j.width = MothPresets['Cam' + e].Width
      j.height = MothPresets['Cam' + e].Height
      j.ScaleX = MothPresets['Cam' + e].ScaleX
      j.ScaleY = MothPresets['Cam' + e].ScaleY
      for (let g = 0; g < Images.length; g++) {
        if (Images[g].alt == j.UIN) {
          Images[g].src = MothPresets['Cam' + e].Source
        }
      }
      j = OfficesRender.CameraObjects.Animatronic_2
    }
    if (RoomPlacement['Cam' + e].includes('PowerDrainAnamtronic')) {
      j.Render = true
      j.x = RatPresets['Cam' + e].Left
      j.y = RatPresets['Cam' + e].Top
      j.width = RatPresets['Cam' + e].Width
      j.height = RatPresets['Cam' + e].Height
      j.ScaleX = RatPresets['Cam' + e].ScaleX
      j.ScaleY = RatPresets['Cam' + e].ScaleY
      for (let g = 0; g < Images.length; g++) {
        if (Images[g].alt == j.UIN) {
          Images[g].src = RatPresets['Cam' + e].Source
        }
      }
      if (j == OfficesRender.CameraObjects.Animatronic_2) {
        j = OfficesRender.CameraObjects.Animatronic_3
      } else {
        j = OfficesRender.CameraObjects.Animatronic_2
      }
    }
    if (RoomPlacement['Cam' + e].includes('FreeRoamAnamtronic')) {
      j.Render = true
      j.x = FoxPresets['Cam' + e].Left
      j.y = FoxPresets['Cam' + e].Top
      j.width = FoxPresets['Cam' + e].Width
      j.height = FoxPresets['Cam' + e].Height
      j.ScaleX = FoxPresets['Cam' + e].ScaleX
      j.ScaleY = FoxPresets['Cam' + e].ScaleY
      for (let g = 0; g < Images.length; g++) {
        if (Images[g].alt == j.UIN) {
          Images[g].src = FoxPresets['Cam' + e].Source
        }
      }
      if (j == OfficesRender.CameraObjects.Animatronic_2) {
        j = OfficesRender.CameraObjects.Animatronic_3
      } else {
        j = OfficesRender.CameraObjects.Animatronic_2
      }
    }
    if (RoomPlacement['Cam' + e].includes('ElectricianAnamtronic')) {
      j.Render = true
      j.x = CyberPresets['Cam' + e].Left
      j.y = CyberPresets['Cam' + e].Top
      j.width = CyberPresets['Cam' + e].Width
      j.height = CyberPresets['Cam' + e].Height
      j.ScaleX = CyberPresets['Cam' + e].ScaleX
      j.ScaleY = CyberPresets['Cam' + e].ScaleY
      for (let g = 0; g < Images.length; g++) {
        if (Images[g].alt == j.UIN) {
          Images[g].src = CyberPresets['Cam' + e].Source
        }
      }
      if (j == OfficesRender.CameraObjects.Animatronic_2) {
        j = OfficesRender.CameraObjects.Animatronic_3
      } else {
        j = OfficesRender.CameraObjects.Animatronic_2
      }
    }
    setTimeout(() => {
      OfficesRender.CameraObjects.Static.Opacity = 0.5
    }, 100)
  }
}

window.addEventListener('mousemove', (e) => {
  MouseInfo.x = e.clientX
  MouseInfo.y = e.clientY
  if (Ingame) {
    for (let y = 0; y < MouseCollisions.length; y++) {
      let BoxLeft = MouseCollisionsValues[MouseCollisions[y]].x
      let BoxTop = MouseCollisionsValues[MouseCollisions[y]].y
      let BoxWidth = MouseCollisionsValues[MouseCollisions[y]].width
      let BoxHeight = MouseCollisionsValues[MouseCollisions[y]].height
      if (MouseCollisionsValues[MouseCollisions[y]].Hitbox &&
        MouseInfo.x > BoxLeft && 
        MouseInfo.x < BoxLeft + BoxWidth &&
        MouseInfo.y > BoxTop &&
        MouseInfo.y < BoxTop + BoxHeight) {
          let Action = MouseCollisionsValues[MouseCollisions[y]]
          if (Action.Triggered != undefined && !Action.Triggered && (Powered || !MouseCollisions[y].includes('Screen'))) {
            Action.Triggered = true
            if (Action.Effect.OfficeMove != undefined) {
              TurnScreen(Action.Effect.OfficeMove)
            } else if (Action.Effect.FlipOut != undefined) {
              BasicFlipOut()
            }
          }
        } else if (MouseCollisionsValues[MouseCollisions[y]].Triggered != undefined) {
          MouseCollisionsValues[MouseCollisions[y]].Triggered = false
        }
    }
  }
})

window.onclick = MouseLocationTriggers

function MouseLocationTriggers() {
  if (Office == 'Office1' && OfficesRender.OfficeObjects.Office.x !=  0 && OfficesRender.Mask.Reverse) {
    if (OfficesRender.FlashLight.Render) {
      OfficesRender.FlashLight.Render = false
    } else {
      OfficesRender.FlashLight.Render = true
    }
  }
  for (let y = 0; y < MouseCollisions.length; y++) {
    let BoxLeft = MouseCollisionsValues[MouseCollisions[y]].x
    let BoxTop = MouseCollisionsValues[MouseCollisions[y]].y
    let BoxWidth = MouseCollisionsValues[MouseCollisions[y]].width
    let BoxHeight = MouseCollisionsValues[MouseCollisions[y]].height
    if(MouseCollisionsValues[MouseCollisions[y]].Hitbox &&
      MouseInfo.x > BoxLeft && 
      MouseInfo.x < BoxLeft + BoxWidth &&
      MouseInfo.y > BoxTop &&
      MouseInfo.y < BoxTop + BoxHeight && (Powered || MouseCollisions[y].includes('Door'))) {
        let Action = MouseCollisionsValues[MouseCollisions[y]]
        if (Action.Effect.CameraChange != undefined) {
          CamChange(Action.Effect.CameraChange)
        } else if (Action.Effect.LightDoor != undefined) {
          DoorLight(Action.Effect.LightDoor)
        } else if (Action.Effect.lever != undefined) {
          leverInfo(Action.Effect.lever, Action)
        } else if (Action.Effect.SelectVent) {
          VentSelect(Action.Effect.SelectVent)
        } else if (Action.Effect.CameraMapChange) {
          ChangeCameraMap(Action.Effect.CameraMapChange)
        } else if (Action.Effect.SelectShock) {
          ShockSelect(Action.Effect.SelectShock)
        } else if (Action.Effect.SelectPower) {
          PowerSelect(Action.Effect.SelectPower)
        } else if (Action.Effect.Lobby) {
          LobbyStuff(Action.Effect.Lobby)
        }
    }
  }
}

function LobbyStuff(e) {
  if (e == 'Find') {
    MouseCollisions = []
    ChatInput.style.left = '40px'
    ChatSubmitButton.style.left = '200px'
    for (let i = 0; i < Messages.length; i++) {
      let j = document.getElementById(Messages[i])
      j.style.left = '40px'
      j.style.color = 'white'
    }
    ChatSettings.Left = '40px'
    ChatSettings.Colour = 'white'
    MouseCollisions = []
    Objects = []
    Images = []
    Objects.push(OfficesRender.TitleScreen)
    OfficesRender.TitleScreen.x = OfficesRender.TitleScreen.Ox
    OfficesRender.TitleScreen.y = OfficesRender.TitleScreen.Oy
    for (let i = 0; i < Objects.length; i++) {
      let Img = new Image()
      Img.src = Objects[i].src
      Img.alt = Objects[i].UIN
      Images.push(Img)
    }
    for (let i = 0; i < Images.length; i++) {
      if (Images[i].alt == OfficesRender.TitleScreen.UIN) {
        Images[i].src = 'Assests/WaitingRoom.png'
      }
    }
    document.getElementById('chatInput').hidden = false
    document.getElementById('RoomRonnector').hidden = false
    document.getElementById('lobbies').hidden = false
    document.getElementById('refreshLobbiesButton').hidden = false
    document.getElementById('ChatBox').hidden = false
  } else if (e == 'Create') {
    for (let i = 0; i < Images.length; i++) {
      if (Images[i].alt == OfficesRender.TitleScreen.UIN) {
        Images[i].src = 'Assests/CreateLobbyScreen.png'
      }
    }
    Objects.push(OfficesRender.CreateLobby)
    OfficesRender.CreateLobby.x = OfficesRender.CreateLobby.Ox
    OfficesRender.CreateLobby.y = OfficesRender.CreateLobby.Oy
    let Img = new Image()
    Img.src = OfficesRender.CreateLobby.src
    Img.alt = OfficesRender.CreateLobby.UIN
    Images.push(Img)
    Objects.push(OfficesRender.ConsoleObjects.ConsoleText)
    OfficesRender.ConsoleObjects.ConsoleText.x = 90
    OfficesRender.ConsoleObjects.ConsoleText.y = 90
    OfficesRender.ConsoleObjects.ConsoleText.Font = '20px Arial'
    OfficesRender.ConsoleObjects.ConsoleText.width = 700
    ConsoleActive = true
    ConsoleWorking = false
    MouseCollisions = ['CreateLobbyButton']
    DigitialCommandPrompt = true
    DisplayUpdate('StartUpLobby')
  } else if ('Joined') {
    ChatInput.style.left = '40px'
    ChatSubmitButton.style.left = '200px'
    for (let i = 0; i < Messages.length; i++) {
      let j = document.getElementById(Messages[i])
      j.style.left = '40px'
      j.style.color = 'white'
    }
    ChatSettings.Left = '40px'
    ChatSettings.Colour = 'white'
    MouseCollisions = []
    Objects = []
    Images = []
    Objects.push(OfficesRender.TitleScreen)
    OfficesRender.TitleScreen.x = OfficesRender.TitleScreen.Ox
    OfficesRender.TitleScreen.y = OfficesRender.TitleScreen.Oy
    for (let i = 0; i < Objects.length; i++) {
      let Img = new Image()
      Img.src = Objects[i].src
      Img.alt = Objects[i].UIN
      Images.push(Img)
    }
    for (let i = 0; i < Images.length; i++) {
      if (Images[i].alt == OfficesRender.TitleScreen.UIN) {
        Images[i].src = 'Assests/WaitingRoom.png'
      }
    }
    document.getElementById('chatInput').hidden = false
  }
}

function PowerSelect(e) {
  if (PowerOffices[e]) {
    for (let i = 0; i < Images.length; i++) {
      if (Images[i].alt == OfficesRender.CameraObjects[e + 'PowerDirect'].UIN) {
        Images[i].src = 'Assests/NotPowered.png'
      }
    }
    PowerOffices[e] = false
  } else {
    for (let i = 0; i < Images.length; i++) {
      if (Images[i].alt == OfficesRender.CameraObjects[e + 'PowerDirect'].UIN) {
        Images[i].src = 'Assests/Powered.png'
      }
    }
    PowerOffices[e] = true
  }
}

function ChangeCameraMap(e) {
  if (e == 'ShockMap') {
    if (CamMap == 'Cam') {
      OfficesRender.CameraObjects.Map.Dy = 0
      OfficesRender.CameraObjects.Map.Dx = 0
      OfficesRender.CameraObjects.Map.width = 500
      OfficesRender.CameraObjects.Map.height = 500
      CamMap = 'Shock'
      OfficesRender.CameraObjects.Shock11.Render = true
      OfficesRender.CameraObjects.Shock9.Render = true
      MouseCollisionsValues.Shock11.Hitbox = true
      MouseCollisionsValues.Shock9.Hitbox = true
      for (let i = 0; i < Images.length; i++) {
        if (Images[i].alt == OfficesRender.CameraObjects.Map.UIN) {
          Images[i].src = 'Assests/ShockMap.png'
        }
      }
      for (o in MouseCollisions) {
        if (MouseCollisions[o].includes('Cam')) {
          MouseCollisionsValues[MouseCollisions[o]].Hitbox = false
        }
      }
    } else {
      OfficesRender.CameraObjects.Map.Dy = Offices[Office].My
      OfficesRender.CameraObjects.Map.Dx = Offices[Office].Mx
      OfficesRender.CameraObjects.Map.width = 440
      OfficesRender.CameraObjects.Map.height = 435
      CamMap = 'Cam'
      OfficesRender.CameraObjects.Shock11.Render = false
      OfficesRender.CameraObjects.Shock9.Render = false
      MouseCollisionsValues.Shock9.Hitbox = false
      MouseCollisionsValues.Shock11.Hitbox = false
      for (let i = 0; i < Images.length; i++) {
        if (Images[i].alt == OfficesRender.CameraObjects.Map.UIN) {
          Images[i].src = 'Assests/Map.png'
        }
      }
      for (o in MouseCollisions) {
        if (MouseCollisions[o].includes('Cam')) {
          MouseCollisionsValues[MouseCollisions[o]].Hitbox = true
        }
      }
    }
  } else if (e == 'PowerMap') {
    if (CamMap == 'Cam') {
      MouseCollisionsValues.Office1PowerDirectBox.Hitbox = true
      MouseCollisionsValues.Office2PowerDirectBox.Hitbox = true
      MouseCollisionsValues.Office3PowerDirectBox.Hitbox = true
      OfficesRender.CameraObjects.Office1PowerDirect.Render = true
      OfficesRender.CameraObjects.Office2PowerDirect.Render = true
      OfficesRender.CameraObjects.Office3PowerDirect.Render = true
      OfficesRender.CameraObjects.Map.Dy = 0
      OfficesRender.CameraObjects.Map.Dx = 0
      OfficesRender.CameraObjects.Map.width = 200
      OfficesRender.CameraObjects.Map.height = 211
      CamMap = 'Power'
      for (let i = 0; i < Images.length; i++) {
        if (Images[i].alt == OfficesRender.CameraObjects.Map.UIN) {
          Images[i].src = 'Assests/MapPowerDirect.png'
        }
      }
      for (o in MouseCollisions) {
        if (MouseCollisions[o].includes('Cam')) {
          MouseCollisionsValues[MouseCollisions[o]].Hitbox = false
        }
      }
    } else {
      MouseCollisionsValues.Office1PowerDirectBox.Hitbox = false
      MouseCollisionsValues.Office2PowerDirectBox.Hitbox = false
      MouseCollisionsValues.Office3PowerDirectBox.Hitbox = false
      OfficesRender.CameraObjects.Office1PowerDirect.Render = false
      OfficesRender.CameraObjects.Office2PowerDirect.Render = false
      OfficesRender.CameraObjects.Office3PowerDirect.Render = false
      OfficesRender.CameraObjects.Map.Dy = Offices[Office].My
      OfficesRender.CameraObjects.Map.Dx = Offices[Office].Mx
      OfficesRender.CameraObjects.Map.width = 440
      OfficesRender.CameraObjects.Map.height = 435
      CamMap = 'Cam'
      for (let i = 0; i < Images.length; i++) {
        if (Images[i].alt == OfficesRender.CameraObjects.Map.UIN) {
          Images[i].src = 'Assests/Map.png'
        }
      }
      for (o in MouseCollisions) {
        if (MouseCollisions[o].includes('Cam')) {
          MouseCollisionsValues[MouseCollisions[o]].Hitbox = true
        }
      }
    }
  }
}

//Controls the door lights
function DoorLight(e) {
  let i = Offices[Office];
  let l = OfficesRender.Doors.LeftDoor;
  let r = OfficesRender.Doors.RightDoor;
  let ri = undefined;
  let li = undefined;
  for (let i = 0; i < Images.length; i++) {
    if (String(l.UIN) == Images[i].alt) {
      li = Images[i]
    } else if (String(r.UIN) == Images[i].alt) {
      ri = Images[i]
    };
  };
  if (i.HasDoors) {
    if (e == 'reset') {
      li.src = 'Assests/LeftDoor.png'
      ri.src = 'Assests/RightDoor.png'
    } else if (e == 'Left' && !leftDoor) {
      if (!li.src.includes('DoorLight') && !ri.src.includes('DoorLight')) {
        if (OfficesRender.Doors.LeftAnimatronic.Show) {
          OfficesRender.Doors.LeftAnimatronic.Render = true
        }
        li.src = 'Assests/DoorLight.png'
        l.Dx = 150
        l.Render = true
        l.ScaleY = l.MaxScaleY
        l.height = 899
      } else {
        if (OfficesRender.Doors.LeftAnimatronic.Show) {
          OfficesRender.Doors.LeftAnimatronic.Render = false
        }
        li.src = 'Assests/LeftDoor.png'
        l.Dx = 0
        l.height = 0
        if(!leftDoor) {
          l.Render = false
          l.ScaleY = 0
        }
      }
    } else if (!rightDoor && e == 'Right') {
      if (!ri.src.includes('DoorLight') && !li.src.includes('DoorLight')) {
        if (OfficesRender.Doors.RightAnimatronic.Show) {
          OfficesRender.Doors.RightAnimatronic.Render = true
        }
        ri.src = 'Assests/DoorLight.png'
        r.Render = true
        r.Dx = 150
        r.ScaleY = r.MaxScaleY
        r.height = 899
      } else {
        if (OfficesRender.Doors.RightAnimatronic.Show) {
          OfficesRender.Doors.RightAnimatronic.Render = false
        }
        ri.src = 'Assests/RightDoor.png'
        r.Dx = 0
        r.height = 0
        if(!rightDoor) {
          r.Render = true
          r.ScaleY = 0
        }
      }
    }
  }
}

let CamMap = 'Cam'
//Function for trigger
function BasicFlipOut() {
  if (Offices[Office].HasCameras) {
    if (OfficesRender.CameraObjects.Static.Render) {
      AudioControl('MonitorDown', 'Play')
      AudioControl('Static', 'Pause')
      AudioControl('Mechanised', 'Play')
      PowerUpdate(-1)
      OfficesRender.CameraObjects.Static.Render = false
      OfficesRender.CameraObjects.CameraView.Render = false
      OfficesRender.CameraObjects.Map.Render = false
      MouseCollisionsValues.LookLeftTrigger.Hitbox = true
      OfficesRender.OfficeOverlaysObjects.LookLeft.Render = true
      OfficesRender.OfficeOverlaysObjects.LookRight.Render = true
      MouseCollisionsValues.LookRightTrigger.Hitbox = true
      MouseCollisionsValues.ShockLeverBox.Hitbox = true
      MouseCollisionsValues.MapChangeButton.Hitbox = false
      OfficesRender.CameraObjects.MapChangeButton.Render = false
      if (Office == 'Office3') {
        for (k in OfficesRender.DoorControllObjects) {
          OfficesRender.DoorControllObjects[k].Render = true
        }
        for (k in OfficesRender.FanControll) {
          OfficesRender.FanControll[k].Render = true
        }
        for (let i = 0; i < MouseCollisions.length; i++) {
          if ((MouseCollisions[i].includes("Door") || MouseCollisions[i].includes("Fan")) && MouseCollisions[i].includes("Box")) {
            MouseCollisionsValues[MouseCollisions[i]].Hitbox = true
          }
        }
      }
      if (Office == 'Office4') {
        for (k in OfficesRender.PowerObjects) {
          OfficesRender.PowerObjects[k].Render = true
        }
        for (let i = 0; i < MouseCollisions.length; i++) {
          if (MouseCollisions[i].includes("Power")) {
            MouseCollisionsValues[MouseCollisions[i]].Hitbox = true
          }
        }
        MouseCollisionsValues.Office1PowerDirectBox.Hitbox = false
        MouseCollisionsValues.Office2PowerDirectBox.Hitbox = false
        MouseCollisionsValues.Office3PowerDirectBox.Hitbox = false
      }
      for (let i = 0; i < MouseCollisions.length; i++) {
        if (MouseCollisions[i].includes('Light')) {
          MouseCollisionsValues[MouseCollisions[i]].Hitbox = true
        }
      }
      let j = OfficesRender.CameraObjects.Animatronic_1
      j.Render = false
      OfficesRender.CameraObjects.Animatronic_2.Render = false
      OfficesRender.CameraObjects.Animatronic_3.Render = false
      textshown = true
      if (CamMap == 'Cam') {
        for (let i = 0; i < Offices[Office].Cameras.length; i++) {
          MouseCollisionsValues[Offices[Office].Cameras[i]].Hitbox = false
        };
      } else if (CamMap == 'Shock') {
        OfficesRender.CameraObjects.Shock11.Render = false
        OfficesRender.CameraObjects.Shock9.Render = false
        MouseCollisionsValues.Shock9.Hitbox = false
        MouseCollisionsValues.Shock11.Hitbox = false
      } else if (CamMap == 'Power') {
        MouseCollisionsValues.Office1PowerDirectBox.Hitbox = false
        MouseCollisionsValues.Office2PowerDirectBox.Hitbox = false
        MouseCollisionsValues.Office3PowerDirectBox.Hitbox = false
        OfficesRender.CameraObjects.Office1PowerDirect.Render = false
        OfficesRender.CameraObjects.Office2PowerDirect.Render = false
        OfficesRender.CameraObjects.Office3PowerDirect.Render = false
      }
    } else if (!OfficesRender.CameraObjects.Static.Render) {
      AudioControl('MonitorUp', 'Play')
      AudioControl('Static', 'Play')
      AudioControl('Mechanised', 'Pause')
      OfficesRender.CameraObjects.Static.Render = true
      OfficesRender.CameraObjects.CameraView.Render = true
      OfficesRender.CameraObjects.Map.Render = true
      textshown = false
      MouseCollisionsValues.LookLeftTrigger.Hitbox = false
      OfficesRender.CameraObjects.Static.Opacity = 1
      MouseCollisionsValues.LookRightTrigger.Hitbox = false
      OfficesRender.OfficeOverlaysObjects.LookLeft.Render = false
      OfficesRender.OfficeOverlaysObjects.LookRight.Render = false
      MouseCollisionsValues.ShockLeverBox.Hitbox = false
      MouseCollisionsValues.MapChangeButton.Hitbox = true
      OfficesRender.CameraObjects.MapChangeButton.Render = true
      if (Office == 'Office3') {
        for (k in OfficesRender.DoorControllObjects) {
          OfficesRender.DoorControllObjects[k].Render = false
        }
        for (k in OfficesRender.FanControll) {
          OfficesRender.FanControll[k].Render = false
        }
        for (let i = 0; i < MouseCollisions.length; i++) {
          if ((MouseCollisions[i].includes("Door") || MouseCollisions[i].includes("Fan")) && MouseCollisions[i].includes("Box")) {
            MouseCollisionsValues[MouseCollisions[i]].Hitbox = false
          }
        }
      }
      if (Office == 'Office4') {
        for (k in OfficesRender.PowerObjects) {
            OfficesRender.PowerObjects[k].Render = false
        }
        for (let i = 0; i < MouseCollisions.length; i++) {
          if (MouseCollisions[i].includes("Power")) {
            MouseCollisionsValues[MouseCollisions[i]].Hitbox = false
          }
        }
      }
      for (let i = 0; i < MouseCollisions.length; i++) {
        if (MouseCollisions[i].includes('Light')) {
          MouseCollisionsValues[MouseCollisions[i]].Hitbox = false
        }
      }
      if (CamMap == 'Cam') {
        for (let i = 0; i < Offices[Office].Cameras.length; i++) {
          MouseCollisionsValues[Offices[Office].Cameras[i]].Hitbox = true
        };
      } else if (CamMap == 'Shock') {
        OfficesRender.CameraObjects.Shock11.Render = true
        OfficesRender.CameraObjects.Shock9.Render = true
        MouseCollisionsValues.Shock9.Hitbox = true
        MouseCollisionsValues.Shock11.Hitbox = true
      } else if (CamMap == 'Power') {
        MouseCollisionsValues.Office1PowerDirectBox.Hitbox = true
        MouseCollisionsValues.Office2PowerDirectBox.Hitbox = true
        MouseCollisionsValues.Office3PowerDirectBox.Hitbox = true
        OfficesRender.CameraObjects.Office1PowerDirect.Render = true
        OfficesRender.CameraObjects.Office2PowerDirect.Render = true
        OfficesRender.CameraObjects.Office3PowerDirect.Render = true
      }
      PowerUpdate(1)
    }
  } else if (Offices[Office].Suit) {
    OfficesRender.Mask.FreezeFrame = false
    if (OfficesRender.Mask.Reverse) {
      for (let o = 0; o < MouseCollisions.length; o++) {
        MouseCollisionsValues[MouseCollisions[o]].Hitbox = false
      }
      MouseCollisionsValues.LookLeftTrigger.Hitbox = true
      MouseCollisionsValues.LookRightTrigger.Hitbox = true
      MouseCollisionsValues.ScreenTrigger.Hitbox = true
      OfficesRender.FlashLight.Render = false
      textshown = false
    } else {
      for (let o = 0; o < MouseCollisions.length; o++) {
        MouseCollisionsValues[MouseCollisions[o]].Hitbox = true
      }
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
      let cam = undefined
      let precam = Animatronic.Room
      if (currentcam == Animatronic.Room) {
        cam = Animatronic.Room
      }
      //Will remove animatronic name from room placement list
      if ((Animatronic.Room == 'Left' || Animatronic.Room == 'Right') && Animatronic.Office == Office) {
        OfficesRender.Doors[Animatronic.Room + 'Animatronic'].Show = false
        OfficesRender.Doors[Animatronic.Room + 'Animatronic'].Render = false
      }
      let e = RoomPlacement['Cam' + Animatronic.Room].indexOf(Animatronic.Name)
      RoomPlacement['Cam' + Animatronic.Room].splice(e)
      if (Animatronic.Path[Animatronic.Room].length == undefined) {
        Animatronic.Room = Animatronic.Path[Animatronic.Room]
      } else if(Animatronic == MothAnamtronic) {
        if (Animatronic.Target == 0) {
          Animatronic.Target = Math.floor(Math.random() * 3)
        }
        Animatronic.Room = Animatronic.Path[Animatronic.Room][Animatronic.Target]
      } else if(Animatronic == ElectricianAnamtronic && (Animatronic.Room == 9 || Animatronic.Room == 8)) {
        Animatronic.Room = Animatronic.OriginRoom
        Animatronic.EnergyLevels = 100
      } else if (Animatronic == PowerDrainAnamtronic && Animatronic.Room == 20) {
        Power -= Animatronic.DrainAmount
      } else {
        let i = Math.floor(Math.random() * Animatronic.Path[Animatronic.Room].length)
        if (Animatronic == FreeRoamAnamtronic && (Animatronic.Room == 'Left' || Animatronic.Room == 'Right')) {
          if (OfficesDoors[Animatronic.Office + Animatronic.Room + 'Door'] == false) {
            Animatronic.Room = Animatronic.Path[Animatronic.Room][i]
          } else {
            Animatronic.Room = Animatronic.OriginRoom
          }
        } else {
          Animatronic.Room = Animatronic.Path[Animatronic.Room][i]
        }
      }
      // adds animatronic to room placement list
      if (RoomPlacement['Cam' + Animatronic.Room] == undefined) {
        Animatronic.Room = Animatronic.OriginRoom
        MoveAnimatronic(Animatronic)
      } else {
        if (OfficesRender.CameraObjects.CameraView.Render) {
          if (currentcam == Animatronic.Room) {
            CamChange(Animatronic.Room)
          }
          if (cam != undefined) {
            CamChange(cam)
          }
        }
        if (Animatronic.Room == 'Left' || Animatronic.Room == 'Right') {
          if (precam == 12 || precam == 13) {
            Animatronic.Office = 'Office3'
          } else if (precam == 15 || precam == 14) {
            Animatronic.Office = 'Office2'
          } if (precam == 1 || precam == 7) {
            Animatronic.Office = 'Office4'
          } if (precam == 21 || precam == 19) {
            Animatronic.Office = 'Office1'
          }
          if (Animatronic.Office == Office) {
            OfficesRender.Doors[Animatronic.Room + 'Animatronic'].Show = true
          }
        }
        if ((Animatronic.Room == 'Left' || Animatronic.Room == 'Right') && Animatronic.Office == Office && Animatronic != MothAnamtronic) {
          OfficesRender.Doors[Animatronic.Room + 'Animatronic'].Show = true
          OfficesRender.Doors[Animatronic.Room + 'Animatronic'].y = RoomPresets[Animatronic.Name][Animatronic.Room].Top
          OfficesRender.Doors[Animatronic.Room + 'Animatronic'].width = RoomPresets[Animatronic.Name][Animatronic.Room].Width
          OfficesRender.Doors[Animatronic.Room + 'Animatronic'].height = RoomPresets[Animatronic.Name][Animatronic.Room].Height
          OfficesRender.Doors[Animatronic.Room + 'Animatronic'].ScaleX = RoomPresets[Animatronic.Name][Animatronic.Room].ScaleX
          OfficesRender.Doors[Animatronic.Room + 'Animatronic'].ScaleY = RoomPresets[Animatronic.Name][Animatronic.Room].ScaleY
          for (let i = 0; i < Images.length; i++) {
            if (Images[i].alt == OfficesRender.Doors[Animatronic.Room + 'Animatronic'].UIN) {
              let p = RoomPresets[Animatronic.Name][Animatronic.Room].src
              if (Math.floor(Math.random() * 1000) + 1 <= 1) {
                p = RoomPresets[Animatronic.Name][Animatronic.Room].src.replace('.', 'Rare.')
              }
              Images[i].src = p
            }
          }
        }
        RoomPlacement['Cam' + Animatronic.Room].push(Animatronic.Name)
        if (Animatronic == MothAnamtronic) {
          SendData('moveAnimatronic', Animatronic, Animatronic.Room, MothAnamtronic.target)
        } else {
          SendData('moveAnimatronic', Animatronic, Animatronic.Room)
        }
      }
    }
  }
}
//Selects which room should be shocked
function ShockSelect(e) {
  if (e == 'Shock9') {
    Office2RoomSelected = 9
    for (let i = 0; i < Images.length; i++) {
      if (Images[i].alt == OfficesRender.CameraObjects.Shock9.UIN) {
        Images[i].src = 'Assests/Shock9Press.png'
      }
      if (Images[i].alt == OfficesRender.CameraObjects.Shock11.UIN) {
        Images[i].src = 'Assests/Shock11Button.png'
        
      }
    }
  }
  if (e == 'Shock11') {
    Office2RoomSelected = 11
    for (let i = 0; i < Images.length; i++) {
      if (Images[i].alt == OfficesRender.CameraObjects.Shock9.UIN) {
        Images[i].src = 'Assests/Shock9Button.png'
      }
      if (Images[i].alt == OfficesRender.CameraObjects.Shock11.UIN) {
        Images[i].src = 'Assests/Shock11Press.png'
        
      }
    }
  }
}
//Makes the power off work
function PowerDown(e) {
  if (e == 'Down') {
    OfficesRender.PowerBar.Render = false
    AudioControl('PowerOut', 'Play')
    OfficesRender.OfficeObjects.OfficeLight.Render = false
    OfficesRender.ScreenCover.Alpha = 0.7
    Powered = false
    for (g in FunctionControls) {
      FunctionControls[g] = false
    }
    if (Office == 'Office2') {
      OfficesRender.LightControl.Vent2.Render = false
      OfficesRender.LightControl.Vent3.Render = false
      OfficesRender.LightControl.Vent4.Render = false
      OfficesRender.LightControl.Light.Render = false
      MouseCollisionsValues.Vent2.Hitbox = false
      MouseCollisionsValues.Vent3.Hitbox = false
      MouseCollisionsValues.Vent4.Hitbox = false
    } else if (Office == 'Office3') {
      OfficesRender.FanControll.Office1SwitchText.Render = false
      OfficesRender.FanControll.Office2SwitchText.Render = false
      OfficesRender.FanControll.Office3SwitchText.Render = false
      OfficesRender.FanControll.Office4SwitchText.Render = false
      for (h in FunctionControls) {
        FunctionControls[h].Active = false
        let o = OfficesRender[FunctionControls[h].Connections]
        for (j in o) {
          if (o[j].Reverse == true)  {
            o[j].FreezeFrame = false
          }
        }
      }
    }
    if (Offices[Office].HasCameras && OfficesRender.CameraObjects.Static.Render) {
      BasicFlipOut()
    }
    if (MothAnamtronic.target == (Offices[Office].num - 1)) {
      let kj = Math.floor(Math.random() * 2000) + 5000
      if (MothCheck != null) {
        clearInterval(MothCheck)
      }
      MothCheck = setTimeout(() => {
        if (!OfficeOn && MothAnamtronic.target == (Offices[Office].num - 1)) {
          MothAnamtronic.target = 0
          MothAnamtronic.Room = MothAnamtronic.OriginRoom
        }
      }, kj)
    }
    PowerUsage = 0
  } else {
    OfficesRender.ScreenCover.Alpha = 0.2
    OfficesRender.PowerBar.Render = true
    OfficesRender.OfficeObjects.OfficeLight.Render = true
    Powered = true
    for (g in FunctionControls) {
      FunctionControls[g] = true
    }
    if (Office == 'Office2') {
      OfficesRender.LightControl.Vent2.Render = true
      OfficesRender.LightControl.Vent3.Render = true
      OfficesRender.LightControl.Vent4.Render = true
      OfficesRender.LightControl.Light.Render = true
      MouseCollisionsValues.Vent2.Hitbox = true
      MouseCollisionsValues.Vent3.Hitbox = true
      MouseCollisionsValues.Vent4.Hitbox = true
      if(StoppedShockReset) {
        StoppedShockReset = false
        leverInfo('Shock')
      }
      if (StoppedFlashReset) {
        StoppedFlashReset = false
        leverInfo('Flash')
      }
    }
    PowerUsage = 1
  }
}

//Selects which vent should be flashed
function VentSelect(e) {
  if (e == 'Vent2') {
    Office2VentSelected = 2
    for (let i = 0; i < Images.length; i++) {
      if (Images[i].alt == OfficesRender.LightControl.Vent2.UIN) {
        Images[i].src = 'Assests/Vent2Sellect-04.png'
      }
      if (Images[i].alt == OfficesRender.LightControl.Vent3.UIN) {
        Images[i].src = 'Assests/Vent3Button-04.png'
        
      }
      if (Images[i].alt == OfficesRender.LightControl.Vent4.UIN) {
        Images[i].src = 'Assests/Vent4Button-04.png'
        
      }
    }
  }
  if (e == 'Vent3') {
    Office2VentSelected = 3
    for (let i = 0; i < Images.length; i++) {
      if (Images[i].alt == OfficesRender.LightControl.Vent2.UIN) {
        Images[i].src = 'Assests/Vent2Button-04.png'
      }
      if (Images[i].alt == OfficesRender.LightControl.Vent3.UIN) {
        Images[i].src = 'Assests/Vent3Sellect-04.png'
        
      }
      if (Images[i].alt == OfficesRender.LightControl.Vent4.UIN) {
        Images[i].src = 'Assests/Vent4Button-04.png'
        
      }
    }
  }
  if (e == 'Vent4') {
    Office2VentSelected = 4
    for (let i = 0; i < Images.length; i++) {
      if (Images[i].alt == OfficesRender.LightControl.Vent2.UIN) {
        Images[i].src = 'Assests/Vent2Button-04.png'
      }
      if (Images[i].alt == OfficesRender.LightControl.Vent3.UIN) {
        Images[i].src = 'Assests/Vent3Button-04.png'
        
      }
      if (Images[i].alt == OfficesRender.LightControl.Vent4.UIN) {
        Images[i].src = 'Assests/Vent4Sellect-04.png'
        
      }
    }
  }
}

//Updates PowerUsage Bar
function PowerUpdate(num) {
  let p = OfficesRender.PowerBar;
  if (num != 'reset') {
    PowerUsage += num;
    p.height = (171 / 5) * PowerUsage
    p.ScaleY = (130 / 5) * PowerUsage
  } else {
    PowerUsage = 1;
    p.height = (171 / 5) * PowerUsage
    p.ScaleY = (130 / 5) * PowerUsage
  }
}

PowerUpdate('reset')

//The things below subject to change
var movescreen = 0
function TurnScreen(direction) {
  if (direction == 'Left' && OfficesRender.OfficeObjects.Office.x < OfficesRender.OfficeObjects.Office.MaxRight && movescreen != 10) {
    movescreen = 20
    if (Offices[Office].HasCameras) {
      MouseCollisionsValues.ScreenTrigger.Hitbox = false
      OfficesRender.OfficeOverlaysObjects.TriggerUp.Render = false
    }
  }
  if (direction == 'Right' && OfficesRender.OfficeObjects.Office.x > OfficesRender.OfficeObjects.Office.MaxLeft && movescreen != -10) {
    movescreen = -20
  }
  checkScreen()
}

var movementScreen = null
function checkScreen() {
  if (OfficesRender.OfficeObjects.Office.x > OfficesRender.OfficeObjects.Office.MaxRight && movescreen > 0) {
    movescreen = 0
    clearInterval(movementScreen)
    movementScreen = null
    let k = OfficesRender.OfficeObjects.Office.MaxRight - OfficesRender.OfficeObjects.Office.x
    for (let i = 0; i < Objects.length; i++) {
      if (!Objects[i].Class.includes('Fixed')) {
        if (Objects[i].Class.includes("ReverseMove")) {
          Objects[i].x += k
        } else {
          Objects[i].x += -k
        }
      }
    }
    for (let i = 0; i < MouseCollisions.length; i++) {
      if (MouseCollisionsValues[MouseCollisions[i]].Move) {
        MouseCollisionsValues[MouseCollisions[i]].x += -k
      }
    }
  }
  if (OfficesRender.OfficeObjects.Office.x < OfficesRender.OfficeObjects.Office.MaxLeft && movescreen < 0) {
    movescreen = 0
    clearInterval(movementScreen)
    movementScreen = null
    let k = OfficesRender.OfficeObjects.Office.MaxLeft - OfficesRender.OfficeObjects.Office.x
    for (let i = 0; i < Objects.length; i++) {
      if (!Objects[i].Class.includes('Fixed')) {
        if (Objects[i].Class.includes("ReverseMove")) {
          Objects[i].x += k
        } else {
          Objects[i].x += -k
        }
      }
    }
    for (let i = 0; i < MouseCollisions.length; i++) {
      if (MouseCollisionsValues[MouseCollisions[i]].Move) {
        MouseCollisionsValues[MouseCollisions[i]].x += -k
      }
    }
    if (Offices[Office].HasCameras) {
      MouseCollisionsValues.ScreenTrigger.Hitbox = true
      OfficesRender.OfficeOverlaysObjects.TriggerUp.Render = true
    }
    OfficesRender.FlashLight.Render = false
  }
  if (movescreen != 0 && movementScreen == null) {
    movementScreen = setInterval(() => {
      for (let i = 0; i < Objects.length; i++) {
        if (!Objects[i].Class.includes("Fixed")) {
          if (Objects[i].Class.includes("ReverseMove")) {
            Objects[i].x += movescreen
          } else {
            Objects[i].x -= movescreen
          }
        }
      }
      for (let i = 0; i < MouseCollisions.length; i++) {
        if (MouseCollisionsValues[MouseCollisions[i]].Move) {
          MouseCollisionsValues[MouseCollisions[i]].x += -movescreen
        }
      }
      checkScreen()
    }, 1)
    AllTimers.push(movementScreen)
  }
};
//it ends at this point

//This opens and closes the doors
function ControlDoor(Door) {
  if (Door == 'Left') {
    if (OfficesRender.Doors.LeftDoor.Render && !OfficesRender.Doors.RightDoor.Animating) {
      AudioControl('DoorSlam', 'Play')
      let DoorOpen = setInterval(() => {
        if (OfficesRender.Doors.LeftDoor.ScaleY > 0) {
          OfficesRender.Doors.LeftDoor.ScaleY -= 20
          OfficesRender.Doors.LeftDoor.height -= 28
        } else {
          OfficesRender.Doors.LeftDoor.Render = false
          OfficesRender.Doors.RightDoor.Animating = false
          clearInterval(DoorOpen)
        }
      }, 1)
      leftDoor = false
      if (Office == 'Office3') {
        PowerUpdate(-1)
      }
    } else if(!OfficesRender.Doors.RightDoor.Animating) {
      AudioControl('DoorSlam', 'Play')
      OfficesRender.Doors.LeftDoor.Render = true
      let DoorClose = setInterval(() => {
        if (OfficesRender.Doors.LeftDoor.ScaleY < OfficesRender.Doors.LeftDoor.MaxScaleY) {
          OfficesRender.Doors.LeftDoor.ScaleY += 20
          OfficesRender.Doors.LeftDoor.height += 28
        } else {
          OfficesRender.Doors.RightDoor.Animating = false
          clearInterval(DoorClose)
        }
      }, 1)
      leftDoor = true
      if (Office == 'Office3') {
        PowerUpdate(1)
      }
    }
    OfficesRender.Doors.RightDoor.Animating = true
  }
  if (Door == 'Right') {
    if (OfficesRender.Doors.RightDoor.Render && !OfficesRender.Doors.RightDoor.Animating) {
      AudioControl('DoorSlam', 'Play')
      let DoorOpen = setInterval(() => {
        if (OfficesRender.Doors.RightDoor.ScaleY > 0) {
          OfficesRender.Doors.RightDoor.ScaleY -= 20
          OfficesRender.Doors.RightDoor.height -= 28
        } else {
          OfficesRender.Doors.RightDoor.Render = false
          OfficesRender.Doors.RightDoor.Animating = false
          clearInterval(DoorOpen)
        }
      }, 1)
      rightDoor = false
      if (Office == 'Office3') {
        PowerUpdate(-1)
      }
    } else if (!OfficesRender.Doors.RightDoor.Animating) {
      AudioControl('DoorSlam', 'Play')
      OfficesRender.Doors.RightDoor.Render = true
      let DoorClose = setInterval(() => {
        if (OfficesRender.Doors.RightDoor.ScaleY < OfficesRender.Doors.RightDoor.MaxScaleY) {
          OfficesRender.Doors.RightDoor.ScaleY += 20
          OfficesRender.Doors.RightDoor.height += 28
        } else {
          clearInterval(DoorClose)
          OfficesRender.Doors.RightDoor.Animating = false
        }
      }, 1)
      rightDoor = true
      if (Office == 'Office3') {
        PowerUpdate(1)
      }
    }
    OfficesRender.Doors.RightDoor.Animating = true
  }
}