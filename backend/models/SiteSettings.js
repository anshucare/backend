const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const SiteSettings = sequelize.define("SiteSettings", {
  getInTouchTitle: {
    type: DataTypes.STRING,
  },
  getInTouchDescription: {
    type: DataTypes.TEXT,
  },
  addressLabel: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.TEXT,
  },
  helpline: {
    type: DataTypes.STRING,
  }
}, {
  timestamps: true
});

module.exports = SiteSettings;
