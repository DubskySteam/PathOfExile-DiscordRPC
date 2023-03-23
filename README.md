# Path of Exile - Discord RPC

![](https://img.shields.io/badge/Version-1.0.0-green?style=flat-square)
![](https://img.shields.io/github/last-commit/dubskysteam/PathOfExile-DiscordRPC?style=flat-square)
___
![](https://img.shields.io/badge/PoE%20Version-3.20%20Sanctum-orange?style=for-the-badge)

### Functionality
* Show your class, level and current area in your Discord Activity

### How to setup
1. Download the archive
2. Extract it where ever you like
3. Open the "data.json" in notepad etc.
4. Replace the content of the path variable with a path to your client.txt
5. Start the program

> You can find the client.txt in your PoE installation directory in the "logs" folder.

### To-Be-Done
Implement the PoE API to require the user only to enter the characters name to pull class and current level.
The endpoints for that aren't public though and I need to contact PoE devs to register this application for it to work.

### How to use
1. Download the pre-built binary or build from source yourself
2. Open
3. Enter your Character's name
4. Hit 'Apply'

### Used libraries
* [discord-rpc](https://www.npmjs.com/package/discord-rpc)
* [poe-log-monitor](https://www.npmjs.com/package/poe-log-monitor)

### Other useful PoE tools
* [Awakened PoE Trade](https://github.com/SnosMe/awakened-poe-trade)