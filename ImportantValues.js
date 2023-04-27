//The Main values that change a lot
var GameMute = true
var Office = null
var InGame = false
var IsHost = false
var ShiftTime = 0
var Power = 1000
var OfficeOn = true
var PowerUsage = 1
var MothCheck = null
var ActiveAnimatronics = []
var leftDoor = false
var rightDoor = false
var AllTimers = []
var NightShift = 1
var Functions = [] //Lists all the office abilities
var Deletables = [] //List for when the game ends so images cna be removed.

//Changes what clicking the map camera buttons does
const OpenFunction = {
  Cameras: false,
  Doors: false,
  Heat: false,
  Light: false,
  Shock: false
}

//Allows quick check if animtronic is in a certain room
const RoomPlacement = {
  Cam1: [],
  Cam2: [],
  Cam3: [],
  Cam4: ['PowerDrainAnamtronic'],
  Cam5: [],
  Cam6: ['MothAnamtronic'],
  Cam7: [],
  Cam8: [],
  Cam9: [],
  Cam10: ['FreeRoamAnamtronic', 'ElectricianAnamtronic'],
  Cam11: [],
  Cam12: [],
  Cam13: [],
  Cam14: [],
  Cam15: [],
  Cam16: [],
  Cam17: [],
  Cam18: [],
  Cam19: [],
  Cam20: [],
  CamOffice: [] //Don't ask
}

//Lists offices for easier load time
const Offices = {
  Office1: {
    HasCameras: false,
    HasDoors: false,
    Suit: true,
    BoxAnimatronic: true,
    SystemReset: true,
    DoorControl: false,
    PowerControl: false,
    HeatControl: false,
    LightControl: false,
    ShockControl: false,
    Cameras: [],
    num: 1
  },
  Office2: {
    HasCameras: true,
    HasDoors: true,
    Suit: false,
    BoxAnimatronic: false,
    SystemReset: false,
    DoorControl: false,
    PowerControl: false,
    HeatControl: false,
    LightControl: true,
    ShockControl: true,
    Cameras: [15, 3, 5, 6, 11, 14],
    num: 2
  },
  Office3: {
    HasCameras: true,
    HasDoors: true,
    Suit: false,
    BoxAnimatronic: false,
    SystemReset: false,
    DoorControl: true,
    PowerControl: false,
    HeatControl: true,
    LightControl: false,
    ShockControl: false,
    Cameras: [13, 4, 10, 12],
    num: 3
  },
  Office4: {
    HasCameras: true,
    HasDoors: true,
    Suit: false,
    BoxAnimatronic: false,
    SystemReset: false,
    DoorControl: false,
    PowerControl: true,
    HeatControl: false,
    LightControl: false,
    ShockControl: false,
    Cameras: [1, 2, 8, 9, 7],
    num: 4
  }
}

//This controls the animatronics paths and other values specilized for them
const PowerDrainAnamtronic = {
  OriginRoom: 4,
  AILevel: 0,
  Room: 4,
  Path: {
    4: 10,
    10: 2,
    2: [8, 9]
  },
  Name: 'PowerDrainAnamtronic'
}
const ElectricianAnamtronic = {
  OriginRoom: 10,
  AILevel: 0,
  Room: 10,
  DrainAmount: 1,
  Path: {
    10: [11, 2],
    11: [17, 18],
    2: [9, 17],
    9: 7,
    7: 21,
    21: 17,
    17: 20,
    18: 20
  },
  EnergyLevels: 100,
  Name: 'ElectricianAnamtronic'
}
const FreeRoamAnamtronic = {
  OriginRoom: 10,
  AILevel: 0,
  Room: 10,
  Path: {
    10: [12, 11, 2],
    12: ['Office', 1],
    2: [8, 9, 17],
    11: [3, 5],
    3: 15,
    5: 15,
    15: ['Office', 13],
    13: 'Office',
    8: 1,
    1: 'Office',
    9: 7,
    7: 'Office',
    17: [11, 21, 18],
    18: 19,
    19: ['Office', 14],
    14: 'Office',
    21: 'Office'
  },
  Name: 'FreeRoamAnamtronic'
}
const MothAnamtronic = {
  OriginRoom: 6,
  AILevel: 0,
  Target: 0,
  Room: 6,
  Path: {
    6: 11,
    11: [5, 10, 10],
    5: 15,
    15: 'Office',
    10: [undefined, 12, 2],
    12: 'Office',
    2: 9,
    9: 7,
    7: 'Office'
  },
  Name: 'MothAnamtronic'
}
const EyeScanAnamtronic = {
  Room: 'middle',
  Stage: 0,
  AILevel: 0,
  LightLimitor: 0,
  LightAmount: 0
}
const PhantomAnamtronic = {
  AILevel: 0,
  Room: 'none',
  Door: 'none'
}