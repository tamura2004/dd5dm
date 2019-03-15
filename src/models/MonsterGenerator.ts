import _ from 'lodash';
import Player from '@/models/Player';
import MONSTERS from '@/data/MONSTERS';
import Monster from '@/models/Monster';
import { MODE, BASE_EXP, NUM_MODIFY, CR } from '@/data/ENCOUNTER_DATA';
import TEMPLATES from '@/data/TEMPLATES';

export default class MonsterGenerator {
  public players: Map<number, number> = new Map();

  public loadPlayers(players: Player[]) {
    for (const player of players) {
      const level = player.level || 0;
      const num = this.players.get(level) || 0;
      this.players.set(level, num + 1);
    }
  }
  public totalMonsterExp(mode: MODE = MODE.NORMAL): number {
    const table = BASE_EXP.get(mode);
    let sum = 0;
    for (const [level, num] of this.players) {
      sum += (table ? (table.get(level) || 0) : 0) * num;
    }
    return sum;
  }
  public monsterExp(num: number, mode?: MODE): number {
    const modify = NUM_MODIFY.get(num) || 1;
    const totalExp = this.totalMonsterExp(mode);
    const exp = totalExp / modify / num;
    return CR.reduce((previous, current) => current <= exp ? current : previous, 0);
  }
  public candidateExpNums(mode?: MODE): Map<number, number> {
    const candidate = new Map<number, number>();
    for (let num = 15; num > 0; num--) {
      const exp = this.monsterExp(num, mode);
      if (exp !== 0 && !candidate.has(exp)) {
        candidate.set(exp, num);
      }
    }
    return candidate;
  }
  public chooseExpNum(mode?: MODE): [number, number | undefined] {
    const candidate = this.candidateExpNums(mode);
    const keys = Array.from(candidate.keys());
    const key = keys[Math.floor(Math.random() * keys.length)];
    return [key, candidate.get(key)];
  }
  public chooseMonster(mode: MODE = MODE.NORMAL): Monster | undefined {
    const evil = _.sample(TEMPLATES) || TEMPLATES[0];

    const [exp, num] = this.chooseExpNum(mode);
    let monster = _.sample(MONSTERS.filter((m: Monster) => m.exp === exp));
    if (monster !== undefined && num !== undefined) {
      if (!monster.alignment.includes('悪')) {
        monster = monster.add(evil);
      }
      monster.num = num;
      monster.mode = mode;
      return monster;
    }
  }
}
