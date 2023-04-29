import axios from "axios";

const API_BASE_URL = "https://restcountries.com/v3.1/name";

export async function getCountryDetails(countryName) {
  const response = await axios.get(`${API_BASE_URL}/${countryName}`);

  if (response.status === 200) {
    return {
      status: response.status,
      officialName: response.data[0].name.official,
      capital: response.data[0].capital[0],
      population: response.data[0].population,
      currencies: Object.values(response.data[0].currencies).map(
        (value) => value.name
      ),
      subregion: response.data[0].subregion,
      languages: Object.values(response.data[0].languages),
    };
  } else {
    return {
      status: response.status,
      message: response.data.message,
    };
  }
}
