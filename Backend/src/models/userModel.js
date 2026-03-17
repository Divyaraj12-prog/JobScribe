const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId:{
        type:String,
        default:null
    },
    fullname:{
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            default:''
        }
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:false,
        default:null
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;