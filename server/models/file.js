const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    filename: { type: String, required: true },
    type: { type: String, required: true },
    path: { type: String, required: true },
    position: { type: Number, required: true }
});

module.exports = mongoose.model('File', fileSchema);