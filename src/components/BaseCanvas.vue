<template lang="pug">
  canvas(
    ref="canvas"
    :width="`${width}px`"
    :height="`${height}px`"
  )
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from 'vue-property-decorator';

@Component
export default class BaseCanvas extends Vue {
  public $refs!: {
    canvas: HTMLCanvasElement;
  };

  @Prop() private width!: number;
  @Prop() private height!: number;
  @Prop() private url!: string;

  @Provide() canvas: HTMLCanvasElement = this.$refs.canvas;

  private created() {
    if (!this.url) {
      return;
    }
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      const ctx = this.canvas.getContext('2d');
      if (ctx === null) {
        return;
      }
      ctx.clearRect(0, 0, this.width, this.height);
      ctx.drawImage(image, 0, 0);
    };
    image.src = this.url;
  }
}
</script>

<style lang="stylus">
canvas {
  border: grey 1px solid;
}
</style>
