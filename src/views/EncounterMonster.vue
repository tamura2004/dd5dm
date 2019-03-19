<template lang="pug">
  .headline(v-if="monster")
    table
      tr
        th(xs4).label.body-2 名称
        td(xs8).body-2 {{ monster.name }}
      tr
        th(xs4).label.body-2 種類
        td(xs8).body-2 {{ monster.size }}の{{ monster.type }}
      tr
        th(xs4).label.body-2 属性
        td(xs8).body-2 {{ monster.alignment }}
      tr
        th(xs4).label.body-2 AC
        td(xs8).body-2 {{ monster.ac }}
      tr
        th(xs4).label.body-2 hp
        td(xs8).body-2 {{ monster.maxHp }}
      tr
        th(xs4).label.body-2 移動力
        td(xs8).body-2 {{ monster.mv }}
      tr
        th(xs4).label.body-2 能力値
        td(xs8).body-2 {{ monster.ability.join('/') }}
      tr
        th(xs4).label.body-2 能力
        td(xs8).body-2
          .body-1(v-for="attribute in monster.attributes") {{ attribute }}
      tr
        th(xs4).label.body-2 アクション
        td(xs8).body-2
          .body-1(v-for="action in monster.actions") {{ action }}
      tr
        th(xs4).label.body-2 特殊能力
        td(xs8).body-2
          .body-1(v-for="special in monster.specials") {{ special }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import CreatureTile from '@/components/CreatureTile.vue';
import { MONSTERS } from '@/data/MONSTERS';
import TEMPLATES from '@/data/TEMPLATES';

@Component({
  components: {
    CreatureTile,
  },
})
export default class EncounterMonster extends Vue {
  @Prop() private sessionId!: string;
  @Prop() private encounterId!: string;

  private get encounter() {
    return this.$store.getters.encounter(this.encounterId);
  }

  private get monster() {
    let info = MONSTERS[(this.encounter && this.encounter.monsterId) || 0];
    if (this.encounter.templateId !== null) {
      info = info.add(TEMPLATES[this.encounter.templateId]);
    }
    return info;
  }
}
</script>

<style lang="stylus" scoped>
.label
  width 20%
td.body-2
  line-height 24px
</style>
