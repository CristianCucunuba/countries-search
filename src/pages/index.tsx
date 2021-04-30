import Link from "next/link";
import { useState, useEffect } from "react";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import CountryCard from "@components/CountryCard";
import Filter from "@components/Filter";
import Header from "@components/Header";
import Skeleton from "@components/Skeleton";
import SearchInput from "@components/SearchInput";
import { Country, regions } from "src/types";
import { getCountriesByRegion, searchCountry } from "src/util/api";

const MINIMUM_PAGINATION = 9;

export default function Home() {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");
  const [pagination, setPagination] = useState(MINIMUM_PAGINATION);

  const { isLoading, data } = useQuery<Country[], Error>(
    ["searchCountry", query],
    () => searchCountry(query)
  );

  const { isLoading: isLoadingRegion, data: countriesByRegion } = useQuery<
    Country[],
    Error
  >(["region", region], () => getCountriesByRegion(region));

  useEffect(() => {
    if (!isLoadingRegion && countriesByRegion) {
      setCountries(countriesByRegion);
      setPagination(MINIMUM_PAGINATION);
    }
  }, [countriesByRegion]);

  useEffect(() => {
    if (!isLoading && data) {
      setCountries(data);
      setPagination(MINIMUM_PAGINATION);
    }
  }, [data]);

  const loading = isLoadingRegion || isLoading;
  const listOfCountries = countries || data || [];

  return (
    <div>
      <Header />
      <div className="container px-4 mx-auto mt-10 mb-4 md:px-0">
        <div className="flex flex-col justify-between lg:flex-row">
          <SearchInput
            onChange={(value) => setQuery(value)}
            value={query}
            type="text"
            className="w-full h-10 dark:bg-dark-bg focus:outline-none"
            placeholder="Search for a country..."
            timeout={600}
          />
          <div className="w-1/2 mt-4 md:w-1/3 lg:mt-0 lg:w-60">
            <Filter
              options={regions}
              onChange={(option) => setRegion(option)}
              value={region}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 mt-4 mb-8 lg:mt-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-cols-min justify-items-center">
          {loading
            ? Array.from(Array(9).keys()).map((key) => <Skeleton key={key} />)
            : listOfCountries?.slice(0, pagination).map((country) => {
                return (
                  <Link
                    href={`/${encodeURIComponent(country.name.toLowerCase())}`}
                    key={country.name}>
                    <div className="w-full h-full">
                      <CountryCard country={country} />
                    </div>
                  </Link>
                );
              })}
        </div>
        {pagination <= listOfCountries?.length ? (
          <button
            type="button"
            className="block px-4 py-2 mx-auto mb-10 text-white text-gray-800 bg-gray-800 rounded-md dark:bg-white"
            onClick={() => setPagination((pagination) => pagination + 12)}>
            Load More
          </button>
        ) : null}
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["searchCountry", ""], () =>
    searchCountry("")
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
