'use client';

import { Text } from '@/components/server';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { useState } from 'react';
import styles from './SearchField.module.scss';

export type SearchFieldProps = {
  results: Location[];
  onSave: (result: Location) => void;
};

export type Location = {
  id: number;
  name: string;
  locality: string | null;
  country: {
    id: number | null;
    code: string;
    name: string;
  };
  datetimeLast: {
    utc: string;
    local: string;
  };
};

export function SearchField({ results, onSave }: SearchFieldProps) {
  const [inputFocused, setInputFocused] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <div className={styles.Container}>
      <div className={styles.Icon}>
        <Search />
      </div>

      <input
        className={styles.Input}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        placeholder="Search for a location"
      />

      {results.length > 0 && (
        <div className={cn(styles.Results, inputFocused && styles.ResultsVisible)}>
          {results
            .filter((result) => {
              // Ideas for further improvement:
              //
              // Implement a more advanced search algorithm like fuzzy search or Levenshtein
              // distance. For now, we're just checking if the query is a substring of the name.
              //
              // Highlight the matching part of the name in the search results.

              const downCasedQuery = query.toLowerCase();
              const downCasedName = result.name.toLowerCase();

              return downCasedName.includes(downCasedQuery);
            })
            .map((result) => (
              <div
                key={result.id}
                className={styles.Result}
                onClick={() => {
                  onSave(result);
                }}
              >
                <Text variant="body-lg">{result.name}</Text>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
