<template lang="pug">
v-list(two-line)
  div(
    v-for="[id, player] in Array.from(players)"
    :key="id"
    @click="select(id)"
  )
    v-list-tile
      v-list-tile-avatar
        v-img(:src="`/img/${player.avatar || '035-elf.png'}`")
      PlayerTileContent(:id="id")
    v-divider
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  computed: {
    ...mapState(['players']),
  },
})
export default class PlayerIndex extends Vue {
  private select(playerId: string): void {
    this.$router.push(`player/${playerId}/weapons`);
  }
}
</script>
