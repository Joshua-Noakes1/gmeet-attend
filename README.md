# gmeet-attend
Join Google meet meetings automatically and record them with obs while you sleep    
[![](https://img.shields.io/badge/Keep%20a%20Changelog--555.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmMTVkMzAiIHZpZXdCb3g9IjAgMCAxODcgMTg1Ij48cGF0aCBkPSJNNjIgN2MtMTUgMy0yOCAxMC0zNyAyMmExMjIgMTIyIDAgMDAtMTggOTEgNzQgNzQgMCAwMDE2IDM4YzYgOSAxNCAxNSAyNCAxOGE4OSA4OSAwIDAwMjQgNCA0NSA0NSAwIDAwNiAwbDMtMSAxMy0xYTE1OCAxNTggMCAwMDU1LTE3IDYzIDYzIDAgMDAzNS01MiAzNCAzNCAwIDAwLTEtNWMtMy0xOC05LTMzLTE5LTQ3LTEyLTE3LTI0LTI4LTM4LTM3QTg1IDg1IDAgMDA2MiA3em0zMCA4YzIwIDQgMzggMTQgNTMgMzEgMTcgMTggMjYgMzcgMjkgNTh2MTJjLTMgMTctMTMgMzAtMjggMzhhMTU1IDE1NSAwIDAxLTUzIDE2bC0xMyAyaC0xYTUxIDUxIDAgMDEtMTItMWwtMTctMmMtMTMtNC0yMy0xMi0yOS0yNy01LTEyLTgtMjQtOC0zOWExMzMgMTMzIDAgMDE4LTUwYzUtMTMgMTEtMjYgMjYtMzMgMTQtNyAyOS05IDQ1LTV6TTQwIDQ1YTk0IDk0IDAgMDAtMTcgNTQgNzUgNzUgMCAwMDYgMzJjOCAxOSAyMiAzMSA0MiAzMiAyMSAyIDQxLTIgNjAtMTRhNjAgNjAgMCAwMDIxLTE5IDUzIDUzIDAgMDA5LTI5YzAtMTYtOC0zMy0yMy01MWE0NyA0NyAwIDAwLTUtNWMtMjMtMjAtNDUtMjYtNjctMTgtMTIgNC0yMCA5LTI2IDE4em0xMDggNzZhNTAgNTAgMCAwMS0yMSAyMmMtMTcgOS0zMiAxMy00OCAxMy0xMSAwLTIxLTMtMzAtOS01LTMtOS05LTEzLTE2YTgxIDgxIDAgMDEtNi0zMiA5NCA5NCAwIDAxOC0zNSA5MCA5MCAwIDAxNi0xMmwxLTJjNS05IDEzLTEzIDIzLTE2IDE2LTUgMzItMyA1MCA5IDEzIDggMjMgMjAgMzAgMzYgNyAxNSA3IDI5IDAgNDJ6bS00My03M2MtMTctOC0zMy02LTQ2IDUtMTAgOC0xNiAyMC0xOSAzN2E1NCA1NCAwIDAwNSAzNGM3IDE1IDIwIDIzIDM3IDIyIDIyLTEgMzgtOSA0OC0yNGE0MSA0MSAwIDAwOC0yNCA0MyA0MyAwIDAwLTEtMTJjLTYtMTgtMTYtMzEtMzItMzh6bS0yMyA5MWgtMWMtNyAwLTE0LTItMjEtN2EyNyAyNyAwIDAxLTEwLTEzIDU3IDU3IDAgMDEtNC0yMCA2MyA2MyAwIDAxNi0yNWM1LTEyIDEyLTE5IDI0LTIxIDktMyAxOC0yIDI3IDIgMTQgNiAyMyAxOCAyNyAzM3MtMiAzMS0xNiA0MGMtMTEgOC0yMSAxMS0zMiAxMXptMS0zNHYxNGgtOFY2OGg4djI4bDEwLTEwaDExbC0xNCAxNSAxNyAxOEg5NnoiLz48L3N2Zz4K)](https://github.com/Joshua-Noakes1/gmeet-attend/blob/master/CHANGELOG.md)
## About:
gmeet-attend is a fork of `https://github.com/Rex1911/gmeet-autojoiner` a tool used attend google meet meeting automatically.   

This fork adds obs support so meeting can be recorded so you dont miss any content from it.

## Prerequisite:

- Node.js v13 or greater
- NPM v6 or greater
- OBS Studio (x64) v26 or greater
- obs-websocket v4.9 or greater
## Usage Guide:

### 1 - Setting up gmeet-attend

Clone the repo
`https://github.com/Joshua-Noakes1/gmeet-attend.git`

Go inside the project directory and do
`npm install`

### 2 - Setting up obs

Install the latest version of obs-websocket `https://github.com/Palakis/obs-websocket`

Open OBS, click tools and then WebSockets Server Settings and configure your port and password  

Create obs.json and copy the layout from the file obs.example.json in the folder example

### 3 - Launch gmeet-attend 

Then use `npm start` to start the app

Goto `localhost:3000` to access the frontend

**[Info] On the first run on the app you'll get an error of not being able to find a file. This is normal**
#### 3a - Setting your email and password

First and foremost, enter you Email Address and Password in the "Settings" section and click "Set"

#### 3b - Setting your meetings

Enter the meeting details in the "Gmeet Autojoiner" section and click "Submit"

#### 3c - Deleting a meeting
Use the "Delete meeting" section to Delete a meeting.

## Additional Info

- This currently only works with windows 64bit and obs installed in its default location

- Keep the nodejs process **RUNNING** and you will automatically join the meeting at the specified time.

- If you host this locally, make sure that you laptop/PC doesn't sleep, or else this is not going to work.

- The process checks every few seconds to join a valid meeting. This is controlled by the `CHECKTIME` variable which is set to 10 seconds by default. Change that  variabel to change how often the procces checks for meetings to join.

## Error resolving
 - Logs are enabled by default, so in any case there is an error check for logs
 - Retry count is set to 5, which can me changed as needed in lib/Gmeet.js::179:22

## Disclaimer

Please use this at your own risk. I do not guaranty that this will work 100% of time. If you choose to use this, know that there are chances of you not joining the meeting successfully and loosing your attendance.