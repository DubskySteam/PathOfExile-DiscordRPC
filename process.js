const { ipcRenderer } = require("electron");

setInterval(() => {
  ipcRenderer.send("data", player.type, player.level, player.area);
  console.log("Sent data");
}, 2 * 1000);

function applyChange() {
  player.charname = document.getElementById("charName").value;
  let charname = document.getElementById("charname");
  charname.innerHTML = player.charname;

  ipcRenderer.send("change", "success");
}
