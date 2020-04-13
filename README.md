# electron-container ( -w- jquery-mobile )

___This is a Node App using ExpressJS, Socket IO, and Electron.___

## 1.0 About:

A colorful ```scripture rosary``` for NodeJs.

* Electron client container with a JQM UI.

Primary features:

* It contains NAB English & Vulgate Latin translation options.
* Has a meditative audio option.
* Imports daily Mass readings (online only).
* Optional multi-user group communication with bead progress updates.

Youtube Demo:

* General mechanics [outdated demo](https://youtu.be/SZ9aQIspbvs), not the newest version.
* [screenshots](./demo-screenshots/)

---

## 2.0 Development Background:

### 2.1 Main Dev Objective:

* Desktop standalone and mobile networked app
* Works as a Server Hosted app and as a Client recipiant app.
* Send/Receive text communication between different app instances.

### 2.2 Intended usecase:

* Academic reference
* Local intranet or ad-hoc networks (trusted)
* Servers hosted on mobile devices with NodeJs server

### 2.3 Key Features:

* ExpressJs Service
* SocketIO instant messaging
* Color themes and keyboard shortcuts
* NAB English/Vulgate Latin Scripture languages
* Liturgical Calendar Day Flag
* Daily web scraped mass readings (single online user feature)

---

## 3.0 NPM Installation

### 3.1 NPM Dependencies

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

### 3.2 OS Platforms

Electron development for Ubuntu Linux ```install-electron-debian.sh```

Electron development for Arch Linux ```install-electron-arch.sh```

Win10 just requires a standard [Node JS download](https://nodejs.org/en/download/)

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

## 4.0 Extras:

### 4.1 Build as a standalone executable

If you want to build this app into a standalone executable, use ```electron-packager```

```sh
## Globally install electron-packager

npm install -g electron-packager

## Linux install workaround/fix
## sudo npm install electron -g --unsafe-perm=true --verbose --allow-root


## perform the packager on my desired Electron App directory.

electron-packager .
```

### 4.1 Testing Notes

Repo size proportions (approximately)

dir | MiB
--- | ---
./myAssets | 8-9

Dev Testing:

* _Host Computer_: Best performance experienced on Win10 and Arch/Debian Linux.

* _Client Computer_: Best experience on desktop/laptop sized and mobile device sized monitors. (abandoned Safari development)

	* the tablet and mobile screen sizes are approximations based on old device standards.
