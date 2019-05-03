/* main.js */
/* Node script for the Electron client UI which also activates the Express Server */

console.log('\x1b[33m','______________________________________________________________________');
console.log('',"electron-container\n\t.");
console.log('','\tnode main.js');
console.log('','\tgit: https://github.com/mezcel/electron-container\n', '\x1b[0m');
// Note: console colors -- https://en.wikipedia.org/wiki/ANSI_escape_code#Colors

/* ---------------------------------------------------------------------
* EXPRESS
* ------------------------------------------------------------------ */

var express = require('express');
var expressApp = require('express')();
var myHttpserver = require('http').createServer(expressApp);
var io = require('socket.io')(myHttpserver);
var myAppPath = __dirname + '/';

var PORT = process.env.PORT || 7777;

// expressApp.get('/', (req, res) => res.render(myAppPath + "index.html"));
expressApp.get('/', function(req, res){
	res.sendFile(myAppPath + "index.html");
});

expressApp.use(express.static(myAppPath));

function getRandomHexColor(data) {

	var ascii2text = data.charCodeAt(0).toString(16);
	
	var letters = '012345'.split('');
	var hexcolor = '#';
	hexcolor += letters[Math.round(Math.random() * 5)];
	letters = '0123456789ABCDEF'.split('');

	for (var i = 0; i < 5; i++) {
		hexcolor += letters[Math.round(Math.random() * 15)];
	}
	
	// cut the deck
	var firstPart = "#9" + ascii2text.substr(ascii2text.length - 2);
	var secondPart = hexcolor.substr(hexcolor.length - 2) + "0";

	hexcolor = firstPart + secondPart;
	return hexcolor;
}

function getIPvarString() {

	var os = require('os');
	var interfaces = os.networkInterfaces();
	var addresses = [];
	console.log('','Available Network Interface Address:');

	for (var k in interfaces) {
		for (var k2 in interfaces[k]) {
			var address = interfaces[k][k2];
			console.log('\x1b[36m', '\t' + address.family + ' - ' + address.address, '\x1b[0m'); // debug
			if (address.family === 'IPv4' && !address.internal) {
				addresses.push(address.address);
			}
		}
	}

	returnIp = addresses[0]; // just grab the 1st on the list

	return returnIp;
}

// Domain
var sharedIpDisplay = getIPvarString();
var myHostip = "http://" + sharedIpDisplay;

if (myHostip == "http://undefined") {
	// I am just going to assume 127.0.0.1
	sharedIpDisplay = "localhost";
	myHostip = "http://" + sharedIpDisplay;
}

console.log("\n\tServer Ip = \x1b[4m" + myHostip + '\x1b[0m');

users = [];

