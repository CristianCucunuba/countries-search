import { SearchIcon } from "@heroicons/react/outline";

function SearchInput() {
  return (
    <div className="flex items-center px-4 py-2 mt-6 bg-white rounded-md shadow-md">
      <SearchIcon className="w-8 h-8 mr-4" />
      <input
        type="text"
        className="w-full h-10"
        placeholder="Search for a country..."
      />
    </div>
  );
}

export default SearchInput;
