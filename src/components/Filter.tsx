import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { QueryKey, useQuery } from "react-query";
import { Country, RegionsOptions } from "src/types";

interface SearchInputProps {
  options: RegionsOptions;
  // is this good typing?
  setCountries: Dispatch<SetStateAction<Country[]>>;
}

type Params = {
  queryKey: QueryKey;
};

const fetchCountriesByRegion = async (params: Params) => {
  const { queryKey } = params;
  let region = queryKey[1];

  const regionsUrl = `https://restcountries.eu/rest/v2/region/${region}`;
  const allCountriesUrl = "https://restcountries.eu/rest/v2/all";

  const response = await fetch(region === "all" ? allCountriesUrl : regionsUrl);
  return response.json();
};

function Filter({ options, setCountries }: SearchInputProps) {
  const [selected, setSelected] = useState<RegionsOptions | null>(null);

  const { isLoading, data } = useQuery<Country[]>(
    ["countriesByRegion", selected],
    fetchCountriesByRegion,
    { enabled: !!selected }
  );

  if (!isLoading && data) {
    setCountries(data);
  }

  return (
    <div className="w-3/5 mt-8">
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-3 pl-8 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                <span className="block capitalize truncate">
                  {selected
                    ? selected === "all"
                      ? "Mr. Worlwide"
                      : selected
                    : "Filter by Region"}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon className="w-5 h-5" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <Listbox.Options
                  static
                  className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {options.map((option, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `${
                          active
                            ? "text-amber-900 bg-amber-100"
                            : "text-gray-900"
                        }
                        cursor-default select-none relative py-2 pl-10 pr-4 capitalize`
                      }
                      value={option}>
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`${
                              selected ? "font-medium" : "font-normal"
                            } block truncate`}>
                            {option === "all" ? "Mr. Worlwide" : option}
                          </span>
                          {selected ? (
                            <span
                              className={`${
                                active ? "text-amber-600" : "text-amber-600"
                              }
                                absolute inset-y-0 left-0 flex items-center pl-3`}>
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}

export default Filter;
