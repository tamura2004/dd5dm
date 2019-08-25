const table = [
  { exp: 0, level: 1, bab: 2 },
  { exp: 300, level: 2, bab: 2 },
  { exp: 900, level: 3, bab: 2 },
  { exp: 2700, level: 4, bab: 2 },
  { exp: 6500, level: 5, bab: 3 },
  { exp: 14000, level: 6, bab: 3 },
  { exp: 23000, level: 7, bab: 3 },
  { exp: 34000, level: 8, bab: 3 },
  { exp: 48000, level: 9, bab: 4 },
  { exp: 64000, level: 10, bab: 4 },
  { exp: 85000, level: 11, bab: 4 },
  { exp: 100000, level: 12, bab: 4 },
  { exp: 120000, level: 13, bab: 5 },
  { exp: 140000, level: 14, bab: 5 },
  { exp: 165000, level: 15, bab: 5 },
  { exp: 195000, level: 16, bab: 5 },
  { exp: 225000, level: 17, bab: 6 },
  { exp: 265000, level: 18, bab: 6 },
  { exp: 305000, level: 19, bab: 6 },
  { exp: 355000, level: 20, bab: 6 },
];

const reverse = table.reverse();

export const toLevel = exp => {
  const row = reverse.find(row => row.exp < exp);
  return row && row.level;
};
