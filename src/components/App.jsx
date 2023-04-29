// React
import { useState } from 'react'

// Components

// Chakra UI
import { ChakraProvider, Container, Flex, Heading, Button, Stat, StatLabel, StatNumber, Spacer, VStack } from '@chakra-ui/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ChakraProvider>

      <Container maxW='container.lg' padding={8}>
        <VStack align={"start"} spacing={4}>

          <Heading>Hello World!</Heading>
          <Stat>
            <StatNumber>Click count: {count}</StatNumber>
          </Stat>
          <Button onClick={() => setCount(count + 1)}>Click me!</Button>

        </VStack>
      </Container >

    </ChakraProvider>
  )
}

export default App
