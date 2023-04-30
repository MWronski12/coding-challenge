// Chakra UI
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Center,
  CircularProgress,
  Alert,
  AlertIcon,
  AlertDescription,
  Heading,
} from "@chakra-ui/react";

function SelectCountry({ queryResult, numOfCountries, setCountry }) {
  const errorMessage = "Error fetching continent countries!";

  /* ------------------------------ When loading ------------------------------ */
  if (queryResult.loading) {
    return (
      <Card w="100%">
        <Center p={50}>
          <CircularProgress isIndeterminate size={100} />
        </Center>
      </Card>
    );
  }

  /* ------------------------------- When error ------------------------------- */
  if (queryResult.error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>
    );
  }

  /* ------------------------------ When fetched ------------------------------ */
  let countries = queryResult.data.continent.countries.slice();
  if (countries.length > numOfCountries) {
    countries = countries
      .sort(() => Math.random() - 0.5)
      .slice(0, numOfCountries)
      .map((country) => country.name);
  } else {
    countries = countries.map((country) => country.name);
  }

  const onDisplay = () => {
    const randomCountry =
      countries[Math.floor(Math.random() * countries.length)];
    setCountry(randomCountry);
  };

  return (
    <Card w="100%" as="h2">
      <CardHeader size="md">
        <Heading>Selected countries:</Heading>
      </CardHeader>
      <CardBody>{countries.join(", ")}</CardBody>
      <CardFooter>
        <Button onClick={onDisplay}>Display</Button>
      </CardFooter>
    </Card>
  );
}

export default SelectCountry;
