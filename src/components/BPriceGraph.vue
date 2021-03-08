<template>
  <div class="b-price-graph">
    <VueApexCharts
      type="area"
      height="400"
      :options="options"
      :series="series"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import VueApexCharts from 'vue-apexcharts';
import { IShare } from '@/utils/inerfaces';
import { ShareManager } from '@/utils/ShareManager';

@Component({
  components: {
    VueApexCharts
  }
})
export default class BPriceGraph extends Vue {
  get options() {
    return {
      chart: {
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
      xaxis: { type: 'datetime' },
      yaxis: {
        forceNiceScale: true,
        labels: { formatter: (value: string) => value + ' €' }
      },
      colors: (ShareManager.getShares() || []).map(x => x.color),
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
    const shares: IShare[] | null = ShareManager.getShares();
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
  //
}
</style>
