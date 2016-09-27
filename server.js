var express = require('express');
var app = express();

app.use('/img',express.static(__dirname + '/img'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/css',express.static(__dirname + '/css'));
app.use('/app',express.static(__dirname + '/app'));

//mongodb initialization
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/neocortex';

//mongodb function



app.get('/home', function (req, res) {
   res.sendFile( __dirname + "/" + "views/home.html" );
})

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

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("neocortex app listening at http://%s:%s", host, port)

})
