var myHostip = "http://localhost"; // debug ip
// var myHostip = "http://10.42.0.1"; // intended linux adhoc hosting
// var myHostip = "http://192.168.x.1xx"; // external router

/* --------------------------------------------------------------------------- */

function getIPvarString() {

    var os = require('os');

    var interfaces = os.networkInterfaces();
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            console.log('Available Network Interface Address\n',address.family + ' -', address.address); // debug
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }

    console.log('IPv4 Addresses: \n' + addresses, "Number of IPv4 Addresses: " + addresses.length + "\n"); // debug
    if (addresses.length < 1) {
        // default to 127.0.0.1
        returnIp = "http://localhost";
    } else {
        // just grab the 1st on the list
        // on a real deployment you may want give it a dedicated static ip (you are not inherently secure... expecially on Socket IO)
        returnIp = addresses[0];
    }

    return returnIp;
}

myHostip = "http://" + getIPvarString();

/* ---------------------------------------------------------------------------
 * Express jquery-mobile
 * -------------------------------------------------------------------------- */

function PrimaryAppViewExpress() {

    var myExpressJqm = require("express");
    var myAppJqm = myExpressJqm();

    // i am just going to use the root dir as a common root
    var myAppPath = __dirname + '/';

    myAppJqm.get("/", function(req, res) {
        // res.sendfile(myAppPath + "myViews/index.html");
        res.sendfile(myAppPath + "index.html");
    });

    myAppJqm.use(myExpressJqm.static(myAppPath));

    myAppJqm.use("*", function(req, res) {
        res.sendFile(myAppPath + "404.html");
    });

    myAppJqm.listen(7777, function() {
        console.log("Live at Port " + myHostip + ":7777", myAppPath);
    });

}

/* ---------------------------------------------------------------------------
 * Express Socket IO - Messaging Port
 * -------------------------------------------------------------------------- */

function SocketIOExpress() {

    var myAppMsgServer = require('express')(); // msg room gui
    var http = require('http').Server(myAppMsgServer);
    var io = require('socket.io')(http);
    var myAppPath = __dirname + '/';

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
        res.sendfile(myAppPath + 'myViews/index-msg.html');
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
                    allusers: users,
                    colorname: randomHexColor,
                    iptitle: myHostip
                });

                console.log('A user was added\n\t Current User Arr: ' + users); // display updated user array in Node
            }
        });

        socket.on('msg', function(data) {
            //Send message to everyone
            io.sockets.emit('newmsg', data);
        });

        socket.on('removeUser', function(data) {
            // filter remove name from array
            users = users.filter(function(e) {
                return e !== data
            });
            console.log('A user was removed\n\t Current User Arr: ' + users); // display updated user array in Node
            socket.emit('userRemove', users);
        });

        socket.on('disconnect', function() {
            console.log('a user disconnected'); // display updated user array in Node
        });

    });

    http.listen(3000, function() {
        console.log("listening on " + myHostip + ":3000");
    });
}


PrimaryAppViewExpress();
SocketIOExpress();

/* ---------------------------------------------------------------------------
 * ELECTRON
 * -------------------------------------------------------------------------- */

const {
    app,
    BrowserWindow,
    Menu,
    shell
} = require('electron'); // Electron specific vars

let mainWindow, childWindow, splash;

function createMainWindow() {

    // Create the browser window.
    mainWindow = new BrowserWindow({
        /* My personal settings: 700x900 */
        // tablet reff: 768 x 1024
        // -25% = 576x768
        width: 576,
        height: 768,
        icon: './myAssets/img/favicon.ico'
    });

    // electron menu json
    var myElectronMenu = Menu.buildFromTemplate(
        [
            {
                label: 'Menu',
                submenu: [
                    {
                        label: 'Web Browser Instance',
                        accelerator: 'CmdOrCtrl+`',
                        click() {
                            shell.openExternal(myHostip + ':7777/')
                        }
                    },
                    {type: 'separator'},
                    {role: 'minimize'},
                    {role: 'quit'}
                ]
            },
            {
                label: 'Messaging',
                submenu: [
                    {
                        label: 'Show Electron Messenger',
                        accelerator: 'CmdOrCtrl+Up',
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
                    {
                        type: 'separator'
                    },
                    {
                        label: 'WebBrowser Express Messaging',
                        click() {
                            shell.openExternal(myHostip + ':3000/');
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
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Wiki: Mod/Debug - BrowserWindow',
                        click() {
                            shell.openExternal('https://electronjs.org/docs/api/browser-window')
                        }
                    },
                    {
                        label: 'Wiki: Mod/Debug - Menu',
                        click() {
                            shell.openExternal('https://electronjs.org/docs/api/menu')
                        }
                    }
                ]
            }
        ]
    );

    Menu.setApplicationMenu(myElectronMenu);

    // and load the index.html of the app.
    mainWindow.loadFile('index.html');
    // mainWindow.loadFile(__dirname + '/index.html');

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    mainWindow.once('ready-to-show', () => {
        // splash.destroy();
        mainWindow.show();
    });

}

function createChildWindow() {

    childWindow = new BrowserWindow({
        parent: mainWindow,
        show: false,
        closable: false,
        width: 576,
        height: 520,
        icon: './myAssets/img/favicon.ico'
    });

    childWindow.once('ready-to-show', () => {
        childWindow.show()
    });

    // and load the index.html of the app.
    //childWindow.loadFile('index.html');
    childWindow.loadURL(myHostip + ':3000/');

    // Emitted when the window is closed.
    childWindow.on('closed', function() {
        childWindow = null;
    });

}

// Run the app 
  
app.on('ready', function() {
    createMainWindow();
    createChildWindow();
    childWindow.minimize();
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
