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
        //- .display-1 {{ creature.hp }}
        //- LifeCounter(v-model="hp")

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Creature from '@/models/Creature';
import Monster from '@/models/Monster';
import MONSTERS from '@/data/MONSTERS';
import TEMPLATES from '@/data/TEMPLATES';
import Tenkey from '@/components/Tenkey.vue';


@Component({
  computed: {
    ...mapGetters(['creature']),
  },
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
    let info = MONSTERS[this.creature.monsterId || 0];
    if (this.creature.templateId !== null) {
      info = info.add(TEMPLATES[this.creature.templateId]);
    }
    return info;
  }

}

</script>

<style lang="stylus">
</style>
