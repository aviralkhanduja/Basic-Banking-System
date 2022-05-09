const { text } = require('express');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    phone:{
        type: String,
        required: true,
        unique:true,
    },
    address:{
        type: String,
        required:true   
    },
    balance:{
        type: Number,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    transactions:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Transaction'
        }
    ]
    ,gold:{
        type:Number,
        required:true
    }
});

const User = new mongoose.model('User',UserSchema);

module.exports = User;