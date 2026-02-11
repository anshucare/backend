const mongoose = require("mongoose");

const siteSettingsSchema = new mongoose.Schema({
  getInTouchTitle: String,
  getInTouchDescription: String,
  addressLabel: String,
  address: String,
  helpline: String
}, { timestamps: true });

module.exports = mongoose.model("SiteSettings", siteSettingsSchema);
