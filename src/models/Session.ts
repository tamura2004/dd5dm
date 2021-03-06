export default class Session {
  public static collectionName: string = 'sessions';

  public static form() {
    return {
      name: '',
      dungeonId: '',
      npcId: '',
      purpose: '',
      reward: 0,
      limit: '',
      playerIds: [],
    };
  }

  public name: string | null = null;
  public dungeonId: string | null = null;
  public npcId: string | null = null;
  public purpose: string | null = null;
  public reward: number | null = null;
  public limit: string | null = null;
  public playerIds: string[] = [];

  constructor(init: Partial<Session>) {
    Object.assign(this, init);
  }
}
