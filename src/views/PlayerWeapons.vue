<template lang="pug">
.headline
  template(v-if="!edit")
    v-btn(block dark color="primary" @click="edit=true") 武器選択
  template(v-else)
    v-btn(block dark color="success" @click="save") 決定
    v-btn(block dark @click="edit=false") キャンセル
    v-tabs
      v-tab(@click="range='近接'") 近接
      v-tab(@click="range='遠隔'") 遠隔
    v-tabs
      v-tab(@click="type='斬撃'") 斬撃
      v-tab(@click="type='殴打'") 殴打
      v-tab(@click="type='刺突'") 刺突
  v-list
    template(v-for="[name, weapon] in Array.from(weapons)")
      template(v-if="show(name, weapon)")
        v-list-tile(:key="name")
          v-list-tile-action(v-if="edit")
            v-checkbox(v-model="weaponNames" :value="name")
          v-list-tile-content
            v-list-tile-title {{ name }}：{{ weapon.category }}
            v-list-tile-sub-title
              weapon-description(:weapon="weapon" :player="player")
        v-divider
  </template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Player from '@/models/Player';
import WEAPONS from '@/data/WEAPON_DATA';
import Weapon from '@/models/Weapon';
import { UPDATE } from '@/types/ActionTypes';

@Component
export default class PlayerWeapons extends Vue {
  @Prop() private playerId!: string;

  private edit: boolean = false;
  private range: string = '';
  private type: string = '';
  private weaponNames: string[] = [];

  private get player(): Player | undefined {
    return this.$store.getters.player(this.playerId);
  }

  private get weapons(): Map<string, Partial<Weapon>> {
    return WEAPONS;
  }

  private show(name: string, weapon: Weapon): boolean {
    if (this.edit) {
      return weapon.category.includes(this.range) && weapon.type.includes(this.type);

    } else if (this.player) {
      return this.player.weapon.includes(name);

    } else {
      return false;
    }
  }

  private async save() {
    await this.$store.dispatch(UPDATE, {
      collectionName: 'players',
      id: this.playerId,
      updates: {
        weapon: this.weaponNames,
      },
    });
    this.edit = false;
  }

  private created() {
    this.weaponNames = this.player ? this.player.weapon : [];
  }
}
</script>
