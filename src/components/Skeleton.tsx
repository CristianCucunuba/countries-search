function CountryCard() {
  return (
    <div className="w-4/5 mt-4 overflow-hidden rounded-md shadow-md cursor-pointer sm:w-11/12 animate-pulse">
      <div className="bg-gray-200 h-52"></div>
      <div className="px-4 py-8 bg-white dark:bg-dark-bg">
        <p className="w-1/3 h-6 mb-4 bg-gray-300"></p>
        <p className="w-full h-2 bg-gray-300"></p>
        <p className="w-full h-5 bg-gray-300"></p>
        <p className="w-full h-5 bg-gray-300"></p>
      </div>
    </div>
  );
}

export default CountryCard;
