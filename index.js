const express = require ('express');
const Parse = require ('parse/node');
const ParseServer = require('parse-server').ParseServer
const ParseDashboard = require('parse-dashboard');
const app = express();

const api = new ParseServer({
    databaseURI: 'mongodb://localhost:27017/parse-test', // Connection string for your MongoDB database
    // cloud: '/home/myApp/cloud/main.js', // Absolute path to your Cloud Code
    appId: 'myAppId',
    masterKey: 'myMasterKey', // Keep this key secret!
    fileKey: 'optionalFileKey',
    serverURL: 'http://localhost:3000/parse', // Don't forget to change to https if needed
    javaScriptKey: 'myJSKey'
});


Parse.initialize('myAppId', 'myJSKey');
Parse.masterKey = 'myMasterKey';
Parse.serverURL = 'http://localhost:3000/parse';

app.use('/parse', api);

const dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": "http://localhost:3000/parse",
            "appId": "myAppId",
            "masterKey": "myMasterKey",
            "appName": "Testing Parse Server"
        }
    ]
});

app.use('/dashboard', dashboard);

app.get('/testParse', (req, res) => {
    const Obj = Parse.Object.extend('gameScore');
    const obj = new Obj ();

    obj.set('name', 'Mandar');
    obj.set('city', 'Aurangabad');
    obj.save().then(() => {
       res.status(200).json(obj);
    });
});

app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Successfully setup' });
});

app.listen(3000, () => {
    console.log('Server started on 3000');
});
