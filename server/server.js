const express = require('express');
const app = express();
const cors = require('cors');
const http = require("http").Server(app);
const io = require('socket.io')(http);
const socket = require('./socket')
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const path = require('path');


app.use(cors());
app.use(bodyParser.json());

const url = 'mongodb://localhost:27017';

app.get('/', function(req, res){
    res.sendFile(__dirname + '/../dist/index');
});


MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
    if (err) {return console.log(err)} else { console.log('database created!')}
    const dbName = 'mydb';
    const db = client.db(dbName);

    require('./routes/read.js')(db, app);
    require('./routes/getProduct.js')(db, app);
    require('./routes/add.js')(db, app);
    require('./routes/update.js')(db, app, ObjectID);
    require('./routes/remove.js')(db, app, ObjectID);
    require('./listen')(app, http);

});
