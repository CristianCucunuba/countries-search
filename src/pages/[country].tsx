import Link from "next/link";
import Header from "@components/Header";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import type { Country } from "src/types";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";

interface CountryProps {
  country: Country;
}

function SubHeading({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <p className="mb-2">
      <span className="font-medium">{title}:</span> {value}
    </p>
  );
}

function CountryPage({ country }: CountryProps) {
  const router = useRouter();
  const {
    flag,
    name,
    nativeName,
    population,
    region,
    subRegion,
    capital,
    topLevelDomain,
    currencies = [],
    languages = [],
    borders = [],
  } = country;

  const formattedCurrencies = currencies.map((curr) => curr.name).join(", ");
  const formattedLanguages = languages.map((curr) => curr.name).join(", ");

  return (
    <>
      <Header isDark={true} />
      <div className="px-4 my-8">
        <button
          className="flex items-center px-6 py-2 bg-white rounded-sm shadow-md"
          onClick={() => router.back()}>
          <ArrowLeftIcon className="w-5 h-5 mr-2" />{" "}
          <span className="font-medium">Back</span>
        </button>
        <div className="mt-10">
          <img src={flag} alt={`Flaf of ${name}`} className="h-60" />
          <div>
            <h1 className="mt-8 mb-4 text-2xl font-bold">{name}</h1>
            <div>
              <div>
                <SubHeading title="Native name" value={nativeName} />
                <SubHeading title="Population" value={population} />
                <SubHeading title="Region" value={region} />
                <SubHeading title="Sub Region" value={subRegion} />
                <SubHeading title="Capital" value={capital} />
              </div>
              <div className="mt-8">
                <SubHeading title="Top Level Domain" value={topLevelDomain} />
                <p className="mb-2">
                  <span className="font-medium">Currencies: </span>
                  {formattedCurrencies}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Languages: </span>
                  {formattedLanguages}
                </p>
              </div>
            </div>
            <div>
              <h3 className="mt-8 mb-4 font-semibold">Border countries:</h3>
              <div className="flex flex-wrap">
                {borders.map((border) => (
                  <Link
                    href={`/${encodeURIComponent(border.name.toLowerCase())}`}
                    key={border.name}>
                    <button className="px-8 py-2 mb-4 mr-4 bg-white rounded-md shadow-md">
                      {border.name}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("http://restcountries.eu/rest/v2/all?fields=name");
  const countries = await res.json();
  const paths = countries.map((country: Country) => ({
    params: { country: country.name.toLowerCase() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const country = params?.country as string;
  const res = await fetch(
    `https://restcountries.eu/rest/v2/name/${encodeURIComponent(
      country
    )}?fullText=true`
  );
  const countryData = await res.json();
  const borders = countryData[0].borders;
  let borderCountriesNames: any = [];
  if (borders.length) {
    const requestBorders = await fetch(
      `https://restcountries.eu/rest/v2/alpha?codes=${borders.join(
        ";"
      )}&fields=name`
    );
    borderCountriesNames = await requestBorders.json();
  }

  console.log(borderCountriesNames);

  // Does the request with fetch need error handling?
  return {
    props: {
      country: {
        ...countryData[0],
        borders: borderCountriesNames,
      },
    },
  };
};

export default CountryPage;
