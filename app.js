let express = require('express');
let path = require('path');
let routes = require('./routes/index');
let api = require('./routes/api');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let config = require('./config');
let base58 = require('./lib/base58');
let Url = require('./models/url');
let opn = require('opn');
let moment = require('moment');
let app = express();

mongoose.connect('mongodb://'+ config.db.host + '/' + config.db.name);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use('/harambe', function(req, res) {
  let now = moment().dayOfYear();
  let dead = moment("20160528").dayOfYear();
  res.render('harambe', {Dplus: now-dead});
});

app.post('/api/compress', function(req, res){
  let longUrl = checkURL(req.body.url);
  let shortUrl = '';

  Url.findOne({long_url: longUrl}, function (err, doc){
    if (doc){
      shortUrl = config.webhost + base58.encode(doc._id);
      res.send({'shortUrl': shortUrl});
    } else {
      let newUrl = Url({long_url: longUrl});
      newUrl.save(function(err) {
        if(err) console.log(err);
        shortUrl = config.webhost + base58.encode(newUrl._id);
        res.send({'shortUrl': shortUrl});
      });
    }
  });
});

app.use('/:encoded_id', function(req, res) {
    let base58Id = req.params.encoded_id;
    let id = base58.decode(base58Id)
    Url.findOne({ _id:id }, function(err, doc) {
        if (err) console.error(err);
        if (doc) res.render('redirect', {longUrl: doc.long_url});
        else res.redirect(config.webhost);
    })
});



function checkURL(longUrl) {
  let httpCheck = /(http|https):\/\//
  let http = 'http://';
  for(var i=0; i<longUrl.length; i++) {
    if(!httpCheck.test(longUrl[i])){
      longUrl[i]='http://'+longUrl[i];
    }
  }
  return longUrl;
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
