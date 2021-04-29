import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { RegionsOptions } from "src/types";

interface SearchInputProps {
  options: RegionsOptions;
  value: string;
  onChange: (value: string) => void;
}

function Filter({ options, onChange, value = "" }: SearchInputProps) {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div>
          <div className="relative z-10 mt-1">
            <Listbox.Button className="relative w-full py-3 pl-8 pr-10 text-left bg-white rounded-md shadow-md cursor-pointer dark:bg-dark-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <span className="block capitalize truncate">
                {value || "Mr. Worlwide"}
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
                className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg dark:bg-dark-bg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `${
                        active
                          ? "bg-gray-100 dark:bg-dark-blue"
                          : "text-black-900"
                      } select-none relative py-2 pl-10 pr-4 capitalize cursor-pointer`
                    }
                    value={option}>
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? "font-medium" : "font-normal"
                          } block truncate`}>
                          {option || "Mr. Worlwide"}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? "text-amber-600" : "text-amber-600"
                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}>
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}

export default Filter;
