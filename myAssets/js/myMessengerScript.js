/*  myAssets/js/myMessengerScript.js */

var user, usercolor, usersAll, thisClientName, thisClientNameColor;
var socket = io();

// Messenger Keyboard event handler
function msgKeyUpEvent() {
	// Get the input field
	var inputEventMsg = document.getElementById("myMessage");
	inputEventMsg.addEventListener("keyup", function(mymessageevent) {
		// Number 13 is the "Enter" key on the keyboard
		if (mymessageevent.keyCode === 13) {
			sendmyMessage();
		}
	});
}

/***********************************************************************
 * Socket.io functions
 * */

/* log user */
function setUsername() {
	thisClientName = document.getElementById('myName').value;

	if (thisClientName == '') {
		/*
		var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var string_length = 4;
		var randomstring = '';

		for (var i=0; i<string_length; i++) {
			var rnum = Math.floor(Math.random() * chars.length);
			randomstring += chars.substring(rnum,rnum+1);
		}
		*/

		var x = location.hostname;
		thisClientName = 'user\@'+x;
	}

	socket.emit('setUsername', thisClientName);

};

/* log out user */
function removeUsername() {
	socket.emit('removeUser', thisClientName);
};

/* msg history */
function sendmyMessage() {

	var msg = document.getElementById('myMessage').value;
	var divUsers = document.getElementById("divAllUsers").innerHTML;
	if (msg) {
		socket.emit('msg', {
			myMessage: msg,
			user: user,
			usercolor: usercolor,
			usersAll: divUsers
		});
	}
	document.getElementById('myMessage').value = "";
	document.getElementById("myMessage").focus();
	$(window).scrollTop(0); // scroll back to top of page

};

/***********************************************************************
 * Socket.io events
 * */

socket.on('userExists', function(data) {
	document.getElementById('error-container').innerHTML = data;
});

socket.on('userSet', function(data) {
	user = data.username;
	usercolor = data.colorname;
	usersAll = data.allusers;
	thisClientNameColor = usercolor;

	document.getElementById("divAllUsers").innerHTML = usersAll;
	document.getElementById("myMessage").value = '<i style="color: ' + usercolor + '">*** ' + user + ' joined the msg room ***</i>';

	sendmyMessage();
	msgKeyUpEvent(); // event binding
});

socket.on('userRemove', function(users) {
	document.getElementById("divAllUsers").innerHTML = users;
	document.getElementById('myMessage').value = '<i style="color: ' + thisClientNameColor + '">*** ' + thisClientName + ' has left the msg room ***</i>';
	sendmyMessage();
	window.close();
});

socket.on('newmsg', function(data) {
	if (user) {
		document.getElementById('myMessageContainer').innerHTML = '<div class="ui-corner-all ui-body ui-shadow"> <b style="color: ' + data.usercolor + '">' + data.user + '</b>: ' + data.myMessage + '</div>' + document.getElementById('myMessageContainer').innerHTML;
		document.getElementById("divAllUsers").innerHTML = data.usersAll;
	}
});

window.addEventListener("beforeunload", function(e) {
	removeUsername(); // this function never finishes when called by "beforeunload"
}, false);
