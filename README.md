# electron-container ( -w- jquery-mobile )

___This is a Node App using ExpressJS, Socket IO, and Electron.___

Git: [https://github.com/mezcel/electron-container](https://github.com/mezcel/electron-container)

```git branch v0.4.2``` is focused on ```ajax```. I want to avoid using ```ejs```, I think ajax script will be more compatible and overlap-able


---

### Development thoughts, rationale, and pending changes:

* This is the social version of a previous Jquery-Mobile app I made a while back. The Electron and SocketIO implementation is new and I discovered some additional jqm theme techniques along the way.

    * [/myAssets/database/README.md](./myAssets/database/README.md) Has more information regarding what is new with the DB.


* Not sure if this would be considered a 'fork' off the [Heroku app](https://github.com/mezcel/heroku-joyful-mystery) version or considered a whole 'new version', ex: v4.2 or v5

    * That version is depreciated and not maintained.
    * Heroku was an Express App with Ejs. This still uses Express, but I avoided ejs.

* The user experience closer resembles an even older C# rosary version I made a while back, [rosary.net](https://github.com/mezcel/rosary.net). (_It has less features and visuals, but now it now falls under the category of social networking application again._)

##### Readability?
* Many versions ago I produced a DB from a pamphlet. That db went though various transposing from: css, odb, sql, mysql, json, and a slew of other Regex style parsing. Somewhere I may have even scraped an online resource to auto generated a db.
* When I started to do the English/Latin translation I discovered a lot of inconsistencies.
* The version as it is now is not as charismatic as my original source DB, but it is at least consistent with the NAB and Vulgate.

---

### Main Goals:

* Desktop standalone and mobile networked app
* Works as a Server Hosted App.
* Send/Receive text communication between different app instances

### Intended user:

* local intranet or ad-hoc networks
* servers hosted on mobile devices with NodeJs server
* 1-8 Clients who turn off application when not using it
* absolutely trusted private networks


### Key Features:

* Focuses on Electron page loading and modals
* Express instant messaging
* Date specific app events
* modular json db
* themes and keyboard shortcuts
* New: English/Latin languages

### Ideas for another version:

React has good reviews regarding having the cross compatibility and robust features to compete with Swift and Andriod Studio Apps. Perhaps if I want to beef up the Social networking features, I will consider it. JQM was pretty much a 1 stop shop, and it is lighter in weight than Bootstrap/Angular and other leading frameworks. I found myself having to 'make stuff' as needed with JQM and JQM apps look like Jqm. _...The iPhone 1 generation know what I mean._

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

## Build as an executable

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
