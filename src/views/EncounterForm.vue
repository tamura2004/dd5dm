<template lang="pug">
  .headline モンスター選択
    v-list(two-line)
      template(v-for="encounter in encounters")
        EncounterTile(:encounter="encounter")
          v-list-tile-action
            v-btn(flat @click="select(encounter)")
              v-icon done
        v-divider
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { MODE } from '@/data/ENCOUNTER_DATA';
import { CREATE } from '@/types/ActionTypes';
import EncounterTile from '@/components/EncounterTile.vue';
import MonsterGenerator from '@/models/MonsterGenerator';
import Session from '@/models/Session';
import Encounter from '@/models/Encounter';
import Creature from '@/models/Creature';
import Player from '@/models/Player';

@Component({
  components: {
    EncounterTile,
  },
})
export default class EncounterForm extends Vue {
  @Prop() private sessionId!: string;

  private get session(): Session {
    return this.$store.getters.session(this.sessionId);
  }

  private get players(): Map<string, Player> {
    return this.$store.state.players;
  }

  private modes: MODE[] = [
    MODE.EASY,
    MODE.NORMAL,
    MODE.NORMAL,
    MODE.NORMAL,
    MODE.HARD,
    MODE.HELL,
  ];

  private get encounters(): Array<Encounter | undefined> {
    const generator = new MonsterGenerator();
    generator.loadPlayers(Array.from(this.players.values()));
    return this.modes.map((mode: MODE) => generator.chooseEncounter(mode));
  }

  private async select(encounter: Encounter) {
    const encounterId = await this.$store.dispatch(CREATE, encounter);
    for (let i = 0; i < encounter.monsterNum; i++) {
      await this.$store.dispatch(CREATE, new Creature({
        encounterId,
        initiative: Math.floor(Math.random() * 20),
        hp: encounter.monster.maxHp,
      }));
    }
    this.$router.push({ name: 'session/encounters' });
  }
}
</script>
