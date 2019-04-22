<template lang="pug">
  label(for="upload")
    input#upload(
      ref="input"
      type="file"
      accept="image/*"
      @change="fileChangeHandler"
    )
</template>

<script lang="ts">
import firebase from 'firebase/app';
import 'firebase/storage';
import { Component, Vue, Prop, Inject, Provide } from 'vue-property-decorator';

@Component
export default class BaseUploadButton extends Vue {
  public $refs!: {
    input: HTMLInputElement;
  };

  @Prop() private id?: string;
  @Prop() private width!: number;
  @Prop() private height!: number;

  @Inject() private canvas!: HTMLCanvasElement;

  @Provide() private input: HTMLInputElement = this.$refs.input;

  private get ratio() {
    return this.width / this.height;
  }

  private file: File | null = null;

  private fileChangeHandler() {
    const { files } = this.input;
    if (files === null) {
      return;
    }

    this.file = files[0];
    if (this.file === null) {
      return;
    }

    const reader = new FileReader();
    const image = new Image();
    reader.onload = (e: any) => {
      image.onload = () => {
        const ctx = this.canvas.getContext('2d');
        if (ctx === null) {
          return;
        }
        ctx.clearRect(0, 0, this.width, this.height);

        const ratio = image.width / image.height;
        if (ratio < this.ratio) {
          // 画像が縦長
          ctx.drawImage(
            image,
            0,
            (image.height - image.width / this.ratio) / 2,
            image.width,
            image.width / this.ratio,
            0,
            0,
            this.width,
            this.height,
          );
        } else {
          // 画像が横長
          ctx.drawImage(
            image,
            (image.width - image.height * this.ratio) / 2,
            0,
            image.height * this.ratio,
            image.height,
            0,
            0,
            this.width,
            this.height,
          );
        }
      };
      const { target } = e;
      if (target === null) {
        return;
      }
      image.src = target.result;
    };
    reader.readAsDataURL(this.file);
  }
}
</script>

<style lang="stylus">
</style>
