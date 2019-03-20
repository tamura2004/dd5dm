import _ from 'lodash';
import '@/plugins/map';
import { ROOMS } from '@/data/ROOMS';
import { chooseTrap } from '@/data/TRAP';
import Monster from '@/models/Monster';
import { MONSTERS } from '@/data/MONSTERS';
import TEMPLATES from '@/data/TEMPLATES';
import { MODE } from '@/data/ENCOUNTER_DATA';

const isEncounter = (init: any): init is Monster =>
  typeof init.monsterId === 'number' &&
  typeof init.monsterNum === 'number' &&
  typeof init.mode === 'number';

const errorMsg = (init: any): string => [
  init.monsterId === undefined ? 'bad monster id' : '',
  init.monsterNum === undefined ? 'bad monster num' : '',
  init.mode === undefined ? 'bad mode' : '',
].join();

export default class Encounter {
  public static collectionName: string = 'encounters';

  public monsterId!: number;
  public monsterNum!: number;
  public mode!: MODE;
  public sessionId: string | null = null;
  public level: number | null = null;
  public templateId: number | null = null;
  public room: string | null = null;
  public trap: string | null = null;

  constructor(init: Form<Encounter>) {
    if (!isEncounter(init)) {
      throw new Error(`${errorMsg(init)}: ${JSON.stringify(init)}`);
    }
    this.room = _.sample(ROOMS.get('鉱山')) || '';
    this.trap = chooseTrap();
    Object.assign(this, init);
    if (this.monster && !this.monster.alignment.includes('悪')) {
      this.templateId = Math.floor(Math.random() * TEMPLATES.length);
    }
  }

  public get monster(): Monster {
    const base = MONSTERS.take(this.monsterId);
    if (this.templateId === null) {
      return base;
    } else {
      const template = TEMPLATES[this.templateId];
      return base.add(template);
    }
  }

  public get monsterName(): string {
    return this.monster.name;
  }

  public get exp(): number {
    return this.monster.exp * this.monsterNum;
  }
}
