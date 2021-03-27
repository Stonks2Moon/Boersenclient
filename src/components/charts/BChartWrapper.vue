<template>
  <div class="b-chart-wrapper">
    <div class="head">
      <div v-if="subtitle" class="subtitle">{{ subtitle }}</div>
      <div v-if="title" class="title">{{ title }}</div>
    </div>
    <div class="chart">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class BChartWrapper extends Vue {
  @Prop() title!: string;
  @Prop() subtitle!: string;
}
</script>

<style lang="scss" scoped>
.b-chart-wrapper {
  padding: 10px 20px;

  border-radius: $border-radius;

  background-color: $color;
  background-image: url('/assets/navigation-card-bg.png');
  background-position: top right;
  background-repeat: no-repeat;
  background-size: cover;

  .head {
    padding: 10px 0;
    .subtitle {
      font-size: 12px;
      font-weight: bold;
      opacity: 0.5;
      text-transform: uppercase;
    }
    .title {
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
