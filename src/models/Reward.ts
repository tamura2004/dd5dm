export default class Reward {
  public static collectionName = 'rewards';

  public sessionId: string | null = null;
  public encounterId: string | null = null;
  public gold: number = 0;
  public items: string[] = [];

  constructor(init: Form<Reward>) {
    Object.assign(this, init);
  }
}
