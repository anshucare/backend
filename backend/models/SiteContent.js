const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SiteContent = sequelize.define('SiteContent', {
    key: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: 'main'
    },
    hero: { type: DataTypes.JSON },
    about: { type: DataTypes.JSON },
    contact: { type: DataTypes.JSON },
    testimonials: { type: DataTypes.JSON },
    features: { type: DataTypes.JSON },
    categoriesHeader: { type: DataTypes.JSON },
    footer: { type: DataTypes.JSON },
    theme: { type: DataTypes.JSON }
}, {
    timestamps: true
});

module.exports = SiteContent;
