# electron-container ( -w- jquery-mobile )

```git branch v0.3.2-vulgate``` is focused on making a .json db based on the Latin Vulgate translation of the Bible

> A port of an older html web page, [jquery-mobile-rosary](https://github.com/mezcel/rosary-jquery-mobile), into ElectronJs.

I am still making the Vulgate translation. I also need to go back and find misc typos and 7x77 check all the verses. After all the edits and dynamic automation... I am sure something got overlooked.

> I am pretty sure I screwed up the Old Testament organization and translation. Fyi.

```The quotes are right, but the DB is not a 100% match with of the some book/verse pointers between the different translations. I discovered a lot of mismatching when I was overwriting the Vulgate from the Usccb template. I may need to curate my own scripture package. For now I just going to try to 'fix' this one.```

Messed with jQuery Mobile themes:

* added liturgical calender colors. [themeroller link](https://themeroller.jquerymobile.com:443/?ver=1.4.5&style_id=20181026-7)
* fixed week day initializations
* translation place holder

> This is a Node App using ExpressJS, Socket IO, and Electron.

---

### My Thoughts, Rationale, and Ramblings:

I wanted to assemble a working NodeJs refresher/reference featuring ExpressJS, Socket IO, and Electron. I am also playing the workflow of these NPM packages and how they compare with the workflow of other software API flavors which do the same things. Trying out different things, I discovered some compatibility issues with specific versions of Bootstrap and Jquery. Electron on Win, Linux and Mac differ slightly on what features exist.

* This is the social version of a previous Jquery-Mobile app I made a while back. The only thing new is the Electron and SocketIO implementation.

* Not sure if this would be considered a 'fork' off the [Heroku app](https://github.com/mezcel/heroku-joyful-mystery) version or considered a whole 'new version', ex: v4.2 or v5

* The user experience closer resembles an even older rosary version I made a while back, [rosary.net](https://github.com/mezcel/rosary.net). (_It has less features and visuals, but now it now falls under the category of social networking application again._)

---

### Main Goals:


* Desktop standalone and mobile networked app
* Works as a Server Hosted App.
* Send/Receive text communication between different app instances

### Key Features:

* Focuses on Electron page loading and modals
* Express instant messaging
* Date specific app events
* modular json db

### Ideas for the next version:

I wonder if React would have been better than JQM. React would have had more UI features, but other than 'skinning', the JQM has all necessary UI built into it. Jqm was quicker ```for me``` because of its fixed and consistent platform constraints. React would have been more feature rich and robust, but would demand more development polishing and fine tuning to account for all the variable options React has.

Perhaps that will be another version later down the road. A Swift(iOS)/VS2017(.Net) style app.

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
