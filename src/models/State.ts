import Session from '@/models/Session';
import Encounter from '@/models/Encounter';
import Creature from '@/models/Creature';
import Player from '@/models/Player';
import Dungeon from './Dungeon';
import Npc from './Npc';

export default class State {
  public sessions: Map<string, Session> = new Map<string, Session>();
  public encounters: Map<string, Encounter> = new Map<string, Encounter>();
  public creatures: Map<string, Creature> = new Map<string, Creature>();
  public players: Map<string, Player> = new Map<string, Player>();
  public dungeons: Map<string, Dungeon> = new Map<string, Dungeon>();
  public npcs: Map<string, Npc> = new Map<string, Npc>();

  public get ready(): boolean {
    return this.sessions.size > 0 &&
      this.encounters.size > 0 &&
      this.creatures.size > 0 &&
      this.players.size > 0 &&
      this.dungeons.size > 0 &&
      this.npcs.size > 0;
  }
}
