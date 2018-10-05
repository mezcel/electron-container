# electron-container ( -w- jquery-mobile )
## I ported my jquery-mobile-rosary app to this electron demo

A Node App using ExpressJS, Socket IO, and Electron

> This is the social version of a previous Jquery-Mobile app I made a while back. The only thing new is the Electron and SocketIO implementation.

> Not sure if this would be considered a 'fork off the Heroku app versio'n or considered a whole 'new version', v4.2 or v5
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

* Should they all be modular indpendent running hosted apps loaded by Electron, or should they all be contained within Electron itself.

* Not sure what to do about that perpetual vertical scrollbar (a jqm side effect). I dont need it, but it is better to have it than not have it.

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
