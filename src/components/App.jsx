// React
import { useState } from "react";

// Chakra UI
import { Container, VStack } from "@chakra-ui/react";

// Components
import ContinentForm from "./ContinentForm.jsx";
import CountryDetails from "./CountryDetails.jsx";
import SelectCountry from "./SelectCountry.jsx";

// Apollo client
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES_BY_CONTINENT } from "../services/continentService.js";

function App() {
  /* ---------------------------- Application state --------------------------- */
  const [continentCode, setContinentCode] = useState(null);
  const [numOfCountries, setNumOfCountries] = useState(null);
  const [randomCountry, setRandomCountry] = useState(null);

  /* ------------------------ Continent countries query ----------------------- */
  let skipQuery = !continentCode || !numOfCountries;
  const { loading, error, data } = useQuery(GET_COUNTRIES_BY_CONTINENT, {
    variables: { code: continentCode },
    skip: skipQuery,
  });

  /* -------------------------------- Component ------------------------------- */
  return (
    <Container maxW="container.lg" padding={8}>
      <VStack align={"start"} spacing={4}>
        <ContinentForm
          setContinentCode={setContinentCode}
          setNumOfCountries={setNumOfCountries}
        />

        {!skipQuery && (
          <SelectCountry
            queryResult={{ loading, error, data }}
            numOfCountries={numOfCountries}
            setCountry={setRandomCountry}
          />
        )}

        {randomCountry && <CountryDetails countryName={randomCountry} />}
      </VStack>
    </Container>
  );
}

export default App;
