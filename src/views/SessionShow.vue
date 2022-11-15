<template lang="pug">
.headline(v-if="available")
  table
    tr
      th.label.body-2 セッション
      td.body-2 {{ session.name }}
    tr
      th.label.body-2 場所
      td.body-2
        router-link(:to="`/dungeon/${session.dungeonId}/sessions`") {{ dungeon(session.dungeonId).name }}
    tr
      th.label.body-2 依頼人
      td.body-2
        router-link(:to="`/npc/${session.npcId}/edit`") {{ npc.name }}
    tr
      th.label.body-2 目的
      td.body-2 {{ session.purpose }}
    tr
      th.label.body-2 条件
      td.body-2 {{ session.limit }}
    tr
      th.label.body-2 報酬
      td.body-2 {{ session.reward }}gp

  v-tabs
    v-tab(to="players") ＰＣ
    v-tab(to="encounters") 遭遇
    v-tab(to="reward") 報酬
    v-tab(:to="`/session/${sessionId}/edit`") 編集
  router-view
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapState, mapGetters } from 'vuex';
import SessionModel from '@/models/Session';

@Component({
  computed: {
    ...mapGetters(['dungeon']),
  },
})
export default class SessionShow extends Vue {
  @Prop() private sessionId!: string;

  private get available(): boolean {
    return this.session !== undefined && this.npc !== undefined;
  }

  private get session(): SessionModel {
    return this.$store.state.sessions.get(this.sessionId);
  }
  private get npc() {
    return this.$store.state.npcs.get(this.session.npcId);
  }
}
</script>

<style lang="stylus">
th.label
  text-align center
  width 48px
  background-color #212121
  color white
  width 15%
td.body-2
  line-height 24px
</style>
