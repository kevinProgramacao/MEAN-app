const mongoose = require('mongoose');
const config = require('../config/database');


//Pub Schema
const PubSchema = mongoose.Schema ({
    data: {
      type: String
    },
    titulo: {
      type: String,
      required: true
    },
    texto: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    autor: {
      type: String
    }
});

  const Pub = module.exports = mongoose.model('Publicacao', PubSchema);

  
//Insert
module.exports.addPub = function(newPub, callback) {
    newPub.save(callback);
}

//Select * from
module.exports.getPubs = function(callback) {
  Pub.find(callback);
}

//Select Where
module.exports.getPubBySlug = function(slug, callback) {
  const query = {slug: slug}
  Pub.find(query, callback);
}

module.exports.updatePub = function(slug, body, callback) {
  Pub.findOneAndUpdate(slug, body, callback);
}

module.exports.removePub = function(id, callback) {
  Pub.findById(id, callback);
}