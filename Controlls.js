var keys = {};

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

function keydown(e) {
    keys[e.key] = true
    if ((Office == 'Office1' || Objects[0].src.includes('TitleScreen')) && DigitialCommandPrompt && OfficesRender.OfficeObjects.Office.x == 0) {
        if ((e.key).length == 1 && e.key != '|' && e.key != ':') {
            OfficesRender.ConsoleObjects.ConsoleText.Text = OfficesRender.ConsoleObjects.ConsoleText.Text.replace('<', e.key + '<')
        } else if (e.key == 'Backspace') {
            let o = OfficesRender.ConsoleObjects.ConsoleText.Text.split('|')
            let k = o[OfficesRender.ConsoleObjects.ConsoleText.Lines - 1].split('')
            if (k[k.length - 3] != ':' && k[k.length - 2] != ' ') {
                if (k[k.length - 2] == '|') {
                    OfficesRender.ConsoleObjects.ConsoleText.Lines -= 1
                }
                k.splice(k.length - 2, 1)
                o[OfficesRender.ConsoleObjects.ConsoleText.Lines - 1] = k.join('')
                OfficesRender.ConsoleObjects.ConsoleText.Text = o.join('|')
            }
        } else if (e.key == 'Enter') {
            let k = OfficesRender.ConsoleObjects.ConsoleText.Text.split(': ')
            OfficesRender.ConsoleObjects.ConsoleText.Text = OfficesRender.ConsoleObjects.ConsoleText.Text.replace('<', '|')
            socket.emit('ServerData', OfficesRender.ConsoleObjects.ConsoleText.Text.split(':'))
            if (Office == 'Office1') {
                if (k[k.length - 1] == 'Motherly_Limitor<') {
                    DisplayUpdate('MotherlyRage')
                } else if (k[k.length - 1] == 'Energy_Level<') {
                    DisplayUpdate('ElectriacianEnergyLevel')
                } else if (k[k.length - 1].includes('Reset_Function_')) {
                    Reset = (k[k.length - 1].split('_'))[2]
                    DisplayUpdate('OfficeReset')
                } else if (k[k.length - 1] == 'Check_Functions<' && ConnectedOffice != undefined) {
                    DisplayUpdate('OfficeFunctionCheck')
                } else {
                    if (OfficesRender.ConsoleObjects.ConsoleText.Lines + 2 >= 17) {
                        OfficesRender.ConsoleObjects.ConsoleText.Lines = 0
                        let m = OfficesRender.ConsoleObjects.ConsoleText.Text.split('|')
                        m.splice(0, 18)
                        m = m.join('|')
                        OfficesRender.ConsoleObjects.ConsoleText.Text = m
                    }
                    OfficesRender.ConsoleObjects.ConsoleText.Text = OfficesRender.ConsoleObjects.ConsoleText.Text + 'error: command not found|Command: <'
                    OfficesRender.ConsoleObjects.ConsoleText.Lines += 2
                }
            } else {
                if (OfficesRender.ConsoleObjects.ConsoleText.Prompt == 'StartUpLobby') {
                    let o = OfficesRender.ConsoleObjects.ConsoleText.Text.split('|')
                    let k = o[OfficesRender.ConsoleObjects.ConsoleText.Lines - 1].split(': ')
                    RoomInput.value = k[k.length - 1].replace('<', '')
                    InputSubmit = true
                    CommandSet = false
                    DigitialCommandPrompt = false
                    OfficesRender.ConsoleObjects.ConsoleText.Text = OfficesRender.ConsoleObjects.ConsoleText.Text.replace('|INPUT', '')
                    OfficesRender.ConsoleObjects.ConsoleText.NextDialog = 'NightSelect'
                } else if (OfficesRender.ConsoleObjects.ConsoleText.Prompt == 'NightSelect') {
                    let o = OfficesRender.ConsoleObjects.ConsoleText.Text.split('|')
                    let k = o[OfficesRender.ConsoleObjects.ConsoleText.Lines - 1].split(': ')
                    for (let i = 1; i < 6; i++) {
                        if (Number(k[k.length - 1].replace('<', '')) == i) {
                            NightShift = k[k.length - 1].replace('<', '')
                            InputSubmit = true
                            CommandSet = false
                            DigitialCommandPrompt = false
                            OfficesRender.ConsoleObjects.ConsoleText.NextDialog = 'Password'
                            OfficesRender.ConsoleObjects.ConsoleText.Text = OfficesRender.ConsoleObjects.ConsoleText.Text.replace('|INPUT', '')
                        }
                    }
                    if (!InputSubmit) {
                        OfficesRender.ConsoleObjects.ConsoleText.Text = OfficesRender.ConsoleObjects.ConsoleText.Text.replace('|INPUT', 'Error: Invalid Input|Input: <|INPUT')
                    }
                } else if (OfficesRender.ConsoleObjects.ConsoleText.Prompt == 'Password') {
                    let o = OfficesRender.ConsoleObjects.ConsoleText.Text.split('|')
                    let k = o[OfficesRender.ConsoleObjects.ConsoleText.Lines - 1].split(': ')
                    RooomPassword = k[k.length - 1].replace('<', '')
                    InputSubmit = true
                    CommandSet = false
                    DigitialCommandPrompt = false
                    OfficesRender.ConsoleObjects.ConsoleText.Text = OfficesRender.ConsoleObjects.ConsoleText.Text.replace('|INPUT', '')
                    OfficesRender.ConsoleObjects.ConsoleText.NextDialog = 'FinalRoom'
                }
            }
        }
    }
};

function keyup(e) {
    keys[e.key] = false
};