const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//connect to database
mongoose.connect(config.database);

//on connect
mongoose.connection.on('connected', function(){
  console.log('Connected to DB ' + config.database);
});

//on error
mongoose.connection.on('error', function(err){
  console.log('Database error: ' + err);
});

const app = express();

const users = require('./routes/users');

const port = 3000;

//cors middleware
app.use(cors());

//set static (client side) folder contains all angular code
app.use(express.static(path.join(__dirname, 'client')));

//body parser middleware
app.use(bodyParser.json());

//passport middlewear
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/users', users);

app.get('/', function(req, res){
  res.send('Invalid Endpoint');
});

app.listen(port, function(){
  console.log('Server started on port ' + port);
});
