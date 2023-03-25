const { ipcRenderer } = require("electron");

ipcRenderer.on("data", (event, type, level, area) => {
  console.log("Received data");
  let charType = document.getElementById("type");
  charType.innerHTML = "Class: "+type;
  let charLevel = document.getElementById("level");
  charLevel.innerHTML = "Level: "+level;
  let charArea = document.getElementById("area");
  charArea.innerHTML = "Area: "+area;
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
  let level = document.getElementById("overLevel").value;
  let type = document.getElementById("overType").value;
  ipcRenderer.send("override", level, type);
  document.getElementById("overLevel").innerHTML = "Lv."+level;
  document.getElementById("overType").innerHTML = "Class: "+type;
}
