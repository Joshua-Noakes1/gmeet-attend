const OBSWebSocket = require('obs-websocket-js');
const obs = new OBSWebSocket();

function connect(port, password) {
    obs.connect({
        address: `localhost:${port}`,
        password: password
    });
}

function startRec() {
    obs.sendCallback('StartRecording', (err) => err);
}

function stopRec() {
    obs.sendCallback('StopRecording', (err) => err);
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