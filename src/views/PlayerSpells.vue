<template lang="pug">
.headline 呪文
  template(v-for="(spell, key) of spells" v-if="spell")
    v-list-tile
      v-list-tile-action(@click="$store.dispatch('deleteSpell', key)"): v-icon clear
      v-list-tile-content
        v-list-tile-title {{ spell.name }}
        v-list-tile-sub-title {{ spell.klass }}/{{ spell.level }}lv
      v-list-tile-action(@click="$router.push(`/spellForm/${key}`)")
        v-icon keyboard_arrow_right
    v-divider
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Player from '@/models/Player';
import Spell from '@/models/Spell';

@Component
export default class PlayerSpells extends Vue {
  @Prop() private playerId!: string;

  private get player(): Player | undefined {
    return this.$store.getters.player(this.playerId);
  }

    private get spells(): { [key: string]: Spell } {
    const result: { [key: string]: Spell } = {};
    if (this.player !== undefined && this.player.spells !== undefined) {
      this.player.spells.forEach((spellId) => {
        result[spellId] = this.$store.state.spells[spellId];
      });
    }
    return result;
  }
}
</script>
