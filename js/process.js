const { ipcRenderer } = require("electron");

ipcRenderer.on("data", (event, type, level, area) => {
  console.log("Received data");
  let charType = document.getElementById("type");
  charType.innerHTML = type;
  let charLevel = document.getElementById("level");
  charLevel.innerHTML = level;
  let charArea = document.getElementById("area");
  charArea.innerHTML = area;
});

function applyChange() {
  player.charname = document.getElementById("charName").value;
  let charname = document.getElementById("charname");
  charname.innerHTML = player.charname;

  ipcRenderer.send("change", "success");
}
