import { useQuery } from "@apollo/client";
import { GET_COUNTRIES_BY_CONTINENT } from "../services/continentService";

function ContinentCountries() {
  const { loading, error, data } = useQuery(GET_COUNTRIES_BY_CONTINENT, {
    variables: { code: "AN" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const countryNames = data.continent.countries.map((country) => country.name);

  return (
    <div>
      <h2>Countries in Antarctica:</h2>
      <ul>
        {countryNames.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ContinentCountries;
