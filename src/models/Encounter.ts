import _ from 'lodash';
import '@/plugins/map';
import { ROOMS } from '@/data/ROOMS';
import { chooseTrap } from '@/data/TRAP';
import { MONSTERS } from '@/data/MONSTERS';
import { MODE } from '@/data/ENCOUNTER_DATA';
import Monster from '@/models/Monster';
import TEMPLATES from '@/data/TEMPLATES';

interface IEncounter {
  sessionId: string;
  monsterId: number;
  monsterNum: number;
  mode: MODE;
  level: number;
  templateId?: number;
  room?: string;
  trap?: string;
}

const isIEncounter = (init: any): init is Monster =>
typeof init.sessionId === 'string' &&
typeof init.monsterId === 'number' &&
typeof init.monsterNum === 'number' &&
typeof init.mode === 'number';

const errorMsg = (init: any): string => [
  'bad IEncounter',
  init.sessionId === undefined ? 'sessionId required' : '',
  init.monsterId === undefined ? 'monsterId required' : '',
  init.monsterNum === undefined ? 'monsterNum required' : '',
  init.mode === undefined ? 'mode required' : '',
].join();

export default class Encounter implements IEncounter {
  public static collectionName: string = 'encounters';

  public sessionId!: string;
  public monsterId!: number;
  public monsterNum!: number;
  public mode!: MODE;
  public level!: number;
  public templateId?: number;
  public room?: string;
  public trap?: string;

  constructor(init: IEncounter) {
    if (!isIEncounter(init)) {
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
    if (this.templateId === undefined) {
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
