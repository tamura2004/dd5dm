<template lang="pug">
  v-list-tile-content(@click="$emit('click')")
    v-list-tile-title
      v-layout
        v-flex.text-truncate(xs9) {{ player.characterName }}
        v-flex.caption(xs3) PL:{{ player.playerName }}
    v-list-tile-sub-title
      v-layout
        v-flex.text-truncate(xs6) {{ player.klass }}{{ level(playerId) }}
        v-flex.text-truncate(xs6) {{ player.race }}/{{ player.background }}
    v-list-tile-sub-title
      v-layout
        v-flex(xs4) AC:{{ player.ac }}
        v-flex(xs4) hp:{{ player.maxHp }}

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Player from '@/models/Player';
import { mapGetters } from 'vuex';

@Component({
  computed: {
    ...mapGetters(['level']),
  },
})
export default class PlayerTile extends Vue {
  @Prop() private id!: string;

  private get player(): Player | undefined {
    return this.$store.state.players.get(this.id);
  }
}
</script>

<style lang="stylus">
</style>
