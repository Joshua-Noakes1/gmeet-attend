const delay = require("delay");
const obs = require("../obs/obs");
const stoprec = require("../obs/stop");

async function stop() {
    try {
        obs.stopRec();

        await delay(1500);

        obs.disconnect();

        await delay(3000);

        stoprec.stop();
    } catch (err) {
        console.log(`Failed to stop obs`);
        console.log(`Error: ${err}`);
    }
}


module.exports = {
    stop
}