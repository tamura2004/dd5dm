import { ROOMS } from '@/data/ROOMS';
import _ from 'lodash';
import { chooseTrap } from '@/data/TRAP';
import { chooseItems, chooseGold } from '@/data/TREASURE_DATA';
import Monster from '@/models/Monster';
import MONSTERS from '@/data/MONSTERS';
import TEMPLATES from '@/data/TEMPLATES';

export default class Encounter {
  public static collectionName: string = 'encounters';

  public sessionId: string | null = null;
  public level: number = 0;
  public room: string | null = null;
  public trap: string | null = null;
  public monsterId: number | null = null;
  public monsterNum: number | null = null;
  public templateId: number | null = null;
  public items: string[] = [];
  public gold: number | null = null;

  constructor(init: Partial<Encounter>) {
    this.room = _.sample(ROOMS.get('鉱山')) || null;
    this.trap = chooseTrap();
    this.items = chooseItems(_.random);
    this.gold = chooseGold(_.random);
    Object.assign(this, init);
  }

  public get monster(): Monster | undefined {
    if (this.monsterId === null) {
      return;
    }
    const base = new Monster(MONSTERS[this.monsterId]);
    base.templateId = this.templateId;
    return base.merged;
  }

  public get monsterName(): string | undefined {
    if (this.monster === undefined) {
      return;
    }
    return this.monster.name;
  }

  public get exp(): number | undefined {
    if (this.monster === undefined) {
      return;
    }
    if (this.monsterNum === null) {
      return;
    }
    return this.monster.exp * this.monsterNum;
  }

  public get itemDescription(): string {
    if (this.items === undefined || this.items.length === 0) {
      return 'なし';
    } else {
      return this.items.join('、');
    }
  }

  public get goldDescription(): string {
    if (this.gold) {
      return `${this.gold}gp`;
    } else {
      return 'なし';
    }
  }
}
