<template lang="pug">
v-list-tile(v-if="monster" @click="")
  v-list-tile-avatar
    v-btn.font-weight-bold(fab dark small :color="color" @click="select") {{ label }}
  v-list-tile-content(@click.stop="dialog = true")
    v-list-tile-title
      v-layout
        v-flex(xs12) {{ merged.name }}
    v-list-tile-sub-title
      v-layout
        v-flex(xs3) {{ merged.num }} 体
        v-flex(xs3) AC: {{ merged.ac }}
        v-flex(xs3) hp: {{ merged.maxHp }}
        v-flex(xs3) exp:{{ merged.exp * merged.num }}
  v-list-tile-action
    slot
  v-dialog(v-model="dialog")
    v-card
      v-toolbar(dense)
        v-toolbar-title {{ merged.name }}
        v-spacer
        v-toolbar-items
          v-btn(flat icon @click="dialog = false")
            v-icon close
      MonsterTable(:monster="merged")

</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import Monster from '@/models/Monster';
import Mode from '@/models/Mode';
import { MODE } from '@/data/ENCOUNTER_DATA';
import MonsterTable from '@/components/MonsterTable.vue';

@Component({
  components: {
    MonsterTable,
  },
})
export default class MonsterList extends Vue {
  @Prop() private monster!: Monster;
  private dialog: boolean = false;

  private get merged(): Monster {
    return this.monster.merged;
  }

  @Emit()
  private select(monster: Monster) {
    return this.monster;
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
