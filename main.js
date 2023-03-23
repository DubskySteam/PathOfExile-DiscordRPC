const DiscordRPC = require("discord-rpc");
const { app, BrowserWindow, Menu, ipcMain, ipcRenderer } = require("electron");
let { player } = require("./js/data");
const path = require("path");
const url = require("url");
const fs = require("fs");

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
  readDataFile();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

function readDataFile() {
  fs.readFile("data/data.json", "utf8", (err, data) => {
    if (err) {
      win.webContents.send("data", "Error! Couldn't read data file");
      return;
    }
    let json = JSON.parse(data);
    player.charname = json.charname;
    console.log("Read data file");
    console.log("Charname: " + player.charname);
  });
}

ipcMain.on("newName", (event, newName) => {
  player.charname = newName;
    fs.writeFile("data/data.json", JSON.stringify(player), (err) => {
      if (err) {
        win.webContents.send("error", "Error! Couldn't write to data file");
        return;
      }
      console.log("Wrote data file");
    });
});

setInterval(() => {
  win.webContents.send("data", player.charname, player.type, player.level, player.area);
  rpc.setActivity({
    details: player.type + " [Lv." + player.level + "]",
    state: player.area,
  });
}, 2 * 1000);

rpc.login({
  clientId: "1087901895970005114",
});
