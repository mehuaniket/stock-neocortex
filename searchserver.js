var express = require('express');
var app = express();
var databaseUrl = "mongodb://localhost:27017/neocortex"
var mongojs = require('mongojs')
var db = mongojs(databaseUrl,['moneystocknews']);
var newscol=db.collection('moneystocknews')
app.get('/search/:stock/:datenow/:limval', function (req, res) {
    var stock=req.params.stock;
    var limval=parseInt(req.params.limval);
    var datenow=req.params.datenow;
    newscol.find({tokens: { $in: [stock]}},{title:1, url:1,newsdesc:1}).limit(limval , function(err, docs) {
    res.send(docs)
});

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
