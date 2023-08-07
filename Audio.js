//This is where the audio is loaded

//Plays Audio
const ShiftEnd = new Audio('Assests/Sounds/6amSound.mp3')
const MonitorUp = new Audio('Assests/Sounds/MonitorUp.ogg')
const MonitorDown = new Audio('Assests/Sounds/MonitorDown.ogg')
const Static = new Audio('Assests/Sounds/CAMERA STATIC - AUDIO FROM JAYUZUMI.COM.mp3')
Static.loop = true
Static.volume = 0.5
const FailedShock = new Audio ('Assests/Sounds/FalledShock.ogg')
const SuccessShock = new Audio ('Assests/Sounds/SuccessfulShock.ogg')
const Humming = new Audio ('Assests/Sounds/mysterion-low-ship-humming-25686.mp3')
Humming.loop = true
const Voices = new Audio ('Assests/Sounds/crowd-of-people-talking-29054_01.mp3')
Voices.loop = true
const Mechanised = new Audio ('Assests/Sounds/constant-mechanical-noise-63164.mp3')
Mechanised.loop = true
const DoorSlam = new Audio('Assests/Sounds/DoorSlamming.mp3')
const PowerOut = new Audio ('Assests/Sounds/FNAF Power Outage Sound Effect.mp3')
const ChangeCam = new Audio('Assests/Sounds/CameraSwitch.ogg')


var InvisibleSounds = [] //if an audio is made and not kept, it's hard to get it back so this will catch them

const CurrentSounds = [Static, ShiftEnd, MonitorUp, MonitorDown, FailedShock, DoorSlam, Mechanised, Voices, Humming, PowerOut, SuccessShock, ChangeCam] //Contains all audio files for easy access
const SoundValues = { //Contains specific info for sounds
    /*Thunder: {
        volume: 0.8,
        Position: 3,
        AudioFile: Thunder,
    },*/
    Static: {
        volume: 0.5,
        Position: 0,
        AudioFile: Static,
    },
    ShiftEnd: {
        volume: 0.8,
        Position: 1,
        AudioFile: ShiftEnd,
    },
    MonitorUp: {
        volume: 0.8,
        Position: 2,
        AudioFile: MonitorUp,
    },
    MonitorDown: {
        volume: 0.8,
        Position: 3,
        AudioFile: MonitorDown,
    },
    FailedShock: {
        volume: 0.8,
        Position: 4,
        AudioFile: FailedShock,
    },
    DoorSlam: {
        volume: 0.8,
        Position: 5,
        AudioFile: DoorSlam,
    },
    Mechanised: {
        volume: 0.8,
        Position: 6,
        AudioFile: Mechanised,
    },
    Voices: {
        volume: 0.8,
        Position: 7,
        AudioFile: Voices,
    },
    Humming: {
        volume: 0.8,
        Position: 8,
        AudioFile: Humming,
    },
    PowerOut: {
        volume: 0.8,
        Position: 9,
        AudioFile: PowerOut,
    },
    SuccessShock: {
        volume: 0.8,
        Position: 10,
        AudioFile: SuccessShock,
    },
    ChangeCam: {
        volume: 0.8,
        Position: 11,
        AudioFile: ChangeCam,
    },
};
function AudioControl(Sound, Action, Value) {
    if (AudioAllow) {
        if (Sound == 'All') {
            if (Action == 'Volume') {
                if (Value == 'Restore') {
                    for (m in SoundValues) {
                        CurrentSounds[SoundValues[m].Position].volume = SoundValues[m].volume
                    }
                    for (let i = 0; i < InvisibleSounds.length; i++) {
                        InvisibleSounds[i].volume = SoundValues[InvisibleSounds[i].id].volume
                    }
                } else {
                    for (let i = 0; i < CurrentSounds.length; i++) {
                        CurrentSounds[i].volume = Value
                    }
                    for (let i = 0; i < InvisibleSounds.length; i++) {
                        InvisibleSounds[i].volume = Value
                    }
                }
            }
        } else {
            if (Action == 'Play') {
                if (Sound == 'DoorSlam') {
                    let AudioClone = DoorSlam.cloneNode()
                    AudioClone.volume = SoundValues[Sound].AudioFile.volume
                    AudioClone.play()
                    AudioClone.id = Sound
                    InvisibleSounds.push(AudioClone)
                } else {
                    SoundValues[Sound].AudioFile.play()
                }
            } else if (Action == 'Pause') {
                SoundValues[Sound].AudioFile.pause()
            }
        }
    }
}

function AudioReset() {
    for (let i = 0; i < CurrentSounds.length; i++) {
        CurrentSounds[i].pause()
    }
}