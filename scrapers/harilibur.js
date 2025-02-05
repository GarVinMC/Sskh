const axios = require('axios');

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
