<template lang="pug">
  spell-form(@upload="uploadHandler")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import * as ACTION from '@/types/ActionTypes';
import Spell from '@/models/Spell';

@Component
export default class SpellNew extends Vue {
  private uploadHandler(payload: any) {
    this.$store.dispatch(ACTION.WAIT,
      async () => this.$store.dispatch(ACTION.UPLOAD_IMAGE, {
        payload: new Spell(payload.form),
        canvas: payload.canvas,
      }),
    );
    this.$router.push('/spells');
  }
}
</script>

<style lang="stylus">
</style>
