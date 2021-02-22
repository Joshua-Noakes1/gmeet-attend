const puppeteer = require('puppeteer-extra');
const delay = require('delay');
const meet = require('./Gmeet.js')

function Gmeet() {
	this.browser = null
}

Gmeet.prototype.join = async function (url, email, password, obs, obs_config, name, options = {}) {
	//Check if another browser is already open and close it if it is
	if (this.browser !== null) {
		await this.browser.close();
		this.browser = null;
	}

	let page
	let failed = false
	let attempt = 0
	let headless = options.headless || false
	let verbose = options.verbose || false
	let browser

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

			page = await this.browser.newPage();
			const navPromise = page.waitForNavigation();

			await page.goto('https://accounts.google.com/');

			await navPromise;

			// email enter field
			await page.waitForSelector('input[type="email"]');
			if (verbose) console.log("[VERBOSE] Inputting username");
			await page.type('input[type="email"]', email, {
				delay: 5
			});
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

			await meet.meet(browser, page, url, name, obs, obs_config); // goto meet page

			// MOVED TO GMEET.JS
		} catch (err) {
			if (attempt < 5) {
				console.log("[ERROR]Something went wrong, trying again... do not close the nodejs process.");
				await page.close();
				await this.browser.close();
				failed = true;
				attempt++
			} else {
				await page.close();
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