<template lang="pug">
div(v-if="player")
  .headline {{ player.characterName }}
  v-list(two-line)
    v-list-tile
      avatar(:playerId="playerId")
      v-list-tile-content
        v-list-tile-title
          v-layout
            v-flex(xs6) {{ player.klass }} {{ level(playerId) }}レベル
            v-flex(xs6) {{ player.race }}/{{ player.background }}
        v-list-tile-sub-title
          v-layout
            v-flex(xs3) {{ player.alignment }}
            v-flex(xs3) PL:{{ player.playerName }}
            v-flex(xs3) MV:30'
            v-flex(xs3) AC:{{ player.ac }}
    v-layout.mb-1(row wrap)
      base-user-tenkey(:id="playerId" field="hp" title="hp")
      base-user-tenkey(:id="playerId" field="maxHp" title="最大hp")
      base-user-tenkey(:id="playerId" field="gold" title="所持金")
    table
      tr(v-for="n in 6")
        td.label {{ abilityLabel[n-1] }}
        td.number {{ player.ability[n-1] }}
        td.number {{ player.abilityMod[n-1] }}
        td.number {{ player.saves.includes(abilityLabel[n-1]) ? '●' : '' }}
        td.skill {{ skillDisplay[n-1].join('、') }}
  v-tabs
    v-tab(@click="goWeapon") 武器
    v-tab(@click="goSpell") 呪文
    v-tab(@click="goFeat") 特技
    v-tab(@click="goMemo") メモ
    v-tab(:to="`/player/${playerId}/edit`") 編集
  router-view
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Player from '@/models/Player';
import { ABILITY_LABEL, SKILLS } from '@/data/DATA';
import PATH from '../types/PathTypes';
import { mapGetters } from 'vuex';
import Avatar from '@/components/Avatar.vue';

@Component({
  components: {
    Avatar,
  },
  computed: {
    ...mapGetters(['level']),
  },
})
export default class PlayerShow extends Vue {
  @Prop() private playerId!: string;

  private abilityLabel = ABILITY_LABEL;
  private skills = SKILLS;

  private get player(): Player | undefined {
    return this.$store.getters.player(this.playerId);
  }

  private get skillDisplay(): string[][] {
    return this.skills.map((list: any) =>
      list.map((skill: any) =>
        (!!this.player && this.player.skills && this.player.skills.includes(skill)) ? `●${skill}` : skill,
      ),
    );
  }

  private go(path: string) {
    this.$router.replace({
      name: path,
      params: {
        playerId: this.playerId,
      },
    });
  }

  private goWeapon() {
    this.go(PATH.PLAYER_WEAPONS);
  }

  private goSpell() {
    this.go(PATH.PLAYER_SPELLS);
  }

  private goFeat() {
    this.go(PATH.PLAYER_FEATS);
  }

  private goMemo() {
    this.go(PATH.PLAYER_MEMO);
  }
}
</script>

<style lang="stylus">
.center
  text-align center

.border
  border 1px black solid

table
  width 100%
  border solid 1px grey
  border-collapse collapse

tr
  height 32px

td
  border solid 1px grey
  padding 0 2px

td.label
  text-align center
  width 48px
  background-color #212121
  color white

td.number
  text-align center
  width 32px

</style>
