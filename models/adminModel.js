const mongoose = require('mongoose');
const { type } = require('os');

const AdminSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: [true, "Please specify a role"]
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Admin', AdminSchema);