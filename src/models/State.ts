import Session from '@/models/Session';
import Encounter from '@/models/Encounter';
import Creature from '@/models/Creature';
import Player from '@/models/Player';
import Dungeon from '@/models/Dungeon';
import Npc from '@/models/Npc';
import Spell from '@/models/Spell';
import Feat from '@/models/Feat';
import Guild from '@/models/Guild';

export default class State {
  public sessions: Map<string, Session> = new Map<string, Session>();
  public encounters: Map<string, Encounter> = new Map<string, Encounter>();
  public creatures: Map<string, Creature> = new Map<string, Creature>();
  public players: Map<string, Player> = new Map<string, Player>();
  public dungeons: Map<string, Dungeon> = new Map<string, Dungeon>();
  public npcs: Map<string, Npc> = new Map<string, Npc>();
  public spells: Map<string, Spell> = new Map<string, Spell>();
  public feats: Map<string, Feat> = new Map<string, Feat>();
  public guilds: Map<string, Guild> = new Map<string, Guild>();
  public wait: boolean = false;
}
