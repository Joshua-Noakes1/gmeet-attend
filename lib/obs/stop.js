const {
    exec
} = require('child_process');

function stop() {
    try {
        exec("taskkill /im obs64.exe && exit", (err, stdout, stderr) => {
            // the below code is commented because we force close obs and we kept getting an error when doing it
            if (err) { 
                // console.log(`The error below is okay if obs wasnt already running`);
                // console.log(err);
            }
        });
    } catch (err) {
        if (err) {
            // console.log(`The error below is okay if obs wasnt already running`);
            // console.log(err);
        }
    }
}

module.exports = {
    stop
}