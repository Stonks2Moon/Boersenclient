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
  </BChartWrapper>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import VueApexCharts from 'vue-apexcharts';
import { ShareManager } from '@/utils/ShareManager';
import BChartWrapper from '@/components/charts/BChartWrapper.vue';

import { Price, Share } from 'moonstonks-boersenapi';
import { PriceHistoryManager } from '@/utils/PriceHistoryManager';

@Component({
  components: {
    VueApexCharts,
    BChartWrapper
  }
})
export default class BPriceGraph extends Vue {
  @Watch('shares', { deep: true, immediate: true })
  updateChart() {
    // eslint-disable-next-line
    const elem = this.$refs.BPriceGraph as any;
    if (elem) elem.updateSeries(this.series, true);
  }

  get histories(): Record<string, Price[]> {
    return PriceHistoryManager.histories;
  }

  get shares(): Share[] {
    return ShareManager.shares || [];
  }

  get options() {
    return {
      chart: {
        toolbar: { show: true },
        parentHeightOffset: 0,
        background: 'transparent',
        foreColor: '#fff',
        fontFamily: 'inherit',
        stacked: false,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        }
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        forceNiceScale: true,
        labels: { formatter: (value: string) => value + '€' }
      },
      colors: this.shares.map(x => x.color),
      stroke: { lineCap: 'round', width: 2, curve: 'straight' },
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
        data: (this.histories[x.id] || [])
          .sort((a, b) => b.timestamp - a.timestamp)
          .filter((_, i) => i < 300)
          .sort((a, b) => a.timestamp - b.timestamp)
          .map(p => {
            return [p.timestamp, p.price];
          })
      };
    });
  }
}
</script>

<style lang="scss" scoped>
.b-price-graph {
  //
}
</style>
