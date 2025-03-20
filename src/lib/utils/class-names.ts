import { pascalCase } from './strings';

export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function cmod(modifier: Record<string, string | boolean>): string {
  const key = Object.keys(modifier).find((key) => typeof modifier[key] !== 'undefined');
  if (typeof key !== 'string') {
    throw new Error('Class modifier key must be a string');
  }

  const value = modifier[key];
  if (typeof value !== 'string' && typeof value !== 'boolean') {
    throw new Error('Class modifier value must be a string or boolean');
  }

  if (value === false) {
    return '';
  }

  const pascalCasedKey = pascalCase(key);

  return value === true ? pascalCasedKey : `${pascalCasedKey}--${pascalCase(value)}`;
}
