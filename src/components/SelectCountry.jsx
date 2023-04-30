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
  const ERROR_MESSAGE = "Error fetching continent countries!";

  if (queryResult.loading) {
    return (
      <Card w="100%">
        <Center p={50}>
          <CircularProgress isIndeterminate size={100} />
        </Center>
      </Card>
    );
  }

  if (queryResult.error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertDescription>{ERROR_MESSAGE}</AlertDescription>
      </Alert>
    );
  }

  let countries = queryResult.data.continent.countries.slice();
  if (countries.length > numOfCountries) {
    countries = countries
      .sort(() => Math.random() - 0.5)
      .slice(0, numOfCountries)
      .map((country) => country.name);
  } else {
    countries = countries.map((country) => country.name);
  }

  console.log(countries.slice(0, numOfCountries));

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
