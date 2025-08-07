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
        required:[true],
    },
},
{
    timestamps: true
});

module.exports = mongoose.model("Users", UserSchema);