'use strict';

module.exports = function(app) {
  var postRouter = require('./post')(app);

  app.get('/', function(req, res, next) {
    res.sendFile('/Users/viktorvasas/Documents/Projects/ReactJS/posts-app/public/index.html');
  })

  app.use('/post', postRouter);
};
