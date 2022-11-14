<template lang="pug">
div
  v-list-tile
    v-list-tile-action
      v-container.ma-0.pa-0
        v-layout(justify-center)
          .caption INIT
        v-layout(justify-center)
          .display-1.red--text {{ hp }}
    Avatar(v-model="avatar")
    PlayerTileContent(:id="id")
    v-list-tile-action
      v-container.ma-0.pa-0
        v-layout(justify-center)
          .caption 残hp
        v-layout(justify-center)
          LifeCounter(v-model="hp")
  v-divider

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Player from '@/models/Player';
import { db } from '@/plugins/firebase';
import PlayerTileContent from '@/components/PlayerTileContent.vue';
import Avatar from '@/components/Avatar.vue';
import LifeCounter from '@/components/LifeCounter.vue';

@Component({
  components: {
    PlayerTileContent,
    Avatar,
    LifeCounter,
  },
})
export default class PlayerTile extends Vue {
  @Prop() private id!: string;

  private get hp(): number | null {
    return this.player ? this.player.hp : null;
  }

  private set hp(value: number | null) {
    if (
      value === null ||
      this.player === undefined ||
      this.player.maxHp === null
    ) {
      return;
    }

    if (value < 0) {
      value = 0;
    }

    if (value > this.player.maxHp) {
      value = this.player.maxHp;
    }

    if (this.player !== undefined) {
      db.collection('players').doc(this.id).update({
        hp: value,
      })
        .catch((err) => alert(err));
    }
  }

  private get avatar(): string | null {
    return this.player ? this.player.avatar : null;
  }

  private set avatar(value: string | null) {
    if (value !== null) {
      db.collection('players').doc(this.id).update({
        avatar: value,
      })
        .catch((err) => alert(err));
    }
  }

  private get player(): Player | undefined {
    return this.$store.state.players[this.id];
  }
}
</script>

<style lang="stylus">
</style>
