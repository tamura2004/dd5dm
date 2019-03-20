<template lang="pug">
v-list-tile(v-if="monster")
  v-list-tile-avatar
    v-btn.font-weight-bold(fab dark small :color="color") {{ label }}
  v-list-tile-content(v-if="monster")
    v-list-tile-title
      v-layout
        v-flex(xs12) {{ monster.name }}
    v-list-tile-sub-title
      v-layout
        v-flex(xs3) {{ encounter.monsterNum }} 体
        v-flex(xs3) AC: {{ monster.ac }}
        v-flex(xs3) hp: {{ monster.maxHp }}
        v-flex(xs3) exp:{{ monster.exp * encounter.monsterNum }}
  v-list-tile-action
    slot

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { MODE } from '@/data/ENCOUNTER_DATA';
import Monster from '@/models/Monster';
import Encounter from '@/models/Encounter';
import Mode from '@/models/Mode';

@Component
export default class EncounterTile extends Vue {
  @Prop() private encounter!: Encounter;

  private get monster(): Monster | undefined {
    return this.encounter.monster;
  }
  private get mode(): MODE {
    return this.encounter.mode;
  }
  private get color(): string {
    return Mode.color(this.mode);
  }
  private get label(): string {
    return Mode.label(this.mode);
  }
}
</script>

<style lang="stylus">
</style>
