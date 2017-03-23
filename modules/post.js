'use strict';

var PostHandler = function(db) {
  var modelsAndSchemasName = 'post';
  var mongoose = require('mongoose');
  var ObjectID = mongoose.Types.ObjectId;
  var schema = mongoose.Schemas[modelsAndSchemasName];
  var PostModel = db.model(modelsAndSchemasName, schema);

  this.addPost = function(req, res, next) {
    var body = req.body;
    var title = body.title;
    var model = new PostModel({
      title: title,
      comments: []
    });

    model.save(function(err, model) {
      if(err) {
        console.log(err);
      }
      res.status(200).send(model);
    })
  };

  this.getPosts = function(req, res, next) {
    PostModel
      .find({})
      .exec(function(error, model) {
        if(error) {
          console.log(error);
        }
        res.status(200).send(model);
      })
  };

  this.getPost = function(req, res, next) {
    var id = req.params.id
    id = new ObjectID(id);
    var pipeLine = [];

    pipeLine.push({
      $match: {
        _id: id
      }
    });

    pipeLine.push({
      $project: {
        _id: 1,
        title: 1,
        comments: 1
      }
    });

    PostModel.aggregate(pipeLine)
      .exec(function(err, model) {
        if(err) {
          console.log(err);
        }
        res.status(200).send(model[0]);
      });
  };

  this.addComment = function(req, res, next) {
    var id = req.params.id;
    var comment = req.body.comment;

    id = new ObjectID(id);

    PostModel.findByIdAndUpdate(id, {
      $push: {
        comments: comment
      }
    }, {
      new: true
    }, function(err, model) {
      if(err) {
        console.log(err);
      }
      res.status(200).send(model);
    })
  }

  this.deleteComment = function(req, res, next) {
    var id = req.params.id;
    var comment = req.body.comment;
    
    id = new ObjectID(id);

    PostModel.findByIdAndUpdate(id, {
      $pull: {
        comments: comment
      }
    }, {
      new: true
    }, function(err, model) {
      if(err) {
        console.log(err);
      }
      res.status(200).send(model);
    })
  }

  this.deletePost = function(req, res, next) {
    var id = req.params.id;

    id = new ObjectID(id);

    PostModel.findByIdAndRemove(id, function(err, model) {
      if(err) {
        console.log(err);
      }
      res.status(200).send(model);
    });
  };
};

module.exports = PostHandler;
