<template lang="pug">
v-list(two-line)
  div(
    v-for="[id, { avatar }] in players"
    :key="id"
    @click="select(id)"
  )
    v-list-tile
      avatar(:playerId="id")
      PlayerTileContent(:id="id")
    v-divider
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Player from '@/models/Player';
import Avatar from '@/components/Avatar.vue';

@Component({
  components: {
    Avatar,
  },
})
export default class PlayerIndex extends Vue {
  @Prop() private guildId?: string;

  get players() {
    const playerMap = [...this.$store.state.players];
    return playerMap.filter(([id, player]) =>
      !this.guildId || this.guildId === player.guildId);
  }

  private select(playerId: string): void {
    this.$router.push(`/player/${playerId}/weapons`);
  }
}
</script>
