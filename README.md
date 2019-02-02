# electron-container ( -w- jquery-mobile )

___This is a Node App using ExpressJS, Socket IO, and Electron.___

Minimal yet colorfull Scripture Rosary for NodeJs. It contains Vulgate Latin translations and runs on Express or Electron.

Git: [https://github.com/mezcel/electron-container](https://github.com/mezcel/electron-container)

Youtube: [demo link](https://youtu.be/xlhLjpW-QMs)

Best performance experienced on Win10 and Debian

__Status:__ Latest development branch ```git branch v0.5``` is focused on:

* Integrated features used in [jq-tput-terminal](https://github.com/mezcel/jq-tput-terminal)
* Included a Liturgical Calendar based on Paschal Full Moon schedule
* Included Daily mass reading scraped from usccb.org using the [whateverorigin.org](www.whateverorigin.org/) service.
    * Note: consider [wgetjs](https://www.npmjs.com/package/wgetjs) for continued development.

---

### Main Dev Objective:

* Desktop standalone and mobile networked app
* Works as a Server Hosted App.
* Send/Receive text communication between different app instances

### Intended user:

* Local intranet or ad-hoc networks
* Absolutely trusted private networks
* Servers hosted on mobile devices with NodeJs server
* 1-8 Clients who will turn off application when not using it

### Key Features:

* ExpressJs Node Server
* SocketIO instant messaging
* Weekday calendar date specific app events
* Modular json db
* Color themes and keyboard shortcuts
* NAB English/Vulgate Latin Scripture languages
* Liturgical Calendar Calculator
* Daily web scraped mass readings (single online user feature)

---

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

Electron development for Ubuntu Linux ```install-electron-debian.sh```

Electron development for Arch Linux ```install-electron-arch.sh```

```sh
## Arch

sudo pacman -S --needed nodejs
sudo pacman -S --needed npm

npm install --arch=ia64 electron
npm install --platform=linux electron
npm install electron -g

## install this app's node packages, you can do this 1st or last

npm install
```
---

## Build as a standalone executable

If you want to build this app into a standalone executable, use ```electron-packager```

```sh
## Globally install electron-packager

npm install -g electron-packager

## Linux install workaround/fix
## sudo npm install electron -g --unsafe-perm=true --verbose --allow-root


## perform the packager on my desired Electron App directory.

electron-packager .
```
---

Repo size proportions (aproximately)

dir | MiB
--- | ---
./myAssets | 9 - 10
