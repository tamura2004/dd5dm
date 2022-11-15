<template lang="pug">
div
  v-list-tile-avatar
    v-img(:src="`/img/${player.avatar}`" @click="dialog=true" v-if="player && player.avatar")
    v-btn(outline fab small @click="dialog=true" v-else).mr-4: v-icon people
  v-dialog(v-model="dialog")
    v-card
      v-card-title.pb-0 クリックしてアイコンを選択してください
        v-container(grid-list-md fluid)
          v-layout(row wrap)
            v-flex(v-for="avatar in avatars" xs2 sm1 :key="avatar")
              v-card(hover @click="select(avatar)")
                v-img(:src="`/img/${avatar}`")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import AVATAR_DATA from '@/data/AVATAR_DATA';
import Player from '@/models/Player';
import { db } from '@/plugins/firebase';

@Component
export default class Avater extends Vue {
  @Prop() private playerId!: string;

  private dialog: boolean = false;
  private avatars = AVATAR_DATA;

  private get player(): Player | undefined {
    return this.$store.getters.player(this.playerId);
  }

  private async select(avatar: string) {
    await db.collection('players').doc(this.playerId).update({ avatar });
    this.dialog = false;
  }
}
</script>
