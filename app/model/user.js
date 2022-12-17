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
});

var user = new mongoose.model("User", schema);

module.exports = user;
