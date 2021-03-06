export enum MODE {
  EASY = 0,
  NORMAL,
  HARD,
  HELL,
}

type level = number;
type exp = number;

export const BASE_EXP = new Map<MODE, Map<level, exp>>([
  [
    MODE.EASY,
    new Map<level, exp>([
      [1, 25],
      [2, 50],
      [3, 75],
      [4, 125],
      [5, 250],
      [6, 300],
      [7, 350],
      [8, 450],
      [9, 550],
      [10, 600],
    ]),
  ],
  [
    MODE.NORMAL,
    new Map<level, exp>([
      [1, 50],
      [2, 100],
      [3, 150],
      [4, 250],
      [5, 500],
      [6, 600],
      [7, 750],
      [8, 900],
      [9, 1100],
      [10, 1200],
    ]),
  ],
  [
    MODE.HARD,
    new Map<level, exp>([
      [1, 75],
      [2, 150],
      [3, 225],
      [4, 375],
      [5, 750],
      [6, 900],
      [7, 1100],
      [8, 1400],
      [9, 1600],
      [10, 1900],
    ]),
  ],
  [
    MODE.HELL,
    new Map<level, exp>([
      [1, 100],
      [2, 200],
      [3, 400],
      [4, 500],
      [5, 1100],
      [6, 1400],
      [7, 1700],
      [8, 2100],
      [9, 2400],
      [10, 2800],
    ]),
  ],
]);

export const NUM_MODIFY = new Map<number, number>([
  [1, 1],
  [2, 1],
  [3, 1],
  [4, 1],
  [5, 1],
  [6, 1],
  [7, 1.5],
  [8, 1.5],
  [9, 1.5],
  [10, 2],
  [11, 2],
  [12, 2],
  [13, 2],
  [14, 2],
  [15, 3],
  // [1, 1],
  // [2, 1.5],
  // [3, 2],
  // [4, 2],
  // [5, 2],
  // [6, 2],
  // [7, 2.5],
  // [8, 2.5],
  // [9, 2.5],
  // [10, 2.5],
  // [11, 3],
  // [12, 3],
  // [13, 3],
  // [14, 3],
  // [15, 4],
]);

export const EXP = new Map<number, string>([
  [10, '0'],
  [25, '1/8'],
  [50, '1/4'],
  [100, '1/2'],
  [200, '1'],
  [450, '2'],
  [700, '3'],
  [1100, '4'],
  [1800, '5'],
  [2300, '6'],
  [2900, '7'],
  [3900, '8'],
  [5000, '9'],
  [5900, '10'],
  [7200, '11'],
  [8400, '12'],
  [10000, '13'],
]);

export const CR = [
  10,
  25,
  50,
  100,
  200,
  450,
  700,
  1100,
  1800,
  2300,
  2900,
  3900,
  5000,
  5900,
  7200,
  18000,
];
