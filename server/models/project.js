const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    projectUrl: { type: String, required: false },
    date: { type: Date, required: false },
    files: { type: Object, required: true}
});

module.exports = mongoose.model('Project', projectSchema);