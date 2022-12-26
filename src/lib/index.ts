export function parseLevel(level: number) {
  const table: Record<number, number> = {
    100: 0,
    75: 3,
    50: 5,
    25: 7,
    0: 10,
  };
  return table[level] ?? 10;
}
