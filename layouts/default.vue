<template lang="pug">
  v-app
    app-drawer
    v-app-bar(app dark dense clipped-left color="grey darken-4")
      v-app-bar-nav-icon(@click.stop="toggle")
      v-toolbar-title {{ title }}
    v-content
      v-container(fluid)
        nuxt
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import appDrawer from "~/components/layouts/app-drawer";

export default {
  components: {
    appDrawer,
  },
  data() {
    return {
      drawer: false,
    };
  },
  computed: mapGetters("nav", ["title"]),
  methods: mapActions("nav/drawer", ["toggle"]),
};
</script>
