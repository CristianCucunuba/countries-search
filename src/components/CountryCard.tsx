import Image from "next/image";
import { Country } from "src/types";

interface CountryCardProps {
  country: Country;
}

function CountryCard({ country }: CountryCardProps) {
  return (
    <div className="w-4/5 mt-4 overflow-hidden rounded-md shadow-md cursor-pointer sm:w-11/12">
      <div className="relative h-52">
        <Image
          src={country.flag}
          alt={`Flag of ${country.name}`}
          layout="fill"
        />
      </div>
      <div className="px-4 py-8 bg-white dark:bg-dark-bg">
        <p className="mb-4 text-lg font-bold">{country.name}</p>
        <p className="font-medium">
          Population:{" "}
          <span className="font-light">
            {country.population.toLocaleString()}
          </span>
        </p>
        <p className="font-medium">
          Region: <span className="font-light">{country.region}</span>
        </p>
        <p className="font-medium">
          Capital: <span className="font-light">{country.capital}</span>
        </p>
      </div>
    </div>
  );
}

export default CountryCard;
