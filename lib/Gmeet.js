const delay = require('delay');
const obs_rec_meet = require('./meet/record-meet');
const stop_rec = require('./meet/stop-meet');

var meetInfo = {
    custom: "no",
    joined: "no",
    recording: "no",
    finished: "no",
    captions: {
        no_gmeet_rec: "body > div.JPdR6b.e5Emjc.CIYi0d.jvUMfb.yOCuXd.qjTEB > div > div > span:nth-child(5)",
        gmeet_rec: "body > div.JPdR6b.e5Emjc.CIYi0d.jvUMfb.yOCuXd.qjTEB > div > div > span:nth-child(7)"
    }
}


// keeping gmeet and login as two different file
async function meet(browser, page, url, name, obs, obs_config) {
    try {

        const navPromise = page.waitForNavigation();

        await delay(1500);

        // gmeet url (https://meet.google.com/xxx-xxxx-xxx or https://meet.google.com/lookup/xxxxxxxxxx)
        await page.goto(url);

        await navPromise;

        // wait for the join button to show so we know the page has loaded
        await page.waitForSelector('#yDmH0d > c-wiz > div > div > div:nth-child(8) > div.crqnQb > div > div > div.vgJExf > div > div.KieQAe > div.d7iDfe.NONs6c > div > div.Sla0Yd > div > div.XCoPyb > div.uArJ5e.UQuaGc.Y5sE8d.uyXBBb.xKiqt > span', {
            visible: true
        });

        await delay(1500);

        // Mic BTN
        await page.click("#yDmH0d > c-wiz > div > div > div:nth-child(8) > div.crqnQb > div > div > div.vgJExf > div > div.KieQAe > div.ZUpb4c > div.oORaUb.NONs6c > div > div.EhAUAc > div.ZB88ed > div > div > div");

        await delay(1500);

        // Video BTN
        await page.click("#yDmH0d > c-wiz > div > div > div:nth-child(8) > div.crqnQb > div > div > div.vgJExf > div > div.KieQAe > div.ZUpb4c > div.oORaUb.NONs6c.XDitY > div > div.EhAUAc > div.GOH7Zb > div > div");

        await delay(1500);

        // Join BTN
        await page.click("#yDmH0d > c-wiz > div > div > div:nth-child(8) > div.crqnQb > div > div > div.vgJExf > div > div.KieQAe > div.d7iDfe.NONs6c > div > div.Sla0Yd > div > div.XCoPyb > div.uArJ5e.UQuaGc.Y5sE8d.uyXBBb.xKiqt > span");

        console.log(`Successfully joined/asked to join "${name} (${url})"`);

        // we should be in the meeting at this point with the mic and video turned off

        // meeting details box 
        await page.waitForSelector("#ow3 > div.T4LgNb > div > div:nth-child(8) > div.crqnQb > div.rG0ybd.LCXT6 > div.jzP6rf > div.gSlHI > div > span > span", {
            visible: true
        });

        await delay(1500);

        // setting the thing so i know we joined a meet successfully
        meetInfo.joined == "yes";

        // are we in a custon meet? (nicknames can only be started by gsuite accounts https://support.google.com/a/answer/9822731)
        var meetDetailsBox = `${await page.$eval("#ow3 > div.T4LgNb > div > div:nth-child(8) > div.crqnQb > div.rG0ybd.LCXT6 > div.jzP6rf > div.gSlHI > div > span > span > div > div.Jyj1Td.CkXZgc", el => el.textContent).catch(err => err)}`;
        if (meetDetailsBox.includes("Meeting details") == false) meetInfo.custom == "yes";

        // record meet 
        if (obs == "yes") obs_rec_meet.record(browser, page, obs_config, meetInfo);

        // 30 seconds if enough time to make sure that obs opens 
        if (obs == "yes") await delay(30 * 1000);

        // check the amount of people in the call 
        async function checkPeople() {
            try {
                // number of people next to the person icon
                var meetDetailsBox = await page.$eval("#ow3 > div.T4LgNb > div > div:nth-child(8) > div.crqnQb > div.pHsCke > div.Jrb8ue > div > div.NzPR9b > div.uArJ5e.UQuaGc.kCyAyd.QU4Gid.foXzLb.IeuGXd > span > span > div > div > span.wnPUne.N0PJ8e", el => el.textContent).catch(err => err);
                if (meetDetailsBox != undefined) {
                    if (meetDetailsBox <= 5) {
                        meetInfo.finished == "yes"
                        if (obs == "yes") {
                            stop_rec.stop();

                            await delay(1500);

                            // end call btn
                            await page.click("#ow3 > div.T4LgNb > div > div:nth-child(8) > div.crqnQb > div.rG0ybd.LCXT6 > div.q2u11 > div.s1GInc.zCbbgf > div");

                            // wait for the "You've left the meeting" message 
                            await page.waitForSelector("#ow3 > div > div.CRFCdf", {
                                visible: true
                            });

                            await delay(1500);

                            await page.close();

                            await (750);

                            await browser.close();
                        }
                        // end call btn
                        await page.click("#ow3 > div.T4LgNb > div > div:nth-child(8) > div.crqnQb > div.rG0ybd.LCXT6 > div.q2u11 > div.s1GInc.zCbbgf > div");

                        // wait for the "You've left the meeting" message 
                        await page.waitForSelector("#ow3 > div > div.CRFCdf", {
                            visible: true
                        });

                        await delay(1500);

                        await page.close();

                        await (750);

                        await browser.close();
                    }
                }
            } catch (err) {
                console.log(`An error has occured while leaving\nAuto leaving has been disabled`);
                console.log(`Error: ${err}`);
            }
        }

        // check if we've been kicked
        async function checkKick() {
            try {
                const bg_title_msg = await page.$eval("#ow3 > div > div.CRFCdf", el => el.textContent).catch(err => {
                    if (err) {
                        return;
                    }
                });
                if (bg_title_msg != undefined) {
                    if (bg_title_msg != "You left the meeting" || bg_title_msg == "You left the meeting") {
                        meetInfo.finished == "yes"
                        if (obs == "yes") {
                            stop_rec.stop();

                            await delay(1500);

                            // wait for the "You've left the meeting" message 
                            await page.waitForSelector("#ow3 > div > div.CRFCdf", {
                                visible: true
                            });

                            await delay(1500);

                            await page.close();

                            await (750);

                            await browser.close();
                        }

                        // wait for the "You've left the meeting" message 
                        await page.waitForSelector("#ow3 > div > div.CRFCdf", {
                            visible: true
                        });

                        await delay(1500);

                        await page.close();

                        await (750);

                        await browser.close();
                    }
                }
            } catch (err) {
                console.log(`Failed to leave`);
                if (obs == "yes") console.log(`OBS may still be recording`);
                console.log(`[Error]: ${err}`);
            }
        }

        // check if x people are under a value (if less then x people are in the meet then we leave)
        setInterval(await checkPeople, 10 * 1000);

        // check if we've been kicked every 5 seconds
        setInterval(await checkKick, 5 * 1000);
    } catch (err) {
        if (meetInfo.finished != "yes") {
            if (meetInfo.joined != "yes") {
                console.log(err);
                await page.close();

                await delay(1500);

                await browser.close();

                return;
            }
            console.log(`Something went wrong but you're already in a meet so i'm not closing the browser.\nAutomatic leaving has been disabled\nCheck your mic and video to see if they successfuly turned off`);
            console.log(`[Error]: ${err}`);
        }
    }
}

module.exports = {
    meet
}