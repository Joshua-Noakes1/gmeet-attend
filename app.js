const express = require('express');
const morgan = require('morgan');
const path = require('path');
const Gmeet = require('./lib/Gmeet-Login');
const rw = require('./lib/rw');
const bodyParser = require('body-parser');
const shortid = require('shortid');
require('dotenv').config();
const app = express();
const gmeet = new Gmeet();

const HEADLESS = false //Change this to true if you dont want the chrome UI to show up
const VERBOSE = false // Change this to true to get extra messages in the console
const CHECKTIME = 10000 // This variable determines how often will the code check for meeting. Value in miliseconds

var appconfig = rw.readJSON('appconfig.json');
var obs_config = rw.readJSON('obs.json');

if (appconfig.set == true) {
	email = appconfig.email
	password = "Your password is saved but it's safer to not show you!"
} else {
	email = "",
	password = ""
}

var meetings = rw.readJSON('meetings.json');
let config = {
	email: email,
	password: password
}

app.use(bodyParser.urlencoded({
	extended: false
}))

app.use(express.static(path.join(__dirname, 'public')));

// app.use(bodyParser.json())
app.use(morgan('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index', {
		meetings,
		config
	})
});

app.use(express.static(__dirname + '/public')); // local css 

app.post('/submitMeet', (req, res) => {
	let uid = shortid.generate()
	meetings[uid] = {}
	meetings[uid].name = req.body.meetName
	meetings[uid].time = Date.parse(req.body.meetTime)
	meetings[uid].url = req.body.meetUrl
	meetings[uid].obs = req.body.obs
	res.redirect("/")
});

app.post('/delete', (req, res) => {
	let id = req.body.delID
	delete meetings[id]
	res.redirect('/')
});

app.post('/settings', (req, res) => {
	rw.saveJSON('appconfig.json', {
		"set": true,
		"email": req.body.email,
		"password": req.body.password
	});
	appconfig = rw.readJSON('appconfig.json');
	config['email'] = req.body.email
	config['password'] = "Your password is saved but it's safer to not show you!"
	res.redirect('/')
});

const checkForMeeting = () => {
	for (meeting in meetings) {
		if (Date.now() > meetings[meeting].time) {
			gmeet.join(meetings[meeting].url, config['email'], appconfig.password, meetings[meeting].obs, obs_config, meetings[meeting].name, meetings[meeting].camera, {
				headless: HEADLESS,
				verbose: VERBOSE
			})
			delete meetings[meeting]
		}
	}
}

function load_read() { // made to save the list of meetings
	rw.saveJSON('meetings.json', meetings);
	meetings = rw.readJSON('meetings.json');
}
setInterval(() => {
	load_read()
}, 4500); // 4.5 seconds read and write 

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	setInterval(() => {
		checkForMeeting()
	}, CHECKTIME)
	console.log(`App listening on port ${PORT}!`);
});