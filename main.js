const DiscordRPC = require("discord-rpc");
const { app, BrowserWindow, Menu, ipcMain, ipcRenderer } = require("electron");
let { player } = require("./js/data");
const path = require("path");
const url = require("url");

const rpc = new DiscordRPC.Client({
  transport: "ipc",
});

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 720,
    height: 480,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadURL(path.join(__dirname, "index.html"));
  //win.webContents.openDevTools();
};

app.whenReady().then(() => {
  console.log("Application ready");
  createWindow();
  rpc.setActivity({
    details: "Fetching data...",
    state: "Fetching data...",
    startTimestamp: new Date(),
    largeImageKey: "poe_logo",
    largeImageText: "EU Server",
  });
  win.webContents.send("charname", player.charname);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("newName", (event, newName) => {
    player.charname = newName;
});

setInterval(() => {
    win.webContents.send("data", player.type, player.level, player.area);
    rpc.setActivity({
        details: player.type + " [Lv." + player.level + "]",
        state: player.area,
    });
}, 2 * 1000);

rpc.login({
  clientId: "1087901895970005114",
});
