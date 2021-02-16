# gmeet-attend
Join Google meet meetings automatically and record them with obs while you sleep

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