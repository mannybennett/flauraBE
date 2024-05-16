const axios = require("axios");
require("dotenv").config();

const fetchPlants = async (req, res) => {
  const { page = 1, cycle = '', watering = '', sunlight = '', q = '' } = req.query;

  try {
    const url = `https://perenual.com/api/species-list?key=${process.env.API_KEY}&indoor=1&page=${page}&cycle=${cycle}&watering=${watering}&sunlight=${sunlight}&q=${q}`
    const response = await axios.get(url);
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching plants" });
  };
};

module.exports = {
  fetchPlants,
};