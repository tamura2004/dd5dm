<template lang="pug">
.headline メモ
  v-card(flat)
    base-textarea(
      v-model="memo"
    )
    v-card-actions
      v-spacer
      v-btn(dark color="primary" @click="save") 保存
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Player from '@/models/Player';
import * as ACTION from '@/types/ActionTypes';

@Component
export default class PlayerMemo extends Vue {
  @Prop() private playerId!: string;

  private memo: string | null = null;

  private created() {
    if (this.player !== undefined && this.player.memo !== null) {
      this.memo = this.player.memo;
    }
  }

  private get player(): Player | undefined {
    return this.$store.getters.player(this.playerId);
  }

  private async save() {
    await this.$store.dispatch(ACTION.WAIT,
      () => this.$store.dispatch(ACTION.UPDATE, {
        collectionName: 'players',
        id: this.playerId,
        updates: {
          memo: this.memo || '',
        },
      }),
    );
  }
}
</script>
