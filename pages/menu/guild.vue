<template lang="pug">
  v-layout.pa-4(justify-start align-center column)
    app-menu-button(color="primary" to="/players") ギルドカード提示
    app-menu-button(color="success") 新規登録
    .headline.mt-4 いらっしゃいませ
    .headline ギルドカードをご提示ください
    .headline または新規登録ですか
    img#img(src="~assets/img/kaisya_uketsuke_woman.png")
</template>

<script>
export default {
  created() {
    this.$title("冒険者ギルド");
  },
};
</script>

<style lang="stylus" scoped>
#img
  width 320px
</style>
