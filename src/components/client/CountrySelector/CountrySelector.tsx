'use client';

import { useEffect, useState } from 'react';
import styles from './CountrySelector.module.scss';

export type CountrySelectorProps = {
  selectedCountryId: string;
  onChange: (countryId: string) => void;
};

type Country = {
  id: number;
  code: string;
  name: string;
};

export function CountrySelector({ selectedCountryId, onChange }: CountrySelectorProps) {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const getCountriesResponse = await fetch('/api/openaq/countries?limit=200');

      if (!getCountriesResponse.ok) {
        throw new Error(`OpenAQ API request failed with status ${getCountriesResponse.status}`);
      }

      const result = await getCountriesResponse.json();

      // I sort the countries by name here since I couldn't find a way to do it properly in the API request.
      const sortedCountries = result.results.sort((a: Country, b: Country) => {
        return a.name.localeCompare(b.name);
      });

      setCountries(sortedCountries);
    };

    fetchCountries();
  }, []);

  return (
    <select
      className={styles.Base}
      value={selectedCountryId}
      onChange={(event) => onChange(event.target.value)}
    >
      {countries.map((country) => (
        <option key={country.id} value={country.id}>
          {country.name}
        </option>
      ))}
    </select>
  );
}
