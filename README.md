# electron-container ( -w- jquery-mobile )
## I ported my jquery-mobile-rosary app to this electron demo

A Node App using ExpressJS, Socket IO, and Electron

> This is the social version of a previous Jquery-Mobile app I made a while back. The only thing new is the Electron and SocketIO implementation.

---

### Personal Objective Note::

I wanted to assemble a working NodeJs refresher/refference featuring ExpressJS, Socket IO, and Electron. I am also playing the workflow of these NPM packages and how they compare with the workflow of other software API flavorss which do the same things. Trying out different things, I disovered some issues with specific versions of Bootstrap and Jquery. Electron on Win, Linux and Mac differ slightly on what features are exist. I will scrap out the features that don't exist equally on all OS's.

### Objective Goals:

* Skeleton-ish starter refference bench tamplate. (Mostly in the ```main.js```)
* Works as a Desktop Standalone App
* Works as a Server Hosted App.
* Send/Recieve communication between different instances

### Feature Objective:

* Focuses on Electron page loading

### Still learning:

* What is the best way to cram multiple different features in one Electron App?

* Should they all be independent running hosted apps loaded by Electron, or should they all be contained within Electron itself.

* Still messing with modal-like features.

---

## package.json

NPM

```sh
# download and install dependancies
npm install

# start the app
npm start
```

Dependancies

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
        "bootstrap3": "^3.3.5",
        "express": "^4.16.3",
        "jquery": "^1.11.1",
        "popper.js": "^1.14.4",
        "socket.io": "^2.1.1"
    }
}
```
