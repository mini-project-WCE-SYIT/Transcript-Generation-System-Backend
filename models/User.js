const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'please provide a username']
    },
    password:{
        type:String,
        required:[true,'please provide a password']
    },
    role:{
        type:String,
        enum:['admin','user'],
        default: 'user'
    }
})

module.exports = mongoose.model('User', userSchema);