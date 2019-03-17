import { monsterKeys } from '@/data/MONSTERS';

describe('Monsters', () => {
  it('is choose keys by function', () => {
    const got = monsterKeys((m) => m.exp === 2300);
    expect(got).toEqual([27, 33, 144, 145, 158, 167]);
  });
});
