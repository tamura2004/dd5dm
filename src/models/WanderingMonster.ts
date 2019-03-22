import _ from 'lodash';
import '@/plugins/map';
import { MONSTERS } from '@/data/MONSTERS';
import { MODE } from '@/data/ENCOUNTER_DATA';
import Monster from '@/models/Monster';
import TEMPLATES from '@/data/TEMPLATES';

interface IWanderingMonster {
  monsterId: number;
  monsterNum: number;
  templateId?: number;
  mode: MODE;
}

const isIWanderingMonster = (init: any): init is Monster =>
typeof init.monsterId === 'number' &&
typeof init.monsterNum === 'number' &&
typeof init.mode === 'number';

export default class WanderingMonster implements IWanderingMonster {
  public static collectionName: string = 'encounters';

  public monsterId!: number;
  public monsterNum!: number;
  public mode!: MODE;
  public templateId?: number;

  public static random(mode: MODE): WanderingMonster {

  }

  constructor(init: IWanderingMonster) {
    if (!isIWanderingMonster(init)) {
      throw new Error(`bad wandering monster init: ${JSON.stringify(init)}`);
    }
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
}
