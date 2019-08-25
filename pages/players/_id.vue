<template lang="pug">
  v-card
    app-list(:player="id | player")
    nuxt-child
</template>

<script>
import appList from "~/components/pages/player/app-list";

export default {
  components: {
    appList,
  },
  asyncData({ params }) {
    const id = params.id;
    return { id };
  },
  created() {
    this.$title("キャラクターシート")
  }
};
</script>
