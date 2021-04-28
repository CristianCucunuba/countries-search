import CountryCard from "@components/CountryCard";
import Filter from "@components/Filter";
import Header from "@components/Header";
import SearchInput from "@components/SearchInput";
import { useState, useEffect } from "react";
import { QueryClient, useQuery } from "react-query";
import { Country, regions } from "src/types";
import Link from "next/link";
import { dehydrate } from "react-query/hydration";
import { getCountriesByRegion, searchCountry } from "src/util/api";

export default function Home() {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");

  const { isLoading, data } = useQuery<Country[], Error>("searchCountry", () =>
    searchCountry(query)
  );

  const { isLoading: isLoadingRegion, data: countriesByRegion } = useQuery<
    Country[],
    Error
  >("search", () => getCountriesByRegion(region), { enabled: !!region });

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

  const loading = isLoadingRegion || isLoading;

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
          {loading
            ? "Loading..."
            : (countries || data)?.map((country) => {
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

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("searchCountry", () => searchCountry(""));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
