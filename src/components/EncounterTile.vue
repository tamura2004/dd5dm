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
import Monster from '@/models/Monster';
import { MONSTERS } from '@/data/MONSTERS';
import Encounter from '@/models/Encounter';
import TEMPLATES from '@/data/TEMPLATES';
import { MODE } from '@/data/ENCOUNTER_DATA';
import Mode from '@/models/Mode';

@Component
export default class EncounterTile extends Vue {
  @Prop() private encounter!: Encounter;

  private get monster(): Monster | undefined {
    if (this.encounter === undefined) {
      return;
    }
    const monsterId = this.encounter.monsterId;
    if (monsterId === null) {
      return;
    }
    let m: Monster = MONSTERS[monsterId];
    const templateId = this.encounter.templateId;
    if (templateId) {
      m = m.add(TEMPLATES[templateId]);
    }
    return m;
  }
  private get mode(): MODE {
    return this.encounter.mode === null ? MODE.NORMAL : this.encounter.mode;
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
