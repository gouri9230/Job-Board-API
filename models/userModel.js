const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is mandatory"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email address"],
    },
    password: {
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

module.exports = mongoose.model("Users", UserSchema);