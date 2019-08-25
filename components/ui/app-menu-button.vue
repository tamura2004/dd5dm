<template lang="pug">
  v-btn#btn.pa-2.my-4(
    nuxt
    dark
    rounded
    block
    :to="to"
    :color="color"
  )
    slot
</template>

<script>
export default {
  name: "base-menu-button",
  props: ["color", "to"],
};
</script>

<style lang="stylus" scoped>
#btn
  height 60px
  font-size 32px
</style>
