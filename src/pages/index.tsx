import CountryCard from "@components/CountryCard";
import Filter from "@components/Filter";
import Header from "@components/Header";
import SearchInput from "@components/SearchInput";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Country, regions } from "src/types";

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [query, setQuery] = useState("");

  const { isLoading, data } = useQuery<Country[], Error>(query, async () => {
    const url = `https://restcountries.eu/rest/v2/${
      query ? `name/${query}` : "all"
    }`;
    const response = await fetch(url);
    // TODO: Handle 404 searches
    if (!response.ok) {
      throw new Error("Api error");
    }
    return response.json();
  });

  useEffect(() => {
    //TODO: this is not overriding the data of the select filter
    if (!isLoading && data) {
      setCountries(data);
    }
  }, [data]);

  return (
    <div>
      <Header isDark={false} />
      <div className="container px-4">
        <SearchInput
          onChange={(value) => setQuery(value)}
          value={query}
          type="text"
          className="w-full h-10"
          placeholder="Search for a country..."
          timeout={600}
        />
        <Filter options={regions} setCountries={setCountries} />
        <div className="mb-8">
          {isLoading
            ? "Loading..."
            : countries.map((country) => {
                return (
                  <div className="flex flex-col items-center mt-4">
                    <CountryCard country={country} />
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
