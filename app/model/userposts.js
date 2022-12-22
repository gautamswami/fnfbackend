var mongoose = require("mongoose");
const schema = new mongoose.Schema({
  posturl: {
    type: String,
    required: false,
    default: "",
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Userpost", schema);
