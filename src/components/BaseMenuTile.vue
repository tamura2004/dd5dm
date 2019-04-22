<template lang="pug">
  v-list-tile(:to="menu.path")
    v-list-tile-action
      v-icon {{ menu.icon }}
    v-list-tile-title {{ menu.label }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Menu } from '@/data/MENUES';

@Component
export default class BaseMenuTile extends Vue {
  @Prop() private menu!: Menu;
}
</script>

<style lang="stylus" scoped>
</style>
