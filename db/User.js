const mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
module.exports = mongoose.model("users", new Schema({
  _id: {
    type: String,
    default: null
  },
  name: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  password: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    default: null
  },
  pfp: {
    type: String,
    default: null
  },
  followers: {
    type: Array,
    default: []
  },
  following: {
    type: Array,
    default: []
  },
  socket: {
    type: String,
    default: null
  },
  posts: {
    type: Array,
    default: []
  },
  fyp: {
    type: Array,
    default: []
  }
}));