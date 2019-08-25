<template lang="pug">
  v-card
    v-list
      template(v-for="player in players")
        app-list(:player="player")
        v-divider(:key="'div' + player.id")
</template>

<script>
import { mapGetters } from "vuex";
import appBar from "~/components/layouts/app-bar";
import appList from "~/components/pages/player/app-list";

export default {
  components: {
    appBar,
    appList,
  },
  data: () => ({
    edit: false,
  }),
  computed: {
    ...mapGetters("players", ["players"]),
    ...mapGetters("guilds", ["guild"]),
  },
  created() {
    this.$title("冒険者名簿");
  },
};
</script>

<style lang="stylus" scoped></style>
