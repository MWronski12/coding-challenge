// React
import { useEffect, useState } from "react";

// Chakra UI
import {
  Card,
  CardHeader,
  CardBody,
  Box,
  Stack,
  StackDivider,
  Heading,
  Text,
  Alert,
  Progress,
  Skeleton,
} from "@chakra-ui/react";

// Serivces
import { getCountryDetails } from "../services/countryService";

function CountryDetails({ countryName }) {
  /* ------------------------------ Configuration ----------------------------- */
  const errorMessage = "No information found!";

  /* ----------------------------- Component state ---------------------------- */
  const [countryDetails, setCountryDetails] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    getCountryDetails(countryName)
      .then((response) => {
        setCountryDetails(response);
      })
      .then(() => {
        setIsLoaded(true);
      });
  }, [countryName]);

  return (
    <>
      {countryDetails === null && (
        <Progress size="lg" isIndeterminate w="100%" />
      )}

      {countryDetails && countryDetails.status != 200 && (
        <Alert status="error" w="100%">
          {errorMessage}
        </Alert>
      )}

      {countryDetails && countryDetails.status == 200 && (
        <Card w="100%">
          <CardHeader>
            <Heading size="md">{countryName}</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              {Object.entries(countryDetails.data).map(([key, value]) => (
                <Skeleton isLoaded={isLoaded} key={key}>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      {key}
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {value}
                    </Text>
                  </Box>
                </Skeleton>
              ))}
            </Stack>
          </CardBody>
        </Card>
      )}
    </>
  );
}

export default CountryDetails;
