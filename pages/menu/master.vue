<template lang="pug">
  v-layout.pa-4(justify-start align-center column)
    app-menu-button(color="primary") ランダムダンジョン
    app-menu-button(color="grey darken-4") 資料室
    .display-1.mt-4 冒険者が来た！
    .display-1 モンスターと罠の
    .display-1 準備はいいか？
    img#img(src="~assets/internet_god.png")
</template>

<script>
export default {
  created() {
    this.$title("ゲームマスター");
  },
};
</script>

<style lang="stylus" scoped>
#img
  width 320px
</style>
