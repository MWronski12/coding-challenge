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
} from "@chakra-ui/react";

// Serivces
import { getCountryDetails } from "../services/countryService";

function CountryDetails({ countryName }) {
  const ERROR_MESSAGE = "No information found!";
  const [countryDetails, setCountryDetails] = useState(null);

  useEffect(() => {
    getCountryDetails(countryName).then((response) => {
      setCountryDetails(response);
    });
  }, [countryName]);

  return (
    <>
      {countryDetails === null && (
        <Progress size="lg" isIndeterminate w="100%" />
      )}

      {countryDetails && countryDetails.status != 200 && (
        <Alert status="error" w="100%">
          {ERROR_MESSAGE}
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
                <Box key={key}>
                  <Heading size="xs" textTransform="uppercase">
                    {key}
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {value}
                  </Text>
                </Box>
              ))}
            </Stack>
          </CardBody>
        </Card>
      )}
    </>
  );
}

export default CountryDetails;
