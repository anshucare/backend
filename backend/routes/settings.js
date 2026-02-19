const express = require("express");
const router = express.Router();
const SiteSettings = require("../models/SiteSettings");

// GET settings
router.get("/", async (req, res) => {
  try {
    let [settings, created] = await SiteSettings.findOrCreate({
      where: {}, // Assuming only one record for global settings
      defaults: {}
    });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE settings
router.post("/", async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(req.body);
    } else {
      await settings.update(req.body);
    }
    res.json(settings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
