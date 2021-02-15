const {
    exec
} = require('child_process');

function start() {
    try {
        exec("cd \"C:\\Program Files\\obs-studio\\bin\\64bit\\\" && \"obs64.exe\"", (err, stdout, stderr) => { // windows x64
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