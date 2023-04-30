// React
import { useState } from "react";

// Chakra UI
import { Container, VStack, Heading, Progress } from "@chakra-ui/react";

// Components
import ContinentForm from "./ContinentForm.jsx";
import CountryDetails from "./CountryDetails.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container maxW="container.lg" padding={8}>
      <VStack align={"start"} spacing={4}>
        <ContinentForm />
        <CountryDetails countryName="Poland" />
      </VStack>
    </Container>
  );
}

export default App;
