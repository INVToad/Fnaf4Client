//The Main values that change a lot
var Office = null
var InGame = false
var IsHost = false
var ShiftTime = 0
var Power = 1000
var ActiveAnimatronics = []

//Tells how difficult the animatronics are
const Difficulty = {
  Boxtronic: 0,
  Motherlytronic: 0,
  PowerDraintronic: 0,
  Eyescantronic: 0,
  Electriciantronic: 0,
  FreeRoamtronic: 0,
  Phantomtronic: 0,
  Mothtronic: 0,
}

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
  Cam1: '',
  Cam2: '',
  Cam3: '',
  Cam4: '',
  Cam5: '',
  Cam6: '',
  Cam7: '',
  Cam8: '',
  Cam9: '',
  Cam10: '',
  Cam11: '',
  Cam12: '',
  Cam13: '',
  Cam14: '',
  Cam15: '',
  Room16: '',
  Room17: '',
  Room18: '',
  Room19: '',
  Room20: ''
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
    Cameras: []
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
    Cameras: [15, 3, 5, 6, 11, 14]
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
    Cameras: [13, 4, 10, 12]
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
    Cameras: [1, 2, 8, 9, 7]
  }
}

//This controls the animatronics paths and other values specilized for them
const MotherlyAnamtronic = {
  Limit: 0,
}
const PowerDrainAnamtronic = {
  OriginRoom: 4,
  Room: 4,
  Path: {
        4: 10,
        10: 2,
        2: [8, 9]
        },
}
const ElectricianAnamtronic = {
  OriginRoom: 9,
  Room: 9,
  Path: {
        9: 2,
        2: [8, 10, 17],
        10: 11,
        17: [18, 11],
        18: 11,
        11: 6
        },
  EnergyLevels: 1000,
  ShockAmount: 0
}
const FreeRoamAnamtronic = {
  OriginRoom: 10,
  Room: 10,
  Path: {10: [12, 11, 2],
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
}
const MothAnamtronic = {
  OriginRoom: 4,
  Room: 5,
  Path: {5: [11, 15],
        15: 'Office',
        11: 18,
        18: 19,
        19: 14,
        14: 'Office'},
}
