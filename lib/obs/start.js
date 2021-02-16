const {
    exec
} = require('child_process');
const stop = require('./stop');
const delay = require('delay');

async function start() {
    stop.stop(); // killing any running obs 
    await delay('500'); // waiting 0.5 seconds 
    try {
        exec("cd \"C:\\Program Files\\obs-studio\\bin\\64bit\\\" && \"obs64.exe\"", (err, stdout, stderr) => { // windows x64 TODO: Support x86, macos (possibly linux?)
            // catching errors 
            if (err) {
                console.log(err);
            }
        });
    } catch (err) {
        if (err) {
            console.log(err);
        }
    }
}

module.exports = {
    start
}