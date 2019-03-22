<template lang="pug">
v-app(v-if="ready")
  v-navigation-drawer(app fixed v-model="drawer")
    v-toolbar(flat dark dense)
      v-toolbar-title メニュー
    v-list(dense)
      v-list-tile(v-for="menu in menues" :to="menu.path" :key="menu.path")
        v-list-tile-action
          v-icon {{ menu.icon }}
        v-list-tile-title {{ menu.label }}
  v-toolbar(app flat dark dense)
    v-toolbar-side-icon(@click="drawer=!drawer")
    v-toolbar-title.headline {{ titles.get($route.name) }}
  v-content
    v-container
      router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TITLES } from '@/data/TITLES';
import { mapGetters } from 'vuex';

interface Menu {
  path: string;
  icon: string;
  label: string;
}

@Component({
  computed: {
    ...mapGetters(['ready']),
  },
})
export default class App extends Vue {
  private drawer: boolean = false;
  private menues: Menu[] = [
    {
      path: '/',
      icon: 'home',
      label: 'ホーム',
    },
    {
      path: '/sessions',
      icon: 'list',
      label: 'セッション一覧',
    },
    {
      path: '/sessions/new',
      icon: 'add',
      label: '新規セッション',
    },
  ];
  private titles: Map<string, string> = TITLES;
}
</script>
<style lang="stylus">
table
  width 100%
  border solid 1px grey
  border-collapse collapse

tr
  height 32px

td
  border solid 1px grey
  padding 0 4px

th
  border solid 1px grey

th.label
  text-align center
  background-color #212121
  color white

td.number
  text-align center
  width 32px
</style>
