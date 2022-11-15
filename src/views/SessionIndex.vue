<template lang="pug">
.headline セッション一覧
  v-list(two-line)
    template(v-for="[key, session] in Array.from(sessions(dungeonId))")
      session-tile(:sessionId="key" :key="key")
      v-divider

  v-btn(dark block color="primary" :to="`/sessions/new/${dungeonId}`") 新規セッション
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  computed: {
    ...mapGetters(['sessions']),
  },
})
export default class SessionIndex extends Vue {
  @Prop({ default: null }) private dungeonId!: string;
}
</script>
