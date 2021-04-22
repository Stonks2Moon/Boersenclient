<template>
  <div class="view-clearing" content>
    <h1>Clearing</h1>

    <tl-grid minWidth="170" gap="20">
      <BChartWrapper title="Buy Volume" subtitle="Total">
        <span>{{ buy }}</span>
      </BChartWrapper>
      <BChartWrapper title="Sell Volume" subtitle="Total">
        <span>{{ sell }}</span>
      </BChartWrapper>
    </tl-grid>

    <div v-for="b in uniqueBroker" :key="b.id">
      <br />
      <h2>{{ b.displayName }}</h2>
      <tc-table :dark="true">
        <template slot="head">
          <!-- <tc-th>Tag</tc-th> -->
          <tc-th>Monat</tc-th>
          <tc-th>Jahr</tc-th>
          <tc-th>Buy Volume</tc-th>
          <tc-th>Sell Volume</tc-th>
        </template>
        <tc-tr v-for="d in daily.filter(x => x.brokerId === b.id)" :key="d.id">
          <!-- <tc-td>{{ d.day }}</tc-td> -->
          <tc-td>{{ d.month }}</tc-td>
          <tc-td>{{ d.year }}</tc-td>
          <tc-td tfcolor="success">{{ format(d.volumeBuy) }} €</tc-td>
          <tc-td tfcolor="error">{{ format(d.volumeSell) }} €</tc-td>

          <template slot="expander">
            <table class="expander-table">
              <tr>
                <th>Transaction</th>
                <th>Trade</th>
                <th>Fixum</th>
              </tr>
              <tr>
                <td>{{ map(d.transactionPrice) }}</td>
                <td>{{ map(d.tradePrice) }}</td>
                <td>{{ map(d.fixum) }}</td>
              </tr>
            </table>
          </template>
        </tc-tr>
      </tc-table>
    </div>
  </div>
</template>

<script lang="ts">
import BAnimatedNumber from '@/components/BAnimatedNumber.vue';
import BChartWrapper from '@/components/charts/BChartWrapper.vue';
import { Broker, BrokerManager } from '@/utils/BrokerManager';
import { ClearingManager, DailyClearing } from '@/utils/ClearingManager';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    BAnimatedNumber,
    BChartWrapper
  }
})
export default class Clearing extends Vue {
  get daily(): DailyClearing[] {
    return ClearingManager.sorted;
  }

  format(n: number): string {
    return Intl.NumberFormat('en-GB', { notation: 'compact' }).format(n);
  }

  map(n: number): number {
    return Math.round(n * 100) / 100;
  }

  get uniqueBroker(): Broker[] {
    const broker = [...this.daily].map(x => x.brokerId);
    const unique = [...new Set(broker)];

    return unique
      .map(x => BrokerManager.getBroker(x))
      .filter(x => !!x) as Broker[];
  }

  get buy(): string {
    const sum = this.daily.reduce((a, b) => a + b.volumeBuy, 0);
    return this.format(sum);
  }

  get sell(): string {
    const sum = this.daily.reduce((a, b) => a + b.volumeSell, 0);
    return this.format(sum);
  }
}
</script>

<style lang="scss" scoped>
.view-clearing {
  .b-chart-wrapper {
    position: relative;
    i {
      position: absolute;
      top: 50%;
      right: 20px;
      font-size: 30px;
      transform: translateY(-50%);
      opacity: 0.75;
    }
    span {
      font-size: 25px;
      font-weight: bold;
      color: $error;
    }
  }

  .tc-tr {
    cursor: pointer;
  }

  .expander-table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
  }
}
</style>
