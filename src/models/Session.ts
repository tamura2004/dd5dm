export default class Session {
  public static collectionName: string = 'sessions';

  public static form(): Form<Session> {
    return {
      name: null,
      dungeonId: null,
      npcId: null,
      purpose: null,
      reward: null,
      limit: null,
      playerIds: [],
    };
  }

  public static valid(init: Form<Session>): boolean {
    return typeof init.name === 'string' &&
      typeof init.dungeonId === 'string' &&
      typeof init.npcId === 'string' &&
      typeof init.purpose === 'string' &&
      typeof init.reward === 'number' &&
      typeof init.limit === 'string';
  }

  public name!: string;
  public dungeonId!: string;
  public npcId!: string;
  public purpose!: string;
  public reward!: number;
  public limit!: string;
  public playerIds!: string;

  constructor(init: Form<Session>) {
    if (Session.valid(init)) {
      Object.assign(this, init);
    } else {
      throw new Error(`bad session data: ${JSON.stringify(init)}`);
    }
  }
}
