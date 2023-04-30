import axios from "axios";

const API_BASE_URL = "https://restcountries.com/v3.1/name";

export async function getCountryDetails(countryName) {
  // I added a 1 second delay to simulate a slow network
  // so you can see the loading indicator
  return new Promise((resolve) => {
    setTimeout(async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${countryName}`);
        const convertedData = convertResponseData(response);
        resolve({ status: 200, data: convertedData });
      } catch (error) {
        resolve(error.response.data);
      }
    }, 1000);
  });
}

function convertResponseData(response) {
  const data = response.data[0];
  const populationFormatter = Intl.NumberFormat("en", { notation: "compact" });

  return {
    officialName: data.name?.official || "N/A",
    capital: data.capital?.[0] || "N/A",
    population: data.population
      ? populationFormatter.format(data.population)
      : "N/A",
    currencies: data.currencies
      ? Object.values(data.currencies)
          .map((currency) => currency.name)
          .join(", ")
      : "N/A",
    subregion: data.subregion || "N/A",
    languages: data.languages
      ? Object.values(data.languages).join(", ")
      : "N/A",
  };
}
