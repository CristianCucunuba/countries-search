import { SearchIcon } from "@heroicons/react/outline";
import React, { useState, useEffect } from "react";
import useDebounceValue from "src/hooks/useDebounceValue";
import { useQuery } from "react-query";

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
    <div className="flex items-center px-4 py-2 mt-6 bg-white rounded-md shadow-md">
      <SearchIcon className="w-8 h-8 mr-4" />
      <input onChange={(e) => setSearchQuery(e.target.value)} {...props} />
    </div>
  );
}

export default SearchInput;
