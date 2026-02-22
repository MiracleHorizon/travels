const WIND_GRADUATION = 45
const WIND_DIRECTIONS_COUNT = 8

export const getWindDirection = (
  deg: number | null,
  windDirections: readonly string[]
): string | null => {
  if (deg == null || windDirections.length < WIND_DIRECTIONS_COUNT) {
    return null
  }

  const index = Math.round(deg / WIND_GRADUATION) % WIND_DIRECTIONS_COUNT

  return windDirections[index >= 0 ? index : index + WIND_DIRECTIONS_COUNT]
}
