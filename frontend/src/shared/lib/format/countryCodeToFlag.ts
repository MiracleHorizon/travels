export const countryCodeToFlag = (isoCode: string): string => {
  return isoCode
    .toUpperCase()
    .replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397))
}
