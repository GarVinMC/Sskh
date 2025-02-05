const axios = require('axios');
const apiKeys = [
  'e1168ed6-f78e-4671-b04b-7c987c7c3607',
  'f4bf252c-91f9-47d7-898e-c81bf60b08a4',
  'da52f6ad-1e74-4316-aa42-447938434d62',
  'c17343ac-14c8-4b14-b3cd-99606a8464f4',
  '36db0f68-8812-46c1-ae0f-90a9736204fe'
];

const getHolidayData = async (country, year) => {
  const apiKey = apiKeys[Math.floor(Math.random() * apiKeys.length)]; 
  const url = `https://holidayapi.com/v1/holidays`;
  const params = {
    key: apiKey,
    country: country,  
    year: year,        
    public: true,     
  };

  try {
    const response = await axios.get(url, { params });
    if (response.data && response.data.holidays) {
      return response.data.holidays;
    }
    return [];
  } catch (error) {
    console.error("Error fetching holiday data:", error);
    throw error;
  }
};

module.exports = { getHolidayData };
