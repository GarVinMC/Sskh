const puppeteer = require('puppeteer');

// Fungsi untuk mendownload video TikTok
async function downloadTikTokVideo(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Kunjungi halaman TikTok
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Ambil data video dari halaman
  const videoUrl = await page.evaluate(() => {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      return videoElement.src;
    }
    return null;
  });

  await browser.close();

  return videoUrl;
}

module.exports = { downloadTikTokVideo };
