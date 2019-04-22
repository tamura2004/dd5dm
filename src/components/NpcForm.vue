<template lang="pug">
v-form(v-model="valid" v-if="form")
  v-card(width="320px")
    v-card-actions
      base-upload-button(width="320" height="180" :id="id")
    base-canvas(width="320" height="180" :id="id")
    v-text-field.pa-2(
      label="名前"
      v-model="form.name"
      :rules="required"
    )
    v-textarea.pa-2(
      label="説明"
      v-model="form.description"
      :rules="required"
    )
    v-card-actions
      v-spacer
      v-btn(
        v-if="deletable"
        color="error"
      ) 削除
      v-btn(
        color="primary"
      ) 保存
</template>

<script lang="ts">
import firebase from 'firebase/app';
import 'firebase/storage';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { CREATE, TO_BLOB, PUT_IMAGE } from '@/types/ActionTypes';
import Npc from '@/models/Npc';
import VCanvas from '@/components/VCanvas.vue';

type Validation = (v: string) => boolean | string;

@Component({
  components: {
    VCanvas,
  },
})
export default class NpcForm extends Vue {
  @Prop() private deletable?: boolean;
  @Prop() private init?: Form<Npc>;
  @Prop() private id?: string;

  private form: Form<Npc> = Npc.form();
  private valid: boolean = false;
  private required: Validation[] = [(v) => !!v || '必須項目です'];

  private created() {
    if (this.init === undefined) {
      this.form = Npc.form();
    } else {
      Object.assign(this.form, this.init);
    }
  }
}
</script>

<style lang="stylus">
</style>
