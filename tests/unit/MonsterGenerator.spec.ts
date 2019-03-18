import MonsterGenerator from '@/models/MonsterGenerator';
import Player from '@/models/Player';
import { MODE, BASE_EXP, NUM_MODIFY, EXP, CR } from '@/data/ENCOUNTER_DATA';
import Monster from '@/models/Monster';

describe('Encounter', () => {
  const player = new Player({level: 3});
  const players = [player, player, player, player];
  const generator = new MonsterGenerator();
  generator.loadPlayers(players);

  it('can initialize by loading players', () => {
    expect(JSON.stringify(generator.players)).toBe(JSON.stringify(new Map([[3, 4]])));
  });

  it('can calculate total monster exp by difficulty', () => {
    expect(generator.totalMonsterExp(MODE.EASY)).toBe(300);
    expect(generator.totalMonsterExp(MODE.NORMAL)).toBe(600);
    expect(generator.totalMonsterExp(MODE.HARD)).toBe(900);
    expect(generator.totalMonsterExp(MODE.HELL)).toBe(1600);
  });

  it('can calculate monster exp by num of monster', () => {
    expect(generator.monsterExp(1, MODE.HELL)).toBe(1100);
    expect(generator.monsterExp(2, MODE.HELL)).toBe(450);
    expect(generator.monsterExp(3, MODE.HELL)).toBe(200);
    expect(generator.monsterExp(7, MODE.HELL)).toBe(50);
    expect(generator.monsterExp(11, MODE.HELL)).toBe(25);
    expect(generator.monsterExp(15, MODE.HELL)).toBe(25);
    expect(generator.monsterExp(15, MODE.EASY)).toBe(0);
  });

  it('can make candidate of monster exp and number pair by Map', () => {
    const expected = new Map([
      [25, 15],
      [50, 10],
      [100, 6],
      [200, 4],
      [450, 2],
      [1100, 1],
    ]);
    expect(generator.candidateExpNums(MODE.HELL)).toEqual(expected);
  });

  it('can choose monster exp and number pair', () => {
    const [exp, num] = generator.chooseExpNum(MODE.HELL);
    expect([25, 50, 100, 200, 450, 1100].includes(exp)).toBe(true);
    expect([15, 10, 6, 4, 2, 1].includes(num || 0)).toBe(true);
  });

  it('can choose random monster and num', () => {
    let received = generator.chooseMonster(MODE.EASY);
    expect(received && received).toEqual(expect.any(Monster));
    expect(received && received.mode).toEqual(MODE.EASY);

    received = generator.chooseMonster(MODE.HELL);
    expect(received && received).toEqual(expect.any(Monster));
    expect(received && received.mode).toEqual(MODE.HELL);
  });

  it('can choose random encounter', () => {
    const encounter = generator.chooseEncounter(MODE.EASY);

    expect(encounter && encounter.monsterId).toEqual(expect.any(Number));
    expect(encounter && encounter.monsterNum).toEqual(expect.any(Number));
    expect(encounter && encounter.mode).toEqual(expect.any(Number));
  });
});
