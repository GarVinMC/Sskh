const express = require("express");
const fs = require('fs');
const https = require('https');
const path = require('path');
const router = express.Router();
const config = require("../schema/config");
const { developer: dev } = config.options;
const { downloadTikTokVideo } = require('../scrapers/tiktok'); 
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

// Endpoint untuk mendownload video TikTok
router.get("/download", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ status: false, message: "Please provide a TikTok video URL" });
  }

  try {
    // Mendapatkan URL video TikTok dari halaman
    const videoUrl = await downloadTikTokVideo(url);

    if (!videoUrl) {
      return res.status(404).json({ status: false, message: "Video not found on the provided URL" });
    }

    // Mengunduh video
    const filePath = path.join(__dirname, '..', 'tiktok_video.mp4');
    const file = fs.createWriteStream(filePath);

    https.get(videoUrl, (response) => {
      response.pipe(file);

      file.on('finish', () => {
        res.download(filePath, 'tiktok_video.mp4', (err) => {
          if (err) {
            return res.status(500).json({ status: false, message: "Error sending the video file" });
          }
          // Hapus file setelah selesai dikirim
          fs.unlinkSync(filePath);
        });
      });
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching video data",
      error: error.message
    });
  }
});

module.exports = router;
