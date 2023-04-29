// React
import { useEffect, useState } from "react";

// Apollo
import { useQuery } from "@apollo/client";

// Services
import { GET_COUNTRIES_BY_CONTINENT } from "../services/continentService";
import { getCountryDetails } from "../services/countryService";

function ContinentCountries() {
  const { loading, error, data } = useQuery(GET_COUNTRIES_BY_CONTINENT, {
    variables: { code: "EU" },
  });

  const [countryDetails, setCountryDetails] = useState(undefined);

  useEffect(() => {
    if (data) {
      const country = data.continent.countries[0];
      getCountryDetails(country.name).then((details) => {
        setCountryDetails(details);
      });
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div>
      {countryDetails && countryDetails.status == 200 && (
        <ul>
          {Object.entries(countryDetails).map(([key, value]) => (
            <li key={key}>
              {key}: {JSON.stringify(value)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ContinentCountries;
