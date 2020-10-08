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
const formidable = require('formidable');



//For some reason had to remove the listen import from MongoDB connection function.
server = require('./listen')(app, http);
module.exports = server

app.use(cors());
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "../dist/images")))
app.use('/userImages', express.static(path.join(__dirname, '../src/assets/userImages')))

const url = 'mongodb://localhost:27017';


// MongoDB connection
MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
    if (err) {return console.log(err)} else { console.log('database created!')}
    const dbName = 'chatAppDB';
    const db = client.db(dbName);

    require('./routes/read.js')(db, app);
    require('./routes/getUser.js')(db, app);
    require('./routes/auth.js')(db, app);
    require('./routes/add.js')(db, app);
    require('./routes/imgUpload.js')(db, app, formidable);
    require('./routes/update.js')(db, app, ObjectID);
    require('./routes/remove.js')(db, app, ObjectID);
    // require('./listen')(app, http);
    socket.connect(io, db)
});


// return server