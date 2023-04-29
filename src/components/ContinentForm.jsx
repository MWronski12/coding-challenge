// React
import { useState } from "react";

// Chakra UI
import {
  Flex,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  useToast,
} from "@chakra-ui/react";

const continentOptions = {
  AF: "Africa",
  AN: "Antarctica",
  AS: "Asia",
  EU: "Europe",
  NA: "North America",
  OC: "Oceania",
  SA: "South America",
};

function ContinentForm() {
  /* ------------------------------ Configuration ----------------------------- */
  const defaultNumOfCountries = 5;
  const minNumOfCountries = 2;
  const maxNumOfCountries = 10;

  /* ---------------------------------- Hooks --------------------------------- */
  const toast = useToast();
  const [continent, setContinent] = useState("");
  const [numCountries, setNumCountries] = useState(defaultNumOfCountries);

  /* ------------------------------ Form handlers ----------------------------- */
  const onContinentSelectChange = (event) => {
    setContinent(event.target.value);
  };

  const onNumOfCountriesChange = (number) => {
    setNumCountries(number);
  };

  const onSubmit = () => {
    if (validate()) {
      toast({
        title: "Nice!",
        description: "Now You just wait for the results!",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Invalid form input!",
        description:
          "You must select the continent and enter number of countries to display!",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  /* ----------------------------- Form validation ---------------------------- */
  const validate = () => {
    if (continent === "") {
      return false;
    }
    if (numCountries === "") {
      return false;
    }
    return true;
  };

  /* -------------------------------- Component ------------------------------- */
  return (
    <Flex w={"100%"}>
      <Select placeholder="Select continent" onChange={onContinentSelectChange}>
        {Object.entries(continentOptions).map(([key, value]) => (
          <option key={key} value={value}>
            {value}
          </option>
        ))}
      </Select>

      <NumberInput
        defaultValue={defaultNumOfCountries}
        min={minNumOfCountries}
        max={maxNumOfCountries}
        onChange={onNumOfCountriesChange}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Button colorScheme="red" onClick={onSubmit}>
        Search
      </Button>
    </Flex>
  );
}

export default ContinentForm;
