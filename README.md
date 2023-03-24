# Path of Exile - Discord RPC

![](https://img.shields.io/badge/Version-1.0.0-green?style=flat-square)
![](https://img.shields.io/github/last-commit/dubskysteam/PathOfExile-DiscordRPC?style=flat-square)
___
![](https://img.shields.io/badge/PoE%20Version-3.20%20Sanctum-orange?style=for-the-badge)

### Functionality
* Show your class, level and current area in your Discord Activity

### How to setup/use
1. Download the latest archive from [releases](https://github.com/DubskySteam/PathOfExile-DiscordRPC/releases)
2. Extract it where ever you like
3. Create a folder called "PoE-RPC" in "C:\Users\%username%\Documents\"
4. Copy "data.json" into it
5. Open "data.json" with any editor.
6. Replace the content of the path variable with a path to your client.txt
7. Run the program
8. On the very first start, enter your level and class name and hit "Override".

> You can find the client.txt in your PoE installation directory in the "logs" folder.

### To-Be-Done
Implement the PoE API to require the user only to enter the characters name to pull class and current level.
The endpoints for that aren't public though and I need to contact PoE devs to register this application for it to work.

### Used libraries
* [discord-rpc](https://www.npmjs.com/package/discord-rpc)
* [poe-log-monitor](https://www.npmjs.com/package/poe-log-monitor)

### Other useful PoE tools
* [Awakened PoE Trade](https://github.com/SnosMe/awakened-poe-trade)