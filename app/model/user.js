var mongoose = require("mongoose");
var schema = new mongoose.Schema({
  username: {
    default: "",
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: false,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false,
    default: "",
  },
  dp: {
    type: Object,
    required: false,
    default: "",
  },
  instagram: {
    type: String,
    required: false,
    default: "",
  },
  snapchat: {
    type: String,
    required: false,
    default: "",
  },
  facebook: {
    type: String,
    required: false,
    default: "",
  },
  linkedin: {
    type: String,
    required: false,
    default: "",
  },
  instagram: {
    type: String,
    required: false,
    default: "",
  },
  twitter: {
    type: String,
    required: false,
    default: "",
  },
  youtube: {
    type: String,
    required: false,
    default: "",
  },
  pinterest: {
    type: String,
    required: false,
    default: "",
  },
  followers: {
    type: Array,
    required: false,
  },

  tofollowyourequest: {
    type: Array,
    required: false,
  },
  following: {
    type: Array,
    required: false,
  },
  followbyyourequest:{
    type :Array ,
    required:false
  }
});

var user = new mongoose.model("User", schema);

module.exports = user;
