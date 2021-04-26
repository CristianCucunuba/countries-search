export const regions = [
  "",
  "africa",
  "americas",
  "asia",
  "europe",
  "oceania",
] as const;

export type Country = {
  name: string;
  flag: string;
  population: number;
  region: string;
  capital: string;
  nativeName: string;
  subRegion: string;
  topLevelDomain: string;
  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];
  languages: {
    name: string;
  }[];
  borders: string[];
};

export type RegionsOptions = typeof regions;
