var mongoose = require("mongoose");
const schema = new mongoose.Schema({
  post: {
    type: Object,
    required: false,
  },
  username: {
    type: String,

    required: true,
  },
});

module.exports = mongoose.model("Userpost", schema);
