const OBSWebSocket = require('obs-websocket-js');
const obs = new OBSWebSocket();

function connect(port, password) {
    obs.connect({
        address: `localhost:${port}`,
        password: password
    });
}

function startRec() {
    try {
        obs.sendCallback('StartRecording', (err) => err);
        console.log('Started Recording');
    } catch (err) {
        if (err) {
            console.log('Failed to start recording');
            console.log(err);
        }
    }

}

function stopRec() {
    try {
        obs.sendCallback('StopRecording', (err) => err);
    } catch (err) {
        if (err) console.log(err);
    }

}


function disconnect() {
    obs.disconnect();
}

module.exports = {
    connect,
    startRec,
    stopRec,
    disconnect
}