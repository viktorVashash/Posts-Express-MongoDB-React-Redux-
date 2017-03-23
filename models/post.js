'use strict';

module.exports = (function() {
  var mongoose = require('mongoose');
  var ObjectID = mongoose.Schema.Types.ObjectId;

  var schema = new mongoose.Schema({
    title: { type: String, require: true },
    comments: { type: Array }
  }, { collections: 'posts' });

  mongoose.model('post', schema);

  if(!mongoose.Schemas) {
    mongoose.Schemas = {};
  }

  mongoose.Schemas.post = schema;
})();
