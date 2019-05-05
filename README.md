# electron-container ( -w- jquery-mobile )

___This is a Node App using ExpressJS, Socket IO, and Electron.___

A colorfull yet minimal ```scripture rosary``` for NodeJs.

* It contains NAB English & Vulgate Latin translation options.
* Has a medatative audio option.
* Imports daily Mass readings (online only).
* Optional multi-user group communication with bead progress updates.

Youtube: Very old [outdated demo](https://youtu.be/xlhLjpW-QMs)



---

__Development Status:__ Latest development branch ```git branch v0.5.2.1``` is focused on:

* (mostly ui touchups)

* __Note:__ Scrapped development for iOS because the .json files are too much for Safari. The Messenger feature still works on the iOS. ***The "Messenger's" true purpose is not for talking(distraction), it is for synchronizing multiple devices. I use the "Messenger" for debugging the different user states.*** But since it's in there ... may as well.

---

### Main Dev Objective:

* Desktop standalone and mobile networked app
* Works as a Server Hosted app and as a Client recipiant app.
* Send/Receive text communication between different app instances.

### Intended usecase:

* Academic refference
* Local intranet or ad-hoc networks (trusted)
* Servers hosted on mobile devices with NodeJs server

### Key Features:

* ExpressJs Service
* SocketIO instant messaging
* Color themes and keyboard shortcuts
* NAB English/Vulgate Latin Scripture languages
* Liturgical Calendar Day Flag
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
./myAssets | 8-9

Dev Testing:

* _Host Computer_: Best performance experienced on Win10 and Arch/Debian Linux.

* _Client Computer_: Best experience on desktop/laptop sized and mobile device sized monitors. (scrapped Safari development)
