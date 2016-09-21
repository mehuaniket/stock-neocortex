var express = require('express');
var app = express();

app.use('/img',express.static(__dirname + '/img'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/css',express.static(__dirname + '/css'));

//mongodb initialization
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

//mongodb function
var findNewsCrunch = function(db, callback) {
   var cursor =db.collection('moneystocknews').find({},{_id:0,totalnews:0,newsdesc:0}).sort({date:-1}).limit(5);
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};




app.get('/home', function (req, res) {
   res.sendFile( __dirname + "/" + "views/home.html" );
})

app.get('/newscrunch.json', function (req, res) {
  var result=db.getCollection('moneystocknews').find({},{_id:0,totalnews:0,newsdesc:0}).sort({date:-1}).limit(5);
  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log(err);
      return res.status(500).json(err);
   }

    findIco(db, function(err, icons) {
      if (err)
        res.status(500).json(err);
      else {
        if (!icons)
          res.status(204).send();
        else
          res.json(icons);
      }
      db.close();
      return;
    });
  });
});

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("neocortex app listening at http://%s:%s", host, port)

})
