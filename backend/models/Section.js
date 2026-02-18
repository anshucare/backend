const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: String,
    image: String
}, { timestamps: true });

module.exports = mongoose.model('Section', sectionSchema);
