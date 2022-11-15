<template lang="pug">
spell-form(@upload="uploadHandler")
</template>

<script lang="ts">
import firebase from 'firebase/app';
import 'firebase/storage';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { CREATE, TO_BLOB, PUT_IMAGE } from '@/types/ActionTypes';
import Spell from '@/models/Spell';

@Component
export default class SpellNew extends Vue {
  private async uploadHandler(payload: any) {
    this.$root.$data.processing = true;
    const spellId = await this.$store.dispatch(CREATE, new Spell(payload.form));
    const blob = await this.$store.dispatch(TO_BLOB, {
      canvas: payload.canvas,
    });
    await this.$store.dispatch(PUT_IMAGE, {
      id: spellId,
      blob,
    });
    this.$root.$data.processing = false;
    this.$router.push('/spells');
  }
}
</script>

<style lang="stylus">
</style>
