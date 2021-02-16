const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const delay = require('delay');
const OBS = require('./obs/obs');
const staOBS = require('./obs/start');
const stoOBS = require('./obs/stop');
puppeteer.use(StealthPlugin())

function Gmeet() {
	this.browser = null
}

Gmeet.prototype.join = async function (url, email, password, obs, obs_config, name, options = {}) {
	//Check if another browser is already open and close it if it is
	if (this.browser !== null) {
		await this.browser.close()
		this.browser = null;
	}

	let page
	let failed = false
	let attempt = 0
	let headless = options.headless || false
	let verbose = options.verbose || false
	let browser
	let page_closed = false

	do {
		try {
			// launch browser 
			this.browser = await puppeteer.launch({
				headless: headless,
				defaultViewport: null,
				ignoreDefaultArgs: ['--disable-extensions'],
				args: [
					'--start-maximized',
					'--no-sandbox',
					'--disable-setuid-sandbox',
					'--use-fake-ui-for-media-stream'
				]
			});

			browser = this.browser;

			page = await this.browser.newPage()
			const navPromise = page.waitForNavigation();

			await page.goto('https://accounts.google.com/')

			await navPromise;

			// email enter field
			await page.waitForSelector('input[type="email"]');
			if (verbose) console.log("[VERBOSE] Inputting username");
			await page.type('input[type="email"]', email, {
				delay: 5
			})
			await page.click("#identifierNext");
			if (verbose) console.log("[VERBOSE] Clicked the next button");

			// password enter field
			await page.waitForSelector('input[type="password"]', {
				visible: true
			});
			if (verbose) console.log("[VERBOSE] Inputting password");
			await page.type('input[type="password"]', password, {
				delay: 5
			});
			await page.waitForSelector("#passwordNext", {
				visible: true
			});
			await page.click("#passwordNext");
			if (verbose) console.log("[VERBOSE] Clicked the next button");

			// should of loaded the right page (myaccount.google.com)
			await navPromise; 

			await delay('3500'); // waiting to make sure we load successfuly

			await page.goto(url); // meet url 

			// loaded the meet page
			await navPromise;

			await page.waitForSelector('div.uArJ5e.UQuaGc.Y5sE8d.uyXBBb.xKiqt', {
				visible: true
			}); // wait for the join button

			await delay('2500');

			await page.click("div.uArJ5e.UQuaGc.Y5sE8d.uyXBBb.xKiqt"); // join button

			console.log(`Successfully joined/Sent join request to "${name} (${url})"`);

			await page.waitForSelector('div.Jyj1Td.CkXZgc', {
				visible: true
			}); // meeting details box only shows when your in the meet

			// we should be in the meet now 
			await delay('750');

			await page.click("#ow3 > div.T4LgNb > div > div:nth-child(8) > div.crqnQb > div.rG0ybd.LCXT6 > div.q2u11 > div.a1GRr > div > div > div"); // mute mic

			await delay('350');

			await page.click("#ow3 > div.T4LgNb > div > div:nth-child(8) > div.crqnQb > div.rG0ybd.LCXT6 > div.q2u11 > div.SfBQ6c > div > div"); // turn off camera

			await delay('350');

			await page.click('div.Q8K3Le'); // turn on captions

			// obs start record
			if (obs == 'yes') { 
				staOBS.start();
				await delay('5000'); // 5 seconds seems to be short enough that it doesnt crash the app 
				OBS.connect(obs_config.port, obs_config.password);
				await delay('2000');
				OBS.startRec();
			}

			// await for less then x people in the call than leave
			async function peopleInCall() {
				const peopleInCall = await page.$eval("#ow3 > div.T4LgNb > div > div:nth-child(8) > div.crqnQb > div.pHsCke > div.Jrb8ue > div > div.NzPR9b > div.uArJ5e.UQuaGc.kCyAyd.QU4Gid.foXzLb.IeuGXd > span > span > div > div > span.wnPUne.N0PJ8e", el => el.textContent).catch(err => err); // the number next to the persons icon (basically how many people are in the call)
				if (peopleInCall <= 2) { // you can change the 2 to any number but i wouldnt recommend going above 5
					if (page_closed == false) {
						if (obs == 'yes') {
							page_closed = true;
							OBS.stopRec();
							await delay('2500');
							stoOBS.stop();
							await delay('2500');
							await page.click("#ow3 > div.T4LgNb > div > div:nth-child(8) > div.crqnQb > div.rG0ybd.LCXT6 > div.q2u11 > div.s1GInc.zCbbgf > div"); // end call 
							await delay('2500');
							await page.close();
							await delay('2500');
							await browser.close(); // this.browser.close();
						} else {
							page_closed = true;
							await page.click("#ow3 > div.T4LgNb > div > div:nth-child(8) > div.crqnQb > div.rG0ybd.LCXT6 > div.q2u11 > div.s1GInc.zCbbgf > div"); // end call 
							await delay('2500');
							await page.close();
							await delay('2500');
							await browser.close(); // this.browser.close();
						}
					}

				}
			}

			async function kickedFromMeet() {
				const headding = await page.$eval("#ow3 > div > div.CRFCdf", el => el.textContent).catch(err => err);
				if (headding != "You left the meeting") { // left with out being clicking end
					if (page_closed == false) {
						if (obs == "yes") {
							page_closed = true;
							OBS.stopRec();
							await delay('2500');
							stoOBS.stop();
							await delay('2500');
							await page.close();
							await browser.close(); // this.browser.close();
						} else {
							page_closed = true;
							await page.close();
							await browser.close(); // this.browser.close();
						}
					}
				}
			}

			await delay(10 * 1000); // waiting 10 seconds so it looks normal
 
			setInterval(peopleInCall, 10 * 1000); // less than x people in call

			setInterval(kickedFromMeet, 10 * 1000); // kicked from meet 


		} catch (err) {
			if (attempt < 5) {
				console.log("[ERROR]Something went wrong, trying again... do not close the nodejs process.");
				await page.close();
				await this.browser.close();
				failed = true;
				attempt++
			} else {
				await page.close()
				try {
					await this.browser.close();
				} catch (error) {
					console.log('[ERROR] ' + err);
				}
				console.log("[ERROR] Unable to join the meeting. Check if you entered the correct emailID and password. If running in HEADLESS=true mode, try running in HEADLESS=false mode and manually see where the error occurs.");
				console.log(err);
				break;
			}
		}
	} while (failed === true)
}

module.exports = Gmeet