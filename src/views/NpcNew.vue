<template lang="pug">
  npc-form(@upload="uploadHandler")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import * as ACTION from '@/types/ActionTypes';
import Npc from '@/models/Npc';

@Component
export default class NpcNew extends Vue {
  private async uploadHandler(payload: any) {
    this.$store.dispatch(ACTION.WAIT,
      async () => this.$store.dispatch(ACTION.UPLOAD_IMAGE, {
        payload: new Npc(payload.form),
        canvas: payload.canvas,
      }),
    );
    this.$router.push('/npcs');
  }
}
</script>

<style lang="stylus">
</style>
