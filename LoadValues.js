CreateContain = document.getElementById("CreationalDiv")

const Canvas = document.getElementById("Canvas")
const ctx = canvas.getContext('2d');
const Canvas_Width = canvas.width = 1440;
const Canvas_Height = canvas.height = 789;

var Objects = []
var ObjectValues = {}
var FunctionList = {}
const ProfanityFilter = []
var RooomPassword = ''
var Ingame = false
var FrameRatio = 1
var currentcam = 0
const FPSDisplay = document.getElementById("FPS")
const DigitialCommandPromptAllowed = true
var CommandSet = true
var InputSubmit = false
const ChatSettings = {
    Colour: 'Black',
    Left: '20px'
}

//Admin Stuff
const AdminPassword = ''