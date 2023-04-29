import { gql } from "@apollo/client";

export const GET_COUNTRIES_BY_CONTINENT = gql`
  query Continent($code: ID!) {
    continent(code: $code) {
      countries {
        name
      }
    }
  }
`;
