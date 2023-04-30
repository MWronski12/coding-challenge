// React
import { useState } from "react";

// Chakra UI
import {
  Container,
  VStack,
  Button,
  useToast,
  Progress,
  Alert,
  Text,
} from "@chakra-ui/react";

// Components
import ContinentForm from "./ContinentForm.jsx";
import CountryDetails from "./CountryDetails.jsx";

import { useQuery } from "@apollo/client";
import { GET_COUNTRIES_BY_CONTINENT } from "../services/continentService.js";

function App() {
  /* ---------------------------- Application state --------------------------- */
  const [continentCode, setContinentCode] = useState(null);
  const [numOfCountries, setNumOfCountries] = useState(null);

  const { loading, error, data } = useQuery(GET_COUNTRIES_BY_CONTINENT, {
    variables: { code: continentCode },
    skip: !continentCode || !numOfCountries,
  });

  let queryResult;
  if (loading) {
    queryResult = <Progress isIndeterminate size="lg" />;
  } else if (error) {
    queryResult = (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      </Alert>
    );
  } else if (data) {
    let countries = data.continent.countries.map((country) => country.name);

    if (countries.length >= numOfCountries) {
      countries = countries
        .sort(() => Math.random() - 0.5)
        .slice(0, numOfCountries);
    }

    countries = countries.join(", ");
    queryResult = <Text>{countries}</Text>;
  }

  return (
    <Container maxW="container.lg" padding={8}>
      <VStack align={"start"} spacing={4}>
        <ContinentForm
          setContinentCode={setContinentCode}
          setNumOfCountries={setNumOfCountries}
        />

        {queryResult}

        {!loading && !error && data && (
          <CountryDetails countryName={data.continent.countries[0].name} />
        )}
      </VStack>
    </Container>
  );
}

export default App;
