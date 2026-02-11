const express = require("express");
const router = express.Router();
const SiteSettings = require("../models/SiteSettings");

// GET settings
router.get("/", async (req, res) => {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = new SiteSettings({});
    await settings.save();
  }
  res.json(settings);
});

// UPDATE settings
router.post("/", async (req, res) => {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = new SiteSettings(req.body);
  } else {
    Object.assign(settings, req.body);
  }
  await settings.save();
  res.json(settings);
});

module.exports = router;
