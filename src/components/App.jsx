// React
import { useState } from 'react'

// Chakra UI
import { Container, VStack, Heading, Stat, StatNumber, Button } from '@chakra-ui/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container maxW='container.lg' padding={8}>
      <VStack align={"start"} spacing={4}>
        <Heading>Hello World!</Heading>
        <Stat>
          <StatNumber>Click count: {count}</StatNumber>
        </Stat>
        <Button onClick={() => setCount(count + 1)}>Click me!</Button>
      </VStack>
    </Container >
  )
}

export default App
