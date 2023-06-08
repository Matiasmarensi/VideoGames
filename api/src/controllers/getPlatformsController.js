const axios = require("axios");
const { API_KEY, URL } = process.env;
const { Consola } = require("../db");

const getPlatforms = async () => {
  const URLPLATFORM = `https://api.rawg.io/api/platforms`;
  const platformsBdd = await Consola.findAll();

  if (platformsBdd.length === 0) {
    const response = await axios.get(`${URLPLATFORM}?key=${API_KEY}`);
    console.log(response);
    const plataformas = response.data.results.map((plat) => ({
      id: plat.id,
      name: plat.name,
    }));

    await Consola.bulkCreate(plataformas);

    return plataformas; // Devolver las plataformas en lugar de platformsBdd
  }
  console.log(platformsBdd);
  return platformsBdd;
};

module.exports = getPlatforms;
