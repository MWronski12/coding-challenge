import axios from "axios";

const API_BASE_URL = "https://restcountries.com/v3.1/name";

export async function getCountryDetails(countryName) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${countryName}`);
        const data = convertResponseData(response);
        resolve({ status: 200, data });
      } catch (error) {
        resolve(error.response.data);
      }
    }, 1000);
  });
}

function convertResponseData(response) {
  const populationFormatter = Intl.NumberFormat("en", { notation: "compact" });

  return {
    officialName: response.data[0].name.official,
    capital: response.data[0].capital[0],
    population: populationFormatter.format(response.data[0].population),
    currencies: Object.values(response.data[0].currencies)
      .map((value) => value.name)
      .join(", "),
    subregion: response.data[0].subregion,
    languages: Object.values(response.data[0].languages).join(", "),
  };
}
