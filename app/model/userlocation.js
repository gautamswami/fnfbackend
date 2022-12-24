var mongoose = require('mongoose')
var schema = new mongoose.Schema({
    username:{
        type: String,
        required: false,
        default: "",
    },
    userlongitude:{
        type: Number,
        required: true,
        default: "",
    },
    userlatitude:{
        type: Number,
        required: true,
        default: "",
    },
    usercity:{
        type: String,
        required:true,
        default:"",
    }
}
    
)

var userlocation = new mongoose.model("userlocation", schema);

module.exports = userlocation
