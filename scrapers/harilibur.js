const { getHolidayData } = require('./path-to-your-file');

// Ganti dengan API key yang baru
const apiKey = 'e1168ed6-f78e-4671-b04b-7c987c7c3607'; 
const country = 'ID'; // Indonesia

// Fungsi untuk meminta tahun sebagai parameter
const getHolidaysForYear = (year) => {
  getHolidayData(country, year, apiKey)
    .then(holidays => {
      console.log(holidays); // Menampilkan data libur
    })
    .catch(error => {
      console.error("Error fetching holidays:", error);
    });
};

// Menggunakan tahun yang diminta (misalnya 2025)
const requestedYear = 2025;
getHolidaysForYear(requestedYear);
