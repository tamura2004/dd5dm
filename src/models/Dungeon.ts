export default class Dungeon {
  public static collectionName: string = 'dungeons';

  public name!: string;
  public description?: string;

  constructor(init: Form<Dungeon>) {
    Object.assign(this, init);
  }
}
