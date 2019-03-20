import Ability from '@/models/Ability';
import { EXP } from '@/data/ENCOUNTER_DATA';
import Template from './Template';
// import { MODE } from '@/data/ENCOUNTER_DATA';
import { MONSTER_AVATARS } from '@/data/MONSTER_AVATARS';

function isMonster(init: any): init is Monster {
  return init.name !== undefined &&
    init.size !== undefined &&
    init.name !== undefined &&
    init.size !== undefined &&
    init.type !== undefined &&
    init.alignment !== undefined &&
    init.ac !== undefined &&
    init.maxHp !== undefined &&
    init.mv !== undefined &&
    init.exp !== undefined;
}

export default class Monster {
  // public mode: MODE | null = null;
  // public templateId: number | null = null;
  // public id!: number;
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
  // public num: number | null = null;

  constructor(init: Form<Monster>) {
    if (isMonster(init)) {
      Object.assign(this, init);
    } else {
      alert(`bad monster init: ${JSON.stringify(init)}`);
    }
  }

  public get cr(): string | undefined {
    return EXP.get(this.exp);
  }

  public abilityString(i: number): string {
    const ability = this.ability[i];
    return `${ability}${Ability.modifyString(ability)}`;
  }

  public add(template: Template): Monster {
    const monster = new Monster({ ...this });
    monster.name = template.name + '・' + monster.name;
    monster.type = template.type;
    monster.alignment = template.alignment;
    for (let i = 0; i < 6; i++) {
      monster.ability[i] += Number(template.abilityMod[i]);
    }
    monster.ac += template.acMod;
    monster.maxHp = Math.floor(monster.maxHp * template.hpMod);
    monster.attributes = monster.attributes.concat(template.attributes);
    return monster;
  }

  public get avatar(): string {
    return MONSTER_AVATARS.get(this.type) || '';
  }
}
