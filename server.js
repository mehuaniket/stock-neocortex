var express = require('express');
var app = express();

app.use('/img',express.static(__dirname + '/img'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/css',express.static(__dirname + '/css'));
app.use('/app',express.static(__dirname + '/app'));

//modules initialization
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var path=require('path');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/neocortex';

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.get('/home',isLoggedIn,function (req, res) {
     res.sendFile(path.join(__dirname + "/views/home.html"));
});

app.get('/newscrunch', function (req, res) {
  var value=10
  MongoClient.connect(url, function(err, db) {
    var getNewsCrunch = function(value, cb) {
      db.collection('moneystocknews').find({},{_id:0,totalnews:0,newsdesc:0}).sort({date:-1}).limit(value).toArray(cb);
   }
  assert.equal(null, err);
  console.log("Connected correctly to server.");

  getNewsCrunch(value, function(err, data){
      if (err) {
           console.log(err);
           return res(err);
          }
      else {
           console.log(data);
           return res.json(data);
          }
      });
  db.close();
  });


});

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("neocortex app listening at http://%s:%s", host, port)

})
