const mongoose = require('mongoose');

const EmployerSchema = mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    company: {
        type: String,
        required: [true, "Company name has to be specified."]
    },
    role: {
        type: String,
        required: [true, "Please specify a role"]
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Employers', EmployerSchema);