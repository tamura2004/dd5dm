const isCreature = (init: any): init is Creature =>
  typeof init.encounterId === 'string' &&
  typeof init.initiative === 'number' &&
  typeof init.hp === 'number';

export default class Creature {
  public static collectionName: string = 'creatures';

  // public sessionId!: string;
  public encounterId!: string;
  // public playerId!: string;
  // public monsterId!: number;
  // public templateId!: number;
  public initiative!: number;
  public hp!: number;

  constructor(init: Form<Creature>) {
    if (isCreature(init)) {
      Object.assign(this, init);
    } else {
      alert(`bad creature data: ${JSON.stringify(init)}`);
    }
  }
}
