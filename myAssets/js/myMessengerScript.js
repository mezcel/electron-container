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
	
	var isHostServer = false;
	var isAnnomouse = false;
	var clientIp = location.hostname;
	
	thisClientName = document.getElementById('myName').value;
	
	if (clientIp == 'localhost') {
		isHostServer = true;
	}
	
	if (thisClientName == '') {
		isAnnomouse = true;		
	}
	
	if (isAnnomouse && !isHostServer) {		
		thisClientName = "user";		
	}
	
	if (isHostServer) {
		
		if (isAnnomouse) {
			thisClientName = "HOST";
		} else {
			thisClientName = thisClientName + "-HOST";
		}
		
	}

	socket.emit('setUsername', thisClientName);

};

/* log out user - remove user name from server */
function removeUsername() {
	socket.emit('removeUser', thisClientName);
};

/* msg history */
function sendmyMessage() {

	var msg = document.getElementById('myMessage').value;
		msg += "<br><font size='2' color='gray'><i> -\[" + messengerBeadProgress + "\]- </i></font>";
		
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
	// document.getElementById("myMessage").focus();
	$(window).scrollTop(0); // scroll back to top of page

};

/* msg info */

function sendmyMessageInfo() {
	
	var msg = "-\[" + messengerBeadProgress + "\]-";	
	document.getElementById('myMessage').value = msg;
	
	msg = "<font size='2' color='gray'><i> -\[" + messengerBeadProgress + "\]- </i></font>";
	
	var divUsers = document.getElementById("divAllUsers").innerHTML;
	if (divUsers.length > 0) {
		if (msg) {
			socket.emit('msg', {
				myMessage: msg,
				user: user,
				usercolor: usercolor,
				usersAll: divUsers
			});
		}
		document.getElementById('myMessage').value = "";
		// document.getElementById("myMessage").focus();
		$(window).scrollTop(0); // scroll back to top of page
	}
	
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

	var timeStamp = new Date();
	document.getElementById("divAllUsers").innerHTML = usersAll;
	document.getElementById("myMessage").value = '<i style="color: ' + usercolor + 
		'">*** joined ***</i><br><code>' + timeStamp + '</code>';

	sendmyMessage();
	msgKeyUpEvent(); // event binding
});

socket.on('userRemove', function(users) {
	document.getElementById("divAllUsers").innerHTML = users;
	document.getElementById('myMessage').value = '<i style="color: ' + thisClientNameColor + 
		'">*** ' + thisClientName + ' has left the msg room ***</i>';
		
	sendmyMessage();
	// window.close();
});

socket.on('updateUserDisplay', function(users) {
	// usersAll = data.allusers;
	document.getElementById("divAllUsers").innerHTML = users;
});

socket.on('newmsg', function(data) {
	if (user) {
		document.getElementById('myMessageContainer').innerHTML = 
			'<div class="ui-corner-all ui-body ui-shadow"> <b style="color: ' + 
			data.usercolor + '">' + data.user + '</b>: ' + data.myMessage + '</div>' + 
			document.getElementById('myMessageContainer').innerHTML;
		
		document.getElementById("divAllUsers").innerHTML = data.usersAll;
	}
});

window.addEventListener("beforeunload", function(e) {
	removeUsername(); // this function never finishes when called by "beforeunload"
}, false);
