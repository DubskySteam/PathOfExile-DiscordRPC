const DiscordRPC = require("discord-rpc");
const { app, BrowserWindow, Menu, ipcMain } = require("electron");
var PathOfExileLog = require("poe-log-monitor");
let { player } = require("./js/data");
const path = require("path");
const url = require("url");
const fs = require("fs");
let win;
var os = require("os");
var osUser = os.userInfo().username;
player.data = "C:/Users/" + osUser + "/Documents/PoE-RPC/data.json";

const rpc = new DiscordRPC.Client({
  transport: "ipc",
});

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
  win.setMenu(null);
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
  fs.writeFile(player.data, JSON.stringify(player), (err) => {
    if (err) {
      win.webContents.send("error", "Error! Couldn't write to data file");
      return;
    }
    console.log("Wrote data file");
  });
  if (process.platform !== "darwin") app.quit();
});

function readDataFile() {
  fs.readFile(player.data, "utf8", (err, data) => {
    if (err) {
      win.webContents.send("error", "Error! Couldn't read data file");
      return;
    }
    let json = JSON.parse(data);
    player.type = json.type;
    player.level = json.level;
    player.area = json.area;
    player.clienttxt = json.clienttxt;
    ready=true;
    console.log("Read data file");

    console.log(player.clienttxt)
    let poelog = new PathOfExileLog({ logfile: player.clienttxt });

    poelog.on("area", (area) => {
      player.area = area.name;
      console.log(area.name);
    });

    poelog.on("level", (level) => {
      player.level = area.level;
    });
});
}

ipcMain.on("override", (event, level, type) => {
  player.level = level;
  player.type = type;
    fs.writeFile(player.data, JSON.stringify(player), (err) => {
      if (err) {
        win.webContents.send("error", "Error! Couldn't write to data file");
        return;
      }
      console.log("Wrote data file");
    });
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
