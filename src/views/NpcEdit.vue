<template lang="pug">
npc-form(
  :deletable="true"
  :init="npc"
  :id="npcId"
  @upload="uploadHandler"
  @delete="deleteHandler"
)
</template>

<script lang="ts">
import firebase from 'firebase/app';
import 'firebase/storage';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import * as ACTION from '@/types/ActionTypes';
import Npc from '@/models/Npc';

@Component
export default class NpcEdit extends Vue {
  @Prop() public npcId!: string;

  private get npc(): Npc | undefined {
    return this.$store.getters.npc(this.npcId);
  }

  private async uploadHandler(payload: any) {
    this.$store.dispatch(ACTION.WAIT,
      async () => {
        await this.$store.dispatch(ACTION.UPDATE, {
          collectionName: 'npcs',
          id: this.npcId,
          updates: payload.form,
        });
        const blob = await this.$store.dispatch(ACTION.TO_BLOB, {
          canvas: payload.canvas,
        });
        await this.$store.dispatch(ACTION.PUT_IMAGE, {
          id: this.npcId,
          blob,
        });
      },
    );
    this.$router.push('/npcs');
  }

  private async deleteHandler() {
    this.$store.dispatch(ACTION.WAIT,
      async () => {
        await this.$store.dispatch(ACTION.DELETE, {
          collectionName: 'npcs',
          id: this.npcId,
        });
        await this.$store.dispatch(ACTION.DELETE_IMAGE, {
          id: this.npcId,
        });
      },
    );
    this.$router.replace('/npcs');
  }
}
</script>

<style lang="stylus">
</style>
