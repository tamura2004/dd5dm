export default class Npc {
  public static collectionName: string = 'npcs';

  public name!: string;
  public description?: string;

  constructor(init: Form<Npc>) {
    Object.assign(this, init);
  }
}
