# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2020-02-22
### Added
#### Code
- Added proper error handling for functions that could crash the browser
- Added Changelog Shield on the readme
#### Files
- lib/meet/record-meet.js
- lib/meet/stop-meet.js
- lib/Gmeet-Login.js
### Changed
#### Code
- Moved the main google meet code from `Gmeet-Login.js` to `Gmeet.js`
- Changed `app.js` to use `Gmeet-Login.js` instead of  `Gmeet.js`
#### Files
- lib/obs/obs.js
- lib/Gmeet.js
- public/css/index.css
- app.js
- [README.md](https://github.com/Joshua-Noakes1/gmeet-attend/blob/master/README.md)
### Removed 
#### Code
- Dark mode support 