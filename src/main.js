const { app, BrowserWindow, Menu, ipcMain } = require("electron");
var PathOfExileLog = require("poe-log-monitor");
const DiscordRPC = require("discord-rpc");
var { player } = require("./js/data");
const path = require("path");
const url = require("url");
const fs = require("fs");
var os = require("os");
var win;

const rpc = new DiscordRPC.Client({
  transport: "ipc",
});

const getOSuser = () => {
  return os.userInfo().username;
};

const createWindow = () => {
  win = new BrowserWindow({
    width: 500,
    height: 280,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    resizable: false,
  });
  win.loadURL(path.join(__dirname, "index.html"));
  win.setMenu(null);
};

const createLogListeners = () => {
  let poelog = new PathOfExileLog({ logfile: player.clienttxt });

  poelog.on("area", (area) => {
    player.area = area.name;
    console.log(area.name);
  });

  poelog.on("level", (level) => {
    player.level = player.level + level;
  });
};

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
    console.log("Read data file");
    createLogListeners();
  });
}

// App Events

app.whenReady().then(() => {
  console.log("Application ready");
  console.log("Getting OS username");
  player.data = "C:/Users/" + getOSuser() + "/Documents/PoE-RPC/data.json";
  createWindow();
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

// RPC Updates

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

// IPC Events

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
