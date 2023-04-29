// React
import { useState } from "react";

// Chakra UI
import { Container, VStack, Heading } from "@chakra-ui/react";

// Components
import ContinentForm from "./ContinentForm.jsx";
import ContinentCountries from "./ContinentCountries.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container maxW="container.lg" padding={8}>
      <VStack align={"start"} spacing={4}>
        <Heading as="h1" size="2xl">
          Countries
        </Heading>
        <ContinentForm />
        <ContinentCountries />
      </VStack>
    </Container>
  );
}

export default App;
