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
  Tooltip,
} from "@chakra-ui/react";

// Predefined options object
const continentOptions = {
  AF: "Africa",
  AN: "Antarctica",
  AS: "Asia",
  EU: "Europe",
  NA: "North America",
  OC: "Oceania",
  SA: "South America",
};

function ContinentForm({ onFormChange }) {
  /* ------------------------------ Configuration ----------------------------- */
  const defaultNumOfCountries = 5;
  const minNumOfCountries = 2;
  const maxNumOfCountries = 10;
  const numOfCountriesTooltipLabel = `This number of countries will be randomly picked from countries of the selected continent (min: ${minNumOfCountries}, max: ${maxNumOfCountries})`;

  /* ----------------------------- Component state ---------------------------- */
  const [continentCode, setContinentCode] = useState("");
  const [numOfCountries, setNumOfCountries] = useState(defaultNumOfCountries);
  const toast = useToast();

  /* ------------------------------ Form handlers ----------------------------- */
  const onContinentSelectChange = (event) => {
    for (const [key, value] of Object.entries(continentOptions)) {
      if (value === event.target.value) {
        setContinentCode(key);
        return;
      }
    }
  };

  const onNumOfCountriesChange = (number) => {
    setNumOfCountries(number);
  };

  const onSubmit = () => {
    if (validate()) {
      // Parent component callback
      onFormChange(continentCode, numOfCountries);
    } else {
      toast({
        title: "Invalid form input!",
        description:
          "You must select the continent and enter number of countries!",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  const validate = () => {
    // Chakra UIs default value for Select component is an empty string
    if (continentCode === "") {
      return false;
    }
    if (numOfCountries === "") {
      return false;
    }
    return true;
  };

  /* -------------------------------- Component ------------------------------- */
  return (
    <Flex w={"100%"}>
      <Select
        placeholder="Select continent"
        onChange={onContinentSelectChange}
        borderEndRadius={0}
      >
        {Object.entries(continentOptions).map(([key, value]) => (
          <option key={key} value={value}>
            {value}
          </option>
        ))}
      </Select>

      <Tooltip label={numOfCountriesTooltipLabel}>
        <NumberInput
          defaultValue={defaultNumOfCountries}
          min={minNumOfCountries}
          max={maxNumOfCountries}
          onChange={onNumOfCountriesChange}
        >
          <NumberInputField borderRadius={0} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Tooltip>

      <Button onClick={onSubmit} borderStartRadius={0}>
        Select
      </Button>
    </Flex>
  );
}

export default ContinentForm;
