const puppeteer = require('puppeteer');
const fs = require('fs');

async function downloadTikTokVideo(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Kunjungi halaman TikTok
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Ambil data video dari halaman (mencari URL video dalam sumber daya halaman)
  const videoUrl = await page.evaluate(() => {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      return videoElement.src;
    }
    return null;
  });

  if (videoUrl) {
    console.log('Menemukan URL video:', videoUrl);

    // Mengunduh video dengan menggunakan https
    const https = require('https');
    const file = fs.createWriteStream('tiktok_video.mp4');
    
    https.get(videoUrl, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        console.log('Video berhasil di-download sebagai tiktok_video.mp4');
      });
    });

  } else {
    console.log('Video tidak ditemukan di halaman ini.');
  }

  await browser.close();
}

// Masukkan URL video TikTok yang ingin di-download
const tiktokUrl = 'https://www.tiktok.com/@username/video/1234567890123456789';
downloadTikTokVideo(tiktokUrl);
