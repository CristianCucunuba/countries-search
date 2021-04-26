import Header from "@components/Header";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import type { Country } from "src/types";
import { GetStaticProps, GetStaticPaths } from "next";

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
  } = country;

  const formattedCurrencies = currencies.map((curr) => curr.name).join(", ");
  const formattedLanguages = languages.map((curr) => curr.name).join(", ");

  return (
    <div>
      <Header isDark={true} />
      <div className="px-4 mt-8">
        <button className="flex items-center px-6 py-2 bg-white rounded-sm shadow-md">
          <ArrowLeftIcon className="w-5 h-5 mr-2" />{" "}
          <span className="font-medium">Back</span>
        </button>
        <div className="mt-10">
          <img
            src={flag}
            alt="country image"
            className="border border-red-500 h-60"
          />
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
              <button className="px-8 py-2 bg-white rounded-md shadow-md">
                France
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  const data = await res.json();

  return {
    props: {
      country: data[0],
    },
  };
};

export default CountryPage;
