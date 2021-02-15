// this video is a lifesaver - https://www.youtube.com/watch?v=EXx-t9CRKeo
const fs = require('fs');


// accepts (path ('Name.json'), data ({"some": "data"}))
function saveJSON(path, data) {
    try {
       // console.log(`[Success] Saved JSON data to "${path}"`);
        return fs.writeFileSync(path, JSON.stringify(data, null, 2));
    } catch (err) {
        console.log(`[Error] Failed to save JSON data to "${path}"\n`);
        console.log(err);
        return;
    }
}

// accepts (filename ('Name.json'))
function readJSON(filename) {
    if (fs.existsSync(filename)) {
        try {
        //    console.log(`[Success] Read the JSON data "${filename}"`);
            return JSON.parse(fs.readFileSync(filename).toString());
        } catch (err) {
            console.log(`[Error] Failed to read JSON data "${filename}"\n`);
            console.log(err);
            return;
        }
    } else {
        console.log('[Error]: File Not Found');
        return {"error": "Data Not Found"};
    }
}


module.exports = {
    saveJSON,
    readJSON
}