# ExpressJS assets

Called from within Electron ```root```
```js
// Nodejs parent file
var myAppPath = __dirname + '/';
expressApp.get('/', function(req, res){
    res.sendFile(myAppPath + "index.html");
});
```
