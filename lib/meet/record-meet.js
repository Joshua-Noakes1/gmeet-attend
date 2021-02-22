const delay = require("delay");
const obs = require("../obs/obs");
const start = require("../obs/start");
async function record(browser, page, obs_config, meetInfo) {
    try {
        await delay(1500);

        // menu ... btn
        await page.click("#ow3 > div.T4LgNb > div > div:nth-child(8) > div.crqnQb > div.rG0ybd.LCXT6 > div.f0WtFf > div.M5zXed > div > span > span");

        // check if the call is being recorded within gsuite
        var recordingCall = `${await page.$eval("body > div.JPdR6b.e5Emjc.CIYi0d.jvUMfb.yOCuXd.qjTEB > div > div > span.z80M1.RDPZE.NticYc.auswjd", el => el.textContent).catch(err => err)}`
        if (recordingCall != undefined) {
            if (recordingCall.includes("recorded")) {
                var captions = meetInfo.captions.gmeet_rec
            } else {
                var captions = meetInfo.captions.no_gmeet_rec
            }
        } else {
            var captions = meetInfo.captions.no_gmeet_rec
        }
        
        await delay(1500);

        // captions selection btn
        await page.click(captions);

        await delay(1500);

        // english selector
        await page.click("#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.p23ndf.vDc8Ic.J9Nfi.iWO5td > span > div > div > span > label:nth-child(2) > div.d7L4fc.bJNwt.ftajtd > div > div.vd3tt");

        await delay(1500);
        
        // apply btn
        await page.click("#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.p23ndf.vDc8Ic.J9Nfi.iWO5td > div.XfpsVe.J9fJmf > div > div:nth-child(2) > div > div.ZFr60d.CeoRYc");

        await delay(1500);

        // start obs
        start.start();

        // 20 seconds seems to be the best time to make sure that obs open 
        await delay(10 * 1000);

        // connecting to obs
        obs.connect(obs_config.port, obs_config.password);

        await delay(2000);

        obs.startRec();
    } catch (err) {
        console.log(`An error has occured with obs\nThe Recording wasnt started`);
        console.log(`[Error]: ${err}`);
    }
}

module.exports = {
    record
}