import React from "react";
import { Country } from "src/types";

interface CountryCardProps {
  country: Country;
}

function CountryCard({ country }: CountryCardProps) {
  return (
    <div className="w-4/5 mt-4 overflow-hidden rounded-md shadow-md cursor-pointer">
      <img className="w-full h-44" src={country.flag} alt="" />
      <div className="px-4 py-8 bg-white">
        <p className="mb-4 text-lg font-bold">{country.name}</p>
        <div>
          <p>
            <span className="font-medium">Population:</span>
            {country.population}
          </p>
          <p>
            <span className="font-medium">Region:</span> {country.region}
          </p>
          <p>
            <span className="font-medium">Capital:</span> Washington ,DC
          </p>
        </div>
      </div>
    </div>
  );
}

export default CountryCard;
