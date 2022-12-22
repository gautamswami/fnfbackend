var mongoose = require('mongoose')
var schema = new mongoose.Schema({
    username:{
        type: String,
        required: false,
        default: "",
    },
    userlongitude:{
        type: String,
        required: true,
        default: "",
    },
    userlatitude:{
        type: String,
        required: false,
        default: "",
    },
    usercity:{
        type: String,
        required:false,
        default:"",
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}
    
)

var userlocation = new mongoose.model("userlocation", schema);

module.exports = userlocation
