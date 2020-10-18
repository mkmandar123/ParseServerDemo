const express = require ('express');
const Parse = require ('parse/node');
const ParseServer = require('parse-server').ParseServer
const ParseDashboard = require('parse-dashboard');
const app = express();

const api = new ParseServer({
    databaseURI: process.env.DB_URL, // Connection string for your MongoDB database
    cloud: './cloud.js', // Absolute path to your Cloud Code
    appId: process.env.app_id,
    masterKey: process.env.master_key, // Keep this key secret!
    serverURL: process.env.server_url, // Don't forget to change to https if needed
    javaScriptKey: process.env.js_key
});


Parse.initialize(process.env.app_id, process.env.js_key);
Parse.masterKey = process.env.master_key;
Parse.serverURL = process.env.server_url;

app.use('/parse', api);

const dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": process.env.server_url,
            "appId": process.env.app_id,
            "masterKey": process.env.master_key,
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

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on 3000');
});
