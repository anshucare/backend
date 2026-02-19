const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Blog = sequelize.define('Blog', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    excerpt: DataTypes.TEXT,
    image: DataTypes.TEXT,
    content: DataTypes.TEXT
}, {
    timestamps: true
});

module.exports = Blog;
