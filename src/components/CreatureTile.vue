<template lang="pug">
v-list-tile
  v-list-tile-action
    v-container.ma-0.pa-0
      v-layout(justify-center)
        .caption INIT
      v-layout(justify-center)
        Tenkey(
          collectionName="creatures"
          :id="creatureId"
          field="initiative"
          title="イニシアチブを入力して下さい"
        )
        //- .display-1.red--text {{ creature.initiative }}
  v-list-tile-avatar(tile)
    v-img(:src="`/img/${monster.avatar}`")
  v-list-tile-content
    v-list-tile-title
      v-layout
        v-flex.text-truncate(xs12) {{ monster.name }}
    v-list-tile-sub-title
      v-layout
        v-flex.text-truncate(xs8) {{ monster.size }}の{{ monster.type }}
        v-flex.caption(xs4) AC:{{ monster.ac }}

  v-list-tile-action
    v-container.ma-0.pa-0
      v-layout(justify-center)
        .caption 残hp
      v-layout(justify-center)
        Tenkey(
          collectionName="creatures"
          :id="creatureId"
          field="hp"
          title="hpを修正して=を押して下さい"
        )
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Creature from '@/models/Creature';
import Monster from '@/models/Monster';
import Tenkey from '@/components/Tenkey.vue';

@Component({
  components: {
    Tenkey,
  },
})
export default class CreatureTile extends Vue {
  @Prop() private creatureId!: string;

  private get creature(): Creature {
    return this.$store.getters.creature(this.creatureId);
  }

  private get monster(): Monster {
    return this.$store.getters.encounter(this.creature.encounterId).monster;
  }
}

</script>

<style lang="stylus">
</style>
