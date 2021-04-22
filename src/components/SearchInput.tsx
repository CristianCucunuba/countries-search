import Search from "@icons/Search";

function SearchInput() {
  return (
    <div className="flex items-center px-4 py-2 mt-6 bg-white rounded-md shadow-md">
      <span className="mr-8">
        <Search />
      </span>
      <input
        type="text"
        className="w-full h-10"
        placeholder="Search for a country..."
      />
    </div>
  );
}

export default SearchInput;
