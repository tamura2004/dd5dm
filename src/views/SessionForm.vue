<template lang="pug">
  .headline セッション情報を入力してください
    v-form(ref="form" v-model="valid")
      v-text-field(
        v-model="form.name"
        label="セッション名"
        :rules="required"
      )
      v-select(
        :items="dungeons"
        label="場所"
        item-text="name"
        item-value="id"
        :rules="required"
        v-model="form.dungeonId"
      )
      v-select(
        :items="npcs"
        label="依頼人"
        item-text="name"
        item-value="id"
        :rules="required"
        v-model="form.npcId"
      )
      v-text-field(
        v-model="form.purpose"
        label="目的"
        :rules="required"
      )
      v-text-field(
        v-model="form.limit"
        label="条件"
        :rules="required"
      )
      v-text-field(
        v-model.numberr="form.reward"
        label="報酬"
        :rules="required"
      )
      v-btn(@click="submit" color="primary" :disabled="!valid") 保存
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Session from '@/models/Session';
import { mapState } from 'vuex';
import { CREATE } from '@/types/ActionTypes';

import Item from '@/models/Item';
import Dungeon from '@/models/Dungeon';
import Npc from '@/models/Npc';

type Validator = (v: string) => boolean | string;

@Component
export default class SessionForm extends Vue {
  @Prop() private sessionId!: string | undefined;

  private valid: boolean = false;
  private required: Validator[] = [
    (v: string) => !!v || '必須項目です',
  ];
  private form = Session.form();

  private get dungeons() {
    return Item.from(this.$store.state.dungeons);
  }
  private get npcs() {
    return Item.from(this.$store.state.npcs);
  }

  private async submit() {
    const sessionId: string = await this.$store.dispatch(CREATE,
      new Session(this.form),
    );
    this.$router.push({
      name: 'session/players',
      params: { sessionId },
    });
  }
}
</script>
