/*  myAssets/js/myMessengerScript.js */

var user, usercolor, usersAll, thisClientName, thisClientNameColor;
var uniqueUser = false;// flag if a unique user was set 

try {
	// try/catch is for when I debug between electron vs express mods
    var socket = io();
}
catch(err) {
    alert(err.message);
}

/* log user */
function setUsername() {
	thisClientName = document.getElementById('myName').value;
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

	
};

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

	uniqueUser = true; // unique user flag
	messengerFeatureButton(); // defined in myScript.js
	
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
		document.getElementById('myMessage-container').innerHTML = '<div> <b style="color: ' + data.usercolor + '">' + data.user + '</b>: ' + data.myMessage + '</div>' + document.getElementById('myMessage-container').innerHTML;
		document.getElementById("divAllUsers").innerHTML = data.usersAll;
	}
});

window.addEventListener("beforeunload", function(e) {
	removeUsername(); // this function never finishes when called by "beforeunload"
}, false);

// Keyboard event handler
function userNameKeyUpEvent() {
	// Get the input field
	var inputEventUser = document.getElementById("myName");
	inputEventUser.addEventListener("keyup", function(mynameevent) {
		// Number 13 is the "Enter" key on the keyboard
		if (mynameevent.keyCode === 13) {
			setUsername();
		}
	});
}

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

//userNameKeyUpEvent();
