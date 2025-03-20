export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function pascalCase(str: string): string {
  return str.replace(/\w+/g, capitalize).replace(/\W/g, '');
}