io.on('connection', function(socket) {

	socket.on('setUsername', function(data) {
		var randomHexColor = getRandomHexColor(data);
		
		var usercount = users.length;
		var isHostComputer = false;
		var tmpData = data;
		
		// if the last 4 chars of data is "HOST"
		var last4letters = data.substr(data.length - 4);
		if ( last4letters == "HOST" ) {
			data = data + "\@" + sharedIpDisplay;
			isHostComputer = true;
		}

		// the following applies to additional client users
		if ( users.indexOf(data) > -1 ) {
			
			socket.emit('userExists', data + ' username is allready taken! Try another username.');
			
			// used for clients on the same server machine
			if (isHostComputer) {				
				tmpData = tmpData.replace(/-HOST/gi, "_ServerUser");
				tmpData = tmpData.replace(/HOST/gi, "_ServerUser");
			}
			
			// data = tmpData + '_' + usercount;
			data = tmpData.toString() + usercount.toString() ;
			
			users.push(data.toString());
			
			socket.emit('userSet', {
				username: data,
				allusers: users,
				colorname: randomHexColor,
				iptitle: myHostip
			});
			
			// display updated user array in Node
			console.log('\x1b[32m', '\u2713 A messaging client user was added ++++++++++++++++++++++++++++','\x1b[0m' ); 
			console.log('\t Current User Array, users[' + usercount + "], is: ", users);

		} else {
			
			if (users.length > 0) {
				// used for clients on the same server machine
				if (isHostComputer) {				
					tmpData = tmpData.replace(/-HOST/gi, "ServerUser");
					tmpData = tmpData.replace(/HOST/gi, "ServerUser");
					// data = tmpData + '_' + usercount;
					data = tmpData.toString() + usercount.toString() ;
				}
			}

			users.push(data);
			
			socket.emit('userSet', {
				username: data,
				allusers: users,
				colorname: randomHexColor,
				iptitle: myHostip
			});
			
			// display updated user array in Node
			console.log('\x1b[32m', '\u2713 A messaging client user was added ++++++++++++++++++++++++++++','\x1b[0m' ); 
			console.log('\t Current User Array, users[' + usercount + "], is: " + users);
		}
	});

	socket.on('msg', function(data) {
		io.sockets.emit('newmsg', data); //Send message to everyone
	});

	socket.on('removeUser', function(data) {

		var usercount = users.length - 1;
		if (usercount <= 0) {usercount = ''} else {usercount -= 1}

		// filter remove name from array
		users = users.filter(function(e) {
			return e !== data
		});

		// display updated user array in Node
		console.log('\x1b[31m', '\u2717 A client user disconnected ----------------------------','\x1b[0m'); // display updated user array in Node
		console.log('\t Current User Array, users[' + usercount + '], is: ' + users);
		
		socket.broadcast.emit('updateUserDisplay', users);
		socket.emit('userRemove', users);

	});

	socket.on('disconnect', function() {
		socket.broadcast.emit('updateUserDisplay', users);
		console.log('\t - Disconnect flag from a socketio client. (socket disconnect)', '\x1b[0m');
	});

});

myHttpserver.listen(PORT, () => console.log(`\tListening on \[port :${ PORT }\]\n`));

/////////////

/* ---------------------------------------------------------------------
* ELECTRON
* ------------------------------------------------------------------ */

const {
	app,
	BrowserWindow,
	Menu,
	shell
} = require('electron'); // Electron specific vars

let mainWindow;

function createMainWindow() {

	// Create the browser window.
	/* My personal settings: 700x900
	 * tablet reff: 768 x 1024, -25% = 576x768
	 * */

	mainWindow = new BrowserWindow({
		width: 625,
		height: 850,
		icon: './myAssets/img/favicon.ico'
	});

	// electron menu json
	var myElectronMenu = Menu.buildFromTemplate([ { label: 'Menu', submenu: [ { label: 'Web Browser Instance', accelerator: 'CmdOrCtrl+`', click() { shell.openExternal(myHostip + ':7777/') } }, {type: 'separator'}, {role: 'minimize'}, {role: 'quit'} ] }, { label: 'View', submenu: [ {role: 'toggledevtools'}, {type: 'separator'}, {role: 'resetzoom'}, {role: 'zoomin'}, {role: 'zoomout'}, {type: 'separator'}, {role: 'togglefullscreen'} ] }, { label: 'About', submenu: [ { label: 'Github', click() { shell.openExternal('http://github.com/mezcel/') } }, { label: 'Development Wiki', click() { shell.openExternal('http://mezcel.wixsite.com/rosary') } }, { type: 'separator' }, { label: 'Wiki: Mod/Debug - BrowserWindow', click() { shell.openExternal('https://electronjs.org/docs/api/browser-window') } }, { label: 'Wiki: Mod/Debug - Menu', click() { shell.openExternal('https://electronjs.org/docs/api/menu') } } ] } ]);

	Menu.setApplicationMenu(myElectronMenu);

	// and load the index.html of the app.
	// mainWindow.loadFile('index.html'); // electron without messaging
	mainWindow.loadURL('http://localhost:7777'); // the express app


	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		mainWindow = null;
	});

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
	});

}

/////////////

/* ---------------------------------------------------------------------
* Run
* ------------------------------------------------------------------ */

app.on('ready', function() {
	createMainWindow();

});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function() {
	if (mainWindow === null) {
		createMainWindow();
	}
});
