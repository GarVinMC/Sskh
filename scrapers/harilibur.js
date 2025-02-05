const axios = require('axios');

// Function to get holiday data for a given country and year
const getHolidayData = async (country, year, apiKey) => {
  const url = `https://holidayapi.com/v1/holidays`;
  const params = {
    key: apiKey,
    country: country,  // Country code (e.g., 'ID' for Indonesia)
    year: year,        // Year for which holidays are being requested
    public: true,      // Filter for public holidays
  };

  try {
    // Make a GET request to the holiday API
    const response = await axios.get(url, { params });
    // Return the holiday data if successful
    if (response.data && response.data.holidays) {
      return response.data.holidays;
    }
    // If no holidays are found, return an empty array
    return [];
  } catch (error) {
    console.error("Error fetching holiday data:", error);
    throw error;
  }
};

module.exports = { getHolidayData };
