const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    excerpt: String,
    image: String,
    content: String
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
