<template>
  <span class="b-animated-number">
    {{ displayNumber / divider }}
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class BAnimatedNumber extends Vue {
  @Prop({ default: 0 }) number!: number;
  @Prop({ default: 1 }) divider!: number;

  public displayNumber = 0;
  public interval = 0;

  public mounted() {
    this.displayNumber = this.number ? this.number : 0;
  }

  @Watch('number')
  public numberChanged() {
    clearInterval(this.interval);
    if (this.number === this.displayNumber) {
      return;
    }
    this.interval = setInterval(() => {
      if (this.displayNumber !== this.number) {
        let change = (this.number - this.displayNumber) / 50;
        change = change >= 0 ? Math.ceil(change) : Math.floor(change);
        this.displayNumber += change;
      }
    }, 10);
  }
}
</script>
