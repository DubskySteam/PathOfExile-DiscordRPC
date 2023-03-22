const { app, BrowserWindow } = require('electron')
const DiscordRPC = require("discord-rpc");
const path = require('path')

const rpc = new DiscordRPC.Client({
    transport: "ipc"
});

let win;

const createWindow = () => {
    win.loadURL(path.join(__dirname, 'index.html'))
    win.loadFile('index.html')
  }

level = 96;
char = "Juggernaut";
area = "T16 Map";

app.whenReady().then(() => {
    win = new BrowserWindow({
        width: 720,
        height: 480
      })
    createWindow()
    rpc.setActivity({
        details: "Fetching data...",
        state: "Fetching data...",
        startTimestamp: new Date(),
        largeImageKey: "poe_logo",
        largeImageText: "EU Server"
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

setInterval(() => {
    rpc.setActivity({
        details: char + " [Lv." + level + "]",
        state: "Area: "+area,
    });
    win.webContents.executeJavaScript(`document.getElementById("char").innerHTML = "Char: ${char}";`);
    win.webContents.executeJavaScript(`document.getElementById("level").innerHTML = "Level: ${level}";`);
    win.webContents.executeJavaScript(`document.getElementById("area").innerHTML = "Area: ${area}";`);
}, 2 * 1000);

rpc.login({
    clientId: "1087901895970005114"
});
