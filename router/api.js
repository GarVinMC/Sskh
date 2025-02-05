const express = require("express");
const danz = require("d-scrape");
const router = express.Router();
const config = require("../schema/config");
const { getHolidayData } = require('../scrapers/harilibur');
const { developer: dev } = config.options;

// Log Info
const messages = {
  error: {
    status: 404,
    developer: dev,
    result: "Error, Service Unavailable",
  },
  notRes: {
    status: 404,
    developer: dev,
    result: "Error, Invalid JSON Result",
  },
  query: {
    status: 400,
    developer: dev,
    result: "Please input parameter year!",
  },
  notUrl: {
    status: 404,
    developer: dev,
    result: "Error, Invalid URL",
  },
};

// Harilibur Routes
router.get("/kalender/harilibur", async (req, res) => {
  const { year } = req.query;
  if (!year) return res.status(400).json(messages.query);

  try {
    const holidays = await getHolidayData('ID', year, 'e1168ed6-f78e-4671-b04b-7c987c7c3607'); // 'ID' for Indonesia and the provided API key
    if (!holidays || holidays.length === 0) {
      return res.status(404).json(messages.notRes);
    }

    res.json({
      status: true,
      developer: dev,
      result: holidays,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json(messages.error);
  }
});

module.exports = router;
