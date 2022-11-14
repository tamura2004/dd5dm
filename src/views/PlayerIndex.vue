<template lang="pug">
v-list(two-line)
  div(
    v-for="[id, { avatar }] in players"
    :key="id"
    @click="select(id)"
  )
    v-list-tile
      v-list-tile-avatar
        v-img(:src="`/img/${avatar || '035-elf.png'}`")
      PlayerTileContent(:id="id")
    v-divider
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Player from '@/models/Player';

@Component
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
