const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    sectionId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: DataTypes.TEXT
}, {
    timestamps: true
});

module.exports = Category;
