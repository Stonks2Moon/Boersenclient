<template>
  <div class="view-invoice" content>
    <h1>Invoice</h1>

    <tl-grid minWidth="170" gap="20">
      <BChartWrapper title="Invoice" subtitle="Total">
        <span>{{ total }}</span>
      </BChartWrapper>
      <BChartWrapper title="Individual" subtitle="Invoices">
        <span>{{ due }}</span>
      </BChartWrapper>
      <BChartWrapper title="Average" subtitle="Invoice">
        <span>{{ avg }}</span>
      </BChartWrapper>
    </tl-grid>

    <div v-for="b in broker" :key="b.id">
      <br />
      <h2>{{ b.displayName }}</h2>
      <tc-table :dark="true">
        <template slot="head">
          <tc-th>Monat</tc-th>
          <tc-th>Jahr</tc-th>
          <tc-th>Buy Volume</tc-th>
          <tc-th>Sell Volume</tc-th>
        </template>
        <tc-tr
          v-for="i in invoices.filter(x => x.brokerId === b.id)"
          :key="i.id"
        >
          <tc-td>{{ i.month }}</tc-td>
          <tc-td>{{ i.year }}</tc-td>
          <tc-td tfcolor="error">{{ format(i.amount) }} €</tc-td>
          <tc-td>{{ i.description }} €</tc-td>
        </tc-tr>
      </tc-table>
    </div>
  </div>
</template>

<script lang="ts">
import BChartWrapper from '@/components/charts/BChartWrapper.vue';
import { Broker } from '@/utils/BrokerManager';
import { InvoiceManager } from '@/utils/InvoiceManager';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    BChartWrapper
  }
})
export default class Invoice extends Vue {
  get invoices() {
    return InvoiceManager.invoices;
  }

  get broker(): Broker[] {
    return InvoiceManager.getUniqueBroker();
  }

  format(n: number): string {
    return Intl.NumberFormat('en-GB', { notation: 'compact' }).format(n);
  }

  get total(): string {
    return this.format(InvoiceManager.total);
  }

  get due(): string {
    return this.format(InvoiceManager.due);
  }

  get avg(): string {
    return this.format(InvoiceManager.avg);
  }
}
</script>

<style lang="scss" scoped>
.view-invoice {
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
}
</style>
