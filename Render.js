var GameFrames = 0
var FramesElapsed = 0
function WorldRender() { //Renders the game using Canvas
  if (GameFrames % FrameRatio == 0) { //Controls FrameRate of the render
    FramesElapsed++
    ctx.clearRect(0, 0, Canvas_Width, Canvas_Height) //Clears previous Frame
    for (let i = 0; i < Objects.length; i++) {
      if (Objects[i].Class.includes('Text') && Objects[i].Render ) {
        ctx.fillStyle = Objects[i].Colour
        ctx.font = '10px Arial'
        if (Objects[i].Multilined) {
          let o = Objects[i].Text.split('|')
          for (let p = 0; p < Objects[i].Lines; p++) {
            if (o[p] == undefined) {
              o[p] = 'ERROR'
            }
            ctx.fillText(o[p], Objects[i].x, Objects[i].y + (11 * p), Objects[i].width)
          }
        } else {
          ctx.fillText(Objects[i].Text, Objects[i].x, Objects[i].y, Objects[i].width)
        }
      }
      for (let g = 0; g < Images.length; g++) {
        if (Images[g].alt == Objects[i].UIN && Objects[i].Render) { 
          if (Objects[i].Class.includes('Panoramic')) {
            ctx.drawImage(Images[g], Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height, 0, 0, Objects[i].ScaleX, Objects[i].ScaleY)
          } else if (Objects[i].Class.includes('Animated')){
            if (Objects[i].Class.includes('Opacity')) {
              ctx.save();
              ctx.globalAlpha = Objects[i].Opacity;
              ctx.drawImage(Images[g], Objects[i].Frame * Objects[i].width, 0, Objects[i].width, Objects[i].height, Objects[i].x, Objects[i].y, Objects[i].ScaleX, Objects[i].ScaleY)
              ctx.restore();
            } else {
              if (Objects[i].Reverse) {
                ctx.drawImage(Images[g], (Objects[i].Frames - Objects[i].Frame) * Objects[i].width, 0, Objects[i].width, Objects[i].height, Objects[i].x, Objects[i].y, Objects[i].ScaleX, Objects[i].ScaleY)
              } else {
                ctx.drawImage(Images[g], Objects[i].Frame * Objects[i].width, 0, Objects[i].width, Objects[i].height, Objects[i].x, Objects[i].y, Objects[i].ScaleX, Objects[i].ScaleY)
              }
            }
            if (GameFrames % Objects[i].FrameRate == 0 && !Objects[i].FreezeFrame) {
              if (Objects[i].Frame < Objects[i].Frames) {
                Objects[i].Frame++
              } else {
                if (Objects[i].Class.includes('EndAnimationAction')) {
                  EndFrameEffect(Objects[i].EndEffect, Objects[i])
                }
                Objects[i].Frame = 0
              }
            }
          } else if (Objects[i].Class.includes('DesignMove')) {
            ctx.drawImage(Images[g], Objects[i].Dx, Objects[i].Dy, Objects[i].width, Objects[i].height, Objects[i].x, Objects[i].y, Objects[i].ScaleX, Objects[i].ScaleY)
          } else if (Objects[i].Class.includes('Square')) {
            ctx.save()
            ctx.globalAlpha = Objects[i].Alpha
            ctx.fillStyle = 'black'
            ctx.fillRect(0, 0, Canvas_Width, Canvas_Height)
            ctx.restore()
          } else {
            let posx = Objects[i].x
            let posy = Objects[i].y
            if (Objects[i].Class.includes('MousePos')) {
              posx = MouseInfo.x - (Objects[i].ScaleX / 2)
              posy = MouseInfo.y - (Objects[i].ScaleY / 2)
            }
            ctx.drawImage(Images[g], 0, 0, Objects[i].width, Objects[i].height, posx, posy, Objects[i].ScaleX, Objects[i].ScaleY)
          }
        }
      }
    }
    //debug Stuff
    for (let y = 0; y < MouseCollisions.length; y++) {
      if (MouseCollisionsValues[MouseCollisions[y]].Hitbox) {
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "blue";
        ctx.rect(MouseCollisionsValues[MouseCollisions[y]].x, MouseCollisionsValues[MouseCollisions[y]].y, MouseCollisionsValues[MouseCollisions[y]].width, MouseCollisionsValues[MouseCollisions[y]].height);
        ctx.stroke();
      }
    }
    if (Ingame && Powered && textshown) {
      ctx.fillStyle = 'white';
      ctx.font = '30px Arial';
      if (Office == 'Office4') {
        ctx.fillText(String(Math.floor(Power / 100)) + '%', TimeSpotX - OfficesRender.OfficeObjects.Office.x, TimeSpotY);
      } else if (Power < 100){
        ctx.fillText('WARNING LOW POWER', TimeSpotX - OfficesRender.OfficeObjects.Office.x, TimeSpotY);
      };
      ctx.font = '20px Arial';
      ctx.fillText('0' + ShiftTime + ':00', 970 - OfficesRender.OfficeObjects.Office.x, 495);
    }
  }
  GameFrames++
  requestAnimationFrame(WorldRender)
}

