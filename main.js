/* Express jquery-mobile */
/* --------------------------------------------------------------------------- */
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

/* --------------------------------------------------------------------------- */
/* Express Socket IO */

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
    console.log('A user connected');

    socket.on('setUsername', function(data) {
        var randomHexColor = getRandomHexColor();

        if (users.indexOf(data) > -1) {
            socket.emit('userExists', data + ' username is taken! Try some other username.');
        } else {

            users.push(data);
            socket.emit('userSet', {
                username: data,
                colorname: randomHexColor
            });
        }
    });

    socket.on('msg', function(data) {
        //Send message to everyone
        io.sockets.emit('newmsg', data);
    })
});

http.listen(3000, function() {
    console.log('listening on localhost:3000');
});

/* --------------------------------------------------------------------------- */
/* ELECTRON */
/*
    The nice thing about electron is that I dont need to manually mess with Express configs
    For my purposes, it works like a standalone non-server desktop html file
*/
const {
    app,
    shell,
    BrowserWindow,
    Menu
} = require('electron'); // Electron specific vars

let mainWindow, childWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 700,
        height: 900
    });

    var menu = Menu.buildFromTemplate(
    [
        {
            label: 'Menu',
            submenu: [{
                    label: 'Browser App',
                    click() {
                        shell.openExternal('http://localhost:7777/')
                    }
                },
                {
                    label: 'Exit',
                    click() {
                        app.quit()
                    }
                }]
        },
        {
            label: 'Msg',
            submenu: [
                {
                    label: 'Show',
                    click() {
                        childWindow.maximize();
                    }
                },
                {
                    label: 'Hide',
                    click() {
                        childWindow.minimize();
                    }
                },
                {type:'separator'},
                {
                    label: 'Browser Msg',
                    click() {
                        shell.openExternal('http://localhost:3000/');
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
                        shell.openExternal('http://github.com/mezcel/')
                    }
                },
                {type:'separator'},
                {
                    label: 'Mod/Debug - BrowserWindow',
                    click() {
                        shell.openExternal('https://electronjs.org/docs/api/browser-window')
                    }
                },
                {
                    label: 'Mod/Debug - Menu',
                    click() {
                        shell.openExternal('https://electronjs.org/docs/api/menu')
                    }
                }
            ]
        }
    ]);

    Menu.setApplicationMenu(menu);

    // and load the index.html of the app.
    mainWindow.loadFile('index.html');
    //mainWindow.loadURL(`http://localhost:7777/`)

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        mainWindow = null;
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

    childWindow.loadURL('https://github.com');
    childWindow.once('ready-to-show', () => {
        childWindow.show()
    });

    // and load the index.html of the app.
    //childWindow.loadFile('index.html');
    childWindow.loadURL(`http://localhost:3000/`)

    // Emitted when the window is closed.
    childWindow.on('closed', function() {
        childWindow = null;
    });
}

// app.on('ready', createWindow);
app.on('ready', function() {
    createWindow();
    createChildWindow();
    childWindow.minimize();
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
        createWindow();
    }
});
