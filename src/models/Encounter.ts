import { ROOMS } from '@/data/ROOMS';
import _ from 'lodash';
import { chooseTrap } from '@/data/TRAP';
import Monster from '@/models/Monster';
import MONSTERS from '@/data/MONSTERS';
import Template from '@/models/Template';
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

  constructor(init: Partial<Encounter>) {
    this.room = _.sample(ROOMS.get('鉱山')) || null;
    this.trap = chooseTrap();
    Object.assign(this, init);
  }

  public get monster(): Monster | undefined {
    if (this.monsterId === null) {
      return;
    }
    const base = MONSTERS[this.monsterId];
    if (this.templateId === null) {
      return base;
    }
    const template = TEMPLATES[this.templateId];
    return base.add(template);
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
}
