<template lang="pug">
.headline SessionPlayers
  template(v-if="!edit")
    v-btn(block dark color="primary" @click="edit=true") 参加ＰＣ選択
    v-btn(block dark to="encounters") 遭遇選択へ
  template(v-else)
    v-btn(block dark color="success"  @click="save") 決定
    v-btn(block dark  @click="edit=false") キャンセル
  v-list(three-line)
    template(v-for="[id, player] in Array.from(players)")
      template(v-if="session.playerIds.includes(id) || edit")
        v-list-tile(:key="id")
          v-list-tile-action(v-if="edit")
            v-checkbox(v-model="playerIds" :value="id")
          player-tile-content(:id="id")
        v-divider
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Item from '@/models/Item';
import Player from '@/models/Player';
import { UPDATE } from '@/types/ActionTypes';
import Session from '@/models/Session';

@Component
export default class SessionPlayers extends Vue {
  @Prop() private sessionId!: string;

  private edit: boolean = false;
  private playerIds: string[] = [];

  private get players(): Map<string, Player> {
    return this.$store.state.players;
  }

  private get session(): Session {
    return this.$store.getters.session(this.sessionId);
  }

    // async [UPDATE]({}, { collectionName, id, updates }) {

  private async save() {
    await this.$store.dispatch(UPDATE, {
      collectionName: 'sessions',
      id: this.sessionId,
      updates: {
        playerIds: this.playerIds,
      },
    });
    this.edit = false;
  }

  private select() {
    this.edit = true;
    this.playerIds = [...this.session.playerIds];
  }

  private created() {
    this.playerIds = [...this.session.playerIds];
  }
}
</script>
