'use client';

import { CountrySelector, Location, ResultCard, SearchField } from '@/components/client';
import { Text } from '@/components/server';
import { useEffect, useState } from 'react';
import styles from './Search.module.scss';

export function Search() {
  const [selectedCountryId, setSelectedCountryId] = useState<string>('79');
  const [savedLocations, setSavedLocations] = useState<Location[]>([]);
  const [results, setResults] = useState<Location[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(
        `/api/openaq/locations?countries_id=${selectedCountryId}&limit=200`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`OpenAQ API request failed with status ${response.status}`);
      }

      const result = await response.json();

      setResults(result.results);
    };

    fetchResults();
  }, [selectedCountryId]);

  return (
    <div className={styles.Container}>
      <CountrySelector
        onChange={(countryId) => {
          setSelectedCountryId(countryId);
        }}
        selectedCountryId={selectedCountryId}
      />

      <SearchField
        onSave={(result) => {
          // First check if the location is already saved
          if (savedLocations.some((location) => location.id === result.id)) {
            return;
          }

          setSavedLocations([...savedLocations, result]);
        }}
        results={results}
      />

      <div className={styles.SavedLocations}>
        {savedLocations.map((result) => (
          <ResultCard
            key={result.id}
            onRemove={() => {
              setSavedLocations(savedLocations.filter((location) => location.id !== result.id));
            }}
          >
            <Text variant="body-sm" transform="uppercase">
              {lastUpdatedAt(new Date(result.datetimeLast.utc))}
            </Text>
            <Text variant="body-lg">{result.name}</Text>
            <Text variant="body-sm">{result.locality}</Text>
            <Text variant="body-sm">{result.country.name}</Text>
          </ResultCard>
        ))}
      </div>
    </div>
  );
}

// Takes a date and returns a string in following formats:
// 'Updated: An hour ago'
// 'Updated: 2 days ago'
// 'Updated: 3 weeks ago'
// 'Updated: 4 months ago'
// 'Updated: 5 years ago'
function lastUpdatedAt(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `Updated: ${years} year${years > 1 ? 's' : ''} ago`;
  }

  if (months > 0) {
    return `Updated: ${months} month${months > 1 ? 's' : ''} ago`;
  }

  if (weeks > 0) {
    return `Updated: ${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }

  if (days > 0) {
    return `Updated: ${days} day${days > 1 ? 's' : ''} ago`;
  }

  if (hours > 0) {
    return `Updated: ${hours} hour${hours > 1 ? 's' : ''} ago`;
  }

  if (minutes > 0) {
    return `Updated: ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }

  return `Updated: ${seconds} second${seconds > 1 ? 's' : ''} ago`;
}