setInterval(() => {
  FPSDisplay.textContent = FramesElapsed + ' FPS'
  FramesElapsed = 0
}, 1000)

function CreateObjects(e) {
  if (e == 'HomeScreen') {
    Objects.push(OfficesRender.TitleScreen)
    OfficesRender.TitleScreen.x = OfficesRender.TitleScreen.Ox
    OfficesRender.TitleScreen.y = OfficesRender.TitleScreen.Oy
    for (let i = 0; i < Objects.length; i++) {
      if (!Objects[i].Class.includes('Text')) {
        let Img = new Image()
        Img.src = Objects[i].src
        Img.alt = Objects[i].UIN
        Images.push(Img)
      }
    }
  }
  if (e == 'All') {
    Objects = []
    Images = []
    let k = Offices[Office].RenderObjects
    for (let h = 0; h < k.length; h++) {
      if (k[h] == 'Cameras') {
        OfficesRender.CameraObjects.Map.Dx = Offices[Office].Mx
        OfficesRender.CameraObjects.Map.Dy = Offices[Office].My
        if (Office == 'Office2') {
          OfficesRender.CameraObjectList.push('Shock9')
          OfficesRender.CameraObjectList.push('Shock11')
          OfficesRender.CameraObjectList.push('MapChangeButton')
        }
        if (Office == 'Office4') {
          OfficesRender.CameraObjectList.push('MapChangeButton')
          OfficesRender.CameraObjectList.push('Office1PowerDirect')
          OfficesRender.CameraObjectList.push('Office2PowerDirect')
          OfficesRender.CameraObjectList.push('Office3PowerDirect')
        }
        for (let b = 0; b < OfficesRender.CameraObjectList.length; b++) {
          Objects.push(OfficesRender.CameraObjects[OfficesRender.CameraObjectList[b]])
          OfficesRender.CameraObjects[OfficesRender.CameraObjectList[b]].x = OfficesRender.CameraObjects[OfficesRender.CameraObjectList[b]].Ox
          OfficesRender.CameraObjects[OfficesRender.CameraObjectList[b]].y = OfficesRender.CameraObjects[OfficesRender.CameraObjectList[b]].Oy
        }
      } else if (k[h] == 'Doors') {
        Objects.push(OfficesRender.ScreenCover)
        for (let b = 0; b < OfficesRender.DoorsList.length; b++) {
          Objects.push(OfficesRender.Doors[OfficesRender.DoorsList[b]])
          OfficesRender.Doors[OfficesRender.DoorsList[b]].x = OfficesRender.Doors[OfficesRender.DoorsList[b]].Ox
          OfficesRender.Doors[OfficesRender.DoorsList[b]].y = OfficesRender.Doors[OfficesRender.DoorsList[b]].Oy
        }
      } else if (k[h] == 'Office') {
        OfficesRender.OfficeList.push('Desk' + Office.replace('Office', ''))
        for (let b = 0; b < OfficesRender.OfficeList.length; b++) {
          Objects.push(OfficesRender.OfficeObjects[OfficesRender.OfficeList[b]])
          OfficesRender.OfficeObjects[OfficesRender.OfficeList[b]].x = OfficesRender.OfficeObjects[OfficesRender.OfficeList[b]].Ox
          OfficesRender.OfficeObjects[OfficesRender.OfficeList[b]].y = OfficesRender.OfficeObjects[OfficesRender.OfficeList[b]].Oy
        }
      } else if (k[h] == 'OfficeOverlays') {
        if (Office != 'Office1') {
          OfficesRender.OfficeOverlaysObjects.OfficeLight.src = 'Assests/OfficeLightWhite.png'
        }
        for (let b = 0; b < OfficesRender.OfficeOverlaysList.length; b++) {
          Objects.push(OfficesRender.OfficeOverlaysObjects[OfficesRender.OfficeOverlaysList[b]])
          OfficesRender.OfficeOverlaysObjects[OfficesRender.OfficeOverlaysList[b]].x = OfficesRender.OfficeOverlaysObjects[OfficesRender.OfficeOverlaysList[b]].Ox
          OfficesRender.OfficeOverlaysObjects[OfficesRender.OfficeOverlaysList[b]].y = OfficesRender.OfficeOverlaysObjects[OfficesRender.OfficeOverlaysList[b]].Oy
        }
      }else if (k[h] == 'LightControl') {
        for (let b = 0; b < OfficesRender.LightList.length; b++) {
          Objects.push(OfficesRender.LightControl[OfficesRender.LightList[b]])
          OfficesRender.LightControl[OfficesRender.LightList[b]].x = OfficesRender.LightControl[OfficesRender.LightList[b]].Ox
          OfficesRender.LightControl[OfficesRender.LightList[b]].y = OfficesRender.LightControl[OfficesRender.LightList[b]].Oy
        }
      } else if (k[h] == 'ShockControl') {
        for (let b = 0; b < OfficesRender.ShockList.length; b++) {
          Objects.push(OfficesRender.ShockControl[OfficesRender.ShockList[b]])
          OfficesRender.ShockControl[OfficesRender.ShockList[b]].x = OfficesRender.ShockControl[OfficesRender.ShockList[b]].Ox
          OfficesRender.ShockControl[OfficesRender.ShockList[b]].y = OfficesRender.ShockControl[OfficesRender.ShockList[b]].Oy
        }
      } else if (k[h] == 'DoorControl') {
        for (let b = 0; b < OfficesRender.DoorControllList.length; b++) {
          Objects.push(OfficesRender.DoorControllObjects[OfficesRender.DoorControllList[b]])
          OfficesRender.DoorControllObjects[OfficesRender.DoorControllList[b]].x = OfficesRender.DoorControllObjects[OfficesRender.DoorControllList[b]].Ox
          OfficesRender.DoorControllObjects[OfficesRender.DoorControllList[b]].y = OfficesRender.DoorControllObjects[OfficesRender.DoorControllList[b]].Oy
        }
      }  else if (k[h] == 'TemperatureControl') {
        for (let b = 0; b < OfficesRender.FanList.length; b++) {
          Objects.push(OfficesRender.FanControll[OfficesRender.FanList[b]])
          OfficesRender.FanControll[OfficesRender.FanList[b]].x = OfficesRender.FanControll[OfficesRender.FanList[b]].Ox
          OfficesRender.FanControll[OfficesRender.FanList[b]].y = OfficesRender.FanControll[OfficesRender.FanList[b]].Oy
        }
      } else if (k[h] == 'PowerControll') {
        for (let b = 0; b < OfficesRender.PowerList.length; b++) {
          Objects.push(OfficesRender.PowerObjects[OfficesRender.PowerList[b]])
          OfficesRender.PowerObjects[OfficesRender.PowerList[b]].x = OfficesRender.PowerObjects[OfficesRender.PowerList[b]].Ox
          OfficesRender.PowerObjects[OfficesRender.PowerList[b]].y = OfficesRender.PowerObjects[OfficesRender.PowerList[b]].Oy
        }
      } else if (k[h] == 'Console') {
        for (let b = 0; b < OfficesRender.ConsoleList.length; b++) {
          Objects.push(OfficesRender.ConsoleObjects[OfficesRender.ConsoleList[b]])
          OfficesRender.ConsoleObjects[OfficesRender.ConsoleList[b]].x = OfficesRender.ConsoleObjects[OfficesRender.ConsoleList[b]].Ox
          OfficesRender.ConsoleObjects[OfficesRender.ConsoleList[b]].y = OfficesRender.ConsoleObjects[OfficesRender.ConsoleList[b]].Oy
        }
      } else if (k[h] == 'Junction') {
        for (let b = 0; b < OfficesRender.JunctionList.length; b++) {
          Objects.push(OfficesRender.JunctionObjects[OfficesRender.JunctionList[b]])
          OfficesRender.JunctionObjects[OfficesRender.JunctionList[b]].x = OfficesRender.JunctionObjects[OfficesRender.JunctionList[b]].Ox
          OfficesRender.JunctionObjects[OfficesRender.JunctionList[b]].y = OfficesRender.JunctionObjects[OfficesRender.JunctionList[b]].Oy
        }
      } else  {
        Objects.push(OfficesRender[k[h]])
        OfficesRender[k[h]].x = OfficesRender[k[h]].Ox
        OfficesRender[k[h]].y = OfficesRender[k[h]].Oy
      }
    }
    Objects.push(OfficesRender.ControlObject)
    OfficesRender.ControlObject.x = OfficesRender.ControlObject.Ox
    OfficesRender.ControlObject.y = OfficesRender.ControlObject.Oy
    for (let i = 0; i < Objects.length; i++) {
      if (!Objects[i].Class.includes('Text')) {
        let Img = new Image()
        Img.src = Objects[i].src
        Img.alt = Objects[i].UIN
        Images.push(Img)
      }
    }
    for (let i = 0; i < Offices[Office].AddObjects.length; i++) {
      MouseCollisions.push(Offices[Office].AddObjects[i])
    }
  } else if (e == 'OfficeBackground') {
    Objects.push(OfficesRender.Office)
    for (let i = 0; i < Objects.length; i++) {
      let Img = new Image()
      Img.src = Objects[i].src
      Img.alt = Objects[i].UIN
      Images.push(Img)
    }
  } else if (e == 'Cameras') {
    Objects.push(OfficesRender.Cameras)
    for (let i = 0; i < Objects.length; i++) {
      let Img = new Image()
      Img.src = Objects[i].src
      Img.alt = Objects[i].UIN
      Images.push(Img)
    }
  }
}

CreateObjects('HomeScreen')
WorldRender()