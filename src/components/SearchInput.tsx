import React, { useState, useEffect } from "react";
import { SearchIcon } from "@heroicons/react/outline";

interface SearchInputProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "value" | "onChange"> {
  value?: string;
  onChange: (value: string) => void;
  timeout?: number;
}

function SearchInput({
  onChange,
  value: defaultValue = "",
  timeout = 250,
  ...props
}: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState(defaultValue);

  useEffect(() => {
    const handler = setTimeout(() => onChange(searchQuery), timeout);
    return () => clearTimeout(handler);
  }, [searchQuery, timeout, onChange]);

  return (
    <div className="flex items-center w-full py-1 pl-5 bg-white rounded-md shadow-md md:w-96">
      <SearchIcon className="w-6 h-6 mr-4" />
      <input onChange={(e) => setSearchQuery(e.target.value)} {...props} />
    </div>
  );
}

export default SearchInput;
