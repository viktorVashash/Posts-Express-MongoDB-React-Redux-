'use strict';

var express = require('express');
var router = express.Router();
var PostModule = require('../modules/post');

module.exports = function(app) {
  var db = app.db;
  var postModule = new PostModule(db);

  router.post('/', postModule.addPost);
  router.patch('/comment/:id', postModule.addComment);
  router.patch('/:id', postModule.deleteComment);
  router.get('/:id', postModule.getPost);
  router.get('/', postModule.getPosts);
  router.delete('/:id', postModule.deletePost);

  return router;
};
