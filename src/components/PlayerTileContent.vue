<template lang="pug">
  v-list-tile-content(@click="$emit('click')")
    v-list-tile-title
      v-layout
        v-flex.text-truncate(xs9) {{ player.characterName }}
        v-flex.caption(xs3) PL:{{ player.name }}
    v-list-tile-sub-title
      v-layout
        v-flex.text-truncate(xs6) {{ player.klass }}{{ player.level }}
        v-flex.text-truncate(xs6) {{ player.race }}/{{ player.background }}
    v-list-tile-sub-title
      v-layout
        v-flex(xs4) AC:{{ player.ac }}
        v-flex(xs4) hp:{{ player.maxHp }}

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Player from '@/models/Player';
import '@/plugins/map';

@Component
export default class PlayerTileContent extends Vue {
  @Prop() private id!: string;

  private get player(): Player {
    return this.$store.state.players.take(this.id);
  }
}
</script>

<style lang="stylus">
</style>
