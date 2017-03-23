var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var config = require('./webpack.config');
var compiler = webpack(config);
var app = express();

var configs;
var connectOptions;
var db;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

require('./models/index');

process.env.NODE_ENV = process.env.NODE_ENV || 'develop';

configs = require('./config/' + process.env.NODE_ENV);
connectOptions = configs.mongoConfig;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

db = mongoose.createConnection(process.env.DB_HOST, process.env.DB_NAME, process.env.DB_PORT, connectOptions);

db.on('error', function(error) {
  console.log(error);
});
db.once('open', function callback() {
  console.log('Connection to database is success');

  app.db = db;

  require('./routes/')(app);

  app.listen(process.env.PORT, function() {
    console.log('Server successfully started: ' + process.env.PORT);
  })
});
