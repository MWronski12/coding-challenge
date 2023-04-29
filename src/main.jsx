// React
import * as React from "react";
import * as ReactDOM from "react-dom/client";

// Components
import App from "./components/App.jsx";

// Apollo client
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Chakra UI
import { ChakraProvider } from "@chakra-ui/react";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/graphql",
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>
);
