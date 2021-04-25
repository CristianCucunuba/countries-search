import CountryCard from "@components/CountryCard";
import Filter from "@components/Filter";
import Header from "@components/Header";
import SearchInput from "@components/SearchInput";
import { useState, useEffect } from "react";

import { useQuery } from "react-query";
import { Country, regions } from "src/types";

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);

  console.log({ countries });
  const { isLoading, error, data } = useQuery<Country[], Error>(
    "countries",
    () =>
      fetch("https://restcountries.eu/rest/v2/all").then((res) => res.json())
  );

  useEffect(() => {
    if (!isLoading && data) {
      console.log({ data });
      setCountries(data);
    }
  }, [data]);

  return (
    <div>
      <Header isDark={false} />
      <div className="container px-4">
        <SearchInput />
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
