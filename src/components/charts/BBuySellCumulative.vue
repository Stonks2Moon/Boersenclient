<template>
  <BChartWrapper
    v-if="orders.length > 0"
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
import { Vue, Component, Prop } from 'vue-property-decorator';
import BChartWrapper from './BChartWrapper.vue';
import VueApexCharts from 'vue-apexcharts';

import { LimitAndAmount } from '@/utils/OrderbookManager';
import backend from '@/utils/backend';
import { EventBus } from '@/utils/eventbus';

@Component({
  components: {
    BChartWrapper,
    VueApexCharts
  }
})
export default class BBuySellCumulative extends Vue {
  @Prop() shareId!: string;

  public orders: LimitAndAmount[] = [];

  mounted() {
    this.loadData();
    EventBus.$on('order-book-updated', (shareId: string) => {
      if (this.shareId === shareId) {
        this.loadData();
      }
    });
  }

  public loadData(): void {
    if (this.shareId) {
      backend.get('orderbook/limitsAndAmounts/' + this.shareId).then(res => {
        this.orders = res.data;
        // eslint-disable-next-line
        const elem = this.$refs.BBuySellCumulative as any;
        if (elem) elem.updateSeries(this.series, true);
      });
    }
  }

  get sellOrders(): LimitAndAmount[] {
    return this.orders.filter(o => o.type === 'sell');
  }

  get buyOrders(): LimitAndAmount[] {
    return this.orders.filter(o => o.type === 'buy');
  }

  get uniqueBuyLimits(): number[] {
    return [...new Set(this.buyOrders.map(x => x.limit))].sort((a, b) => a - b);
  }

  get uniqueSellLimits(): number[] {
    return [...new Set(this.sellOrders.map(x => x.limit))].sort(
      (a, b) => b - a
    );
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
        forceNiceScale: true,
        labels: {
          formatter: (value: string) => Math.round(+value)
        }
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
