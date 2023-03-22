const DiscordRPC = require("discord-rpc");
const rpc = new DiscordRPC.Client({
    transport: "ipc"
});

level = 96;
char = "Juggernaut";
area = "T16 Mapping";

setInterval(() => {
    rpc.setActivity({
        details: char + "[Lv." + level + "]",
        state: area,
    });
}, 60 * 1000);

rpc.on("ready", () => {
    rpc.setActivity({
        details: "Fetching data...",
        state: "Fetching data...",
        startTimestamp: new Date(),
        largeImageKey: "poe_logo",
        largeImageText: "EU Server"
    });
});

rpc.login({
    clientId: "1087901895970005114"
});