<template>
  <BChartWrapper
    class="b-price-graph"
    title="Price Development"
    subtitle="Tradable Shares"
  >
    <VueApexCharts
      ref="BPriceGraph"
      type="area"
      height="400"
      width="100%"
      :options="options"
      :series="series"
    />

    <tc-segments :dark="true" v-model="activePeriod">
      <tc-segment-item v-for="p in periods" :key="p.title" :title="p.title" />
    </tc-segments>
  </BChartWrapper>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import VueApexCharts from 'vue-apexcharts';
import { Share, ShareManager } from '@/utils/ShareManager';
import BChartWrapper from '@/components/charts/BChartWrapper.vue';
import { periods } from '@/utils/constants';

@Component({
  components: {
    VueApexCharts,
    BChartWrapper
  }
})
export default class BPriceGraph extends Vue {
  public activePeriod = 3;
  public periods = periods;

  @Watch('shares', { deep: true, immediate: true })
  updateChart() {
    // eslint-disable-next-line
    const elem = this.$refs.BPriceGraph as any;
    if (elem) elem.updateSeries(this.series, true);
  }

  get range(): number {
    return periods[this.activePeriod].amount;
  }

  get firstTS(): number {
    const first = [...this.shares]
      .map(x => x.prices)
      .flat()
      .sort((a, b) => a.timestamp - b.timestamp)[0];
    if (!first) return 0;
    return first.timestamp;
  }

  get lastTS(): number {
    const last = [...this.shares]
      .map(x => x.prices)
      .flat()
      .sort((a, b) => b.timestamp - a.timestamp)[0];
    if (!last) return Date.now();
    return last.timestamp;
  }

  get shares(): Share[] {
    return ShareManager.shares || [];
  }

  get options() {
    return {
      chart: {
        toolbar: { show: false },
        parentHeightOffset: 0,
        background: 'transparent',
        foreColor: '#fff',
        fontFamily: 'inherit',
        stacked: false,
        zoom: {
          type: 'x',
          enabled: false,
          autoScaleYaxis: true
        }
      },
      xaxis: {
        type: 'datetime',
        max: this.lastTS,
        range: Math.min(this.range, this.lastTS - this.firstTS)
      },
      yaxis: {
        forceNiceScale: true,
        labels: { formatter: (value: string) => value + '€' }
      },
      colors: this.shares.map(x => x.color),
      stroke: { lineCap: 'round', width: 2, curve: 'stepline' },
      tooltip: {
        x: { format: 'dd. MMM yyyy HH:mm:ss' }
      },
      theme: { mode: 'dark' },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      }
    };
  }

  get series() {
    const shares = this.shares;
    if (!shares) return [];

    return shares.map(x => {
      return {
        name: x.name,
        data: x.prices.map(p => {
          return [p.timestamp, p.price];
        })
      };
    });
  }
}
</script>

<style lang="scss" scoped>
.b-price-graph {
  .tc-segments {
    margin-top: 20px;
  }
}
</style>
