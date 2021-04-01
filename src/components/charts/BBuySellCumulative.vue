<template>
  <BChartWrapper
    v-if="ordersOfShare.length > 0"
    class="view-b-buy-sell-cumulative"
    subtitle="Buy & Sell"
    title="Cumulative Orders"
  >
    <VueApexCharts
      ref="BBuySellCumulative"
      type="area"
      height="400"
      width="100%"
      :options="options"
      :series="series"
    />
  </BChartWrapper>
</template>

<script lang="ts">
import { Share, ShareManager } from '@/utils/ShareManager';
import { Order } from 'moonstonks-boersenapi';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import BChartWrapper from './BChartWrapper.vue';
import VueApexCharts from 'vue-apexcharts';

@Component({
  components: {
    BChartWrapper,
    VueApexCharts
  }
})
export default class BBuySellCumulative extends Vue {
  @Prop() shareId!: string;

  @Watch('orders', { deep: true, immediate: true })
  updateChart() {
    // eslint-disable-next-line
    const elem = this.$refs.BBuySellCumulative as any;
    if (elem) elem.updateSeries(this.series, true);
  }

  get share(): Share | null {
    return ShareManager.getShare(this.shareId);
  }

  get orders(): Order[] | null {
    return this.$store.getters.orderbook;
  }

  get ordersOfShare(): Order[] {
    if (!this.share) return [];
    return (this.orders || []).filter(o => o.shareId === this.shareId);
  }

  get sellOrders(): Order[] {
    return this.ordersOfShare.filter(o => o.type === 'sell');
  }

  get buyOrders(): Order[] {
    return this.ordersOfShare.filter(o => o.type === 'buy');
  }

  get uniqueBuyLimits(): number[] {
    return [
      // eslint-disable-next-line
      ...new Set(this.buyOrders.map(x => x.limit || this.share!.price))
    ].sort((a, b) => a - b);
  }

  get uniqueSellLimits(): number[] {
    return [
      // eslint-disable-next-line
      ...new Set(this.sellOrders.map(x => x.limit || this.share!.price))
    ].sort((a, b) => b - a);
  }

  get buySeries(): { x: number; y: number }[] {
    return this.uniqueBuyLimits.map(x => {
      return {
        x: x,
        y: this.buyOrders
          .filter(o => !o.limit || o.limit >= x)
          .map(o => o.amount)
          .reduce((a, b) => a + b, 0)
      };
    });
  }

  get sellSeries(): { x: number; y: number }[] {
    return this.uniqueSellLimits.map(x => {
      return {
        x: x,
        y: this.sellOrders
          .filter(o => !o.limit || o.limit <= x)
          .map(o => o.amount)
          .reduce((a, b) => a + b, 0)
      };
    });
  }

  get series() {
    const buy = this.buySeries;
    const sell = this.sellSeries;
    const series = [];

    if (buy.length > 0) {
      series.push({ name: 'Buy Orders', data: buy });
    }
    if (sell.length > 0) {
      series.push({ name: 'Sell Orders', data: sell });
    }
    return series;
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
      dataLabels: {
        enabled: false
      },
      xaxis: {
        type: 'numeric',
        forceNiceScale: true,
        labels: {
          formatter: (value: string) => Math.round(+value * 100) / 100 + '€'
        }
      },
      tooltip: {
        x: {
          formatter: (name: string) => 'for at least ' + name + '€'
        }
      },
      yaxis: {
        forceNiceScale: true
      },
      colors: ['#25ca49', '#ff4757'],
      stroke: { lineCap: 'round', width: 2, curve: 'smooth' },
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
}
</script>

<style lang="scss" scoped>
.view-b-buy-sell-cumulative {
  //
}
</style>
