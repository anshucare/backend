const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: DataTypes.TEXT,
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: DataTypes.TEXT,
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    ingredients: {
        type: DataTypes.JSON // Array of strings
    }
}, {
    timestamps: true
});

module.exports = Product;
