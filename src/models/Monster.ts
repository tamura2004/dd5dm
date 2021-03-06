import Ability from '@/models/Ability';
import { EXP } from '@/data/ENCOUNTER_DATA';
import Template from './Template';
import TEMPLATES from '@/data/TEMPLATES';
import { MODE } from '@/data/ENCOUNTER_DATA';
import { MONSTER_AVATARS } from '@/data/MONSTER_AVATARS';
import MONSTERS from '@/data/MONSTERS';
import _ from 'lodash';

export default class Monster {
  public mode: MODE | null = null;
  public templateId: number | null = null;
  public id!: number;
  public name!: string;
  public size!: string;
  public type!: string;
  public alignment!: string;
  public ac!: number;
  public maxHp!: number;
  public mv!: string;
  public ability: number[] = [];
  public exp!: number;
  public attributes: string[] = [];
  public actions: string[] = [];
  public specials: string[] = [];
  public num: number | null = null;

  constructor(init: Partial<Monster>) {
    Object.assign(this, init);
  }

  public get cr(): string | undefined {
    return EXP.get(this.exp);
  }

  public abilityString(i: number): string {
    const ability = this.ability[i];
    return `${ability}${Ability.modifyString(ability)}`;
  }

  public get merged(): Monster {
    if (this.templateId === null || this.templateId === undefined) {
      return this;
    } else {
      const template = TEMPLATES[this.templateId];
      return this.add(template);
    }
  }

  public add(template: Template): Monster {
    const monster = _.cloneDeep(this);
    monster.name = template.name + '・' + monster.name;
    monster.type = template.type;
    monster.alignment = template.alignment;
    for (let i = 0; i < 6; i++) {
      monster.ability[i] = Number(monster.ability[i]) + Number(template.abilityMod[i]);
    }
    monster.ac += template.acMod;
    monster.maxHp = Math.floor(monster.maxHp * template.hpMod);
    monster.attributes = monster.attributes.concat(template.attributes);
    if (template.move !== '') {
      monster.mv = template.move;
    }
    if (template.damage !== '') {
      monster.actions = monster.actions.map((action) =>
        action.replace(/[\[［].*[\]］]/g, `[${template.damage}]`),
      );
    }
    return monster;
  }

  public get avatar(): string {
    return MONSTER_AVATARS.get(this.type) || '';
  }
}
