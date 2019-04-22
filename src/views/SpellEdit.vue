<template lang="pug">
spell-form(
  :deletable="true"
  :init="spell"
  :id="spellId"
  @upload="uploadHandler"
  @delete="deleteHandler"
)
</template>

<script lang="ts">
import firebase from 'firebase/app';
import 'firebase/storage';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import * as ACTION from '@/types/ActionTypes';
import Spell from '@/models/Spell';

@Component
export default class SpellEdit extends Vue {
  @Prop() public spellId!: string;

  private get spell(): Spell | undefined {
    return this.$store.getters.spell(this.spellId);
  }

  private async uploadHandler(payload: any) {
    this.$store.dispatch(ACTION.WAIT,
      async () => {
        await this.$store.dispatch(ACTION.UPDATE, {
          collectionName: 'spells',
          id: this.spellId,
          updates: payload.form,
        });
        const blob = await this.$store.dispatch(ACTION.TO_BLOB, {
          canvas: payload.canvas,
        });
        await this.$store.dispatch(ACTION.PUT_IMAGE, {
          id: this.spellId,
          blob,
        });
      },
    );
    this.$router.push('/spells');
  }

  private async deleteHandler() {
    this.$store.dispatch(ACTION.WAIT,
      async () => {
        await this.$store.dispatch(ACTION.DELETE, {
          collectionName: 'spells',
          id: this.spellId,
        });
        await this.$store.dispatch(ACTION.DELETE_IMAGE, {
          id: this.spellId,
        });
      },
    );
    this.$router.replace('/spells');
  }
}
</script>

<style lang="stylus">
</style>
