<template lang="pug">
  .headline EncounterForm
    v-btn(block dark to="/encounter/1/battle") モンスター選択
    v-list(two-line)
      template(v-for="monster in monsters")
        MonsterList(:monster="monster")
          v-list-tile-action
            v-btn(flat @click="select(monster)")
              v-icon done
        v-divider
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { MODE } from '@/data/ENCOUNTER_DATA';
import { CREATE } from '@/types/ActionTypes';
import MonsterList from '@/components/MonsterList.vue';
import MonsterGenerator from '@/models/MonsterGenerator';
import Session from '@/models/Session';
import Encounter from '@/models/Encounter';
import Creature from '@/models/Creature';
import Player from '@/models/Player';
import Monster from '@/models/Monster';
import { MONSTERS } from '@/data/MONSTERS';
import TEMPLATES from '@/data/TEMPLATES';

@Component({
  components: {
    MonsterList,
  },
})
export default class EncounterForm extends Vue {
  @Prop() private sessionId!: string;

  private get session(): Session {
    return this.$store.state.sessions.get(this.sessionId);
  }

  private get encounterNum() {
    return this.$store.getters.encounters(this.sessionId).size + 1;
  }


  private get players(): Map<string, Player> {
    return this.$store.state.players;
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

  private modes: MODE[] = [
    MODE.EASY,
    MODE.NORMAL,
    MODE.NORMAL,
    MODE.NORMAL,
    MODE.HARD,
    MODE.HELL,
  ];

  private get monsters(): Array<Monster | undefined> {
    const generator = new MonsterGenerator();
    generator.loadPlayers(Array.from(this.players.values()));
    return this.modes.map((mode: MODE) => generator.chooseMonster(mode));
  }

  private async select(monster: Monster) {
    const encounter = new Encounter({
      sessionId: this.sessionId,

    });
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
    this.$router.push({ name: 'session/encounters' });
  }
}
</script>
