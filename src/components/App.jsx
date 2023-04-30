// React
import { useState } from "react";

// Chakra UI
import { Container, VStack, Button } from "@chakra-ui/react";

// Components
import ContinentForm from "./ContinentForm.jsx";
import CountryDetails from "./CountryDetails.jsx";
import SelectedCountries from "./SelectedCountries.jsx";

// Apollo client
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES_BY_CONTINENT } from "../services/continentService.js";

function App() {
  /* ---------------------------- Application state --------------------------- */
  const [continentCode, setContinentCode] = useState(null);
  const [numOfCountries, setNumOfCountries] = useState(null);

  const [selectedCountries, setSelectedCountries] = useState(null);
  const [randomCountry, setRandomCountry] = useState(null);

  /* ------------------------ Continent countries query ----------------------- */
  let skipQuery = selectedCountries || !continentCode || !numOfCountries;
  const { loading, error, data } = useQuery(GET_COUNTRIES_BY_CONTINENT, {
    variables: { code: continentCode },
    skip: skipQuery,
  });

  /* ----------------------------- Event handlers ----------------------------- */
  const onContinentFormChange = (continentCode, numOfCountries) => {
    // Set new form data
    setContinentCode(continentCode);
    setNumOfCountries(numOfCountries);
    // Reset application state
    setSelectedCountries(null);
    setRandomCountry(null);
  };

  const onPickRandomCountry = () => {
    if (selectedCountries) {
      let newRandomCountry =
        selectedCountries[Math.floor(Math.random() * selectedCountries.length)];
      while (newRandomCountry === randomCountry) {
        newRandomCountry =
          selectedCountries[
            Math.floor(Math.random() * selectedCountries.length)
          ];
      }
      setRandomCountry(newRandomCountry);
    }
  };

  /* ---------------------- Selection of random countries --------------------- */
  if (data && !selectedCountries) {
    let countries = data.continent.countries.slice();

    if (countries.length > numOfCountries) {
      countries = countries
        .sort(() => Math.random() - 0.5) // shuffle
        .slice(0, numOfCountries) // pick first n countries
        .map((country) => country.name);
    } else {
      countries = countries.map((country) => country.name);
    }

    setSelectedCountries(countries);
  }

  /* -------------------------------- Component ------------------------------- */
  return (
    <Container maxW="container.lg" padding={8}>
      <VStack align={"start"} spacing={4}>
        <ContinentForm onFormChange={onContinentFormChange} />

        {selectedCountries && (
          <>
            <SelectedCountries
              loading={loading}
              error={error}
              countries={selectedCountries}
            />
            <Button onClick={onPickRandomCountry}>Pick random country</Button>
          </>
        )}

        {randomCountry && <CountryDetails countryName={randomCountry} />}
      </VStack>
    </Container>
  );
}

export default App;
