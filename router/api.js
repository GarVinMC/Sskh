const express = require("express");
const router = express.Router();
const config = require("../schema/config");
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

// New route for testing
router.get("/tes/tes", (req, res) => {
  res.json({
    status: true,
    developer: dev,
    result: "halo", // Your desired message
  });
});

module.exports = router;
