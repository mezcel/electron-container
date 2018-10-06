# electron-container ( -w- jquery-mobile )

### A port of an older [jquery-mobile-rosary](https://github.com/mezcel/rosary-jquery-mobile) app into ElectronJs

A Node App using ExpressJS, Socket IO, and Electron.

---

> This is the social version of a previous Jquery-Mobile app I made a while back. The only thing new is the Electron and SocketIO implementation.

> Not sure if this would be considered a 'fork' off the [Heroku app](https://github.com/mezcel/heroku-joyful-mystery) versio'n or considered a whole 'new version', v4.2 or v5
---

### My Rationale:

I wanted to assemble a working NodeJs refresher/refference featuring ExpressJS, Socket IO, and Electron. I am also playing the workflow of these NPM packages and how they compare with the workflow of other software API flavorss which do the same things. Trying out different things, I disovered some compatibility issues with specific versions of Bootstrap and Jquery. Electron on Win, Linux and Mac differ slightly on what features exist.

### Objective Goals:

* Skeleton-ish starter tamplate for future refference. (Mostly in the ```main.js```)
* Desktop and mobile app
* Works as a Server Hosted App.
* Send/Recieve communication between different instances

### Feature Objective:

* Focuses on Electron page loading

### Doubts:

Not sure if React would have been better than JQM. React would have had more UI features, but other than 'skinning', the JQM has all necessary UI built into it.

---

NPM Dependancies

```sh
# download and install dependancies
npm install

# start the app
npm start
```

## package.json

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
