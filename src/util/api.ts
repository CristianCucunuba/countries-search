const baseUrl = "https://restcountries.eu/rest/v2";

export const getCountriesByRegion = async (region: string) => {
  const url = `${baseUrl}/${region ? `region/${region}` : "all"}`;
  const response = await fetch(url);
  return response.json();
};

export const searchCountry = async (query: string) => {
  const url = `${baseUrl}/${query ? `name/${query}` : "all"}`;

  const response = await fetch(url);
  // TODO: Handle 404 searches
  if (!response.ok) {
    throw new Error("Api error");
  }
  return response.json();
};
