const express = require("express");
const router = express.Router();
const config = require("../schema/config");
const {getHolidayData } = require("../scrapers/harilibur");
const { developer: dev } = config.options;

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

router.get("/kalender/harilibur", async (req, res) => {
  const { year } = req.query;

  if (!year) {
    return res.status(400).json({ status: false, message: "Please provide a year" });
  }

  const country = 'ID';
  
  // Select a random API key from the list
  const apiKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];

  try {
    // Assuming getHolidayData now accepts an API key parameter
    const holidays = await getHolidayData(country, year, apiKey);

    if (holidays.length === 0) {
      return res.json({ status: true, message: "No holidays found", holidays: [] });
    }

    const holidayDates = holidays.map(holiday => ({
      date: holiday.date,
      name: holiday.name
    }));

    res.json({
      status: true,
      holidays: holidayDates
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching holiday data",
      error: error.message
    });
  }
});

module.exports = router;
