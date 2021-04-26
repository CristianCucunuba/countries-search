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
};

export type RegionsOptions = typeof regions;
