const mongoose = require('mongoose');

const jobsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    job_description: {
        type: String,
        required: true
    },
    job_id: {
        type: Number,
        unique: true
    },
    employer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Employers",
    }
});

module.exports = mongoose.model("Jobs", jobsSchema);