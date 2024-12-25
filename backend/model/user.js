const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:3
    },
    phone:{
        type:Number,
        required:true,
        minlength:10
    },
    pfp:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    }
})

module.exports = mongoose.model("User",userSchema)