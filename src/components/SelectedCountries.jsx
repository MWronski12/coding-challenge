// Chakra UI
import {
  Card,
  CardHeader,
  CardBody,
  Center,
  CircularProgress,
  Alert,
  AlertIcon,
  AlertDescription,
  Heading,
} from "@chakra-ui/react";

function SelectedCountries({ loading, error, countries }) {
  const errorMessage = "Error fetching continent countries!";

  if (loading) {
    return (
      <Card w="100%">
        <Center p={50}>
          <CircularProgress isIndeterminate size={100} />
        </Center>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card w="100%" as="h2">
      <CardHeader>
        <Heading size="md">Selected countries:</Heading>
      </CardHeader>
      <CardBody>{countries.join(", ")}</CardBody>
    </Card>
  );
}

export default SelectedCountries;
