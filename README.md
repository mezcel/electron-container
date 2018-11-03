# electron-container ( -w- jquery-mobile )

___This is a Node App using ExpressJS, Socket IO, and Electron.___

Git: [https://github.com/mezcel/electron-container](https://github.com/mezcel/electron-container)

Status: ```git branch v0.4.3``` is focused on gradually polishing the:
* misc content within db json
* misc. styles and ui tweaks
* splash is new-ish. it is very basic

---

### Development thoughts:

* I expanded on the [Heroku app](https://github.com/mezcel/heroku-joyful-mystery), got rid of the ```ejs``` components, added ```socketio``` features, and made it an Electron App.
* The user experience now closer resembles an even older C# version I made a while back, [rosary.net](https://github.com/mezcel/rosary.net).

###### Translation Modifications
I ended up rewriting all the db's.
* [/myAssets/database/README.md](./myAssets/database/README.md) Has more information regarding what is new with the DB.

---

### Main Goals:

* Desktop standalone and mobile networked app
* Works as a Server Hosted App.
* Send/Receive text communication between different app instances

### Intended user:

* local intranet or ad-hoc networks
* absolutely trusted private networks
* servers hosted on mobile devices with NodeJs server
* 1-8 Clients who turn off application when not using it

### Key Features:

* ExpressJs Node Server
* SocketIO instant messaging
* Weekday calendar date specific app events
* Modular json db
* Color themes and keyboard shortcuts
* NAB English/Vulgate Latin Scripture languages

## NPM

NPM Dependencies

```sh
# download and install dependencies
npm install

# start the app
npm start
```

package.json

```json
{
    "main": "main.js",
    "scripts": {
        "start": "electron ."
    },
    "devDependencies": {
        "electron": "^2.0.0"
    },
    "dependencies": {
        "express": "^4.16.3",
        "jquery": "^1.11.1",
        "popper.js": "^1.14.4",
        "socket.io": "^2.1.1"
    }
}
```

---

## Build as a standalone executable

If you want to build this app into a standalone executable, use ```electron-packager```

```sh
## Globally install electron-packager

npm install -g electron-packager

## Linux install workaround/fix
##      sudo npm install electron -g --unsafe-perm=true --verbose --allow-root


## perform the packager on my desired Electron App directory.

electron-packager .
```

---

Repo size proportions (aproximately)

dir | MiB
--- | ---
Git Clone | 79.6
Git with Node packages | 261.1
Just the ```main branch``` files | 14.5
