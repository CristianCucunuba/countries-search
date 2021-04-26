import CountryCard from "@components/CountryCard";
import Filter from "@components/Filter";
import Header from "@components/Header";
import SearchInput from "@components/SearchInput";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Country, regions } from "src/types";
import Link from "next/link";

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");

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

  const { isLoading: isLoadingRegion, data: countriesByRegion } = useQuery<
    Country[]
  >(
    [region],
    async () => {
      const url = `https://restcountries.eu/rest/v2/${
        region ? `region/${region}` : "all"
      }`;

      const response = await fetch(url);
      return response.json();
    },
    { enabled: !!region }
  );

  useEffect(() => {
    if (!isLoadingRegion && countriesByRegion) {
      setCountries(countriesByRegion);
    }
  }, [countriesByRegion]);

  useEffect(() => {
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
        <Filter
          options={regions}
          onChange={(option) => setRegion(option)}
          value={region}
        />
        <div className="mb-8">
          {isLoading
            ? "Loading..."
            : countries.map((country) => {
                return (
                  <Link
                    href={`/${encodeURIComponent(country.name.toLowerCase())}`}
                    key={country.name}>
                    <div className="flex flex-col items-center mt-4">
                      <CountryCard country={country} />
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
    </div>
  );
}
