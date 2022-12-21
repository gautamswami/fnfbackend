var mongoose = require('mongoose')
const schema = new mongoose.Schema({
    dp:{
        type:String,
        required:false,
        default:""
    },
    bio:{
        type:String,
        required:false,
        default:"",
    },
    userId:{
        type:String,
        required:false,
        default:""
    },
    instagram:{
        type:String,
        required:false,
        default:"",
    },
    bio:{
        type:String,
        required:false,
        default:""
    } 
})