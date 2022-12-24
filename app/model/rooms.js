const mongoose = require("mongoose")

const roomschema = new mongoose.Schema({
    roomname:{
        type:String,
        unique:true,
        required:true
    },
    roomlocation:{
        type:String,
        required:true
    },
    text:{
        type:Array,
        required:false

    }
})
module.exports = mongoose.model("Room",roomschema)