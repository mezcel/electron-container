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

/***************************************************************
 * Multi-client UI related
 */
 
function getBrowser() {
   //https://jsfiddle.net/311aLtkz/
   // Opera 8.0+
   var isOpera = (window.opr && opr.addons) || window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
   // Firefox 1.0+
   var isFirefox = typeof InstallTrigger !== 'undefined';
   // Safari 3.0+ "[object HTMLElementConstructor]"
   var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
   // Internet Explorer 6-11
   var isIE = /*@cc_on!@*/false || document.documentMode;
   // Edge 20+
   var isEdge = !isIE && window.StyleMedia;
   // Chrome 1+
   var isChrome = window.chrome && window.chrome.webstore;
   // Blink engine detection
   var isBlink = (isChrome || isOpera) && window.CSS;

   if (isChrome) {
	   return "chrome";
   } else if (isOpera) {
	   return "isOpera";
   } else if (isIE) {
	   return "isIE";
   } else if (isSafari) {
	   return "isSafari";
   } else if (isFirefox) {
	   return "isFirefox";
   } else if (isBlink) {
	   return "isBlink";
   } else {
	   return " :)";
   }
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
	document.getElementById("myMessage").focus();
	$(window).scrollTop(0); // scroll back to top of page

};

/* msg info */

function sendmyMessageInfo() {

	var msg = "( Rule ) At least 2 users on network, one being the NodeJs server.";
	document.getElementById('myMessage').value = msg;
	
	msg = "<code>( Rule ) <i>Requires at least 2 users on network," + 
		" one being a <mark>NodeJs</mark> host server. The leader's name displays the ip address.</i></code>";
	
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
		document.getElementById("myMessage").focus();
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
