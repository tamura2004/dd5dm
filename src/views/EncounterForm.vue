<template lang="pug">
.headline EncounterForm
  v-btn(block dark @click="reload") 振り直し
  v-list(two-line)
    template(v-for="monster in monsters")
      MonsterList(:monster="monster" @select="select(monster)")
        v-list-tile-action
          v-btn(small color="primary" @click="select(monster)") 選択
      v-divider
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { MODE } from '@/data/ENCOUNTER_DATA';
import { CREATE } from '@/types/ActionTypes';
import MonsterGenerator from '@/models/MonsterGenerator';
import Session from '@/models/Session';
import Encounter from '@/models/Encounter';
import Creature from '@/models/Creature';
import Player from '@/models/Player';
import Monster from '@/models/Monster';
import MONSTERS from '@/data/MONSTERS';
import TEMPLATES from '@/data/TEMPLATES';
import PATH from '@/types/PathTypes';
import { listen } from '@/plugins/firebase';

@Component
export default class EncounterForm extends Vue {
  @Prop() private sessionId!: string;

  private monsters: Array<Monster | undefined> = [];

  private modes: MODE[] = [
    MODE.EASY,
    MODE.NORMAL,
    MODE.NORMAL,
    MODE.NORMAL,
    MODE.HARD,
    MODE.HELL,
  ];

  private unsubscribe: () => void = () => {
    //
  }

  private async created() {
    this.reload();
    this.unsubscribe = await listen<Encounter>(Encounter, 'sessionId', this.sessionId);
  }

  private destroyed() {
    this.unsubscribe();
  }

  private reload() {
    const generator = new MonsterGenerator();
    generator.loadPlayers(Array.from(this.players.values()), this.$store.state.guilds);
    this.monsters = this.modes.map((mode: MODE) => generator.chooseMonster(mode));
  }

  private get session(): Session {
    return this.$store.state.sessions.get(this.sessionId);
  }

  private get encounterNum() {
    return this.$store.getters.encounters(this.sessionId).size + 1;
  }

  private get players(): Map<string, Player> {
    return this.$store.getters.players(this.sessionId);
  }

  private get party(): Player[] {
    const ret = [];
    for (const id of this.session.playerIds) {
      const player = this.players.get(id);
      if (player !== undefined) {
        ret.push(player);
      }
    }
    return ret;
  }

  private async select(monster: Monster) {
    const encounterId = await this.$store.dispatch(CREATE, new Encounter({
        sessionId: this.sessionId,
        level: this.encounterNum,
        monsterId: monster.id,
        monsterNum: monster.num,
        templateId: monster.templateId,
      }),
    );

    for (let i = 0; i < (monster.num || 0); i++) {
      await this.$store.dispatch(CREATE, new Creature({
        encounterId,
        sessionId: this.sessionId,
        monsterId: monster.id,
        templateId: monster.templateId,
        initiative: Math.floor(Math.random() * 20),
        hp: monster.maxHp,
      }));
    }
    this.$router.push({
      name: PATH.SESSION_ENCOUNTERS,
    });
  }
}
</script>
