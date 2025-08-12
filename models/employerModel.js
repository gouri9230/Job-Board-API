const mongoose = require('mongoose');

const EmployerSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    company: {
        type: String,
        required: [true, "Company name has to be specified."]
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Employers', EmployerSchema);