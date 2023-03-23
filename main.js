const DiscordRPC = require("discord-rpc");
const { app, BrowserWindow, Menu, ipcMain } = require('electron')
let { player } = require("./data");
const path = require('path')
const url = require('url')

const rpc = new DiscordRPC.Client({
    transport: "ipc"
});

let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 720,
        height: 480,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
      })
    win.loadURL(path.join(__dirname, 'index.html'))
    win.webContents.openDevTools()
  }
  
app.whenReady().then(() => {
    console.log("Application ready")
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

ipcMain.on('data', (event, type, level, area) => {
    console.log("Received data");
    rpc.setActivity({
        details: type + " [Lv." + level + "]",
        state: area,
    });
})

rpc.login({
    clientId: "1087901895970005114"
});