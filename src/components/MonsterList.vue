<template lang="pug">
v-list-tile(v-if="monster")
  v-list-tile-avatar
    v-btn.font-weight-bold(fab dark small :color="color") {{ label }}
  v-list-tile-content
    v-list-tile-title
      v-layout
        v-flex(xs12) {{ creature.name }}
    v-list-tile-sub-title
      v-layout
        v-flex(xs3) {{ monster.num }} 体
        v-flex(xs3) AC: {{ creature.ac }}
        v-flex(xs3) hp: {{ creature.maxHp }}
        v-flex(xs3) exp:{{ monster.exp * monster.num }}
  v-list-tile-action
    slot

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Monster from '@/models/Monster';
import { MONSTERS } from '@/data/MONSTERS';
import { MODE } from '@/data/ENCOUNTER_DATA';
import Mode from '@/models/Mode';
import TEMPLATES from '@/data/TEMPLATES';

@Component
export default class MonsterList extends Vue {
  @Prop() private monster!: Monster;

  private get creature(): Monster {
    if (this.monster.templateId === null) {
      return this.monster;
    } else {
      const template = TEMPLATES[this.monster.templateId];
      return this.monster.add(template);
    }
  }

  private get mode(): MODE {
    return this.monster.mode === null ? MODE.NORMAL : this.monster.mode;
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
