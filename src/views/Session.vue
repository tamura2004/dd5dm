<template lang="pug">
  .headline(v-if="session")
    table
      tr
        th.label.body-2 セッション
        td.body-2 {{ session.name }}
      tr
        th.label.body-2 場所
        td.body-2 {{ dungeon(session.dungeonId).name }}
      tr
        th.label.body-2 依頼人
        td.body-2 {{ npc.name }}
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
      v-tab(:to="{ name: 'session/players' }") ＰＣ
      v-tab(:to="{ name: 'session/encounters' }") 遭遇
      v-tab(:to="{ name: 'session/reward' }") 報酬
    router-view
</template>

<script lang="ts">
import '@/plugins/map';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapState, mapGetters } from 'vuex';
import SessionModel from '@/models/Session';

@Component({
  computed: {
    ...mapGetters(['dungeon']),
  },
})
export default class Session extends Vue {
  @Prop() private sessionId!: string;

  private get session(): SessionModel {
    return this.$store.state.sessions.take(this.sessionId);
  }
  private get npc() {
    return this.$store.state.npcs.take(this.session.npcId);
  }
}
</script>

<style lang="stylus">
</style>
