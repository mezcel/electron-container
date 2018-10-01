var myHostip, myHostip2;
// var myHostip2= "http://localhost"; // debug ip
// var myHostip2= "http://10.42.0.1"; // adhoc hosting
// var myHostip2= "http://192.168.xxx.1xx"; // external router

var ipSubmenuJson = []; // array of existing ips

function ipVarriable() {
    /*  Depreciated because the last val overwites the global val
        ip display info
        this will overwite previous var when called by the Menu */
    var os = require( 'os' );
    var ipArr = [];
    var networkInterfaces = os.networkInterfaces( );
    var keysNetConnections = Object.keys(networkInterfaces);

    for (i = 0; i < keysNetConnections.length; i++) {
            ipinterfaceKey = keysNetConnections[i];
            tempIpAddr = "http://" + networkInterfaces[ipinterfaceKey][1].address;
            ipArr.push(tempIpAddr); // an array of ips, this may come in handy later
            ipSubmenuJson.push({ 
                label: tempIpAddr + ':3000/', 
                click() {                    
                    messagingAppView(tempIpAddr);
                    createChildWindow();
                    childWindow.loadURL(tempIpAddr + ':3000/');
                }
            });
    }
}

function ipVarriable2() {
    /**
     * A Workarround fix for ipVarriable()
     */
    var os = require('os');

    var interfaces = os.networkInterfaces();
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    
    if (addresses.length < 1) {
        // default to 127.0.0.1
        myHostip2="http://localhost";
    } else {
        // just grab the 1st on the list
        myHostip2=addresses[0];
    }
    
    console.log(addresses, addresses.length, myHostip2);
}

/* --------------------------------------------------------------------------- */
/* Express with jquery-mobile DOM */
/* --------------------------------------------------------------------------- */

function standaloneAppView() {

    var myExpressJqm = require("express");
    var myAppJqm = myExpressJqm();

    // i am just going to use the root dir as a common root
    var myAppPath = __dirname + '/';

    myAppJqm.get("/", function(req, res) {
        res.sendfile(myAppPath + "myViews/index.html");
    });

    myAppJqm.use(myExpressJqm.static(myAppPath));

    myAppJqm.use("*", function(req, res) {
        res.sendFile(myAppPath + "404.html");
    });

    myAppJqm.listen(7777, function() {
        console.log("Live at Port 7777", myAppPath );
    });
    
}

/* --------------------------------------------------------------------------- */
/* Express Socket IO with Vanilla JS DOM*/
/* --------------------------------------------------------------------------- */

function messagingAppView(myHostip) {

    var myAppMsgServer = require('express')(); // msg room gui
    var http = require('http').Server(myAppMsgServer);
    var io = require('socket.io')(http);
    
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
    
    myAppMsgServer.get('/', function(req, res) {
        res.sendfile('myViews/index-msg.html');
    });
    
    users = [];
    io.on('connection', function(socket) {
    
        socket.on('setUsername', function(data) {
            var randomHexColor = getRandomHexColor();
    
            if (users.indexOf(data) > -1) {
                socket.emit('userExists', data + ' username is taken! Try some other username.');
            } else {    
                users.push(data);
                socket.emit('userSet', {
                    username: data,
                    colorname: randomHexColor,
                    iptitle: myHostip2
                });
            }
        });
    
        socket.on('msg', function(data) {
            //Send message to everyone
            io.sockets.emit('newmsg', data);
        })
    });
    
    http.listen(3000, function() {
        console.log("listening on Port :3000");
    });
}

// Populate Ip Server Menu Json Var
ipVarriable(); // used for menu, (not needed otherwise)
ipVarriable2(); // used for dom display flag and ip init

// Activate Electron Hosted Pages
standaloneAppView();
// messagingAppView();

/* --------------------------------------------------------------------------- */
/* ELECTRON */
/*
    The nice thing about electron is that I dont need to manually mess with Express configs
    For my purposes, it works like a standalone non-server desktop html file
*/

const {
    app,
    appMenuModal,
    BrowserWindow,
    Menu
} = require('electron'); // Electron specific vars

let mainWindow, childWindow;

function createMainWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 700,
        height: 900
    });

    var menuJsonArr = [
        {
            label: 'Menu',
            submenu: [{
                    label: 'Web Browser Standalone Instance',
                    click() {
                        appMenuModal.openExternal(myHostip2 + ':7777/')
                    }
                },
                {
                    label: 'Quit Electron',
                    click() {
                        app.quit()
                    }
                }]
        },
        {
            label: 'Messaging',
            submenu: [
                {
                    label: 'Show Electron Messenger',
                    click() {
                        childWindow.maximize();
                    }
                },
                {
                    label: 'Hide Electron Messenger',
                    click() {
                        childWindow.minimize();
                    }
                },
                {type:'separator'},
                {
                    label: 'WebBrowser Express Messaging',
                    click() {
                        appMenuModal.openExternal(myHostip2+ ':3000/');
                    }
                }
            ]
        },
        {
            label: 'About',
            submenu: [
                {
                    label: 'Github',
                    click() {
                        appMenuModal.openExternal('http://github.com/mezcel/')
                    }
                },
                {type:'separator'},
                {
                    label: 'Wiki: Mod/Debug - BrowserWindow',
                    click() {
                        appMenuModal.openExternal('https://electronjs.org/docs/api/browser-window')
                    }
                },
                {
                    label: 'Wiki: Mod/Debug - Menu',
                    click() {
                        appMenuModal.openExternal('https://electronjs.org/docs/api/menu')
                    }
                }
            ]
        }
    ];

    var pushIpOptions = {
        label: 'Message Server Options',
        submenu: ipSubmenuJson
    };

    menuJsonArr.push(pushIpOptions);

    var myElectronMenu = Menu.buildFromTemplate(menuJsonArr);

    Menu.setApplicationMenu(myElectronMenu);

    // and load the index.html of the app.
    mainWindow.loadFile('index.html');
    //mainWindow.loadURL(`http://localhost:7777/`)

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    mainWindow.once('ready-to-show', () => {
        splash.destroy();
        mainWindow.show();
    });
}

function createChildWindow() {

    childWindow = new BrowserWindow({
        parent: mainWindow,
        show: false,
        closable: false,
        width: 700,
        height: 500
    });

    //childWindow.loadURL('https://github.com');
    childWindow.once('ready-to-show', () => {
        childWindow.show()
    });

    // and load the index.html of the app.
    //childWindow.loadURL(myHostip2+ ':3000/');

    // Emitted when the window is closed.
    childWindow.on('closed', function() {
        childWindow = null;
    });
}

// app.on('ready', createMainWindow);
app.on('ready', function() {
    createMainWindow();
    //createChildWindow();
    //childWindow.minimize();
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


