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

ipcRenderer.on("charname", (event, cName) => {
  console.log("Received charname");
  let charname = document.getElementById("charname");
  charname.innerHTML = cName;
});

ipcRenderer.on("error", (event, err) => {
  alert(err);
});

function applyChange() {
  let charname = document.getElementById("charName").value;
  ipcRenderer.send("newName", charname);
  document.getElementById("charname").innerHTML = charname;
}
