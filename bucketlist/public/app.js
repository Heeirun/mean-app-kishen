// declaring dependencies

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const bucketlist = require('./controllers/bucketlist');
const config = require('./config/database');

// initializing the app
const app = express();
// declaring the port
const port = 3000;

// Connect mongoose to our database
mongoose.connect(config.database);

// BEGIN to load middleware
// Middleware for corse loaded
app.use(cors());

// Middleware for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

/*express.static is a built in middleware function to serve static files.
 We are telling express server public folder is the place to look for the static files
*/
app.use(express.static(path.join(__dirname, 'public')));

// Routing all HTTP requests to /bucketlist to bucketlist controller
app.use('/bucketlist',bucketlist);


app.get('/', (req,res) => {
    res.send("Invalid page! Nodemon enabled!");
})

//Listen to port 3000
app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});
