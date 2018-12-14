/* index.js */
/* used for debugging side-projects and runs express and not electron */

console.log('\x1b[33m','______________________________________________________________________');
console.log('',"electron-container\n\t.");
console.log('','\tnode index.js');
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

function getRandomHexColor() {

	var letters = '012345'.split('');
	var hexcolor = '#';
	hexcolor += letters[Math.round(Math.random() * 5)];
	letters = '0123456789ABCDEF'.split('');

	for (var i = 0; i < 5; i++) {
		hexcolor += letters[Math.round(Math.random() * 15)];
	}

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

// var myHostip = "http://localhost"; // debug ip
var myHostip = "http://" + getIPvarString();
console.log("\n\tServer Ip = \x1b[4m" + myHostip + '\x1b[0m');

users = [];

io.on('connection', function(socket) {

	socket.on('setUsername', function(data) {
		var randomHexColor = getRandomHexColor();
		var usercount = users.length;

		if (users.indexOf(data) > -1) {
			socket.emit('userExists', data + ' username is allready taken! Try another username.');

			data = data + '\[' + usercount + '\]';

			users.push(data);
			socket.emit('userSet', {
				username: data,
				allusers: users,
				colorname: randomHexColor,
				iptitle: myHostip
			});

			console.log('\x1b[32m', '\u2713 A messaging client user was added ++','\x1b[0m' ); // display updated user array in Node

			console.log('\t Current User Array, users[' + usercount + "], is: ", users, "]");

		} else {

			users.push(data);
			socket.emit('userSet', {
				username: data,
				allusers: users,
				colorname: randomHexColor,
				iptitle: myHostip
			});

			console.log('\x1b[32m', '\u2713 A messaging client user was added ++','\x1b[0m' ); // display updated user array in Node

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
		console.log('\x1b[31m', '\u2717 A client user disconnected --','\x1b[0m'); // display updated user array in Node
		console.log('\t Current User Array, users[' + usercount + '], is: ' + users);
		socket.emit('userRemove', users);

	});

	socket.on('disconnect', function() {
		console.log('\t - Disconnect flag from a socketio client.', '\x1b[0m');
	});

});

myHttpserver.listen(PORT, () => console.log(`\tListening on \[port :${ PORT }\]\n`));
